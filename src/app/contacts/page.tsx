import ThemeTogger from "@/component/home/ThemeToggler";
import Link from "next/link";

function Contacts() {
    return <div className="tablet:flex-row min-h-screen bg-background-primary font-sans dark:bg-black flex relative">
        <div className="flex flex-1 flex-col justify-center items-center">
            <h2 className="text-2xl font-bold text-foreground-primary">Global Contacts</h2>
            <p>Email: <span className="text-foreground-primary">heeboy007@gmail.com</span></p>
            <Link 
                href="https://www.linkedin.com/in/doesn-twork-well-865b17317/" 
                className="w-100 text-3xl flex justify-center items-center gap-2 mt-2 py-4 border border-foreground-primary rounded-3xl">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.8v2.2h.1c.5-.9 1.8-2.2 3.9-2.2 4.2 0 5 2.8 5 6.5V24h-4v-8.2c0-2 0-4.5-2.8-4.5-2.8 0-3.2 2.2-3.2 4.3V24h-4V8z"/>
                </svg>
                LinkedIn
            </Link>
            <Link 
                href="https://github.com/heeboy007" 
                className="w-100 text-3xl flex justify-center items-center gap-2 mt-2 py-4 border border-foreground-primary rounded-3xl">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.43 7.86 10.96.58.11.79-.25.79-.56v-2c-3.2.7-3.87-1.55-3.87-1.55-.53-1.37-1.3-1.74-1.3-1.74-1.07-.75.08-.74.08-.74 1.18.09 1.8 1.22 1.8 1.22 1.05 1.82 2.75 1.3 3.42.99.11-.76.41-1.3.74-1.6-2.55-.29-5.23-1.29-5.23-5.75 0-1.27.45-2.32 1.2-3.14-.12-.3-.52-1.52.11-3.17 0 0 .98-.32 3.2 1.2a11 11 0 0 1 5.82 0c2.22-1.52 3.2-1.2 3.2-1.2.63 1.65.23 2.87.11 3.17.75.82 1.2 1.87 1.2 3.14 0 4.47-2.69 5.45-5.25 5.74.42.36.79 1.07.79 2.18v3.23c0 .31.21.68.8.56A10.54 10.54 0 0 0 23.5 12C23.5 5.74 18.27.5 12 .5z"/>
                </svg>
                GitHub
            </Link>
            <Link
                href="https://discord.com/users/579621115778039808"
                className="w-100 text-3xl flex justify-center items-center gap-2 mt-2 py-4 border border-foreground-primary rounded-3xl"
                target="_blank"
                rel="noopener noreferrer">
                    <svg width="40" height="40" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"/>
                    </svg>
                Discord
            </Link>
        </div>
        <div className="absolute bottom-0 right-0 p-4">
            <ThemeTogger />
        </div>
    </div>;
}

export default Contacts;