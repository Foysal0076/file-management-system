// app/api/listFiles/route.ts
import { ListObjectsV2Command } from '@aws-sdk/client-s3'
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
  const Prefix = searchParams.get('folder') ?? ''

  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Prefix,
    Delimiter: '/',
  }

  try {
    const data = await s3Client.send(new ListObjectsV2Command(params))

    let files =
      data.Contents?.map((item) => ({
        key: item.Key,
        lastModified: item.LastModified,
        size: item.Size,
      })) ?? []

    files = [...files.filter((file: any) => file.size > 0)]

    const folders =
      data.CommonPrefixes?.map((item) => ({
        prefix: item.Prefix,
      })) ?? []

    return NextResponse.json({ files, folders })
  } catch (error) {
    return NextResponse.json(
      { message: `Error fetching files: ${(error as Error).message}` },
      { status: 500 }
    )
  }
}
