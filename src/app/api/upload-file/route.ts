// app/api/uploadFile/route.ts
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { File } from 'formidable'
import { readFileSync } from 'fs'
import { NextResponse } from 'next/server'

import s3 from '@/lib/aws'

const uploadFile = async (file: File, folderName: string) => {
  const fileContent = readFileSync(file.filepath)
  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `${folderName}/${file.originalFilename}`,
    Body: fileContent,
    ContentType: file.mimetype || 'application/octet-stream',
  }
  const command = new PutObjectCommand(params)
  return s3.send(command)
}

export async function POST(request: Request) {
  const formData = await request.formData()

  const folderName = formData.get('folderName') as string
  const file = formData.get('file') as unknown as File

  if (!folderName || !file) {
    return NextResponse.json(
      { message: 'Folder name and file are required' },
      { status: 400 }
    )
  }

  try {
    await uploadFile(file, folderName)
    return NextResponse.json({ message: 'File uploaded successfully' })
  } catch (error) {
    return NextResponse.json(
      { message: `Error uploading file: ${(error as Error).message}` },
      { status: 500 }
    )
  }
}
