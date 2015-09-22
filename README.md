# Grunt App Boilerplate

Repo created to serve like a base structure for phonegap mobile apps projects, using phonegap and Grunt as a task manager.


## Using

First things first, edit myapp.json with your project info: id, name, version, description, plugins and platforms


If you haven't phonegap and grunt-cli in your computer, you must run:

```
sudo npm install -g grunt-cli
sudo npm install -g phonegap
```

After all of this, run the following command to install dependencies

```
npm install
```


This new version of my boilerplate auto create the phonegap application, after install all dependences run the follow commands

```
grunt build // Build your application from src into www

grunt phonegap // Build your application from src into www, create a phonegap project and build it

grunt phonegap-run // Build your aplication from src into www, create a phonegap project, build it and run in default device

grunt phonegap --platform android // Like grunt phonegap with selected platform target, without this parameter phonegap will build with the first platform defined in myapp.json

grunt phonegap-run --platform android // Just like the commands before
```
