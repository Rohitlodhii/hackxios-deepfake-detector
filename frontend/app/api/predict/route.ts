import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();

  const backendUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL ||
    "http://localhost:8000";

  const res = await fetch(`${backendUrl}/predict`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();

  return Response.json(data);
}
