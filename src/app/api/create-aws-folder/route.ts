import { NextResponse } from 'next/server'

import s3 from '@/lib/aws'

export async function POST(req: Request) {
  const { folderName } = await req.json()

  if (!folderName) {
    return NextResponse.json(
      { message: 'Folder name is required' },
      { status: 400 }
    )
  }

  const params = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: `${folderName}/`, // S3 uses '/' to represent folders
  }

  try {
    await s3.putObject(params).promise()
    return NextResponse.json({ message: 'Folder created successfully' })
  } catch (error) {
    return NextResponse.json(
      { message: `Error creating folder: ${(error as Error).message}` },
      { status: 500 }
    )
  }
}
