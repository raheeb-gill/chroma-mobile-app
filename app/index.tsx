import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.replace('/welcome');
    }, 1700);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.brand}>CHROMACARS</Text>
        <Text style={styles.tagline}>Manage your Dealership Smarter.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    gap: 6,
  },
  brand: {
    fontSize: 24,
    fontWeight: '700',
    color: '#10A4FF',
    letterSpacing: 1.1,
  },
  tagline: {
    fontSize: 13,
    color: '#747D8C',
    fontWeight: '500',
  },
});
