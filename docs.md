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

# api tạo shop với name

`api/stores/route.ts`

```ts
import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const { name } = body;
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prismadb.store.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("🚀 ~ POST ~ error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
```

# api setting name store and delete store

`api/stores/[storeId]/route.ts`

```ts
import { prismadb } from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();
    const { name } = body;
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }
    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }
    const store = await prismadb.store.updateMany({
      where: {
        id: params.storeId,
        userId,
      },
      data: {
        name,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("🚀 ~ PATCH ~ error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.storeId) {
      return new NextResponse("storeId is required", { status: 400 });
    }
    const store = await prismadb.store.deleteMany({
      where: {
        id: params.storeId,
        userId,
      },
    });
    return NextResponse.json(store);
  } catch (error) {
    console.log("🚀 ~ PATCH ~ error:", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
```
