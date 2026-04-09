# Styling Rules

## Core Rule: No Inline Styles
```tsx
// ✅ Good
<View style={styles.container}>
  <Text style={styles.title}>Hello</Text>
</View>

// ❌ Bad
<View style={{ flex: 1, padding: 16, backgroundColor: '#fff' }}>
  <Text style={{ fontSize: 24, fontWeight: 'bold' }}>Hello</Text>
</View>
```
Inline styles create new objects on every render and bypass StyleSheet optimizations.

## StyleSheet Pattern
```ts
import { StyleSheet } from 'react-native';
import { useTheme } from '@/hooks/useTheme';

// For static styles (no theme dependency)
const styles = StyleSheet.create({
  container: { flex: 1 },
  title: { fontSize: 24, fontWeight: '700' },
});

// For dynamic/themed styles — use a hook
const useStyles = () => {
  const { colors, spacing } = useTheme();
  return StyleSheet.create({
    container: { flex: 1, backgroundColor: colors.background },
    title: { fontSize: 24, color: colors.text.primary },
  });
};
```

## Theme System
Define all design tokens in `config/theme.ts`:

```ts
// config/theme.ts
export const lightTheme = {
  colors: {
    primary: '#007AFF',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: {
      primary: '#000000',
      secondary: '#6C6C70',
      disabled: '#AEAEB2',
    },
    border: '#C6C6C8',
    error: '#FF3B30',
    success: '#34C759',
  },
  spacing: {
    xs: 4, sm: 8, md: 16, lg: 24, xl: 32, xxl: 48,
  },
  borderRadius: {
    sm: 4, md: 8, lg: 16, full: 9999,
  },
  typography: {
    h1: { fontSize: 34, fontWeight: '700', lineHeight: 41 },
    h2: { fontSize: 28, fontWeight: '700', lineHeight: 34 },
    body: { fontSize: 17, fontWeight: '400', lineHeight: 22 },
    caption: { fontSize: 12, fontWeight: '400', lineHeight: 16 },
  },
} as const;

export const darkTheme: typeof lightTheme = { ...lightTheme, colors: { ... } };

export type Theme = typeof lightTheme;
```

## Dark Mode
- Use `useColorScheme` from `react-native` to detect system preference
- Switch between `lightTheme` and `darkTheme` at the root layout level
- Never hardcode hex colors anywhere except in `theme.ts`

```ts
// hooks/useTheme.ts
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from '@/config/theme';

export const useTheme = () => {
  const scheme = useColorScheme();
  return scheme === 'dark' ? darkTheme : lightTheme;
};
```

## Typography
- Define all text styles in the theme — never set `fontSize`, `fontWeight`, or `lineHeight` ad-hoc
- Load custom fonts with `expo-font` and await in splash screen before hiding
- Use `fontFamily` consistently — define it once in the theme

```tsx
// ✅ Good — uses theme token
<Text style={[styles.text, { ...theme.typography.body }]}>Content</Text>

// ❌ Bad — ad-hoc sizing
<Text style={{ fontSize: 15, lineHeight: 20 }}>Content</Text>
```

## Spacing
- Always use spacing tokens — never magic numbers
- Use `gap` for flexbox spacing (React Native 0.71+)

```tsx
// ✅ Good
<View style={{ padding: theme.spacing.md, gap: theme.spacing.sm }}>

// ❌ Bad
<View style={{ padding: 16, marginBottom: 8 }}>
```

## Safe Areas
- Wrap every screen in `SafeAreaView` from `react-native-safe-area-context`
- Use `useSafeAreaInsets()` for custom headers or bottom tabs

```tsx
import { SafeAreaView } from 'react-native-safe-area-context';

const Screen = ({ children }) => (
  <SafeAreaView style={{ flex: 1 }} edges={['top', 'bottom']}>
    {children}
  </SafeAreaView>
);
```

## Platform-Specific Styles
```ts
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  shadow: {
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
```

## NativeWind (if adopted)
- If using NativeWind, configure it in `babel.config.js` and `tailwind.config.js`
- Use `className` for NativeWind, `style` for dynamic/computed values — never mix both on the same element
- Define custom design tokens in `tailwind.config.js` to match the theme
