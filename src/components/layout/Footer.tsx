
export function Footer() {
    return (
        <footer className="py-8 px-6 text-center text-sm text-muted-foreground bg-background">
            <div className="max-w-[1100px] mx-auto">
                <p>© {new Date().getFullYear()} Ghost of the Mountains. Developed by Macallan Butler.</p>
            </div>
        </footer>
    );
}
