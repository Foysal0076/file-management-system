import { PutObjectCommand } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/auth/options'
import s3 from '@/lib/aws'

export async function POST(req: Request) {
  //check auth, if no session, return 401
  const session = await getServerSession(authOptions)
  if (!session || !session.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { folderName } = await req.json()

  if (!folderName) {
    return NextResponse.json(
      { message: 'Folder name is required' },
      { status: 400 }
    )
  }

  const params = {
    Bucket: process.env.S3_BUCKET_NAME!,
    Key: `${folderName}/`, // S3 uses '/' to represent folders
  }

  try {
    const command = new PutObjectCommand(params)
    await s3.send(command)
    return NextResponse.json({ message: 'Folder created successfully' })
  } catch (error) {
    return NextResponse.json(
      { message: `Error creating folder: ${(error as Error).message}` },
      { status: 500 }
    )
  }
}
