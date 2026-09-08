import { NextResponse } from "next/server";
import { findTag, verifyToken } from "@/lib/tags";

/**
 * 태그 URL로 들어왔을 때 정품 여부를 확인합니다.
 * token까지 함께 보내면 이미 등록된 태그인지도 알려 줍니다.
 */
export async function GET(request: Request) {
  const url = new URL(request.url);
  const tagId = url.searchParams.get("tag");
  const token = url.searchParams.get("token");

  const tag = findTag(tagId);
  if (!tag) {
    return NextResponse.json(
      { valid: false, reason: tagId ? "unknown" : "missing" },
      { status: 404 }
    );
  }

  return NextResponse.json({
    valid: true,
    tagId: tag.tagId,
    serialNumber: tag.serialNumber,
    registered: verifyToken(tag.tagId, token),
  });
}
