// app/api/uploadFile/route.ts
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

import s3Client from '@/lib/aws'

export const config = {
  api: {
    bodyParser: false,
  },
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const folderName = formData.get('folderName') as string
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ message: 'File is required' }, { status: 400 })
    }

    const arrayBuffer = await file.arrayBuffer()
    const params = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: `${folderName}${file.name}`,
      Body: Buffer.from(arrayBuffer),
      ContentType: file.type,
    }

    await s3Client.send(new PutObjectCommand(params))
    return NextResponse.json({ message: 'File uploaded successfully' })
  } catch (error: any) {
    console.error('Error uploading file', error)
    return NextResponse.json(
      { message: `Error uploading file: ${error.message}` },
      { status: 500 }
    )
  }
}
