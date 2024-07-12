import { DeleteObjectsCommand, ListObjectsV2Command } from '@aws-sdk/client-s3'
import { NextResponse } from 'next/server'

import s3Client from '@/lib/aws'

export async function POST(request: Request) {
  try {
    const { folderName } = await request.json()

    if (!folderName) {
      return NextResponse.json(
        { message: 'Folder name is required' },
        { status: 400 }
      )
    }

    // List all objects in the folder
    const listParams = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Prefix: `${folderName}`,
    }

    const listResponse = await s3Client.send(
      new ListObjectsV2Command(listParams)
    )
    const objectsToDelete =
      listResponse.Contents?.map((item) => ({ Key: item.Key! })) || []

    if (objectsToDelete.length === 0) {
      return NextResponse.json(
        { message: 'No objects found in the folder' },
        { status: 404 }
      )
    }

    // Delete all objects in the folder
    const deleteParams = {
      Bucket: process.env.S3_BUCKET_NAME!,
      Delete: {
        Objects: objectsToDelete,
      },
    }

    await s3Client.send(new DeleteObjectsCommand(deleteParams))
    return NextResponse.json({
      message: 'Folder and its contents deleted successfully',
    })
  } catch (error: any) {
    console.error('Error deleting folder and files', error)
    return NextResponse.json(
      { message: `Error deleting folder and files: ${error.message}` },
      { status: 500 }
    )
  }
}
