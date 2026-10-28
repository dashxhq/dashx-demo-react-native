# DashX Demo (React Native)

A demo app for [`@dashx/react-native`](https://github.com/dashxhq/dashx-react-native). It sends events to the DashX staging environment, including screen views (`DashX.trackNavigation`) and app lifecycle events (`DashX.enableLifecycleTracking`).

Built with React Native 0.81 and `@dashx/react-native` 1.5.

## Requirements

- Node.js 20+ and Yarn 1
- Xcode 16+ and Ruby (for CocoaPods via Bundler)
- Android Studio with JDK 17 and an API 26+ device or emulator

## Setup

```sh
yarn install
bundle install
cd ios && bundle exec pod install
```

### Push notifications

- **Android:** `android/app/google-services.json` is committed.
- **iOS:** add the demo's `GoogleService-Info.plist` at `ios/dashx/GoogleService-Info.plist`. It is gitignored. Without it the app still runs, but push notifications are disabled.

## Run

```sh
yarn start
yarn ios       # or: yarn android
```

## Testing a local SDK checkout

Point the dependency at your `dashx-react-native` checkout, then reinstall (and run `pod install` again for iOS):

```json
"@dashx/react-native": "file:../dashx-react-native"
```

See the SDK's [CONTRIBUTING.md](https://github.com/dashxhq/dashx-react-native/blob/develop/CONTRIBUTING.md) for testing against local dashx-ios or dashx-android builds.
