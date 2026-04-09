# File Organization Rules

## Root Structure
```
├── app/                    # Expo Router screens (file-based routing)
│   ├── (auth)/             # Auth group — unauthenticated routes
│   │   ├── login.tsx
│   │   └── register.tsx
│   ├── (tabs)/             # Tab group — authenticated main app
│   │   ├── index.tsx       # Home tab
│   │   ├── profile.tsx
│   │   └── _layout.tsx     # Tab bar config
│   ├── _layout.tsx         # Root layout — providers, splash screen
│   └── +not-found.tsx
├── components/
│   ├── ui/                 # Generic reusable UI components
│   └── [feature]/          # Feature-specific components
├── hooks/                  # Custom hooks
├── services/               # API service layer
├── store/                  # Zustand stores
├── types/                  # Shared TypeScript interfaces/types
├── utils/                  # Pure utility functions
├── constants/              # App-wide constants (colors, sizes, keys)
├── assets/                 # Images, fonts, icons
├── config/                 # App configuration (env, themes)
└── scripts/                # Build/dev scripts
```

## Naming Conventions for Files
| Type | Convention | Example |
|---|---|---|
| Screen | `kebab-case.tsx` | `user-profile.tsx` |
| Component | `PascalCase.tsx` | `UserCard.tsx` |
| Hook | `camelCase.ts` | `useAuth.ts` |
| Service | `camelCase.service.ts` | `user.service.ts` |
| Store | `camelCase.store.ts` | `auth.store.ts` |
| Types | `camelCase.types.ts` | `user.types.ts` |
| Utils | `camelCase.ts` | `formatDate.ts` |
| Constants | `SCREAMING_SNAKE_CASE.ts` | `QUERY_KEYS.ts` |

## Index Files (Barrel Exports)
- Always create an `index.ts` in each folder to re-export public members
- Only export what is meant to be used outside the folder

```ts
// components/ui/index.ts
export { Button } from './Button/Button';
export { Input } from './Input/Input';
export { Card } from './Card/Card';
```

## Co-location Rule
- Keep files close to where they are used
- If a component is only used in one screen, it lives in `components/[screen-name]/`
- If a component is used in 2+ places, promote it to `components/ui/`

## Assets
```
assets/
  fonts/      # Custom .ttf / .otf files
  images/     # App images (.png, .jpg, .webp)
  icons/      # SVG icons (use react-native-svg)
  lottie/     # Lottie animation JSON files
```

## One Responsibility per File
- A file exports ONE primary thing (one component, one hook, one store slice)
- Exception: small closely related types/interfaces can be in the same types file

## No Cross-Feature Imports
- Feature A must not import directly from Feature B's internals
- Share through `components/ui/`, `hooks/`, `utils/`, or `store/`
