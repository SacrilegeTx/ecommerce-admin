import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { getStoreByStoreIdAndUserId } from "@/actions/store/find-store";

import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps {
  params: {
    storeId: string;
  };
}

async function SettingsPage({ params }: SettingsPageProps) {
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
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SettingsForm initialData={store} />
      </div>
    </div>
  );
}

export default SettingsPage;
