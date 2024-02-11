import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Navbar from "@/components/navbar";
import { getStoreByStoreIdAndUserId } from "@/actions/store/find-store";
import { cn } from "@/lib/utils";
import { rubik } from "@/config/font";

interface DashboardLayoutProps {
  children: React.ReactNode;
  params: {
    storeId: string;
  };
}

export default async function DashboardLayout({ children, params }: DashboardLayoutProps) {
  const { userId } = auth();
  const { storeId } = params;

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await getStoreByStoreIdAndUserId(storeId, userId);

  if (!store) {
    redirect("/");
  }

  return (
    <div className={cn(rubik.className)}>
      <Navbar />
      {children}
    </div>
  );
}
