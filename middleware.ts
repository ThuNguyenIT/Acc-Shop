// Protecting routes with next-auth
// https://next-auth.js.org/configuration/nextjs#middleware
// https://nextjs.org/docs/app/building-your-application/routing/middleware

import { NextRequest, NextResponse } from "next/server";
import { setCookie } from "cookies-next";

import { createResponse, getErrorMessage } from "./lib/utils";
import { verifyJwt } from "./lib/jwt";

// Set allowed origins
const allowedOrigins = ["http://localhost:3002", "*"]; // Adjust allowed origins as necessary

// Set CORS options
const corsOptions = {
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// List of routes that require authentication
const protectedRoutes = ["/api/admin/:path*", "/admin/:path*"];

// List of routes to exclude from authentication
const excludedRoutes = ["/admin/auth/signin", "/api/admin/user"];

// Middleware function to handle requests
export async function middleware(req: NextRequest) {
  return NextResponse.next()

  /* const { pathname } = req.nextUrl;
  
  // Exclude specific routes from authentication
  if (excludedRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Bypass middleware for public routes or excluded routes
  if (!protectedRoutes.some(route => pathname.startsWith(route.replace(':path*', '')))) {
    return NextResponse.next()
  }

  const origin = req.headers.get('origin') ?? ''
  const isAllowedOrigin = allowedOrigins.includes(origin) || allowedOrigins.includes('*')

  // Handle preflight (OPTIONS) requests
  const isPreflight = req.method === 'OPTIONS'
  if (isPreflight) {
    const preflightHeaders = {
      ...(isAllowedOrigin && { 'Access-Control-Allow-Origin': origin }),
      ...corsOptions,
    }
    return createResponse('', null, 204, preflightHeaders)
  }

  // Extract and verify JWT from Authorization header
  const authHeader = req.headers.get('Authorization')
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    if (req.nextUrl.pathname.startsWith('/api')) {
      return createResponse('Vui lòng đăng nhập', null, 401)
    }

    // Redirect for non-API requests
    return NextResponse.redirect(new URL('/admin/auth/signin', req.url))
  }

  const token = authHeader.split(' ')[1] // Extract the token from "Bearer <token>"

  try {
    // Verify the token using the JWT_SECRET
    const payload = await verifyJwt(token)
    const sessionId = payload.session_id || ''

    // Proceed with the request
    setCookie('sessionId', sessionId, { httpOnly: true, secure: process.env.NODE_ENV === 'production' })
    
    // Token is valid, proceed with the request
    return NextResponse.next()
  } catch (error) {
    if (req.nextUrl.pathname.startsWith('/api')) {
      return createResponse(getErrorMessage(error), null, 401)
    }

    // Redirect to login page for non-API requests
    return NextResponse.redirect(new URL('/admin/auth/signin', req.url))
  } */
}

export const config = { matcher: ["/api/admin/:path*", "/admin/:path*"] };
