# Grunt App Boilerplate

Repo created to serve like a base structure for phonegap mobile apps projects, using Intel XDK, phonegap and Grunt as a task manager.


## Using

First things first, edit package.json with your project info, most important is the name


If you haven't cordova/phonegap and grunt-cli in your computer, you must run:

´´´
npm install -g grunt-cli
npm install -g cordova
´´


Now create a cordova/phonegap project in phonegap folder, the app_name must be the name in package.json

´´´
cordova create app_name [com.author.appname]
´´´

If you will use Intel XDK Create a Intel XDK project inside xdk folder, the App Name must be the same in package.json


After all of this, run the follow command

´´´
npm install
´´´