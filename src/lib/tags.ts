import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * 태그 검증 로직. API 라우트에서만 import 하세요 (클라이언트 번들에 들어가면
 * 시크릿이 노출됩니다).
 *
 * 이 프로젝트에는 데이터베이스가 없어서 발행 목록을 코드에 두고, 등록 상태는
 * 서버가 발급한 토큰 자체로 증명합니다(HMAC). 실서비스로 가면 발행 목록과
 * 등록 이력을 DB로 옮기고, 토큰에 만료·폐기 처리를 붙여야 합니다.
 */

/** 발행된 태그 목록. NFC 태그에 이 id를 쿼리로 넣어 인코딩합니다 */
const ISSUED_TAGS: Record<string, { serialNumber: number }> = {
  "BP-DL-001847": { serialNumber: 1847 },
  "BP-DL-000001": { serialNumber: 1 },
  "BP-DL-004999": { serialNumber: 4999 },
};

/** 시크릿이 바뀌면 기존에 발급한 토큰은 모두 무효가 됩니다 */
function secret(): string {
  return process.env.TAG_SECRET ?? "ffactory-demo-secret";
}

export type IssuedTag = { tagId: string; serialNumber: number };

export function findTag(tagId: string | null): IssuedTag | null {
  if (!tagId) return null;
  const found = ISSUED_TAGS[tagId];
  return found ? { tagId, serialNumber: found.serialNumber } : null;
}

export function issueToken(tagId: string): string {
  return createHmac("sha256", secret()).update(tagId).digest("base64url");
}

/** 길이가 다르면 timingSafeEqual이 던지므로 먼저 걸러 냅니다 */
export function verifyToken(tagId: string, token: string | null): boolean {
  if (!token) return false;
  const expected = Buffer.from(issueToken(tagId));
  const given = Buffer.from(token);
  if (expected.length !== given.length) return false;
  return timingSafeEqual(expected, given);
}
