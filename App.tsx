import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import AppLayout from './src/AppLayout';
import { IssuesProvider } from './src/store/issuesStore';

export default function App() {
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
