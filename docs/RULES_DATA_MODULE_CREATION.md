# Panduan Pembuatan Modul Data StoMaTrade Frontend

## Struktur Umum Modul

Setiap modul data dalam StoMaTrade frontend mengikuti struktur arsitektur clean yang terdiri dari 4 layer utama:

```
src/modules/{module-name}/
├── data/           # Layer data (React Query hooks)
├── domain/         # Layer domain (entity, request, response)
├── repository/     # Layer repository (interface & implementation)
└── usecase/        # Layer usecase (interface & implementation)
```

## 1. Layer Data (`data/`)

### File Query
- Nama file: `{module-name}.query.ts`
- Berisi React Query hooks untuk operasi GET
- Menggunakan `useQuery` untuk data fetching
- Menggunakan `queryKey` untuk identifikasi unik
- Mengikuti pola: `use{EntityName}Query`, `use{EntityName}ListQuery`, dll

### File Mutation
- Nama file: `{module-name}.mutation.ts`
- Berisi React Query hooks untuk operasi POST, PUT, PATCH, DELETE
- Menggunakan `useMutation` untuk operasi perubahan data
- Mengikuti pola: `useCreate{EntityName}Mutation`, `useUpdate{EntityName}Mutation`, dll

### Contoh struktur data layer:
```typescript
// users.query.ts
export const usersQueryKeys = {
    list: (params: GetUsersRequest) => ['users', 'list', params] as const,
    detail: (id: string) => ['users', 'detail', id] as const,
};

export const useUsersQuery = (
    params: GetUsersRequest,
    options?: UseQueryOptions<GetUsersResponse, ApiError>
) => {
    const repository = new UsersRepositoryImpl();
    const usecase = new GetUsers(repository);

    return useQuery<GetUsersResponse, ApiError>({
        queryKey: usersQueryKeys.list(params),
        queryFn: () => usecase.execute(params),
        ...options,
    });
};
```

## 2. Layer Domain (`domain/`)

### Subfolder `entity/`
- Berisi definisi tipe data utama (entities)
- Nama file: `{EntityName}Entity.ts`
- Menggunakan `type` bukan `interface`
- Tidak boleh memiliki logika bisnis

### Subfolder `req/`
- Berisi definisi tipe data untuk request
- Nama file: `{ActionName}Request.ts`
- Contoh: `CreateUserRequest.ts`, `GetUsersRequest.ts`

### Subfolder `res/`
- Berisi definisi tipe data untuk response
- Nama file: `{ActionName}Response.ts`
- Contoh: `UserResponse.ts`, `GetUsersResponse.ts`

## 3. Layer Repository (`repository/`)

### Subfolder `interface/`
- Berisi definisi interface repository
- Nama file: `{ModuleName}Repository.ts`
- Berisi method-method yang harus diimplementasikan
- Menggunakan prefix `I` untuk interface tidak digunakan, hanya nama Repository

### Subfolder `implementation/`
- Berisi implementasi repository
- Nama file: `{ModuleName}RepositoryImpl.ts`
- Melakukan komunikasi langsung dengan API
- Menggunakan fungsi `get`, `post`, `patch`, `del` dari `@/core/utils/http/httpClient`

## 4. Layer Usecase (`usecase/`)

### Subfolder `interface/`
- Berisi definisi interface usecase
- Nama file: `I{ActionName}.ts`
- Berisi definisi method `execute` dengan parameter dan return type

### Subfolder `implementation/`
- Berisi implementasi usecase
- Nama file: `{ActionName}.ts`
- Berisi logika bisnis sebelum dikirim ke repository
- Melakukan validasi input sebelum mengakses repository
- Menggunakan dependency injection untuk repository

## Konvensi Penamaan

### Nama Modul
- Gunakan huruf kecil dan singular (misalnya: `user`, `land`, `project`)
- Gunakan plural untuk endpoint dan query key

