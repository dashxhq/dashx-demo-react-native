//
//  AppDelegate.swift
//  dashx
//
//  Created by Gulshan Dhingra on 08/08/23.
//

import Foundation
import UIKit
import React

@UIApplicationMain
class AppDelegate: RCTAppDelegate {
    override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
      self.moduleName = "dashx"
      self.initialProps = [:]
      return super.application(application, didFinishLaunchingWithOptions: launchOptions)
    }

    override func sourceURL(for bridge: RCTBridge!) -> URL! {
        #if DEBUG
        return RCTBundleURLProvider.sharedSettings()?.jsBundleURL(forBundleRoot: "index")
        #else
        return Bundle.main.url(forResource: "main", withExtension: "jsbundle")
        #endif
    }
}
