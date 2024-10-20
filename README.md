# 📚 Web App Đọc Truyện Chữ (Next.js Fullstack)

**Web App Đọc Truyện Chữ** là một ứng dụng web đọc truyện chữ với cả Frontend và Backend được phát triển dựa trên **Next.js**. Ứng dụng bao gồm hệ thống quản lý truyện, crawl dữ liệu từ các nguồn bên ngoài, hệ thống xác thực và phân quyền người dùng.

## 🌟 Tính Năng Chính

- **Frontend**:
  - Giao diện thân thiện, dễ sử dụng để tìm kiếm và đọc truyện.
  - Hệ thống tìm kiếm truyện theo tên, thể loại, tác giả.
  - Responsive, hiển thị tốt trên cả thiết bị di động và desktop.
  - Lưu danh sách truyện yêu thích của người dùng.

- **Backend**:
  - Tích hợp **API Routes** của **Next.js** để cung cấp các API RESTful cho ứng dụng.
  - Hệ thống xác thực người dùng bằng **JWT** thông qua **NextAuth.js**.
  - Tự động crawl dữ liệu từ các nguồn bên ngoài với **cron jobs**.
  - Kết nối cơ sở dữ liệu **MongoDB** để lưu trữ thông tin truyện và người dùng.

## 🛠️ Công Nghệ Sử Dụng

### Frontend
- **Next.js**: Framework React với hỗ trợ SSR, SSG.
- **Tailwind CSS**: Tạo giao diện nhanh chóng, dễ dàng tùy chỉnh.
- **React Query**: Quản lý trạng thái server-side cho API.
- **Axios**: Gửi yêu cầu HTTP từ client đến server.

### Backend
- **Next.js API Routes**: Xây dựng API backend tích hợp sẵn với Next.js.
- **MongoDB**: Cơ sở dữ liệu NoSQL để lưu trữ truyện và người dùng.
- **Mongoose**: Thư viện ORM để làm việc với MongoDB.
- **NextAuth.js**: Xử lý xác thực và phân quyền người dùng với JWT.
- **Node-cron**: Thực hiện các cron jobs để crawl dữ liệu tự động.

## 🚀 Cài Đặt & Chạy Dự Án

### Yêu Cầu
- **Node.js** phiên bản 14 trở lên
- **MongoDB** (local hoặc sử dụng cloud như MongoDB Atlas)

### Cấu Hình Biến Môi Trường

Tạo file `.env.local` ở thư mục gốc của dự án và thêm các biến sau:

```bash
# MongoDB URI
MONGODB_URI=mongodb://localhost:27017/truyenapp

# Secret key cho NextAuth.js
NEXTAUTH_SECRET=your-secret-key

# Provider OAuth (tuỳ chọn nếu muốn sử dụng Google OAuth)
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### Cài Đặt

1. **Clone repo** về máy:
   ```bash
   git clone https://github.com/yourusername/truyen-web-app.git
   ```

2. **Cài đặt các phụ thuộc**:
   ```bash
   cd truyen-web-app
   yarn install
   ```

3. **Chạy ứng dụng ở chế độ development**:
   ```bash
   openssl rand -base64 32
   yarn dev
   ```

4. **Truy cập trang web**:
   Mở trình duyệt và truy cập `http://localhost:3001`.

### Build và Chạy ở môi trường Production:
1. Build ứng dụng:
   ```bash
   yarn build
   ```

2. Chạy server production:
   ```bash
   yarn start
   ```

### Cấu Trúc Thư Mục

```bash
├── pages               # Thư mục chứa các trang (Next.js routing)
│   ├── api             # API Routes cho backend
│   │   └── auth        # Các API cho xác thực (NextAuth.js)
├── components          # Các thành phần giao diện (React Components)
├── lib                 # Các hàm tiện ích và middleware
├── models              # Các mô hình Mongoose kết nối với MongoDB
├── public              # Thư mục chứa tài nguyên tĩnh như hình ảnh
├── styles              # CSS và Tailwind config
├── cron                # Các file cron jobs để crawl dữ liệu
└── utils               # Các tiện ích và helper functions
```

## 📂 Backend API Endpoints

