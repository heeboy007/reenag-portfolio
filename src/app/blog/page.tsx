import ThemeTogger from "@/component/home/ThemeToggler";

function Blog() {
    return <div className="flex flex-col tablet:flex-row min-h-screen bg-background-primary font-sans dark:bg-black relative">
        <h1>
            Blog page will be constructed soon.
        </h1>
        <div className="absolute bottom-0 right-0 p-4">
            <ThemeTogger />
        </div>
    </div>;
}

export default Blog;