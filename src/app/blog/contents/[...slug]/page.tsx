// src/app/posts/[slug]/page.tsx
import MyPrettyButton from '@/component/shared/MyPrettyButton';
import { getPostBySlug, getPostSlugs } from '@/util/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ slug: string[] }>;
}

// 1. 빌드 시점에 어떤 페이지들을 정적으로 만들지 Next.js에게 알려줍니다. (SSG 핵심)
export async function generateStaticParams() {
  const slugs = getPostSlugs(); // 예: ['/tech/nextjs/my-post.md', '/life/diary.md']
  
  return slugs.map((slug) => {
    // 앞뒤 슬래시를 정리하고 확장자를 뗀 후 배열로 분할
    const cleaned = slug.replace(/^\/|\.md$/g, ''); 
    return {
      slug: cleaned.split('/'), // 예: ['tech', 'nextjs', 'my-post']
    };
  });
}

// 2. 실제 본문이 렌더링되는 컴포넌트
export default async function PostPage({ params }: Props) {
    const { slug } = await params;
    const decodedSlug = slug.map(decodeURIComponent).join('/');
    
    try {
        const post = getPostBySlug(decodedSlug);

        return (
            <article style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px', lineHeight: 1.7 }}>
                <MyPrettyButton title='back' href='/blog'>
                    <div style={{ margin: '2px' }}>
                        <p style={{  color: 'text-foreground-primary', textDecoration: 'none'  }}>⬅️ to list</p>
                    </div>
                </MyPrettyButton>
                
                <h1 style={{ fontSize: '2.5rem', marginTop: '8px', marginBottom: '8px', lineHeight: 1.2 }}>{post.meta.title}</h1>
                    <p style={{ color: '#999', marginBottom: '24px' }}>
                        {new Date(post.meta.date).toLocaleDateString('en-US')}
                    </p>
                <hr style={{ border: 0, borderTop: '1px solid text-foreground-primary', marginBottom: '32px' }} />
                
                {/* 마크다운 본문이 HTML로 파싱되어 들어가는 부분 */}
                <div className="prose">
                    <MDXRemote source={post.content} />
                </div>
            </article>
        );
    } catch (error) {
        // 파일을 읽다 에러가 나거나 없는 파일이면 404 페이지로 보냄
        notFound();
    }
}