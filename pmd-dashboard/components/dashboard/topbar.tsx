import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b bg-white px-6 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-slate-800">Panel de Control</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5 text-slate-500" />
        </Button>
        <Avatar>
          <AvatarImage src="/avatars/01.png" alt="@pmd" />
          <AvatarFallback>PM</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
