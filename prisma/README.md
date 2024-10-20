### Các lệnh prisma

1. **Khởi tạo Prisma**
    ```npx prisma init```
2. **Tạo cơ sở dữ liệu từ schema Prisma**
    ```npx prisma db push```
3. **Tạo migration**
    ```npx prisma migrate dev --name <tên_migration>```
4. **Triển khai migration**
    ```npx prisma migrate deploy```
5. **Tạo Prisma Client**
    ```npx prisma generate```
6. **Xem trạng thái của cơ sở dữ liệu**
    ```npx prisma migrate status```
7. **Làm sạch migration (reset)**
    ```npx prisma migrate reset```
8. **Chạy Prisma Studio**
    ```npx prisma studio```
9. **Kiểm tra schema**
    ```npx prisma validate```
10. **Xóa dữ liệu migration**
    ```npx prisma migrate reset --force```
11. **Xóa cache**
    ```npx prisma generate --force```
