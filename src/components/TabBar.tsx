import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { AppStackParams } from '../AppLayout';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TABS: Array<{
  route: keyof AppStackParams;
  label: string;
  active: IoniconName;
  inactive: IoniconName;
}> = [
  { route: 'Feed',   label: 'Issues', active: 'newspaper',    inactive: 'newspaper-outline' },
  { route: 'Report', label: 'Report', active: 'add-circle',   inactive: 'add-circle-outline' },
];

export default function TabBar() {
  const navigation = useNavigation<NativeStackNavigationProp<AppStackParams>>();
  const route = useRoute();

  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.tabBar, { paddingBottom: insets.bottom + 4 }]}>
      {TABS.map((tab) => {
        const focused = route.name === tab.route;

        return (
          <TouchableOpacity
            key={tab.route}
            style={styles.tabItem}
            activeOpacity={0.7}
            onPress={() => {
              if (!focused) navigation.navigate(tab.route);
            }}
          >
            <Ionicons
              name={focused ? tab.active : tab.inactive}
              size={26}
              color={focused ? '#4361EE' : '#ADB5BD'}
            />
            <Text style={[styles.tabLabel, focused && styles.tabLabelActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F3F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 10,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
    gap: 4,
  },
  tabLabel: {
    fontSize: 11,
    fontWeight: '400',
    color: '#ADB5BD',
  },
  tabLabelActive: {
    fontWeight: '600',
    color: '#4361EE',
  },
});
