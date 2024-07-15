# Sophisticated File Management System

## Getting Started

### First fill up these .env.local variables

```bash
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET= a-secret-key
JWT_SECRET = a-jwt-secret-key
S3_BUCKET_NAME = bucket_name
S3_REGION = region
S3_ACCESS_KEY = access_key
S3_SECRET_KEY = secret_key
```

### Then run the local server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Login credentials

#### email: test@foy.com

#### password: Test1234

## To visit the DEMO:

https://file-management-and-drawing.vercel.app

## Feature List

- [x] User Authentication
- [x] File Management System using AWS S3
  - [x] Create Folder
  - [x] Upload File
  - [x] Navigate through folders
  - [x] Preview File
  - [x] Delete File
- [x] Drawing Board
  - [x] Draw
  - [x] Change Brush Size
  - [x] Change Brush Color
  - [x] Add Shapes (Rectangle, Circle, Triangle)
  - [x] Clear Drawing
  - [x] Export Drawing as Image
