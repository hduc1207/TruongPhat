import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/utils/verify-token";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminToken())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const body = await request.json();
    const res = await fetch(`${BASE_URL}/categories/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    return NextResponse.json(await res.json(), { status: res.status });
  } catch {
    return NextResponse.json({ error: "Lỗi cập nhật" }, { status: 500 });
  }
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminToken())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const { id } = await params;
    const res = await fetch(`${BASE_URL}/categories/${id}`, { method: "DELETE" });
    if (!res.ok) return NextResponse.json({ error: "Xóa thất bại" }, { status: res.status });
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Lỗi kết nối" }, { status: 500 });
  }
}
