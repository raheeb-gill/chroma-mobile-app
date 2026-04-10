import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, Pressable, Switch, ScrollView, Modal, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { ChevronLeft, Edit2, Bell, Mail, Calendar, Lock, Building2, CarFront, ChevronRight, X, EyeOff, Search, Car } from 'lucide-react-native';
import { FlashList } from '@shopify/flash-list';

import { Dealer, mockSubDealers } from '@/constants/mock-data';

export default function ProfileScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [activityAlerts, setActivityAlerts] = useState(false);

  // Modal states
  const [isPrivacyModalVisible, setPrivacyModalVisible] = useState(false);
  const [isEditProfileModalVisible, setEditProfileModalVisible] = useState(false);
  const [isDealerModalVisible, setDealerModalVisible] = useState(false);
  const [dealerModalType, setDealerModalType] = useState<'Main' | 'Sub' | null>(null);

  // Dealer search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDealerId, setSelectedDealerId] = useState<string | null>(null);

  // Form states
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [profileName, setProfileName] = useState('Nally Honda');
  const [profileEmail, setProfileEmail] = useState('dealer@ebait.com');
  const [profilePhone, setProfilePhone] = useState('+44 223 232 1111');

  const filteredDealers = React.useMemo(() => {
    if (!searchQuery) return mockSubDealers;
    return mockSubDealers.filter((d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const renderDealerItem = ({ item }: { item: Dealer }) => {
    const isSelected = selectedDealerId === item.id;
    return (
      <Pressable
        style={[styles.modalDealerCard, isSelected && styles.modalDealerCardSelected]}
        onPress={() => setSelectedDealerId(item.id)}
      >
        <View style={styles.modalDealerLogoContainer}>
          <Text style={styles.modalDealerLogoFallback}>NALLEY</Text>
        </View>
        <View style={styles.modalDealerInfo}>
          <Text style={styles.modalDealerName}>{item.name}</Text>
          <View style={styles.modalDealerMetaRow}>
            <Car size={14} color="#777777" />
            <Text style={styles.modalDealerMetaText}>{item.vehiclesCount} vehicles</Text>
          </View>
        </View>
        <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
          {isSelected && <Car size={14} color="#FFFFFF" />}
        </View>
      </Pressable>
    );
  };

  const openDealerModal = (type: 'Main' | 'Sub') => {
    setDealerModalType(type);
    setSelectedDealerId(null);
    setSearchQuery('');
    setDealerModalVisible(true);
  };

  const headerStyle = useMemo(() => {
    return {
      height: 60 + insets.top,
      paddingTop: insets.top,
    };
  }, [insets.top]);

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <StatusBar style="light" backgroundColor="#2492D4" />
      <View style={[styles.header, headerStyle]}>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </Pressable>
        <Text style={styles.headerTitle}>Profile Settings</Text>
        <View style={styles.headerRight} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatarPlaceholder}>
              <Text style={styles.avatarText}>NALLEY</Text>
              <Text style={styles.avatarSubText}>Honda Brunswick</Text>
            </View>
            <View style={styles.cameraIconContainer}>
              <View style={styles.cameraIconBadge} />
            </View>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{profileName}</Text>
            <Text style={styles.profileEmail}>{profileEmail}</Text>
          </View>
          <Pressable style={styles.editButton} onPress={() => setEditProfileModalVisible(true)}>
            <Edit2 size={16} color="#A0A0A0" />
          </Pressable>
        </View>

        {/* Notifications Section */}
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.sectionCard}>
          <View style={styles.settingRow}>
            <View style={styles.iconContainer}>
              <Bell size={20} color="#8D8D8D" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingDescription}>Receive push notifications</Text>
            </View>
            <Switch
              value={pushNotifications}
              onValueChange={setPushNotifications}
              trackColor={{ false: '#E9E9EB', true: '#2492D4' }}
              thumbColor="#FFFFFF"
            />
          </View>
          
          <View style={styles.divider} />
          
          <View style={styles.settingRow}>
            <View style={styles.iconContainer}>
              <Mail size={20} color="#8D8D8D" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Email Notifications</Text>
              <Text style={styles.settingDescription}>Receive email notifications</Text>
            </View>
            <Switch
              value={emailNotifications}
              onValueChange={setEmailNotifications}
              trackColor={{ false: '#E9E9EB', true: '#2492D4' }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.iconContainer}>
              <Calendar size={20} color="#8D8D8D" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Activity Alerts</Text>
              <Text style={styles.settingDescription}>Get notified of important events</Text>
            </View>
            <Switch
              value={activityAlerts}
              onValueChange={setActivityAlerts}
              trackColor={{ false: '#E9E9EB', true: '#2492D4' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Settings Section */}
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.sectionCard}>
          <Pressable style={styles.settingRow} onPress={() => setPrivacyModalVisible(true)}>
            <View style={styles.iconContainer}>
              <Lock size={20} color="#8D8D8D" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Privacy & Security</Text>
              <Text style={styles.settingDescription}>Change password and security</Text>
            </View>
            <ChevronRight size={20} color="#2492D4" />
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.settingRow} onPress={() => openDealerModal('Main')}>
            <View style={styles.iconContainer}>
              <Building2 size={20} color="#8D8D8D" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Change Main dealer</Text>
              <Text style={styles.settingDescription}>Change main dealership</Text>
            </View>
            <ChevronRight size={20} color="#2492D4" />
          </Pressable>

          <View style={styles.divider} />

          <Pressable style={styles.settingRow} onPress={() => openDealerModal('Sub')}>
            <View style={styles.iconContainer}>
              <CarFront size={20} color="#8D8D8D" />
            </View>
            <View style={styles.settingTextContainer}>
              <Text style={styles.settingTitle}>Change Sub Dealer</Text>
              <Text style={styles.settingDescription}>Change sub dealership</Text>
            </View>
            <ChevronRight size={20} color="#2492D4" />
          </Pressable>
        </View>

        {/* Logout Button */}
        <Pressable style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </Pressable>
        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* Privacy & Security Modal */}
      <Modal
        visible={isPrivacyModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setPrivacyModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Privacy & Security</Text>
              <Pressable 
                style={styles.closeButton} 
                onPress={() => setPrivacyModalVisible(false)}
              >
                <X size={18} color="#999999" />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Current Password</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#B0B0B0"
                    secureTextEntry
                    value={currentPassword}
                    onChangeText={setCurrentPassword}
                  />
                  <EyeOff size={18} color="#999999" style={styles.inputIcon} />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>New Password</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="New password"
                    placeholderTextColor="#B0B0B0"
                    secureTextEntry
                    value={newPassword}
                    onChangeText={setNewPassword}
                  />
                  <EyeOff size={18} color="#999999" style={styles.inputIcon} />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Confirm New Password</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Confirm new password"
                    placeholderTextColor="#B0B0B0"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                  />
                  <EyeOff size={18} color="#999999" style={styles.inputIcon} />
                </View>
              </View>

              <Pressable 
                style={styles.saveChangesButton}
                onPress={() => setPrivacyModalVisible(false)}
              >
                <Text style={styles.saveChangesButtonText}>Save Changes</Text>
              </Pressable>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Edit Profile Modal */}
      <Modal
        visible={isEditProfileModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setEditProfileModalVisible(false)}
      >
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Edit Profile</Text>
              <Pressable 
                style={styles.closeButton} 
                onPress={() => setEditProfileModalVisible(false)}
              >
                <X size={18} color="#999999" />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Name</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={profileName}
                    onChangeText={setProfileName}
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Email</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={profileEmail}
                    onChangeText={setProfileEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                  />
                </View>
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.inputLabel}>Phone</Text>
                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    value={profilePhone}
                    onChangeText={setProfilePhone}
                    keyboardType="phone-pad"
                  />
                </View>
              </View>

              <Pressable 
                style={styles.saveChangesButton}
                onPress={() => setEditProfileModalVisible(false)}
              >
                <Text style={styles.saveChangesButtonText}>Save Changes</Text>
              </Pressable>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </Modal>

      {/* Dealer Selection Modal */}
      <Modal
        visible={isDealerModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setDealerModalVisible(false)}
      >
        <View style={styles.dealerModalOverlay}>
          <View style={styles.dealerModalContent}>
            <View style={styles.dealerModalHeader}>
              <Text style={styles.dealerModalTitle}>Switch {dealerModalType} Dealer</Text>
              <Pressable
                style={styles.closeButton}
                onPress={() => setDealerModalVisible(false)}
              >
                <X size={16} color="#999999" />
              </Pressable>
            </View>

            <View style={styles.modalSearchContainer}>
              <TextInput
                style={styles.modalSearchInput}
                placeholder="Search dealer"
                placeholderTextColor="#999999"
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCorrect={false}
              />
              <Search size={20} color="#1E1E1E" style={styles.modalSearchIcon} />
            </View>

            <View style={styles.modalListContainer}>
              <FlashList
                data={filteredDealers}
                renderItem={renderDealerItem}
                keyExtractor={(item) => item.id}
                contentContainerStyle={styles.modalListContent as any}
                showsVerticalScrollIndicator={false}
              />
            </View>

            <View style={styles.modalFooter}>
              <Pressable
                onPress={() => setDealerModalVisible(false)}
                disabled={!selectedDealerId}
                style={[
                  styles.modalSwitchButton,
                  !selectedDealerId ? styles.modalSwitchButtonDisabled : styles.modalSwitchButtonEnabled,
                ]}
              >
                <Text style={styles.modalSwitchButtonText}>Switch {dealerModalType} Dealer</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F8FB',
  },
  header: {
    backgroundColor: '#2492D4',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  headerRight: {
    width: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 24,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 16,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EAEAEA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 10,
    fontWeight: '900',
    color: '#000000',
    letterSpacing: 0.5,
  },
  avatarSubText: {
    fontSize: 5,
    color: '#2492D4',
    marginTop: 2,
    fontWeight: '700',
  },
  cameraIconContainer: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 2,
  },
  cameraIconBadge: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#2492D4',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#666666',
  },
  editButton: {
    padding: 8,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 12,
    marginLeft: 4,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingTextContainer: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
    color: '#999999',
  },
  divider: {
    height: 1,
    backgroundColor: '#F5F5F5',
    marginLeft: 56,
  },
  logoutButton: {
    backgroundColor: '#FF5E5E',
    borderRadius: 12,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  bottomSpacer: {
    height: 40,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 24,
    paddingBottom: 40,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '500',
    color: '#333333',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#333333',
    height: '100%',
  },
  inputIcon: {
    marginLeft: 12,
  },
  saveChangesButton: {
    backgroundColor: '#2492D4',
    borderRadius: 12,
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 12,
  },
  saveChangesButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  // Dealer Modal Styles
  dealerModalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  dealerModalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    height: '80%',
    paddingTop: 24,
  },
  dealerModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  dealerModalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#555555',
  },
  modalSearchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    height: 48,
    marginHorizontal: 20,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  modalSearchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E1E1E',
    height: '100%',
  },
  modalSearchIcon: {
    marginLeft: 8,
  },
  modalListContainer: {
    flex: 1,
  },
  modalListContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  modalDealerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  modalDealerCardSelected: {
    borderColor: '#2492D4',
  },
  modalDealerLogoContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  modalDealerLogoFallback: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E1E1E',
  },
  modalDealerInfo: {
    flex: 1,
    gap: 4,
  },
  modalDealerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  modalDealerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  modalDealerMetaText: {
    fontSize: 14,
    color: '#777777',
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  checkboxSelected: {
    backgroundColor: '#2492D4',
    borderColor: '#2492D4',
  },
  modalFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    backgroundColor: '#FFFFFF',
  },
  modalSwitchButton: {
    height: 54,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSwitchButtonEnabled: {
    backgroundColor: '#2492D4',
  },
  modalSwitchButtonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  modalSwitchButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
