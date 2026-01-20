import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_ROUTES = ["/", "/register"];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("session")?.value;
  const { pathname } = req.nextUrl;

  // usuário NÃO logado tentando acessar rota protegida
  if (!token && !PUBLIC_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  // usuário LOGADO tentando acessar login/register
// if (token && PUBLIC_ROUTES.includes(pathname)) {
//    return NextResponse.redirect(new URL("/dashboard", req.url));
//  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
