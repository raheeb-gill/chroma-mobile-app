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
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PasswordScreen() {
  const [password, setPassword] = useState('');
  const [isSecureTextVisible, setIsSecureTextVisible] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { email } = useLocalSearchParams<{ email?: string }>();
  const isNextDisabled = useMemo(() => password.trim().length === 0, [password]);

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
      pathname: '/(auth)/verify',
      params: { email: email ?? '' },
    });
  };

  const handleToggleSecureText = () => {
    setIsSecureTextVisible((prev) => !prev);
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

          <Text style={styles.title}>Enter your password</Text>
          <Text style={styles.subtitle}>Use your dealership password to access the dashbords</Text>

          <View style={styles.inputSection}>
            <Text style={styles.label}>Password</Text>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
                placeholderTextColor="#B2B2B2"
                secureTextEntry={!isSecureTextVisible}
                autoCapitalize="none"
                autoCorrect={false}
                returnKeyType="next"
                onSubmitEditing={handleNext}
              />
              <Pressable onPress={handleToggleSecureText} style={styles.eyeButton}>
                <MaterialIcons
                  name={isSecureTextVisible ? 'visibility' : 'visibility-off'}
                  size={20}
                  color="#B1B1B1"
                />
              </Pressable>
            </View>
          </View>

          <Pressable style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </Pressable>
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
  inputSection: {
    marginTop: 34,
    gap: 12,
  },
  label: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 20,
    color: '#1E1E1E',
    letterSpacing: 0,
  },
  inputWrapper: {
    height: 48,
    borderRadius: 10,
    backgroundColor: '#F5F5F5',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 14,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 18,
    color: '#1E1E1E',
  },
  eyeButton: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 12,
  },
  forgotPasswordText: {
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 16,
    color: '#555555',
    letterSpacing: 0,
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
