# Clerk Authentication (Admin)

lên clerk dashboard tạo application => ok

- thêm env
- npm install @clerk/nextjs
- add middleware
- add provider

# setup zustand

`npm i zustand`

tạo `hooks/use-store-modal.tsx`

```ts
import { create } from "zustand";

interface useStoreModalInterface {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const useStoreModal = create<useStoreModalInterface>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
```

# Prisma, MySQL setup (Admin)

npm i -D prisma

npm i @prisma/client

npx prisma init

tạo `lib/prismadb.ts`

```ts
import { PrismaClient } from "@prisma/client";
declare global {
  var prisma: PrismaClient | undefined;
}
export const prismadb = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = prismadb;
```

tạo schema

```ts
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mysql"
  url      = env("DATABASE_URL")
  relationMode ="prisma"
}

model Store {
  id       String   @id @default(cuid())
  name     String
  userId    String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

`npx prisma generate` và `npx prisma db push`

=> kết nối xong

# api tạo shop
