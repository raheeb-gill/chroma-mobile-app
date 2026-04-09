# Folder Structure Rules

## Guiding Principles
1. **Feature-first inside `components/`** — group by feature, not by type (no global `screens/` folder)
2. **`app/` is routing only** — no business logic, no direct API calls inside route files
3. **Flat over nested** — avoid folders more than 3 levels deep
4. **Co-locate tests** — `__tests__/` sits inside the folder it tests

## Full Annotated Structure
```
my-expo-app/
│
├── app/                          # File-based routing (Expo Router)
│   ├── _layout.tsx               # Root layout: providers, fonts, splash
│   ├── +not-found.tsx            # 404 screen
│   ├── (auth)/                   # Route group — no tab bar
│   │   ├── _layout.tsx
│   │   ├── login.tsx
│   │   ├── register.tsx
│   │   └── forgot-password.tsx
│   └── (tabs)/                   # Route group — main app with tab bar
│       ├── _layout.tsx
│       ├── index.tsx
│       ├── explore.tsx
│       └── profile.tsx
│
├── components/
│   ├── ui/                       # Generic, app-agnostic UI atoms
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Card/
│   │   ├── Modal/
│   │   ├── Skeleton/
│   │   └── index.ts
│   ├── layout/                   # Layout wrappers
│   │   ├── Screen.tsx            # SafeAreaView + KeyboardAvoidingView
│   │   ├── Header.tsx
│   │   └── index.ts
│   └── [feature]/                # Feature-specific composed components
│       ├── auth/
│       ├── profile/
│       └── home/
│
├── hooks/
│   ├── useAuth.ts
│   ├── useTheme.ts
│   └── [feature]/
│       └── useUserProfile.ts
│
├── services/                     # All API communication
│   ├── api.ts                    # Axios instance + interceptors
│   ├── auth.service.ts
│   └── user.service.ts
│
├── store/                        # Zustand global state
│   ├── auth.store.ts
│   ├── ui.store.ts               # Loading states, modals, toasts
│   └── index.ts
│
├── types/                        # Shared TypeScript definitions
│   ├── api.types.ts
│   ├── navigation.types.ts
│   └── user.types.ts
│
├── constants/
│   ├── queryKeys.ts
│   ├── routes.ts                 # Route name constants
│   └── config.ts                 # Non-secret app config
│
├── utils/
│   ├── formatDate.ts
│   ├── formatCurrency.ts
│   ├── logger.ts                 # Wraps console, no-ops in production
│   └── validation.ts
│
├── config/
│   ├── theme.ts                  # Colors, spacing, typography tokens
│   └── env.ts                   # Typed env variable access
│
├── assets/
│   ├── fonts/
│   ├── images/
│   └── icons/
│
├── scripts/                      # Dev tooling scripts
├── .env                          # Never commit
├── .env.example                  # Commit this
├── app.json
├── babel.config.js
├── tsconfig.json
└── package.json
```

## `tsconfig.json` Path Aliases
Always configure path aliases to avoid `../../../` hell:
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

Then import as:
```ts
import { Button } from '@/components/ui';
import { useAuth } from '@/hooks/useAuth';
import { api } from '@/services/api';
```
