
# Event Registration (Vue + Node.js + MongoDB)

ระบบลงทะเบียนเข้างานแบบง่าย แยกส่วน User/Admin

เครื่องมือ:

- Frontend: Vue 3 + Vite + Tailwind
- Backend: Node.js (Express) + Mongoose
- Database: MongoDB

## Features

### User

- ลงทะเบียน (ชื่อ/นามสกุล/เบอร์โทร) โดยลงได้เมื่อยังมีที่นั่งว่าง
- ดูรายชื่อผู้ลงทะเบียนในตาราง พร้อม search / sort / pagination
- ดูจำนวนที่นั่งคงเหลือ และจำนวนผู้ลงทะเบียนทั้งหมด


### Admin

- ล็อกอินด้วย `ADMIN_KEY`
- ตั้งค่า capacity (จำนวนที่นั่งทั้งหมด)
- ดูรายชื่อผู้ลงทะเบียนแบบเต็ม (รวมเบอร์โทร) พร้อม search / sort / pagination

## Project Structure

```
regis_event/
  backend/                 # Express API + MongoDB
  src/                     # Vue app
    api/                   # axios client + API functions
    stores/                # Pinia stores (Context)
    views/                 # User/Admin pages
    components/            # UI components
```

## Prerequisites

- Node.js (ตาม `package.json`)
- MongoDB running (local หรือ remote)

## Setup

### 1) Backend

ติดตั้ง dependency:

```bash
npm install
```

ไฟล์ config อยู่ที่ `backend/.env`:

```env
PORT=3000
MONGO_URI=mongodb://127.0.0.1:27017/event_reg_db
ADMIN_KEY=secretKey5521
```

รัน backend:

```bash
npm run dev
```

Health check:

- `GET http://localhost:3000/health`

### 2) Frontend

ติดตั้ง dependency:

```bash
npm install
```

รัน frontend:

```bash
npm run dev
```

เปิดเว็บ:

- `http://localhost:5173`

## State Management (Context) **เริ่มต้นศึกษา Pinia**

โจทย์กำหนดให้ “เก็บข้อมูลทั้งหมดไว้ใน Context” ฝั่ง Frontend จึงใช้ **Pinia**

- `src/stores/public.store.js`
  - summary
  - registrations list (ไม่มี phone)
  - search/sort/page
  - loading/error
- `src/stores/admin.store.js`
  - adminKey (persist ใน `localStorage`)
  - summary
  - seat config
  - admin registrations list (มี phone)

## API Summary

Base URL: `/api`

### Public

- `GET /summary`
  - ใช้แสดงจำนวนที่นั่งทั้งหมด/คงเหลือ/จำนวนผู้ลงทะเบียน
- `GET /registrations`
  - query: `search`, `page`, `limit`, `sort`, `order`
- `POST /registrations`
  - body: `{ firstName, lastName, phone }`

### Admin

ทุก endpoint ของ admin ต้องส่ง header:

```
admin-key: <ADMIN_KEY>
```

- `PUT /admin/seats`
  - body: `{ totalSeats: number }`
- `GET /admin/registrations`
  - query: `search`, `page`, `limit`, `sort`, `order`


