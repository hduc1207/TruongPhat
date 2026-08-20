import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/utils/verify-token";

const BASE_URL = "https://z5m5voxdhc.execute-api.ap-southeast-1.amazonaws.com/Stage";

export async function GET() {
  if (!(await verifyAdminToken())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const res = await fetch(`${BASE_URL}/categories`, { cache: "no-store" });
    if (!res.ok) return NextResponse.json([], { status: res.status });
    return NextResponse.json(await res.json());
  } catch {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await verifyAdminToken())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const body = await request.json();
    if (!body?.name?.trim()) {
      return NextResponse.json({ error: "Tên danh mục là bắt buộc" }, { status: 400 });
    }
    const res = await fetch(`${BASE_URL}/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return NextResponse.json(await res.json(), { status: res.status });
  } catch {
    return NextResponse.json({ error: "Lỗi tạo danh mục" }, { status: 500 });
  }
}

export const dynamic = 'force-static';
