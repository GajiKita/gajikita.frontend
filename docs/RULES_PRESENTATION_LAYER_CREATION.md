# Panduan Pembuatan Presentation Layer GajiKita Frontend

## Struktur Umum Presentation Layer

Presentation Layer adalah layer teratas dalam clean architecture yang bertanggung jawab untuk menampilkan UI dan berinteraksi dengan user. Layer ini menggunakan Data Layer untuk mengambil data dan menampilkan hasilnya dalam bentuk komponen React.

```
src/
├── features/          # Feature-based components (pages/screens)
├── components/         # Shared/reusable UI components
├── app/               # Next.js app router pages
└── modules/*/         # Module-specific presentation components
    └── presentation/  # Module presentation layer
```

## 1. Features Layer (`features/`)

### Struktur Feature
Setiap feature memiliki struktur berikut:

```
src/features/{feature-name}/
├── {FeatureName}.tsx          # Main feature component
├── {FeatureName}Form.tsx      # Form components (opsional)
├── {FeatureName}List.tsx      # List/Table components (opsional)
├── {FeatureName}Detail.tsx    # Detail view components (opsional)
├── hooks/                     # Feature-specific hooks
└── components/                # Feature-specific components
```

### Prinsip Feature
- **Feature-based organization**: Kelompokkan komponen berdasarkan fitur bisnis, bukan teknologi
- **Self-contained**: Setiap feature berisi semua yang diperlukan
- **Clear boundaries**: Feature tidak saling bergantung satu sama lain

### Contoh struktur feature dashboard:

```typescript
// features/dashboard/Dashboard.tsx
'use client';

import { useDashboardData } from './hooks/useDashboardData';
import { StatCard } from '@/components/dashboard/StatCard';
import { EmployeeTable } from '@/components/dashboard/EmployeeTable';

export default function Dashboard() {
  const { data, isLoading, error } = useDashboardData();

  if (isLoading) return <DashboardSkeleton />;
  if (error) return <ErrorState error={error} />;

  return (
    <div className="space-y-6">
      <StatsGrid stats={data.stats} />
      <ChartsSection charts={data.charts} />
      <EmployeeTable employees={data.employees} />
    </div>
  );
}
```

## 2. Module Presentation Layer (`modules/*/presentation/`)

### Struktur Module Presentation
Setiap module data memiliki folder presentation yang berisi komponen-komponen presentasi spesifik untuk module tersebut:

```
src/modules/{module-name}/presentation/
├── components/           # Module-specific presentation components
├── hooks/               # Module-specific hooks (menggunakan data layer)
├── forms/               # Form components untuk CRUD operations
├── tables/              # Table/List components
├── modals/              # Modal components
└── index.ts             # Export semua komponen presentation
```

### Komponen Presentation
- **Components**: Komponen UI spesifik module
- **Hooks**: Custom hooks yang menggunakan data layer hooks
- **Forms**: Form components untuk create/update operations
- **Tables**: Table components untuk list views
- **Modals**: Modal components untuk detail views atau konfirmasi

### Contoh Module Presentation:

```typescript
// modules/employee/presentation/hooks/useEmployeeList.ts
import { useEmployeesQuery } from '../../data/employee.query';
import { useEmployeeMutations } from '../../data/employee.mutation';

export const useEmployeeList = () => {
  const query = useEmployeesQuery({ page: 1, limit: 10 });
  const mutations = useEmployeeMutations();

  return {
    ...query,
    ...mutations,
  };
};
```

## 3. Shared Components (`components/`)

### Struktur Shared Components
Komponen yang dapat digunakan ulang di berbagai fitur:

```
src/components/
├── ui/                  # Basic UI components (Button, Input, etc.)
├── layout/              # Layout components (Header, Sidebar, etc.)
├── forms/               # Form components (FormField, FormSelect, etc.)
├── dashboard/           # Dashboard-specific components
├── employee/            # Employee-specific components
├── common/              # Common utility components
└── index.ts             # Export semua komponen
```

### Kategori Komponen Shared
- **UI Components**: Komponen dasar seperti Button, Input, Modal
- **Layout Components**: Komponen layout seperti DashboardLayout, PageLayout
- **Form Components**: Komponen form seperti FormField, DatePicker
- **Domain Components**: Komponen spesifik domain seperti StatCard, EmployeeTable

## 4. App Router Pages (`app/`)

### Struktur Page
Setiap route dalam Next.js App Router:

```
src/app/{route}/
├── page.tsx             # Main page component
├── layout.tsx           # Layout untuk route tersebut (opsional)
├── loading.tsx          # Loading component (opsional)
├── error.tsx            # Error boundary (opsional)
└── [...subroutes]/      # Dynamic routes
```

