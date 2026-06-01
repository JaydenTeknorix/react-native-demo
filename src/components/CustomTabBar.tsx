import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import {
  TabBarContainer,
  TabItem,
  TabLabel,
} from '../styles/TabBar.styles';

type IoniconName = React.ComponentProps<typeof Ionicons>['name'];

const TAB_ICONS: Record<string, { active: IoniconName; inactive: IoniconName }> = {
  Home: { active: 'home', inactive: 'home-outline' },
  Explore: { active: 'compass', inactive: 'compass-outline' },
};

export default function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <TabBarContainer style={{ paddingBottom: insets.bottom + 4 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? String(options.tabBarLabel)
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const icons = TAB_ICONS[route.name];
        const iconName = isFocused ? icons?.active : icons?.inactive;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <TabItem key={route.key} onPress={onPress} activeOpacity={0.7}>
            <Ionicons
              name={iconName ?? 'ellipse-outline'}
              size={24}
              color={isFocused ? '#4361ee' : '#adb5bd'}
            />
            <TabLabel active={isFocused}>{label}</TabLabel>
          </TabItem>
        );
      })}
    </TabBarContainer>
  );
}
