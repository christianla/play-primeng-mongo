package models

import org.json4s.DefaultFormats
import org.mongodb.scala.bson.ObjectId

case class Car(_id: ObjectId = new ObjectId(),
                vin: String,
                year: String,
                brand: String,
                color: String)

object Car {

  implicit val formats = new DefaultFormats {}

}

