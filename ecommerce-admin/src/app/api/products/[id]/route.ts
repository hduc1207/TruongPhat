import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/utils/verify-token";

const BASE_URL = "https://z5m5voxdhc.execute-api.ap-southeast-1.amazonaws.com/Stage";

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminToken())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    // Validate ID không rỗng và không chứa ký tự nguy hiểm
    if (!id || !/^[\w-]+$/.test(id)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const res = await fetch(`${BASE_URL}/products/${id}`, { method: "DELETE" });
    if (!res.ok) {
      return NextResponse.json({ error: "Xóa thất bại" }, { status: res.status });
    }
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Lỗi kết nối" }, { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!(await verifyAdminToken())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id } = await params;

    if (!id || !/^[\w-]+$/.test(id)) {
      return NextResponse.json({ error: "ID không hợp lệ" }, { status: 400 });
    }

    const body = await request.json();
    const res = await fetch(`${BASE_URL}/products/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Lỗi cập nhật" }, { status: 500 });
  }
}

export const dynamic = 'force-static';
export function generateStaticParams() { return [{ id: 'dummy' }]; }
