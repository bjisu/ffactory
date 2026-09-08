import { NextResponse } from "next/server";
import { findTag, issueToken } from "@/lib/tags";

/** 등록 처리 후 토큰을 발급합니다. 브라우저는 이 토큰을 보관합니다. */
export async function POST(request: Request) {
  let tagId: string | null = null;
  try {
    const body = (await request.json()) as { tag?: unknown };
    if (typeof body.tag === "string") tagId = body.tag;
  } catch {
    // 본문이 없거나 JSON이 아니면 아래에서 400으로 떨어집니다
  }

  const tag = findTag(tagId);
  if (!tag) {
    return NextResponse.json(
      { ok: false, reason: tagId ? "unknown" : "missing" },
      { status: 400 }
    );
  }

  return NextResponse.json({
    ok: true,
    tagId: tag.tagId,
    serialNumber: tag.serialNumber,
    token: issueToken(tag.tagId),
    registeredAt: new Date().toISOString(),
  });
}
