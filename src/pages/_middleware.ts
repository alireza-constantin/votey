import { NextFetchEvent, NextRequest, NextResponse } from 'next/server'
import { nanoid } from 'nanoid'

export function middleware(req: NextRequest, ev: NextFetchEvent) {
    if (req.cookies['poll-token']) return;

    const random = nanoid()

    const res = NextResponse.redirect(req.nextUrl)
    res.cookie('poll-token', random, {
        sameSite: 'strict',
        httpOnly: true,
        maxAge: 43800 * 60 * 1000 // one month
    })

    return res;
}

