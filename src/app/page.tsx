import ThemeTogger from "@/component/home/ThemeToggler";
import ToyingSection from "@/component/home/ToyingSection";
import Image from "next/image";
import Link from "next/link";

const buttonStyle = "block w-full text-center py-3 px-4 rounded-md border border-transparent bg-background-button transform hover:scale-105 hover:bg-background-button-hover transition duration-300";

function Home() {
    return (
        <div className="flex min-h-screen bg-background-primary font-sans dark:bg-black">
            <div className="w-1/3 desktop:w-1/6 bg-background-secondary fixed h-full flex items-center justify-center">
                <nav className="space-y-4">
                    <Link
                        className="w-full flex items-center justify-center bg-transparent border border-transparent transform transition duration-300" 
                        href="/">
                        <Image src="/icon.png" alt="ReenAG" width={70} height={70} className="rounded-full" />
                    </Link>
                    <Link
                        className={buttonStyle}
                        href="/about">
                        <span className="text-2xl font-bold text-foreground-primary">About</span>
                    </Link>
                    <Link
                        className={buttonStyle}
                        href="/projects">
                        <span className="text-2xl font-bold text-foreground-primary">Projects</span>
                    </Link>
                    <Link
                        className={buttonStyle}
                        href="/contact">
                        <span className="text-2xl font-bold text-foreground-primary">Contact</span>
                    </Link>
                    <ThemeTogger />
                </nav>
            </div>
            <div className="w-2/3 desktop:w-5/6 ml-auto overflow-y-auto snap-y snap-mandatory">
                <section className="hero-section h-screen snap-start bg-background-primary">
                    <h1 className="mx-auto my-5 text-center text-4xl font-bold text-foreground-primary">Hi, I'm data scientist and engineer,<br></br> ReenAG.</h1>
                    <ToyingSection />
                </section>
            </div>
        </div>
    );
}

export default Home;