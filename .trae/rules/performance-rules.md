# Performance Rules

## Lists
- Always use `FlashList` from `@shopify/flash-list` instead of `FlatList`
- Provide `estimatedItemSize` — measure a real item and use that value
- Always define `keyExtractor` returning a unique string
- Define `renderItem` outside the JSX with `useCallback` — never inline

```tsx
// ✅ Good
const renderItem = useCallback(({ item }: { item: Post }) => (
  <PostCard post={item} />
), []);

<FlashList
  data={posts}
  renderItem={renderItem}
  estimatedItemSize={120}
  keyExtractor={(item) => item.id}
/>

// ❌ Bad
<FlatList
  data={posts}
  renderItem={({ item }) => <PostCard post={item} />}
/>
```

## Re-render Prevention
- Wrap components in `React.memo` when they receive the same props often and render is expensive
- Use `useCallback` for every function passed as a prop
- Use `useMemo` only for computationally expensive derived values — always benchmark first
- Never create objects or arrays inline in JSX

```tsx
// ❌ Bad — new object reference every render
<Header style={{ flex: 1 }} config={{ showBack: true }} />

// ✅ Good
const headerStyle = { flex: 1 };
const headerConfig = useMemo(() => ({ showBack: true }), []);
<Header style={headerStyle} config={headerConfig} />
```

## Images
- Use `expo-image` instead of React Native's `<Image>` — it has built-in caching, blurhash placeholders, and better performance
- Always provide explicit `width` and `height` — never let images define their own size
- Use WebP format for app assets where possible
- Use `blurhash` or `thumbhash` as placeholders while images load

```tsx
import { Image } from 'expo-image';

<Image
  source={{ uri: user.avatarUrl }}
  style={{ width: 48, height: 48, borderRadius: 24 }}
  placeholder={user.blurhash}
  contentFit="cover"
  transition={200}
/>
```

## Animations
- Use Reanimated 3 for all animations — it runs on the UI thread
- Never use `Animated` from React Native for interactive animations
- Avoid JS-thread callbacks in Reanimated — use `useAnimatedStyle`, `withTiming`, `withSpring`
- Use `useSharedValue` for animated values

```ts
// ✅ Good — UI thread only
const opacity = useSharedValue(0);
const animatedStyle = useAnimatedStyle(() => ({ opacity: opacity.value }));
opacity.value = withTiming(1, { duration: 300 });
```

## Navigation
- Use `React.lazy` + `Suspense` for heavy screens that don't need to be in the initial bundle
- Pass only primitive values or IDs via route params — never full objects
- Prefetch data for the next likely screen using TanStack Query's `prefetchQuery`

## Bundle Size
- Audit bundle with `npx expo export --dump-sourcemap` + source-map-explorer
- Tree-shake icon libraries — import individual icons, not entire icon sets

```ts
// ✅ Good
import { Home } from 'lucide-react-native';

// ❌ Bad
import * as Icons from 'lucide-react-native';
```

## Startup Performance
- Defer non-critical initialization until after the first paint
- Load custom fonts before hiding the splash screen using `expo-font`
- Use `expo-splash-screen` to delay hide until app is ready

```ts
await Promise.all([
  Font.loadAsync({ 'Inter-Regular': require('@/assets/fonts/Inter-Regular.ttf') }),
  queryClient.prefetchQuery({ queryKey: QUERY_KEYS.user(userId), queryFn: getUser }),
]);
SplashScreen.hideAsync();
```

## Memory
- Cancel subscriptions and async operations in `useEffect` cleanup
- Remove event listeners in cleanup — always return a cleanup function
- Avoid storing large data blobs in Zustand — store only IDs and fetch on demand
