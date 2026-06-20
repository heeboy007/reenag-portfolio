import ThemeToggler from "@/component/home/ThemeToggler";
import MyPrettyButton from "@/component/shared/MyPrettyButton";
import { getAllPosts } from "@/util/mdx";
import Image from "next/image";
import Link from "next/link";

function Blog() {
  const posts = getAllPosts();

  const listDescription = (desciption: string | undefined, content: string) => {
    if(desciption != undefined && desciption.length > 0)
        return desciption
    else
        return content.slice(0, 30) + "...";
  }

  const getThumbnail = (thumbnail: string | undefined) => {
    if(thumbnail)
        return `${thumbnail}`
    else 
        return null
}

  return (
        <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '0 20px' }}>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '24px' }}>
                ReenAG's Blog
            </h1>

            <MyPrettyButton title='go back' href='/'>
                <div style={{ margin: '2px' }}>
                    <p style={{  color: 'text-foreground-primary', textDecoration: 'none'  }}>⬅️ back</p>
                </div>
            </MyPrettyButton>
        
            <ul style={{ display: 'flex', flexDirection: 'column', gap: '16px', listStyle: 'none', padding: 0, paddingTop: '8px' }}>
                {posts.map((post) => (
                <li key={post.slug} style={{ borderBottom: '1px solid text-foreground-secondary', paddingBottom: '16px' }}>
                    <div style={{display: 'flex', flexDirection: 'row', minHeight: "100px" }}>
                        {post.meta.thumbnail ?
                            <div className="border border-foreground-primary rounded-lg w-[100px] h-[100px] mr-[10px] relative overflow-hidden">
                                <Image 
                                alt="thumbnail" 
                                fill
                                className="object-cover"
                                src={`/api/blog/images/${getThumbnail(post.meta.thumbnail)}`} /> 
                            </div>
                        : <></>}

                        <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                            <Link 
                                href={`/blog/contents/${post.slug}`}
                                style={{ fontSize: '1.25rem', color: 'text-foreground-primary', textDecoration: 'none', fontWeight: '600' }}
                                >
                                {post.meta.title}
                            </Link>

                            <p style={{ color: 'text-foreground-button', fontSize: '0.9rem', margin: '4px 0' }}>
                                {listDescription(post.meta.smalltitle, post.content)}
                            </p>

                            <small style={{ color: 'text-foreground-button-hover' }}>
                                {new Date(post.meta.date).toLocaleDateString('en-US')}
                            </small>
                        </div>
                    </div>
                    <hr style={{ marginTop: "8px" }}></hr>
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