# Code Quality Rules

## ESLint & Prettier
- Use `eslint-config-expo` as the base ESLint config
- Prettier must be configured with `.prettierrc` — enforce consistent formatting on save
- No ESLint warnings allowed in CI — treat warnings as errors in pipeline (`--max-warnings 0`)
- Run lint as a pre-commit hook via Husky + lint-staged

```json
// .prettierrc
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "all",
  "printWidth": 100
}
```

## Husky + lint-staged
```json
// package.json
"lint-staged": {
  "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
}
```

## General Rules
- No `any` type — use `unknown` and narrow, or define proper types
- No `console.log` in committed code — use a logger utility (`utils/logger.ts`) that no-ops in production
- No commented-out code blocks — delete dead code, use git history
- Every function must have an explicit return type if it is exported
- Max function length: 50 lines. Extract logic into smaller helpers if exceeded
- Max file length: 300 lines. Split into smaller modules if exceeded

## Component Rules
- One component per file
- Component file name must match the exported component name
- No business logic inside JSX — extract to hooks or handlers above the return statement
- Destructure all props at the top of the component

```tsx
// ✅ Good
const UserCard = ({ name, avatarUrl, onPress }: UserCardProps) => {
  const handlePress = useCallback(() => onPress(name), [name, onPress]);
  return <Pressable onPress={handlePress}>...</Pressable>;
};

// ❌ Bad
const UserCard = (props: any) => {
  return <Pressable onPress={() => props.onPress(props.name)}>...</Pressable>;
};
```

## Imports Order
Always order imports as:
1. React
2. React Native / Expo SDK
3. Third-party libraries
4. Internal aliases (`@/components`, `@/hooks`)
5. Relative imports (`./`, `../`)
6. Type imports last

## Error Boundaries
- Wrap every screen-level component in an `ErrorBoundary`
- Provide a user-friendly fallback UI — never let the app show a blank screen

## Commits
- Follow Conventional Commits: `feat:`, `fix:`, `chore:`, `refactor:`, `docs:`
- Keep commits atomic — one logical change per commit
