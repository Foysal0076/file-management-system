import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    message: 'Welcome to NextJS + Tailwind CSS Boilerplate',
  })
}
