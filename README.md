# j1j-api

Express + TS 后台接口

# Prisma

- [Simple REST API with Express.JS](https://github.com/prisma/prisma-examples/tree/latest/typescript/rest-express)
- [切换数据库](https://www.prisma.io/docs/orm/reference/connection-urls)

## 初始化数据库

```bash
npx prisma migrate dev --name init
```

如果在package.json中添加如下配置，则会自动填充数据库:

```json
"prisma": {
  "seed": "ts-node --transpile-only prisma/seed.ts"
}
```

## 添加新表

直接修改`./prisma/schema.prisma`

```
// ./prisma/schema.prisma
model User {
  id      Int      @default(autoincrement()) @id
  name    String?
  email   String   @unique
+ profile Profile?
}

+model Profile {
+  id     Int     @default(autoincrement()) @id
+  bio    String?
+  user   User    @relation(fields: [userId], references: [id])
+  userId Int     @unique
+}
```

然后执行 `npx prisma migrate dev --name add-profile`
