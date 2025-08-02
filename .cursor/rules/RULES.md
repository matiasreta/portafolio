# Next.js + TypeScript + Tailwind - Guía de Mejores Prácticas

## 📁 Estructura de Carpetas

```
src/
├── app/                          # App Router (Next.js 13+)
│   ├── about/
│   │   └── page.tsx
│   ├── contact/
│   │   └── page.tsx
│   ├── api/                     # API Routes (opcional)
│   │   └── example/
│   │       └── route.ts
│   ├── globals.css
│   ├── layout.tsx
│   ├── page.tsx
│   ├── loading.tsx              # Loading UI
│   ├── error.tsx                # Error UI
│   └── not-found.tsx           # 404 Page
├── components/                   # Componentes reutilizables
│   ├── ui/                      # Componentes básicos de UI
│   │   ├── button.tsx          # Ejemplo: Button, Card, Modal
│   │   ├── card.tsx
│   │   └── index.ts            # Barrel exports
│   ├── layout/                  # Componentes de layout
│   │   ├── header.tsx
│   │   ├── footer.tsx
│   │   └── navigation.tsx
│   └── sections/               # Secciones específicas
│       ├── hero-section.tsx
│       ├── features-section.tsx
│       └── contact-section.tsx
├── lib/                        # Utilidades y configuraciones
│   ├── utils.ts               # Funciones utilitarias
│   └── constants.ts           # Constantes de la aplicación
├── hooks/                     # Custom React Hooks (si es necesario)
│   └── use-local-storage.ts  # Ejemplo
├── types/                     # Definiciones de tipos TypeScript
│   ├── global.ts             # Tipos globales
│   └── components.ts         # Tipos de componentes
└── styles/                    # Estilos adicionales (opcional)
    └── components.css
```

## 🎯 Convenciones de Nomenclatura

### Archivos y Carpetas

- **Carpetas**: `kebab-case` (minúsculas con guiones)
  - ✅ `hero-section`, `contact-info`, `user-profile`
  - ❌ `HeroSection`, `contactInfo`, `user_profile`
- **Componentes**: `PascalCase.tsx`
  - ✅ `Button.tsx`, `UserCard.tsx`, `NavigationMenu.tsx`
- **Hooks**: `use-kebab-case.ts`
  - ✅ `use-local-storage.ts`, `use-window-size.ts`
- **Utilidades**: `kebab-case.ts`
  - ✅ `format-date.ts`, `api-client.ts`

### Variables en Código

- **Componentes**: `PascalCase`
  - ✅ `Button`, `UserCard`, `NavigationMenu`
- **Variables/Funciones**: `camelCase`
  - ✅ `userName`, `isLoading`, `handleClick`, `fetchData`
- **Constantes**: `SCREAMING_SNAKE_CASE`
  - ✅ `API_BASE_URL`, `MAX_FILE_SIZE`, `DEFAULT_THEME`
- **Tipos/Interfaces**: `PascalCase`
  - ✅ `User`, `ButtonProps`, `ApiResponse`
- **Props**: `camelCase`
  - ✅ `className`, `isDisabled`, `onClick`, `maxLength`

### Ejemplos de Nombres Descriptivos

```typescript
// ❌ Nombres poco descriptivos
const data = fetchStuff();
const btn = document.querySelector("button");
const x = users.length > 0;

// ✅ Nombres descriptivos
const userList = fetchUsers();
const submitButton = document.querySelector("button");
const hasUsers = users.length > 0;

// ❌ Nombres muy largos
const theButtonThatSubmitsTheFormWhenUserClicksIt = "submit";

// ✅ Balance correcto
const submitButton = "submit";
const formSubmitHandler = () => {};
```

## 🧩 Patrones de Componentes

### 1. Componente UI Básico (Ejemplo: Button)

```typescript
// components/ui/button.tsx
import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = "primary", size = "md", isLoading, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        // Estilos base
        "inline-flex items-center justify-center rounded-md font-medium transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        // Variantes de color
        {
          "bg-blue-600 text-white hover:bg-blue-700": variant === "primary",
          "bg-gray-200 text-gray-900 hover:bg-gray-300": variant === "secondary",
          "border border-gray-300 bg-transparent hover:bg-gray-50": variant === "outline",
        },
        // Variantes de tamaño
        {
          "h-8 px-3 text-sm": size === "sm",
          "h-10 px-4": size === "md",
          "h-12 px-6 text-lg": size === "lg",
        },
        className
      )}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && <span className="mr-2">⏳</span>}
      {children}
    </button>
  );
});

Button.displayName = "Button";

export { Button, type ButtonProps };
```

### 2. Componente de Layout (Ejemplo: Header)

```typescript
// components/layout/header.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-gray-900">
          Mi App
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/about" className="text-gray-600 hover:text-gray-900">
            Acerca de
          </Link>
          <Link href="/contact" className="text-gray-600 hover:text-gray-900">
            Contacto
          </Link>
        </nav>

        <Button size="sm">Comenzar</Button>
      </div>
    </header>
  );
}
```

