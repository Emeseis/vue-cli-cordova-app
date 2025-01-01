# vue-cli-cordova-app

## Requirements

* [Java Development Kit (JDK) 11](https://www.oracle.com/br/java/technologies/javase/jdk11-archive-downloads.html)
* [Android 10 SDK](https://developer.android.com/about/versions/10/setup-sdk)
* [Node.js](https://nodejs.org/pt/download)

> **Recommendation**: It's recommended to use [nvm-windows](https://github.com/coreybutler/nvm-windows) to manage Node.js versions. This will help you easily switch between different versions of Node.js for different projects.

## Setting Up Environment Variables

Make sure to set up the following environment variables correctly:

* **JAVA_HOME**: Path to the JDK 11 installation.
* **ANDROID_HOME**: Path to the Android SDK.
* **ANDROID_SDK_ROOT**: Path to the Android SDK.

## Project setup

1. Install Cordova and Vue CLI globally:
```
npm install -g cordova @vue/cli
```

2. Navigate to the `src-cordova` folder and install the dependencies:
```
cd src-cordova
npm install
```

3. Go back to the root folder and install the remaining dependencies:
```
cd..
npm install
```

### Compiles and hot-reloads for development (android)
```
npm run android
```

### Compiles and minifies for production (android)
```
npm run build
```
