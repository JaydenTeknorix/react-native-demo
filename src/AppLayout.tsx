import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import IssueFeedScreen from './screens/IssueFeedScreen';
import IssueDetailScreen from './screens/IssueDetailScreen';
import ReportMapScreen from './screens/ReportMapScreen';

export type AppStackParams = {
  Feed: undefined;
  IssueDetail: { issueId: string };
  Report: undefined;
};

const Stack = createNativeStackNavigator<AppStackParams>();

export default function AppLayout() {
  return (
    <Stack.Navigator 
      screenOptions={{ 
        headerShown: false,
        animation: 'none'          
      }}
    >
      <Stack.Screen name="Feed" component={IssueFeedScreen} />
      <Stack.Screen name="IssueDetail" component={IssueDetailScreen} options={{animation: 'slide_from_right'}}/>
      <Stack.Screen name="Report" component={ReportMapScreen} />
    </Stack.Navigator>
  );
}
