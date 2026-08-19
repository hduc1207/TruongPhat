# Yêu cầu dự án (Project Context)
- **Dự án:** Giao diện E-commerce (bán đồ gỗ nội thất).
- **Tech Stack:** Next.js (App Router), TypeScript, Tailwind CSS.
- **Tình trạng hiện tại:** Đang tập trung xây dựng giao diện Frontend với **Dữ liệu giả (Mock Data)**. Chưa nối API thật.

# Nguyên tắc Code (Coding Guidelines)

## 1. Kiến trúc thư mục & Clean Code
- Tách biệt rõ ràng Component Giao diện (UI) và Logic xử lý dữ liệu.
- Các file Component dùng chung phải đặt trong `src/components/`.
- Giao diện UI (như Button, Input) đặt trong `src/components/ui/`.
- Luôn tạo thư mục và file cấu trúc rõ ràng. Không viết một file quá 150 dòng, nếu dài hãy tách thành các component con.

## 2. Xử lý Dữ liệu (Mock Data & Types)
- Mặc dù đang dùng Mock Data (`src/data/mock.ts`), nhưng tư duy code phải hướng đến việc nối API thật sau này.
- **BẮT BUỘC:** Phải định nghĩa **TypeScript Interfaces** (trong `src/types/`) trước khi viết component.
- Cấu trúc API tương lai gồm:
    + Public: Auth (Login/Register), Products (Lọc, Phân trang, Chi tiết, Tìm kiếm), Categories.
    + Admin: CRUD Products, CRUD Categories.
- Khi viết Logic gọi data, hãy viết dưới dạng Custom Hook (ví dụ `useProducts`) nhưng return về mock data, để sau này chỉ cần đổi ruột hook thành hàm `fetch`/`axios` là xong.

## 3. Tailwind CSS & Styling
- Chỉ sử dụng Tailwind CSS, không dùng file CSS ngoài (trừ file `globals.css` chứa base).
- Code theo chuẩn **Mobile-first** (Responsive đầy đủ từ Mobile -> Tablet -> Desktop).
- Tránh lặp lại các class Tailwind dài dòng. Nếu một UI element lặp lại nhiều lần, hãy tách thành Component riêng.
- Sử dụng màu sắc nhất quán (ví dụ hệ màu amber/orange của ngành nội thất gỗ).
- **KHÔNG dùng Emoji icon** trong giao diện (🔥, ✨, 📞...). Nếu cần icon, dùng SVG hoặc thư viện icon (Heroicons).

## 4. Quy tắc giao tiếp và Tương tác của AI
- Trả về code theo từng khối rõ ràng (Code Blocks) để dễ theo dõi.
- Giải thích ngắn gọn, đi thẳng vào vấn đề.
- **ĐƯỢC PHÉP SỬA FILE** (dùng các công cụ Edit/Write tools của hệ thống) nhưng **BẮT BUỘC PHẢI HỎI VÀ ĐƯỢC NGƯỜI DÙNG ĐỒNG Ý TRƯỚC** khi thực hiện bất kỳ thay đổi nào vào source code.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