### Prinsip Page Components
- **Thin components**: Page hanya bertugas mengatur layout dan memanggil feature components
- **Route-specific logic**: Logic yang spesifik untuk route tertentu
- **Loading & Error states**: Handle loading dan error states

### Contoh Page Component:

```typescript
// app/employees/page.tsx
import { EmployeeList } from '@/features/employees/EmployeeList';
import { EmployeeFilters } from '@/features/employees/EmployeeFilters';

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Employees</h1>
        <AddEmployeeButton />
      </div>

      <EmployeeFilters />
      <EmployeeList />
    </div>
  );
}
```

## Konvensi Penamaan Presentation Layer

### Nama Feature
- Gunakan PascalCase: `EmployeeManagement`, `PayrollDashboard`
- Gunakan nama yang deskriptif dan spesifik fitur

### Nama Komponen
- **Pages**: `{FeatureName}Page.tsx`
- **Features**: `{FeatureName}.tsx`
- **Components**: `{ComponentName}.tsx`
- **Hooks**: `use{CamelCase}.ts`

### Nama File
- Gunakan PascalCase untuk komponen React
- Gunakan camelCase untuk hooks dan utilities
- Gunakan kebab-case untuk file konfigurasi

## State Management di Presentation Layer

### Local State
- Gunakan `useState` untuk state lokal komponen
- Gunakan `useReducer` untuk state kompleks

### Server State
- Gunakan React Query untuk server state
- Data layer hooks sudah mengatur server state

### Global State
- Gunakan Context API untuk state yang dibutuhkan banyak komponen
- Minimalisir penggunaan global state

## Styling Guidelines

### Tailwind CSS v4
- Gunakan Tailwind v4 syntax
- Ikuti design system yang sudah ditetapkan
- Gunakan CSS variables untuk theme colors

### Component Styling
- Gunakan className dengan Tailwind utilities
- Buat custom CSS hanya jika diperlukan
- Konsisten dengan design patterns yang ada

## Best Practices Presentation Layer

### Komponen Design
- **Single Responsibility**: Satu komponen untuk satu tugas
- **Composition over Inheritance**: Gunakan composition pattern
- **Props Interface**: Definisikan interface yang jelas untuk props

### Performance
- **Memoization**: Gunakan `React.memo`, `useMemo`, `useCallback` saat diperlukan
- **Lazy Loading**: Import komponen secara lazy untuk code splitting
- **Virtualization**: Untuk list yang besar, gunakan virtualization

### Accessibility
- **Semantic HTML**: Gunakan tag HTML yang semantik
- **ARIA Labels**: Tambahkan aria-label untuk screen readers
- **Keyboard Navigation**: Pastikan komponen dapat dinavigasi dengan keyboard

### Error Handling
- **Error Boundaries**: Implement error boundaries untuk menangkap errors
- **User-friendly Messages**: Tampilkan pesan error yang mudah dipahami
- **Retry Mechanisms**: Berikan opsi retry untuk failed operations

## Testing Presentation Layer

### Unit Tests
- Test komponen individual dengan React Testing Library
- Mock dependencies seperti hooks dan API calls
- Test user interactions dan state changes

### Integration Tests
- Test interaksi antar komponen
- Test complete user flows
- Gunakan test utilities yang sudah disediakan

## Integrasi dengan Data Layer

### Menggunakan Data Layer Hooks
```typescript
// Di presentation layer, gunakan data layer hooks
import { useEmployeesQuery, useCreateEmployeeMutation } from '@/modules/employee/data';

export const useEmployeePresentation = () => {
  const query = useEmployeesQuery(params);
  const mutation = useCreateEmployeeMutation();

  return {
    employees: query.data,
    isLoading: query.isLoading,
    createEmployee: mutation.mutate,
    // ... other presentation logic
  };
};
```

### Dependency Injection
- Presentation layer bergantung pada abstraction (hooks) dari data layer
- Tidak bergantung pada implementation details
- Memungkinkan testing dengan mock implementations

## File Structure Summary

```
src/
├── app/                          # Next.js pages
│   ├── dashboard/
│   ├── employees/
│   ├── payroll/
│   └── ...
├── features/                     # Feature components
│   ├── dashboard/
│   ├── employees/
│   └── ...
├── components/                   # Shared components
│   ├── ui/
│   ├── layout/
│   ├── forms/
│   └── ...
├── modules/                      # Domain modules
│   └── employee/
│       ├── data/                # Data layer
│       ├── domain/              # Domain layer
│       ├── repository/          # Repository layer
│       ├── usecase/             # Usecase layer
│       └── presentation/        # Presentation layer
│           ├── components/
│           ├── hooks/
│           └── index.ts
└── ...
```

## Referensi

- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [React Best Practices](https://react.dev/learn)
- [Next.js App Router](https://nextjs.org/docs/app)
- [Tailwind CSS v4](https://tailwindcss.com/docs/v4-beta)
