import React from 'react';
import { StyleSheet, View, Text, Pressable, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Menu, Bell, ChevronDown, Car, TrendingUp, ArrowRight, ListChecks } from 'lucide-react-native';
import { Image } from 'expo-image';

const nalleyLogo = require('@/assets/images/react-logo.png');

export default function DashboardScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerBackground} />
      
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <View style={styles.topNav}>
          <Pressable style={styles.iconButton}>
            <Menu color="#FFFFFF" size={24} />
          </Pressable>

          <View style={styles.rightNav}>
            <Pressable style={styles.dealerSelector}>
              <Text style={styles.dealerSelectorText}>Demo Dealer 1</Text>
              <ChevronDown color="#FFFFFF" size={16} style={styles.dealerChevron} />
            </Pressable>
            
            <Pressable style={styles.notificationButton}>
              <Bell color="#FFFFFF" size={20} />
              <View style={styles.notificationDot} />
            </Pressable>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={styles.welcomeSection}>
            <Text style={styles.dashboardTitle}>Dashboard</Text>
            <Text style={styles.welcomeText}>
              Welcome back, <Text style={styles.welcomeName}>Demo Dealer!</Text>
            </Text>
          </View>

          <View style={styles.mainCard}>
            <View style={styles.mainDealerRow}>
              <View style={styles.dealerLogoBox}>
                <Image source={nalleyLogo} style={styles.dealerLogo} contentFit="contain" />
              </View>
              <View style={styles.dealerInfo}>
                <Text style={styles.dealerName}>Nalley Honda</Text>
                <View style={styles.dealerMetaRow}>
                  <Car size={14} color="#777777" />
                  <Text style={styles.dealerMetaText}>156 vehicles</Text>
                </View>
              </View>
              <ChevronDown color="#1C9EF4" size={24} />
            </View>

            <View style={styles.statsContainer}>
              <View style={styles.statCard}>
                <View style={[styles.statIconBox, { backgroundColor: '#1C9EF4' }]}>
                  <Car size={24} color="#FFFFFF" />
                </View>
                <View style={styles.statContent}>
                  <View style={styles.statHeaderRow}>
                    <Text style={styles.statLabel}>Total Vehicles</Text>
                    <View style={styles.trendRow}>
                      <TrendingUp size={12} color="#34C759" />
                      <Text style={styles.trendTextPositive}>12 <Text style={styles.trendContext}>from last month</Text></Text>
                    </View>
                  </View>
                  <Text style={styles.statValue}>247</Text>
                </View>
              </View>

              <View style={styles.statCard}>
                <View style={[styles.statIconBox, { backgroundColor: '#1C9EF4' }]}>
                  <ListChecks size={24} color="#FFFFFF" />
                </View>
                <View style={styles.statContent}>
                  <View style={styles.statHeaderRow}>
                    <Text style={styles.statLabel}>Active Listings</Text>
                    <View style={styles.trendRow}>
                      <TrendingUp size={12} color="#34C759" />
                      <Text style={styles.trendTextPositive}>76% <Text style={styles.trendContext}>of inventory</Text></Text>
                    </View>
                  </View>
                  <Text style={styles.statValue}>189</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.dividerContainer}>
            <View style={styles.dividerLine} />
            <View style={styles.dividerCircle}>
              <ChevronDown size={16} color="#1C9EF4" />
            </View>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.quickActionsSection}>
            <Text style={styles.sectionTitle}>Quick Actions</Text>
            
            <Pressable style={styles.actionCard}>
              <View style={styles.actionIconBox}>
                <Car size={20} color="#1C9EF4" />
              </View>
              <View style={styles.actionInfo}>
                <Text style={styles.actionTitle}>View Inventory</Text>
                <Text style={styles.actionSubtitle}>Browse all vehicles</Text>
              </View>
              <ArrowRight size={20} color="#1C9EF4" />
            </Pressable>

            <Pressable style={styles.actionCard}>
              <View style={styles.actionIconBox}>
                <TrendingUp size={20} color="#1C9EF4" />
              </View>
              <View style={styles.actionInfo}>
                <Text style={styles.actionTitle}>Analytics</Text>
                <Text style={styles.actionSubtitle}>Browse all vehicles</Text>
              </View>
              <ArrowRight size={20} color="#1C9EF4" />
            </Pressable>
          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FA',
  },
  headerBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 320,
    backgroundColor: '#1C9EF4',
  },
  safeArea: {
    flex: 1,
  },
  topNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },
  iconButton: {
    padding: 4,
  },
  rightNav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dealerSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  dealerSelectorText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginRight: 4,
  },
  dealerChevron: {
    marginLeft: 2,
  },
  notificationButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  notificationDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF3B30',
    borderWidth: 1,
    borderColor: '#1C9EF4',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  welcomeSection: {
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  dashboardTitle: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  welcomeText: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  welcomeName: {
    fontWeight: '700',
    color: '#FFFFFF',
  },
  mainCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginHorizontal: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 12,
    elevation: 4,
  },
  mainDealerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    marginBottom: 20,
  },
  dealerLogoBox: {
    width: 48,
    height: 48,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  dealerLogo: {
    width: 32,
    height: 32,
  },
  dealerInfo: {
    flex: 1,
  },
  dealerName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  dealerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dealerMetaText: {
    fontSize: 14,
    color: '#777777',
  },
  statsContainer: {
    gap: 20,
  },
  statCard: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  statContent: {
    flex: 1,
  },
  statHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#555555',
    fontWeight: '500',
  },
  trendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  trendTextPositive: {
    fontSize: 12,
    color: '#34C759',
    fontWeight: '600',
  },
  trendContext: {
    color: '#999999',
    fontWeight: '400',
  },
  statValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1C9EF4',
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 40,
    marginVertical: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E0E0E0',
  },
  dividerCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#555555',
    marginBottom: 16,
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 8,
    elevation: 2,
  },
  actionIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F5F9FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#E6F0FF',
  },
  actionInfo: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#999999',
  },
});