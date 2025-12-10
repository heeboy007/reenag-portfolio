import ThemeTogger from "@/component/home/ThemeToggler";
import ToyingSection from "@/component/home/ToyingSection";
import { MobileMockUp } from "@/component/shared/MobileMockUp";
import Image from "next/image";
import Link from "next/link";

const buttonStyle = "block w-full text-center py-3 px-4 rounded-md border border-transparent bg-background-button transform hover:scale-105 hover:bg-background-button-hover transition duration-300";
const sectionStyle = "hero-section h-screen tablet:snap-start bg-background-primary pt-5";
const mainTextStyle = "mx-auto text-center tablet:text-2xl desktop:text-4xl font-bold text-foreground-primary";
const mainTextStyleBlack = "mx-auto text-center tablet:text-2xl desktop:text-4xl font-bold text-black";
const subTextStyle = "mx-auto text-center tablet:text-lg desktop:text-2xl font-bold text-black mt-4";

function Home() {
    return (
        <div className="flex flex-col tablet:flex-row min-h-screen bg-background-primary font-sans dark:bg-black">
            <div className="w-full tablet:w-1/3 desktop:w-1/6 h-screen bg-background-secondary tablet:sticky tablet:top-0 flex items-center justify-center">
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
            <div className="w-full tablet:w-2/3 desktop:w-5/6 ml-auto overflow-y-auto snap-y snap-mandatory h-screen">
                <section className={sectionStyle}>
                    <h1 className={mainTextStyle}>
                        Machine Learning Engineer & Systems Thinker.
                        <br />
                        <span className="text-point font-semibold">ReenAG</span>
                    </h1>
                    <ToyingSection />
                </section>

                <section className={`${sectionStyle} bg-hero-gradient flex flex-col justify-center items-center`}>
                    <h1 className={`${mainTextStyle} text-gradient mb-4`}>
                        I build models, pipelines, and real-world systems that 
                        <br />
                        <span className="italic font-semibold">actually work.</span>
                    </h1>
                    <MobileMockUp width={380} files={[
                        "/proj1/screenshots/mobile/login.png",
                        "/proj1/screenshots/mobile/tutorial.png",
                    ]} />
                </section>

                <section className={`${sectionStyle} bg-point`}>
                    <h1 className={`${mainTextStyleBlack}`}>
                        I work across multiple domains and connect them through
                        <br />
                        <span className="italic font-semibold">a single principle </span>
                        : understanding the system as a whole.
                    </h1>
                    <h3 className={subTextStyle}>
                        ML, devOps, blockchain, databases —
                        to design solutions with depth and practical impact.
                    </h3>
                    <Image src="/proj1/architecture.png" alt="architecture" width={1000} height={1000} className="object-cover" />
                </section>
            </div>
        </div>
    );
}

export default Home;