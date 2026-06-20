import ThemeTogger from "@/component/home/ThemeToggler";
import MyPrettyButton from "@/component/shared/MyPrettyButton";

function Contacts() {
    return <div className="flex flex-col tablet:flex-row min-h-screen bg-background-primary font-sans dark:bg-black relative">
        <h1>
            Projects page will be constructed soon.
        </h1>
        <div>
            <MyPrettyButton title='back' href='/'>
                <div style={{ margin: '2px' }}>
                    <p style={{  color: 'text-foreground-primary', textDecoration: 'none'  }}>⬅️ back</p>
                </div>
            </MyPrettyButton>
        </div>
        <div className="absolute bottom-0 right-0 p-4">
            <ThemeTogger />
        </div>
    </div>;
}

export default Contacts;