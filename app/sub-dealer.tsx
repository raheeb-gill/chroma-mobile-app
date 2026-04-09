import React, { useMemo, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlashList } from '@shopify/flash-list';
import { Image } from 'expo-image';

import { Dealer, mockSubDealers } from '@/constants/mock-data';

export default function SubDealerScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDealerId, setSelectedDealerId] = useState<string | null>(null);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const filteredDealers = useMemo(() => {
    if (!searchQuery) return mockSubDealers;
    return mockSubDealers.filter((d) =>
      d.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const isNextDisabled = selectedDealerId === null;

  const handleNext = () => {
    if (isNextDisabled) return;
    router.replace('/(tabs)');
  };

  const renderItem = ({ item }: { item: Dealer }) => {
    const isSelected = selectedDealerId === item.id;
    return (
      <Pressable
        style={[styles.dealerCard, isSelected && styles.dealerCardSelected]}
        onPress={() => setSelectedDealerId(item.id)}
      >
        <View style={styles.dealerLogoContainer}>
          {item.logo ? (
            <Image source={item.logo} style={{ width: '100%', height: '100%', borderRadius: 8 }} contentFit="cover" />
          ) : (
            <Text style={styles.dealerLogoFallback}>NALLEY</Text>
          )}
        </View>
        <View style={styles.dealerInfo}>
          <Text style={styles.dealerName}>{item.name}</Text>
          <View style={styles.dealerMetaRow}>
            <MaterialIcons name="directions-car" size={16} color="#777777" />
            <Text style={styles.dealerMeta}>{item.vehiclesCount} vehicles</Text>
          </View>
        </View>
        <View style={[styles.checkbox, isSelected && styles.checkboxSelected]}>
          {isSelected && <MaterialIcons name="check" size={16} color="#FFFFFF" />}
        </View>
      </Pressable>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <Pressable style={styles.backButton} onPress={router.back}>
            <MaterialIcons name="chevron-left" size={26} color="#7AADEB" />
          </Pressable>
          <Text style={styles.title}>Choose sub dealer</Text>
          <Text style={styles.subtitle}>Select the sub dealership you want to manage.</Text>

          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search dealer"
              placeholderTextColor="#999999"
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoCorrect={false}
            />
            <MaterialIcons name="search" size={22} color="#1E1E1E" style={styles.searchIcon} />
          </View>
        </View>

        <View style={styles.listContainer}>
          <FlashList
            data={filteredDealers}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.listContent as any}
            showsVerticalScrollIndicator={false}
          />
        </View>

        <View style={[styles.footer, { paddingBottom: insets.bottom + 22 }]}>
          <Pressable
            onPress={handleNext}
            disabled={isNextDisabled}
            style={[styles.button, isNextDisabled ? styles.buttonDisabled : styles.buttonEnabled]}
          >
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  keyboardAvoiding: {
    flex: 1,
  },
  header: {
    paddingTop: 22,
    paddingHorizontal: 20,
    paddingBottom: 16,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 24,
    color: '#1E1E1E',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 20,
    color: '#555555',
    maxWidth: 292,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    height: 48,
    marginTop: 24,
    paddingHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#1E1E1E',
    height: '100%',
  },
  searchIcon: {
    marginLeft: 8,
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  dealerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderWidth: 1,
    borderColor: '#EEEEEE',
    borderRadius: 12,
    marginBottom: 12,
    backgroundColor: '#FFFFFF',
  },
  dealerCardSelected: {
    borderColor: '#2492D4',
  },
  dealerLogoContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  dealerLogoFallback: {
    fontSize: 12,
    fontWeight: '800',
    color: '#1E1E1E',
  },
  dealerInfo: {
    flex: 1,
    gap: 4,
  },
  dealerName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  dealerMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dealerMeta: {
    fontSize: 14,
    fontWeight: '400',
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
  footer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    backgroundColor: '#FFFFFF',
  },
  button: {
    height: 48,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonEnabled: {
    backgroundColor: '#2492D4',
  },
  buttonDisabled: {
    backgroundColor: '#979797',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 20,
    color: '#FFFFFF',
  },
});