- `GET /api/truyen` - Lấy danh sách truyện
- `GET /api/truyen/:id` - Lấy thông tin chi tiết truyện
- `POST /api/truyen` - Tạo truyện mới (Yêu cầu quyền admin)
- `PUT /api/truyen/:id` - Cập nhật thông tin truyện (Yêu cầu quyền admin)
- `DELETE /api/truyen/:id` - Xóa truyện (Yêu cầu quyền admin)
- `POST /api/auth/signin` - Đăng nhập
- `POST /api/auth/signup` - Đăng ký

## 🔧 Cron Job

Cron jobs được cấu hình để tự động crawl dữ liệu truyện từ nguồn ngoài định kỳ. Bạn có thể cấu hình thời gian chạy cron trong các file ở thư mục `cron/`.

Ví dụ sử dụng `node-cron` để crawl dữ liệu hàng ngày:

```js
import cron from 'node-cron';
import { crawlData } from '../lib/crawl';

cron.schedule('0 0 * * *', async () => {
  console.log('Crawling data...');
  await crawlData();
});
```

## 🤝 Đóng Góp

Chúng tôi hoan nghênh mọi sự đóng góp từ cộng đồng. Nếu bạn có ý tưởng mới, phát hiện lỗi hoặc muốn thêm tính năng, hãy tạo **Issue** hoặc gửi **Pull Request**.

### Quy Trình Đóng Góp

1. **Fork** dự án này.
2. Tạo một **nhánh** mới với tính năng bạn muốn phát triển: `git checkout -b feature/your-feature`.
3. **Commit** thay đổi của bạn: `git commit -m 'Add some feature'`.
4. **Push** lên nhánh của bạn: `git push origin feature/your-feature`.
5. Gửi một **Pull Request** và chúng tôi sẽ xem xét đóng góp của bạn.

## 📜 Giấy Phép

Dự án này được cấp phép dưới giấy phép [MIT License](./LICENSE).

---

README này cung cấp một hướng dẫn chi tiết cho người phát triển và người dùng về cách cài đặt, cấu hình, và đóng góp cho dự án. Bạn có thể điều chỉnh tùy theo tính năng và yêu cầu cụ thể của dự án của bạn.

<!-- Crawl category - truyenfull  -->
curl -X GET http://localhost:3001/api/crawl \
  -H "Content-Type: application/json"

<!-- Đăng nhập -->
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "jelyqs",
    "password": "123123"
  }'

<!-- Tạo role -->
curl -X POST http://localhost:3001/api/admin/role \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I"

<!-- Tạo user -->
curl -X POST http://localhost:3001/api/admin/user \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I" \
  -d '{
    "username": "jelyqs",
    "email": "jely.big@gmail.com",
    "password": "123123",
    "full_name": "Thu Nguyễn",
    "mobile": "0359399320",
    "address": "Đà Nẵng",
    "birthday": "1995-02-03",
    "role_ids": [1]
  }'

<!-- Lấy danh sách user -->
curl -X GET http://localhost:3001/api/admin/user \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I"

<!-- Lấy thông tin user -->
curl -X GET http://localhost:3001/api/admin/user/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I"

<!-- Cập nhật user -->
curl -X PUT http://localhost:3001/api/admin/user/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I" \
  -d '{
    "username": "jelyqs",
    "email": "jely.big@gmail.com",
    "password": "123123",
    "full_name": "Thu Nguyễn",
    "mobile": "0359399320",
    "address": "Đà Nẵng",
    "birthday": "1995-02-03",
    "role_ids": [1]
  }'

<!-- Xóa user -->
curl -X DELETE http://localhost:3001/api/admin/user/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I"

<!-- Cập nhật user password -->
curl -X PUT http://localhost:3001/api/admin/user/1/password \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I" \
  -d '{
    "old_password": "ThuNP123",
    "new_password": "123123",
    "confirm_new_password": "123123"
  }'

<!-- Danh mục truyện -->
  <!-- Lấy danh mục truyện -->
  curl -X GET "http://localhost:3001/api/admin/category?page=1&pageSize=10" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I"
  <!-- Lấy chi tiết danh mục truyện -->
  curl -X GET "http://localhost:3001/api/admin/category/{id}" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I"
  <!-- Thêm mới danh mục truyện -->
  curl -X POST "http://localhost:3001/api/admin/category" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I" \
    -d '{
      "name": "Tên danh mục",
      "slug": "slug-danh-muc",
      "description": "Mô tả của danh mục",
      "status": true
    }'
  <!-- Cập nhật danh mục truyện -->
  curl -X PUT "http://localhost:3001/api/admin/category/{id}" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I" \
    -d '{
      "name": "Tên mới của danh mục",
      "slug": "slug-moi-cua-danh-muc",
      "description": "Mô tả mới của danh mục",
      "status": true
    }'
  <!-- Xóa danh mục truyện -->
  curl -X DELETE "http://localhost:3001/api/admin/category/{id}" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I"

