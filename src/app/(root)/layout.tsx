import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getStoreByUserId } from "@/actions/store/find-store";
import { cn } from "@/lib/utils";
import { rubik } from "@/config/font";

interface SetupLayoutProps {
  children: React.ReactNode;
}

export default async function SetupLayout({ children }: SetupLayoutProps) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await getStoreByUserId(userId);

  if (store) {
    redirect(`/${store.id}`);
  }

  return <div className={cn(rubik.className)}>{children}</div>;
}
