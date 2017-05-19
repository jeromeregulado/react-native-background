package com.rnapp;

import android.app.Application;

import com.dieam.reactnativepushnotification.ReactNativePushNotificationPackage;  // <--- Import Package
import com.pilloxa.backgroundjob.BackgroundJobPackage;
import com.fabricio.vergal.RNWorkers.RNWorkersManager;
import com.fabricio.vergal.RNWorkers.RNWorkersPackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

import java.util.Arrays;
import java.util.List;


public class MainApplication extends Application implements ReactApplication {

    private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
        @Override
        public boolean getUseDeveloperSupport() {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages() {
            return Arrays.asList(
                    new MainReactPackage(),
                    new BackgroundJobPackage(),
                    new RNWorkersPackage(),
                    new ReactNativePushNotificationPackage() // <---- Add the Package
            );
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost() {
        return mReactNativeHost;
    }

    @Override
    public void onCreate() {
        super.onCreate();
        SoLoader.init(this, false);
        RNWorkersManager.getInstance().init(this, BuildConfig.DEBUG);
    }
}
