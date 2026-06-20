import ThemeToggler from "@/component/home/ThemeToggler";
import MyPrettyButton from "@/component/shared/MyPrettyButton";
import { getAllPosts } from "@/util/mdx";
import Link from "next/link";

function Blog() {
  const posts = getAllPosts();

  return (
        <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '24px' }}>
                ReenAG's Blog
            </h1>

            <MyPrettyButton title='돌아가기' href='/'>
                <div style={{ margin: '2px' }}>
                    <p style={{  color: 'text-foreground-primary', textDecoration: 'none'  }}>⬅️ back</p>
                </div>
            </MyPrettyButton>
        
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none', padding: 0, paddingTop: '8px' }}>
                {posts.map((post) => (
                <li key={post.slug} style={{ borderBottom: '1px solid #eee', paddingBottom: '16px' }}>
                    <Link 
                        href={`/blog/contents/${post.slug}`}
                        style={{ fontSize: '1.25rem', color: '#0070f3', textDecoration: 'none', fontWeight: '600' }}
                        >
                        {post.meta.title}
                    </Link>
                    <p style={{ color: '#666', fontSize: '0.9rem', margin: '4px 0' }}>
                        {post.meta.description}
                    </p>
                    <small style={{ color: '#999' }}>
                        {new Date(post.meta.date).toLocaleDateString('en-US')}
                    </small>
                </li>
                ))}
            </ul>
            <div className="absolute bottom-0 right-0 p-4">
                <ThemeToggler />
            </div>
        </div>
    );
}

export default Blog;