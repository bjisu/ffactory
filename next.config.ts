import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 개발 중 왼쪽 아래에 뜨는 Next 배지가 화면을 가려서 끕니다 (개발 전용 표시)
  devIndicators: false,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
    ],
  },
};

export default nextConfig;
