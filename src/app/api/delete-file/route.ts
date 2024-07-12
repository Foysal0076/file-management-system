import { DeleteObjectCommand } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

import s3Client from '@/lib/aws'

export async function POST(request: Request) {
  try {
    const { filePath } = await request.json()

    if (!filePath) {
      return NextResponse.json(
        { message: 'File path is required' },
        { status: 400 }
      )
    }

    const deleteParams = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Key: filePath,
    }

    await s3Client.send(new DeleteObjectCommand(deleteParams))

    return NextResponse.json({ message: 'File deleted successfully' })
  } catch (error) {
    console.error('Error deleting file', error)
    return NextResponse.json(
      { message: `Error deleting file: ${(error as Error).message}` },
      { status: 500 }
    )
  }
}
