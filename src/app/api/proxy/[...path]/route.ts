import { NextRequest, NextResponse } from "next/server";
import { AUTH_COOKIE } from "@/lib/auth-constants";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL;

if (!BACKEND_URL) {
  console.warn("NEXT_PUBLIC_API_URL is not defined. Proxy routes will fail.");
}

async function handleProxy(request: NextRequest, { params }: { params: { path: string[] } }) {
  if (!BACKEND_URL) {
    return NextResponse.json({ error: "Backend URL is not configured." }, { status: 500 });
  }

  const targetPath = params.path?.join("/") ?? "";
  const targetUrl = new URL(`${BACKEND_URL.replace(/\/$/, "")}/${targetPath}`);

  request.nextUrl.searchParams.forEach((value, key) => {
    targetUrl.searchParams.append(key, value);
  });

  const headers = new Headers(request.headers);
  headers.set("host", targetUrl.host);

  const authToken = request.cookies.get(AUTH_COOKIE)?.value;
  if (authToken) {
    headers.set("Authorization", `Bearer ${authToken}`);
  }

  headers.delete("content-length");

  const init: RequestInit = {
    method: request.method,
    headers,
    redirect: "follow",
  };

  if (request.method !== "GET" && request.method !== "HEAD") {
    init.body = request.body;
  }

  const response = await fetch(targetUrl, init);

  const responseHeaders = new Headers(response.headers);
  responseHeaders.delete("content-encoding");
  responseHeaders.delete("content-length");
  responseHeaders.set("access-control-allow-origin", "*");

  const body = response.body;

  return new NextResponse(body, {
    status: response.status,
    headers: responseHeaders,
  });
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;
export const HEAD = handleProxy;
export const OPTIONS = handleProxy;
