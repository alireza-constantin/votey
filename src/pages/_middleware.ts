import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    if (req.cookies['poll-cookie']) return

    const res = NextResponse.next()
    const random = nanoid()

    res.cookie('poll-cookie', random, {
        sameSite: 'strict',
        httpOnly: true
    })

    return res;
}