<!-- Danh sách truyện -->
  <!-- Lấy danh sách truyện -->
  curl -X GET "http://localhost:3001/api/admin/list?page=1&pageSize=10" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I"
  <!-- Lấy chi tiết -->
  curl -X GET "http://localhost:3001/api/admin/lists/{id}" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I"
  <!-- Thêm mới -->
  curl -X POST "http://localhost:3001/api/admin/lists" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I" \
    -d '{
      "name": "Tên item",
      "slug": "slug-item",
      "description": "Mô tả của item",
      "status": true
    }'
  <!-- Cập nhật -->
  curl -X PUT "http://localhost:3001/api/admin/lists/{id}" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I" \
    -d '{
      "name": "Tên mới của item",
      "slug": "slug-moi-cua-item",
      "description": "Mô tả mới của item",
      "status": true
    }'
  <!-- Xóa -->
  curl -X DELETE "http://localhost:3001/api/admin/lists/{id}" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I"

<!-- Truyện -->
  <!-- Danh sách -->
  curl -X GET "http://localhost:3001/api/admin/story?page=1&pageSize=1" \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I"
  <!-- Thêm mới -->
  curl -X POST http://localhost:3001/api/admin/story \
  -H "Content-Type: application/json" \
    -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I" \
  -d '{
    "title": "Tên câu chuyện",
    "slug": "ten-cau-chuyen",
    "description": "Mô tả về câu chuyện",
    "avatar_image": "https://example.com/avatar.jpg",
    "cover_image": "https://example.com/cover.jpg",
    "author_id": 1,
    "isActive": true,
    "status": "published",
    "labels": ["action", "adventure"],
    "tag": ["fantasy", "magic"],
    "total_chapter": 10,
    "listIds": [1, 2],
    "categoryIds": [1, 3]
  }'
  <!-- Chi tiết -->
  curl -X GET http://localhost:3001/api/admin/story/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I"
  <!-- Cập nhật -->
  curl -X PUT http://localhost:3001/api/admin/story/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I" \
  -d '{
    "title": "Tên câu chuyện mới",
    "slug": "ten-cau-chuyen-moi",
    "description": "Mô tả cập nhật về câu chuyện",
    "avatar_image": { "url": "https://example.com/avatar-moi.jpg" },
    "cover_image": { "url": "https://example.com/cover-moi.jpg" },
    "isActive": true,
    "status": "published",
    "labels": ["action", "adventure"],
    "tag": ["fantasy", "magic"],
    "total_chapter": 12,
    "listIds": [1, 3],
    "categoryIds": [2, 4]
  }'
  <!-- Xóa -->
  curl -X DELETE http://localhost:3001/api/admin/story/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I"

<!-- Chapter -->
  <!-- Danh sách -->
  curl -X GET "http://localhost:3001/api/admin/story/1/chapter?page=1&pageSize=10" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I"
  <!-- Thêm mới -->
  curl -X POST http://localhost:3001/api/admin/story/1/chapter \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I" \
  -d '{
    "title": "Chapter 1",
    "content": "Nội dung của chapter 1",
    "chapter_number": "1"
  }'
  <!-- Chi tiết -->
  curl -X GET http://localhost:3001/api/admin/story/1/chapter/2 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I"
  <!-- Cập nhật -->
  curl -X PUT http://localhost:3001/api/admin/story/1/chapter/2 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I" \
  -d '{
    "title": "Chapter 1 Updated",
    "content": "Nội dung đã được cập nhật cho chapter 1",
    "chapter_number": "1"
  }'
  <!-- Xóa -->
  curl -X DELETE http://localhost:3001/api/admin/story/1/chapter/2 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxLCJ1c2VybmFtZSI6ImplbHlxcyIsImV4cCI6MTczMTgzNjI3NH0.FC4hjxBOTrZHgh9Nhbv5rd4-TV3uPtHk2KBf68qDt-I"

<!--  -->
<!--  -->
