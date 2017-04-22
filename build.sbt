
name := """play-primeng-mongo"""

version := "0.1.0"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.11"

libraryDependencies ++= Seq(
  cache,
  ws
)

resolvers += "sfxcode" at "https://dl.bintray.com/sfxcode/maven"

libraryDependencies += "com.sfxcode.nosql" % "simple-mongo_2.11" % "0.9.1"

libraryDependencies += "org.json4s" %% "json4s-native" % "3.5.1"

libraryDependencies += "org.scalatestplus.play" %% "scalatestplus-play" % "2.0.0" % Test

