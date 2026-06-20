// src/app/posts/[slug]/page.tsx
import ThemeToggler from '@/component/home/ThemeToggler';
import MyPrettyButton from '@/component/shared/MyPrettyButton';
import { getPostBySlug, getPostSlugs } from '@/util/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Image from 'next/image';
import { notFound } from 'next/navigation';

import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

interface Props {
  params: Promise<{ slug: string[] }>;
}

const mdxComponents = {
    // 마크다운의 ![alt](src) 문법은 HTML의 img 태그로 치환되는데, 
    // 그걸 Next.js의 고성능 <Image /> 컴포넌트로 강제 매핑합니다.
    img: (props: any) => (
        <span style={{ display: 'block', position: 'relative', width: '100%', height: '400px', margin: '2rem 0' }}>
            <Image
                src={props.src}
                alt={props.alt || '본문 이미지'}
                fill
                style={{ objectFit: 'contain' }}
                sizes="(max-width: 768px) 100vw, 700px"
            />
        </span>
    ),
};

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
            <article style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px 20px', lineHeight: 1.7 }}>
                <div className="absolute top-0 left-0 p-4">
                    <MyPrettyButton title='back' href='/blog'>
                        <div style={{ margin: '2px' }}>
                            <p style={{  color: 'text-foreground-primary', textDecoration: 'none'  }}>⬅️ to list</p>
                        </div>
                    </MyPrettyButton>
                </div>
                
                <h1 style={{ fontSize: '2.5rem', marginTop: '20px', marginBottom: '8px', lineHeight: 1.2 }}>{post.meta.title}</h1>
                    <p style={{ color: '#999', marginBottom: '24px' }}>
                        {new Date(post.meta.date).toLocaleDateString('en-US')}
                    </p>
                <hr style={{ border: 0, borderTop: '1px solid text-foreground-primary', marginBottom: '32px' }} />
                
                {/* 마크다운 본문이 HTML로 파싱되어 들어가는 부분 */}
                <div className="prose">
                    <MDXRemote 
                        source={post.content} 
                        components={mdxComponents} 
                        options={{
                            mdxOptions: {
                                remarkPlugins: [remarkMath],
                                rehypePlugins: [rehypeKatex],
                            }
                        }} />
                </div>

                <div className="absolute bottom-0 right-0 p-4 prose">
                    <ThemeToggler />
                </div>
            </article>
        );
    } catch (error) {
        // 파일을 읽다 에러가 나거나 없는 파일이면 404 페이지로 보냄
        notFound();
    }
}