import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppLayout from './src/AppLayout';
import { IssuesProvider } from './src/store/issuesStore';
import { useEffect } from 'react';
import QuickActionsModule from './modules/quick-actions/src/QuickActionsModule';

export default function App() {
  useEffect(() => {
    try {
      QuickActionsModule.setShortcutItems("Report Issue", "Quickly report a new issue");
    } catch (e) {
      console.log("QuickActionsModule not available (maybe not built yet)", e);
    }
  }, []);

  return (
    <IssuesProvider>
      <SafeAreaProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppLayout />
        </NavigationContainer>
      </SafeAreaProvider>
    </IssuesProvider>
  );
}
