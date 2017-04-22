package data

import com.sfxcode.nosql.mongo.MongoDAO
import com.sfxcode.nosql.mongo.database.DatabaseProvider
import models.Car
import org.mongodb.scala._

object Database extends ObservableImplicits {

  val mongoClient: MongoClient = MongoClient()

  import org.bson.codecs.configuration.CodecRegistries._
  import org.mongodb.scala.bson.codecs.Macros._

  private val carRegistry = fromProviders(classOf[Car])


  val database = DatabaseProvider("play_primeng_mongo", fromRegistries(carRegistry))

  object CarDAO extends MongoDAO[Car](database, "cars")


}
