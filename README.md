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

## Note

I believe the time allocated for the task was quite limited to implement all the features described. Nonetheless, I successfully implemented user authentication and route protection using NextAuth. Additionally, I developed a file explorer/management system using an Amazon S3 bucket. The file management features I implemented include fetching files and folders, creating new sub-folders, navigating through folders, uploading images and PDFs, and previewing them.

Regarding the drawing functionality, it proved to be more complex and required a significant amount of time. Nevertheless, I was able to implement some drawing features and enable downloading the drawings as images.
