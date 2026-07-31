import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder',
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  // Protect admin, agent, and owner dashboard paths. Allow /owner/claim/[token] to be public.
  const isProtected = path.startsWith('/admin') || path.startsWith('/agent') || path.startsWith('/owner/dashboard');

  if (isProtected) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/login';
      return NextResponse.redirect(url);
    }

    // Fetch role from profiles table
    const { data: profile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .single();

    const role = profile?.role || 'agent';

    if (path.startsWith('/admin') && role !== 'admin') {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }
    if (path.startsWith('/agent') && role !== 'agent' && role !== 'admin') {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }
    if (path.startsWith('/owner/dashboard') && role !== 'owner' && role !== 'admin') {
      return NextResponse.redirect(new URL(`/${role}/dashboard`, request.url));
    }
  }

  return supabaseResponse;
}

export const config = {
  matcher: ['/admin/:path*', '/agent/:path*', '/owner/dashboard/:path*'],
};
