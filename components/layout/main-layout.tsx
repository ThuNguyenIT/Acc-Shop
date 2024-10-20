import Header from "../header/header";
import Footer from "./footer";
import Navbar from "./navbar";

export default function MainLayout({
    children
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen flex-col">
            <main className="w-full flex-1 overflow-auto">
                <Header />
                <Navbar />
                <div className="p-4">
                    {children} {/* Hiển thị nội dung của các trang con */}
                </div>
                <Footer />
            </main>
        </div>
    );
}