### Nama Fungsi/Method
- Gunakan camelCase
- Gunakan format `use{Action}{Entity}Query/Mutation` untuk hooks
- Gunakan format `{Action}{Entity}` untuk usecase
- Gunakan format `{Entity}{Action}` untuk repository method

### Nama File
- Gunakan PascalCase untuk entity dan interface
- Gunakan camelCase untuk file query dan mutation
- Gunakan kebab-case untuk nama file konfigurasi

## Penanganan Error

- Gunakan `ApiError` dari `@/core/utils/http/httpClient`
- Tambahkan validasi input di layer usecase sebelum mengakses repository
- Gunakan retry logic yang sesuai di query (misalnya tidak retry untuk status 401)

## Penanganan Otentikasi

- Gunakan token otomatis dari http client
- Tambahkan konfigurasi refresh token jika diperlukan
- Gunakan security requirements dari API spec untuk menentukan endpoint yang perlu otentikasi

## Pagination

- Gunakan interface standar untuk parameter pagination: `page?: number; limit?: number;`
- Gunakan meta standar untuk response pagination: `meta: { page, limit, total, totalPages }`
- Gunakan query parameter URL untuk pagination

## Endpoint API

- Gunakan konstanta dari `API_ROUTES` di `@/core/constant/api`
- Ikuti struktur endpoint dari module-api.json
- Gunakan path parameter dengan benar (misalnya `API_ROUTES.users.byId(id)`)

## React Query Best Practices

- Gunakan `queryKey` yang unik dan dapat diidentifikasi
- Gunakan `staleTime` dan `cacheTime` yang sesuai
- Gunakan `retry` yang sesuai (misalnya tidak retry untuk error 4xx)
- Gunakan `enabled` untuk conditional fetching

## Contoh Implementasi Lengkap

Berikut adalah contoh implementasi modul lengkap untuk endpoint `/lands` yang belum dibuat:

### domain/entity/LandEntity.ts
```typescript
export type LandEntity = {
    id: string;
    farmerId: string;
    area: number;
    coordinates: string;
    address: string;
    createdAt: string;
    updatedAt: string;
};
```

### domain/req/CreateLandRequest.ts
```typescript
export type CreateLandRequest = {
    farmerId: string;
    area: number;
    coordinates: string;
    address: string;
};
```

### domain/res/LandResponse.ts
```typescript
import type { LandEntity } from '../entity/LandEntity';

export type LandResponse = {
    land: LandEntity;
};
```

### repository/interface/LandRepository.ts
```typescript
import type { CreateLandRequest } from '../../domain/req/CreateLandRequest';
import type { UpdateLandRequest } from '../../domain/req/UpdateLandRequest';
import type { GetLandsRequest } from '../../domain/req/GetLandsRequest';
import type { GetLandByIdRequest } from '../../domain/req/GetLandByIdRequest';
import type { LandResponse } from '../../domain/res/LandResponse';
import type { LandListResponse } from '../../domain/res/LandListResponse';

export interface LandRepository {
    createLand(request: CreateLandRequest): Promise<LandResponse>;
    getLands(request: GetLandsRequest): Promise<LandListResponse>;
    getLandById(request: GetLandByIdRequest): Promise<LandResponse>;
    getLandsByFarmer(farmerId: string, request: GetLandsRequest): Promise<LandListResponse>;
    updateLand(request: UpdateLandRequest): Promise<LandResponse>;
    deleteLand(id: string): Promise<void>;
}
```

## Validasi dan Testing

- Tambahkan validasi input di layer usecase
- Gunakan tipe data yang ketat untuk mencegah error runtime
- Pastikan setiap module memiliki test case yang mencakup happy path dan error scenarios
- Gunakan TypeScript secara maksimal untuk type safety

## Referensi dari module-api.json

Setiap modul harus dibuat berdasarkan endpoint yang terdefinisi di module-api.json:
- Gunakan operationId untuk nama fungsi controller
- Gunakan schema dari requestBody dan response untuk membuat request/response DTO
- Gunakan parameter dari query untuk membuat parameter request
- Gunakan security requirements untuk menentukan endpoint yang perlu otentikasi