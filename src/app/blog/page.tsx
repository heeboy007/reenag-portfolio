import ThemeTogger from "@/component/home/ThemeToggler";

function Blog() {
    return <div className="flex flex-col tablet:flex-row min-h-screen bg-background-primary font-sans dark:bg-black relative">
        <div className="absolute bottom-0 right-0 p-4">
            <ThemeTogger />
        </div>
    </div>;
}

export default Blog;