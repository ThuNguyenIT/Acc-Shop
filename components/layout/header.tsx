import ThemeToggle from "@/components/layout/ThemeToggle/theme-toggle";
import { cn } from "@/lib/utils";
import { MobileSidebar } from "./mobile-sidebar";
import { UserNav } from "./user-nav";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function Header() {
  const session = await auth();
  console.log("session", session);

  if (!session) {
    return redirect("/auth/signin");
  }

  return (
    <header className='sticky inset-x-0 top-0 w-full'>
      <nav className='flex items-center justify-between px-4 py-2 md:justify-end'>
        <div className={cn("block lg:!hidden")}>
          <MobileSidebar />
        </div>
        <div className='flex items-center gap-2'>
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
