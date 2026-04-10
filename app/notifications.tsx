import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { ChevronLeft, RefreshCw, DollarSign, Clock } from 'lucide-react-native';
import { FlashList } from '@shopify/flash-list';

type TabType = 'All' | 'This Week' | 'This Month';

const TABS: TabType[] = ['All', 'This Week', 'This Month'];

const MOCK_NOTIFICATIONS = [
  { id: '1', title: 'Price Updated', subtitle: 'Honda Grand Cherokee', time: '5 hours ago' },
  { id: '2', title: 'Price Updated', subtitle: 'Honda Grand Cherokee', time: '5 hours ago' },
  { id: '3', title: 'Price Updated', subtitle: 'Honda Grand Cherokee', time: 'Yesterday' },
  { id: '4', title: 'Price Updated', subtitle: 'Honda Grand Cherokee', time: '2 days ago' },
  { id: '5', title: 'Price Updated', subtitle: 'Honda Grand Cherokee', time: '4 days ago' },
  { id: '6', title: 'Price Updated', subtitle: 'Honda Grand Cherokee', time: '5 days ago' },
  { id: '7', title: 'Price Updated', subtitle: 'Honda Grand Cherokee', time: '5 days ago' },
  { id: '8', title: 'Price Updated', subtitle: 'Honda Grand Cherokee', time: '5 hours ago' },
];

export default function NotificationsScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [activeTab, setActiveTab] = useState<TabType>('All');
  const headerStyle = useMemo(() => {
    return {
      height: 60 + insets.top,
      paddingTop: insets.top,
    };
  }, [insets.top]);

  const renderNotification = ({ item }: { item: typeof MOCK_NOTIFICATIONS[0] }) => {
    return (
      <View style={styles.notificationCard}>
        <View style={styles.iconContainer}>
          <DollarSign size={20} color="#2492D4" />
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.titleText}>{item.title}</Text>
          <Text style={styles.subtitleText}>{item.subtitle}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Clock size={12} color="#A0A0A0" />
          <Text style={styles.timeText}>{item.time}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <StatusBar style="light" backgroundColor="#2492D4" />
      <View style={[styles.header, headerStyle]}>
        <Pressable style={styles.iconButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Notifications</Text>
        <Pressable style={styles.iconButton}>
          <RefreshCw size={20} color="#FFFFFF" />
        </Pressable>
      </View>

      <View style={styles.content}>
        <View style={styles.tabsContainer}>
          {TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <Pressable
                key={tab}
                style={[styles.tab, isActive && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, isActive && styles.activeTabText]}>
                  {tab}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <FlashList
          data={MOCK_NOTIFICATIONS}
          renderItem={renderNotification}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent as any}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    backgroundColor: '#2492D4',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  iconButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    paddingTop: 16,
  },
  tabsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 4,
  },
  tab: {
    flex: 1,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#2492D4',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666666',
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  titleText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  subtitleText: {
    fontSize: 13,
    color: '#666666',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    marginTop: 2,
    gap: 4,
  },
  timeText: {
    fontSize: 12,
    color: '#A0A0A0',
  },
});
