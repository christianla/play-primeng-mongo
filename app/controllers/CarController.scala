package controllers

import javax.inject.{Inject, Singleton}

import models._
import org.json4s.DefaultFormats
import org.json4s.native.Serialization._
import org.mongodb.scala.bson.ObjectId
import play.Logger
import play.api.mvc.{Action, Controller}
import services.MongoDbService

import scala.collection.mutable


@Singleton
class CarController @Inject()(mongoDbService: MongoDbService) extends Controller {

  val ResultSuccess = Result("success", true)
  val ResultFailed = Result("success", false)

  implicit val formats = new DefaultFormats {}

  var carList: mutable.Buffer[Car] = mutable.ListBuffer[Car]()

  /**
    * controller method for insert & update
    *
    * @return
    */
  def insertOrUpdate = Action(parse.json) { request =>
    val body = request.body
    Logger.info("Got: " + (body \ "brand").as[String])
    Logger.info("Complete body: " + body)

    val carResult: Car = read[Car](body.toString())

    if (carList.exists(p => p.vin.equals(carResult.vin)))
      update(carResult)
    else{
      carList += carResult
      mongoDbService.insert(carResult)
    }

    Ok(write(ResultSuccess))
  }

  def delete(id:String) = Action{ request =>
    Logger.info("remove: " + id )

    if (carsFromDB.exists(p => p.vin.equals(id))){
      mongoDbService.delete(id)
      Ok(write(ResultSuccess))
    }
    else
      NotFound(write(ResultFailed))

  }


  def index = Action {
    checkForInit()
    Ok(write(carList))
  }

  //  not needed if save is done after every operation
  def save = Action {
    mongoDbService.saveAllCars(carList.toList)
    Ok(write(ResultSuccess))
  }

  def clear = Action {
    mongoDbService.clear()
    Ok(write(ResultSuccess))
  }

  //  remove old object and replace with new one
  private def update(carResult: Car) = {
    val updatingCar = carList.find(p => p.vin.equals(carResult.vin)).get
    carList -= updatingCar
    mongoDbService.delete(updatingCar.vin)

    carList += carResult
    mongoDbService.insert(carResult)
  }


  private def checkForInit() = {
    carList = mutable.ListBuffer[Car]()

    if (carsFromDB.isEmpty) {
      Logger.info("db is empty, inserting initial dummy values")
      val c1: Car = Car(new ObjectId(),"dsad231ff", "2013", "VW", "black")
      val c2: Car = Car(new ObjectId(),"dsad231fh", "2012", "Audi", "red")
      val c3: Car = Car(new ObjectId(),"dsad231fg", "2011", "BMW", "blue")

      carList += (c1, c2, c3)
      mongoDbService.saveAllCars(carList.toList)
    }
    else{
      carList = carsFromDB.toBuffer
    }
  }

  private def carsFromDB = mongoDbService.findAllCars


}

case class Result(name:String, value:Boolean)
