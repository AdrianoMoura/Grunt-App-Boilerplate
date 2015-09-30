See the portuguese version of this readme here: [README_PT.md](README_PT.md)

# Grunt App Boilerplate

Repo created to serve like a base structure for phonegap mobile apps projects, using phonegap and Grunt as a task manager.

## Cloning Project

This command clone our git repo in a new folder called YourProjectName without any git log

```
git clone https://github.com/AdrianoMoura/Grunt-App-Boilerplate ./YourProjectName --depth=1
```

Remove the remote origin
```
git remote rm origin
```

or rename it
```
git remote rename origin boilerplate
```

Renaming it you still can pull any update in my Boilerplate


## Using

First things first, edit myapp.json with your project info: id, name, version, description, plugins and platforms


If you haven't phonegap and grunt-cli in your computer, you must run:

```
sudo npm install -g grunt-cli
sudo npm install -g phonegap
```

After this, run the following command to install dependencies

```
npm install
```


This new version of my boilerplate auto create the phonegap application, after install all dependences run the follow commands

```
// Build your application from src into www
grunt build

// Build your application from src into www, create a phonegap project and build it
grunt phonegap

// Build your aplication from src into www and run the already builded app in default device (this command didn't build your phonegap app, he must run after grunt phonegap command)
grunt phonegap-run

// Like grunt phonegap with selected platform target, without this parameter phonegap will build to the first platform defined in myapp.json
grunt phonegap --platform android

// Just like the commands before
grunt phonegap-run --platform android
```


## Troubleshooting

### Fatal error: Command failed: /bin/sh -c phonegap local build android 

Android SDK isn't installed
ANDROID_HOME and/or PATH is not defined
or 
androidMinSdkVersion in myapp.json must be your lowest Android SDK, maybe you need to change this value, run android on terminal and check it 
