import { NextRequest, NextResponse } from 'next/server'

import { dummyUsers } from '@/auth/dummyData'
import { authService } from '@/auth/services'

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    //read authorization header
    const authHeader = req.headers.get('authorization')
    if (!authHeader) {
      //return error
      return NextResponse.json(
        {
          message: 'Unauthorized',
        },
        { status: 401 }
      )
    }
    const tokenVerified = authService.verifyToken(authHeader)
    if (!tokenVerified) {
      return NextResponse.json(
        {
          message: 'Unauthorized',
        },
        { status: 401 }
      )
    }
    // console.log(tokenVerified)
    const dummyUser = dummyUsers.find((user) => user.id === tokenVerified.id)
    const user: any = structuredClone(dummyUser)
    delete user.password

    return NextResponse.json({
      ...user,
    })
  } catch (error: any) {
    const errorMessage = error.message || 'Internal Server Error'
    return NextResponse.json(
      {
        message: errorMessage,
      },
      { status: 401 }
    )
  }
}
