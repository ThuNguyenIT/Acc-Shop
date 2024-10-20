

export default function MainLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen flex-col">
            <main className="w-full flex-1 overflow-auto">
                {children}
            </main>
        </div>
    );
}