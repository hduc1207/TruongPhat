import { NextResponse } from "next/server";
import { verifyAdminToken } from "@/utils/verify-token";

const BASE_URL = "https://z5m5voxdhc.execute-api.ap-southeast-1.amazonaws.com/Stage";

export async function GET() {
  // Xác thực token trước khi proxy lên AWS
  if (!(await verifyAdminToken())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const res = await fetch(`${BASE_URL}/products`, { cache: "no-store" });
    if (!res.ok) {
      return NextResponse.json([], { status: res.status });
    }
    const data = await res.json();
    const raw: unknown[] = Array.isArray(data) ? data : ((data as any).value ?? []);
    const products = raw.map((p: any) => ({
      ...p,
      price: typeof p.price === "number" ? p.price : Number(p.price) || 0,
    }));
    return NextResponse.json(products);
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

    // Validate các trường bắt buộc
    if (!body?.name || typeof body.name !== "string" || body.name.trim() === "") {
      return NextResponse.json({ error: "Tên sản phẩm là bắt buộc" }, { status: 400 });
    }

    const res = await fetch(`${BASE_URL}/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await res.json();
    return NextResponse.json(data, { status: res.status });
  } catch {
    return NextResponse.json({ error: "Lỗi tạo sản phẩm" }, { status: 500 });
  }
}

export const dynamic = 'force-static';
