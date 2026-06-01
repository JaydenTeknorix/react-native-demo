import React from 'react';
import { ScrollView } from 'react-native';
import {
  Container,
  Header,
  Greeting,
  Title,
  SectionTitle,
  CardRow,
  Card,
  CardLabel,
  CardSubLabel,
  CardAccent,
  ActivityItem,
  ActivityDot,
  ActivityText,
  ActivityTime,
} from '../styles/HomeScreen.styles';

const CARDS = [
  { id: '1', label: 'Analytics', sub: '12 reports', color: '#dbe4ff' },
  { id: '2', label: 'Projects', sub: '5 active', color: '#d3f9d8' },
  { id: '3', label: 'Messages', sub: '3 unread', color: '#fff3bf' },
  { id: '4', label: 'Tasks', sub: '8 pending', color: '#ffd8d8' },
];

const ACTIVITY = [
  { id: '1', text: 'New user signed up', time: '2m ago', color: '#4361ee' },
  { id: '2', text: 'Report generated', time: '15m ago', color: '#2ec4b6' },
  { id: '3', text: 'Payment received', time: '1h ago', color: '#06d6a0' },
  { id: '4', text: 'Server restarted', time: '3h ago', color: '#e63946' },
];

export default function HomeScreen() {
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header>
          <Title>Dashboard</Title>
        </Header>

        <SectionTitle>Overview</SectionTitle>
        <CardRow>
          {CARDS.map((card) => (
            <Card key={card.id} activeOpacity={0.8}>
              <CardAccent color={card.color} />
              <CardLabel>{card.label}</CardLabel>
              <CardSubLabel>{card.sub}</CardSubLabel>
            </Card>
          ))}
        </CardRow>

        <SectionTitle>Recent Activity</SectionTitle>
        {ACTIVITY.map((item) => (
          <ActivityItem key={item.id}>
            <ActivityDot color={item.color} />
            <ActivityText>{item.text}</ActivityText>
            <ActivityTime>{item.time}</ActivityTime>
          </ActivityItem>
        ))}
      </ScrollView>
    </Container>
  );
}