### 3. Componente de Sección (Ejemplo: Hero)

```typescript
// components/sections/hero-section.tsx
import { Button } from "@/components/ui/button";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

export function HeroSection({ title, subtitle, ctaText = "Comenzar", onCtaClick }: HeroSectionProps) {
  return (
    <section className="bg-gradient-to-b from-blue-50 to-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h1 className="mb-6 text-4xl font-bold text-gray-900 md:text-6xl">{title}</h1>
        <p className="mb-8 text-xl text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
        <Button size="lg" onClick={onCtaClick}>
          {ctaText}
        </Button>
      </div>
    </section>
  );
}
```

## 🔧 Utilidades Esenciales

```typescript
// lib/utils.ts
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Función para combinar clases de Tailwind
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Ejemplo: Formatear fechas
export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat("es-AR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(date));
}

// Ejemplo: Formatear números como moneda
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
  }).format(amount);
}

// Ejemplo: Capitalizar primera letra
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}
```

```typescript
// lib/constants.ts
export const SITE_CONFIG = {
  name: "Mi Aplicación",
  description: "Descripción de mi aplicación",
  url: "https://mi-app.com",
} as const;

export const NAVIGATION_ITEMS = [
  { label: "Inicio", href: "/" },
  { label: "Acerca de", href: "/about" },
  { label: "Contacto", href: "/contact" },
] as const;

// Ejemplo de constantes para validación
export const VALIDATION_RULES = {
  MIN_PASSWORD_LENGTH: 8,
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
  ALLOWED_IMAGE_TYPES: ["image/jpeg", "image/png", "image/webp"],
} as const;
```

## 📝 Tipos y Interfaces

```typescript
// types/global.ts
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}

// Ejemplo: Estados de carga comunes
export type LoadingState = "idle" | "loading" | "success" | "error";

// Ejemplo: Opciones para selects
export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

// Ejemplo: Respuesta de API genérica
export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}
```

```typescript
// types/components.ts
import { ReactNode } from "react";

// Ejemplo: Props comunes para componentes de layout
export interface LayoutProps {
  children: ReactNode;
  className?: string;
}

// Ejemplo: Props para componentes con estados de carga
export interface LoadableProps {
  isLoading?: boolean;
  error?: string | null;
}

// Ejemplo: Props para componentes modales
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}
```

## 🎨 Configuración de Tailwind (Básica)

```javascript
// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // Ejemplo: Colores personalizados
      colors: {
        primary: {
          50: "#eff6ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
      },
      // Ejemplo: Espaciado personalizado
      spacing: {
        18: "4.5rem",
        88: "22rem",
      },
    },
  },
  plugins: [],
};
```

## 📏 Reglas de Formato

### ESLint (Básico)

```json
{
  "extends": ["next/core-web-vitals"],
  "rules": {
    "prefer-const": "error",
    "no-unused-vars": "error",
    "react-hooks/exhaustive-deps": "warn"
  }
}
```

### Prettier

```json
{
  "semi": false,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2
}
```

## 🚀 Mejores Prácticas Esenciales

### 1. Estructura de Componentes

```typescript
// ✅ Buena estructura
export function MyComponent({ title, isActive }: MyComponentProps) {
  // 1. Hooks al inicio
  const [isLoading, setIsLoading] = useState(false);

  // 2. Funciones de manejo
  const handleClick = () => {
    setIsLoading(true);
    // lógica...
  };

  // 3. Early returns
  if (!title) {
    return null;
  }

  // 4. JSX principal
  return (
    <div className={cn("base-classes", { active: isActive })}>
      <h2>{title}</h2>
      <button onClick={handleClick}>{isLoading ? "Cargando..." : "Click aquí"}</button>
    </div>
  );
}
```

### 2. Manejo de Estados de Carga

```typescript
// Ejemplo: Componente con estado de carga
export function DataList() {
  const [data, setData] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchData()
      .then(setData)
      .catch((err) => setError(err.message))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>Cargando...</div>;
  if (error) return <div>Error: {error}</div>;
  if (data.length === 0) return <div>No hay datos</div>;

  return (
    <ul>
      {data.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

## 📋 Checklist para Desarrollo

### Antes de cada commit:

- [ ] Nombres de variables descriptivos
- [ ] Componentes tipados correctamente
- [ ] No hay errores de TypeScript
- [ ] Código formateado con Prettier
- [ ] Estados de carga implementados donde sea necesario
- [ ] Responsive design básico verificado

### Estructura de archivos:

- [ ] Un componente por archivo
- [ ] Imports organizados (externos primero, luego internos)
- [ ] Exports al final del archivo
- [ ] Tipado explícito en props e interfaces

---

_Esta guía cubre lo esencial para un proyecto inicial. Expándela según las necesidades específicas de tu aplicación._
