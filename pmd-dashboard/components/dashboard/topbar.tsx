import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";

export function Topbar() {
  return (
    <header className="flex h-16 items-center justify-between border-b border-zinc-800 bg-background px-6 shadow-sm">
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-foreground">Panel de Control</h1>
      </div>
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar>
          <AvatarFallback className="bg-[#D4AF37] text-black font-bold">PM</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
