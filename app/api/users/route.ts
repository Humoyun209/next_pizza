import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    return NextResponse.json({ ok: true }, { status: 200 })
}
