import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { Platform, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    router.replace('/(tabs)');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('@/assets/images/b4212d25001397ceb077902f613515655c49cc74.jpg')}
        style={styles.backgroundImage}
        contentFit="cover"
      />
      <View style={styles.backgroundOverlay} />
      <View style={styles.content}>
        <View style={styles.textWrapper}>
          <Text style={styles.title}>Manage your dealership smarter.</Text>
          <Text style={styles.subtitle}>Manage Your Dealership Smarter.</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={handleGetStarted}>
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ececec',
    paddingHorizontal: 16,
    overflow: 'hidden',
  },
  backgroundImage: {
    position: 'absolute',
    width: '185%',
    height: '76%',
    left: '-43%',
    top: '16%',
  },
  backgroundOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  content: {
    flex: 1,
    paddingTop: 48,
  },
  textWrapper: {
    width: 300,
    gap: 10,
    alignItems: 'flex-start',
  },
  title: {
    fontSize: 30,
    fontWeight: '700',
    lineHeight: 30,
    color: '#111111',
    textAlign: 'left',
    paddingTop: 30,
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  subtitle: {
    fontSize: 14,
    lineHeight: 18,
    color: '#444444',
    fontWeight: '400',
    textAlign: 'left',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif',
  },
  buttonContainer: {
    paddingBottom: Platform.OS === 'ios' ? 12 : 18,
  },
  button: {
    borderRadius: 12,
    backgroundColor: '#1C9EF4',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '700',
    fontFamily: Platform.OS === 'ios' ? 'System' : 'sans-serif-medium',
  },
});
