package services

import javax.inject.Singleton

import com.sfxcode.nosql.mongo._
import data.Database._
import models.Car
import play.api.Logger

/**
  * Created by cl on 31.03.17.
  *
  */
abstract class MongoDbService() {

  def findAllCars: List[Car]

  def saveAllCars(cars: List[Car]): Unit

  def clear(): Unit

  def insert(car: Car): Unit

  def delete(id: String): Unit

  def update(car: Car): Unit

}

@Singleton
class AtomicMongoDbService() extends MongoDbService {

  override def findAllCars: List[Car] = CarDAO.find()

  override def saveAllCars(cars: List[Car]): Unit = {
    CarDAO.insertValuesResult(cars)
  }

  override def clear(): Unit = CarDAO.drop()

  override def insert(car: Car): Unit = {
    CarDAO.insertResult(car)
  }

  override def delete(id: String): Unit = {
    val car = findAllCars.find(p => p.vin.equals(id))
    if (car.isDefined){
      val result = CarDAO.deleteByValueResult(car.get)
      Logger.info(result.toString)
    }
  }

  override def update(car: Car): Unit = ???
  //  CarDAO.update()

}
