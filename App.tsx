/**
 * React Native Task App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';
import InitialNavigation from './src/navigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import redux from './src/redux';
import { PersistGate } from 'redux-persist/integration/react'
import { Colors } from './src/constant';
import { configAxiosStructure } from './src/provider/api-config';

const { store, persistor } = redux

function App(): React.JSX.Element {

  useEffect(() => {
    configAxiosStructure()
  }, [])

  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaProvider>
          <StatusBar backgroundColor={Colors.white} barStyle="dark-content" />
          <View style={{ flex: 1 }}>
            <InitialNavigation />
          </View>
        </SafeAreaProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
