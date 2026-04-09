import React, { useEffect, useMemo, useRef, useState } from 'react';
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
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

const OTP_LENGTH = 6;
const INITIAL_SECONDS = 59;

export default function VerifyScreen() {
  const [code, setCode] = useState('');
  const [secondsRemaining, setSecondsRemaining] = useState(INITIAL_SECONDS);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((previous) => {
        if (previous <= 0) {
          return 0;
        }
        return previous - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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

  const displayCode = useMemo(() => {
    return Array.from({ length: OTP_LENGTH }, (_, index) => code[index] ?? '');
  }, [code]);

  const timerText = useMemo(() => {
    const seconds = String(secondsRemaining).padStart(2, '0');
    return `00:${seconds} s`;
  }, [secondsRemaining]);

  const handleCodeChange = (value: string) => {
    const numericOnly = value.replace(/[^0-9]/g, '').slice(0, OTP_LENGTH);
    setCode(numericOnly);
  };

  const handleVerify = () => {
    router.replace('/main-dealer');
  };

  const handleFocusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoiding}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.content}>
          <Pressable style={styles.backButton} onPress={router.back}>
            <MaterialIcons name="chevron-left" size={26} color="#7AADEB" />
          </Pressable>

          <Text style={styles.title}>Verify it&apos;s you</Text>
          <Text style={styles.subtitle}>Enter 6-digit code we&apos;ve sent to your registerd email.</Text>

          <Pressable style={styles.codeContainer} onPress={handleFocusInput}>
            {displayCode.map((digit, index) => (
              <View key={`otp-${index}`} style={styles.codeBox}>
                <Text style={styles.codeText}>{digit}</Text>
              </View>
            ))}
          </Pressable>

          <TextInput
            ref={inputRef}
            value={code}
            onChangeText={handleCodeChange}
            keyboardType="number-pad"
            maxLength={OTP_LENGTH}
            style={styles.hiddenInput}
            autoFocus
          />

          <Text style={styles.timerText}>{timerText}</Text>
        </View>

        <Pressable
          onPress={handleVerify}
          style={[styles.button, { marginBottom: isKeyboardVisible ? 12 : insets.bottom + 22 }]}
        >
          <Text style={styles.buttonText}>Verify</Text>
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
    paddingTop: 22,
    paddingHorizontal: 20,
  },
  backButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 20,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 24,
    color: '#1E1E1E',
    letterSpacing: 0,
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 16,
    color: '#555555',
    letterSpacing: 0,
    maxWidth: 292,
  },
  codeContainer: {
    marginTop: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  codeBox: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeText: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 20,
    color: '#1E1E1E',
  },
  hiddenInput: {
    position: 'absolute',
    opacity: 0,
    width: 1,
    height: 1,
  },
  timerText: {
    marginTop: 24,
    alignSelf: 'center',
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 16,
    color: '#1E1E1E',
    letterSpacing: 0,
  },
  button: {
    height: 48,
    borderRadius: 10,
    marginHorizontal: 20,
    marginBottom: 22,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2492D4',
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 20,
    color: '#FFFFFF',
    letterSpacing: 0,
  },
});
