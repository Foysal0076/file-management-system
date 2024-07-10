// app/api/getSignedUrl/route.ts
import { GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/auth/options'
import s3Client from '@/lib/aws'

export async function GET(request: Request) {
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }
  const { searchParams } = new URL(request.url)
  const key = searchParams.get('key')

  if (!key) {
    return NextResponse.json(
      { message: 'File key is required' },
      { status: 400 }
    )
  }

  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: key,
  }

  try {
    const command = new GetObjectCommand(params)
    const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 })
    return NextResponse.json({ url })
  } catch (error) {
    return NextResponse.json(
      { message: `Error generating signed URL: ${(error as Error).message}` },
      { status: 500 }
    )
  }
}
