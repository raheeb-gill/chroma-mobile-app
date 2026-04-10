import React, { useState, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  Keyboard,
} from 'react-native';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { Check } from 'lucide-react-native';

export default function VinEntryScreen() {
  const [vin, setVin] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const isComplete = vin.length === 17;
  const isNextDisabled = !isComplete;

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const showSubscription = Keyboard.addListener(showEvent, () => {
      setKeyboardVisible(true);
    });
    const hideSubscription = Keyboard.addListener(hideEvent, () => {
      setKeyboardVisible(false);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  const handleNext = () => {
    if (isNextDisabled) return;
    // Currently no specific logic for next, perhaps goes back or to another screen
    router.back();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <Pressable style={styles.backButton} onPress={router.back}>
            <MaterialIcons name="chevron-left" size={26} color="#2492D4" />
          </Pressable>

          <Text style={styles.title}>Enter VIN</Text>
          <Text style={styles.subtitle}>Enter your VIN to pull your vehicle&apos;s info automatically.</Text>

          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.input}
              placeholder="VIN (17-digits)"
              placeholderTextColor="#999999"
              value={vin}
              onChangeText={(text) => setVin(text.toUpperCase().slice(0, 17))}
              autoCapitalize="characters"
              autoCorrect={false}
            />
            {isComplete && (
              <View style={styles.checkIcon}>
                <Check size={20} color="#2492D4" />
              </View>
            )}
          </View>
          
          {isComplete && (
            <Text style={styles.vehicleFoundText}>Vehicle found: 2019 Honda Accord</Text>
          )}
        </View>

        <Pressable
          onPress={handleNext}
          disabled={isNextDisabled}
          style={[
            styles.button,
            { marginBottom: isKeyboardVisible ? 12 : insets.bottom + 22 },
            isNextDisabled ? styles.buttonDisabled : styles.buttonEnabled,
          ]}
        >
          <Text style={styles.buttonText}>Next</Text>
        </Pressable>
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
    justifyContent: 'space-between',
  },
  content: {
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F5F9FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  title: {
    fontFamily: 'System', // Using system font as default SF Pro on iOS
    fontSize: 24,
    fontWeight: '700',
    color: '#1E1E1E',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'System',
    fontSize: 16,
    fontWeight: '400',
    color: '#555555',
    lineHeight: 22,
    marginBottom: 32,
    maxWidth: '85%',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    height: 56,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    fontWeight: '400',
    color: '#1E1E1E',
  },
  checkIcon: {
    paddingRight: 16,
  },
  vehicleFoundText: {
    marginTop: 16,
    fontSize: 14,
    fontWeight: '500',
    color: '#2492D4',
    textAlign: 'center',
  },
  button: {
    height: 48,
    borderRadius: 10,
    marginHorizontal: 20,
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
    color: '#FFFFFF',
  },
});