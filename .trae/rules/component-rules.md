# Component Rules

## Component Types
Define and separate components into two categories:

**UI Components** (`components/ui/`) — purely presentational, no business logic, no API calls
**Feature Components** (`components/[feature]/`) — connected to state/data, compose UI components

## File Structure per Component
```
components/
  ui/
    Button/
      Button.tsx
      Button.styles.ts   # if styles are long
      index.ts           # re-export
  user/
    UserCard.tsx
    UserList.tsx
```

## Component Template
```tsx
import React, { useCallback } from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export const Button = ({ label, onPress, variant = 'primary', disabled = false }: ButtonProps) => {
  const handlePress = useCallback(() => {
    if (!disabled) onPress();
  }, [disabled, onPress]);

  return (
    <Pressable
      style={[styles.base, styles[variant], disabled && styles.disabled]}
      onPress={handlePress}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: { borderRadius: 8, paddingVertical: 12, paddingHorizontal: 20 },
  primary: { backgroundColor: '#007AFF' },
  secondary: { backgroundColor: 'transparent', borderWidth: 1, borderColor: '#007AFF' },
  disabled: { opacity: 0.5 },
  label: { color: '#fff', fontWeight: '600', fontSize: 16, textAlign: 'center' },
});
```

## Props Rules
- Always define a `Props` interface — never use inline prop types or `any`
- Name the interface `[ComponentName]Props`
- Provide default values for all optional props
- Avoid prop drilling more than 2 levels — use context or Zustand instead

## Composition Over Configuration
- Prefer small, composable components over one large component with many props
- Use `children` for flexible layout slots
- Use `render props` or custom hooks for complex behavior sharing

## Performance
- Wrap all components passed as props (e.g. `renderItem`) in `React.memo`
- Never create functions or objects inside JSX — define them outside the return
- Use `useCallback` for all event handlers passed as props
- Use `useMemo` only when the computation is measurably expensive

## Accessibility
- Every interactive element needs `accessibilityRole`, `accessibilityLabel`
- Use `accessibilityHint` for non-obvious interactions
- Test with VoiceOver (iOS) and TalkBack (Android)

## Loading & Error States
Every data-connected component must handle three states:
```tsx
if (isLoading) return <Skeleton />;
if (isError) return <ErrorMessage message={error.message} />;
return <ActualContent data={data} />;
```

## No Inline Styles
```tsx
// ✅ Good
<View style={styles.container}>

// ❌ Bad
<View style={{ flex: 1, backgroundColor: '#fff', padding: 16 }}>
```
