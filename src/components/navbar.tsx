import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { MainNav } from "@/components/main-nav";
import StoreSwitcher from "@/components/store-switcher";
import { getStoresByUserId } from "@/actions/store/find-store";
import { ThemeToggle } from "@/components/theme-toogle";

async function Navbar() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const stores = await getStoresByUserId(userId);

  return (
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores!} />
        <MainNav className="mx-6" />
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
