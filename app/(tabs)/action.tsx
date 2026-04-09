import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ActionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Action Modal/Screen</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: '#1E1E1E',
  },
});