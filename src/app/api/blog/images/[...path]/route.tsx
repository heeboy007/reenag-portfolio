// src/app/api/blog-images/[...path]/route.ts
import fs from 'fs';
import path from 'path';
import { NextResponse } from 'next/server';

// 마크다운 글이 저장된 이미지 저장소의 절대 경로
const VAULT_IMAGE_PATH = path.join(process.cwd(), 'blog_vault/Blog/Assets/Images');

export async function GET(
  request: Request,
  { params }: { params: Promise<{ path: string[] }> }
) {
  const { path: imagePathArray } = await params;
  
  // 배열로 들어온 경로를 합칩니다. (예: ['subdirectory', 'thumbnail.png'])
  const imagePath = imagePathArray.map(decodeURIComponent).join('/');
  const fullPath = path.join(VAULT_IMAGE_PATH, imagePath);

  // 파일이 존재하는지 보안 체크 겸 확인
  fs.statSync(VAULT_IMAGE_PATH);

  const doesExist = fs.existsSync(fullPath);
  const isDirectory = fs.statSync(fullPath).isDirectory();

  if (!doesExist || isDirectory) {
    return new NextResponse('Image Not Found', { status: 404 });
  }

  // 파일 읽기
  const fileBuffer = fs.readFileSync(fullPath);
  
  // 확장자에 따른 Content-Type 지정
  const ext = path.extname(fullPath).toLowerCase();
  let contentType = 'image/jpeg';
  if (ext === '.png') contentType = 'image/png';
  if (ext === '.webp') contentType = 'image/webp';
  if (ext === '.gif') contentType = 'image/gif';
  if (ext === '.svg') contentType = 'image/svg+xml';

  return new NextResponse(fileBuffer, {
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=31536000, immutable', // 이미지 캐싱 처리
    },
  });
}