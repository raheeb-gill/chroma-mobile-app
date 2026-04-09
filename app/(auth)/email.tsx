import React, { useMemo, useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function EmailScreen() {
  const [email, setEmail] = useState('');
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const isNextDisabled = useMemo(() => email.trim().length === 0, [email]);

  React.useEffect(() => {
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
    if (isNextDisabled) {
      return;
    }

    router.push({
      pathname: '/(auth)/password',
      params: { email: email.trim() },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <Text style={styles.title}>Let&apos;s get you signed in</Text>
          <Text style={styles.subtitle}>Enter your registered email address to continue.</Text>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Email Address</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={setEmail}
              placeholder="dealer@bait.com"
              placeholderTextColor="#B2B2B2"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="next"
              onSubmitEditing={handleNext}
            />
          </View>
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
    paddingTop: 48,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 24,
    letterSpacing: 0,
    color: '#1E1E1E',
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 16,
    letterSpacing: 0,
    color: '#555555',
    maxWidth: 292,
  },
  inputSection: {
    marginTop: 34,
    gap: 12,
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 20,
    letterSpacing: 0,
    color: '#1E1E1E',
  },
  input: {
    height: 48,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 18,
    color: '#1E1E1E',
  },
  button: {
    height: 48,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 22,
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
    letterSpacing: 0,
  },
});
