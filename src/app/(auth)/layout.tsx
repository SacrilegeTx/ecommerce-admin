import { rubik } from "@/config/font";
import { cn } from "@/lib/utils";

interface AuthLayoutProps {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className={cn("flex h-full items-center justify-center", rubik.className)}>{children}</div>
  );
}
