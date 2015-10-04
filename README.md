# ReactNativeTodo
A simple,,,, todo :briefcase:

# Installation & run

- `npm install` in the root directory.
- `npm install` in the server directory if you want to get the server runs also.
- Please also follow these steps to setup `react-native-keyboardevents`
  - https://github.com/johanneslumpe/react-native-keyboardevents#how-to-move-a-view-when-the-keyboard-shows-up

### Run the app with live reload:

- **Open** `ios > reactNativeTodo.xcodeproj`, then:
- **Search** for `8081` in the project, and **change** the IP address to another.
  - If you run the App in a real phone, make sure your phone are in the same network with your computer, and change the IP to your computers' one.
  - If you run the App in a simulator, change the IP to `localhost` (WIFI IP address may not work).
- `cd server` and `./app.js` to start the API service, please **make sure** you have NodeJS and MongoDB installed.
- **Open** `app > network > API.js` with your prefered editor, **change** the SERVER_PREFIX to your API service endpoint.
  - Again, `localhost` if you are running the App in a simulator, `WIFI IP` if you are connected to your phone with a wifi hotspot.
- **Select** the project name in the Project Explorer (Xcode 7 and above),
  - then **click** `Build Settings` in the right panel,
  - **search** in below input box for `dead`, 
  - Find `Dead Code Stripping`, switch it to `No`.
- **Click** `Run` in the Xcode!

### Run the App standalone (you may need to do all the steps above):

**Run** `react-native bundle --minify` in the root directory.

- **Open** `ios > reactNativeTodo.xcodeproj`
- **Right click** the project in Project Navigator, select `Add files to reactNativeTodo`, find `ios/main.jsbundle`, OK.
- **Open** `reactNativeTodo > AppDelegate.m`
  - **Comment** `jsCodeLocation = [NSURL URLWithString:@"http://localhost:8081/index.ios.bundle"];`
  - **Uncomment** `jsCodeLocation = [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];`
- **Click** `Run` in the Xcode!
