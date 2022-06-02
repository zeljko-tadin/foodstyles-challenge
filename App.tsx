import * as SplashScreen from 'expo-splash-screen';
import { loadAsync } from 'expo-font';
import { Provider } from 'react-redux';
import { store } from './app/store';
import { CardListScreen } from './features/card-list/CardListScreen';
import { useCallback, useEffect, useState } from 'react';
import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await loadAsync({
          'ProximaNova-Regular': require('./assets/fonts/ProximaNovaAlt-Regular.ttf'),
          'ProximaNova-Bold': require('./assets/fonts/ProximaNovaAlt-Bold.ttf'),
          'ProximaNova-Semibold': require('./assets/fonts/ProximaNovaAlt-Semibold.ttf'),
          'ProximaNovaCond-Semibold': require('./assets/fonts/ProximaNovaAltCond-Semibold.ttf'),
        });
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar />
        <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
          <CardListScreen />
        </View>
      </SafeAreaProvider>
    </Provider>
  );
}