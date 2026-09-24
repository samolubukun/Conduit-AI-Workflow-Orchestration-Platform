import { SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";

interface AppHeaderProps {
  children?: React.ReactNode;
}

export const AppHeader = ({ children }: AppHeaderProps) => {
  return (
    <header className="flex h-14 shrink-0 items-center gap-3 border-b border-border/60 px-4 bg-background sticky top-0 z-10">
      <SidebarTrigger className="size-7 -ml-1 text-muted-foreground hover:text-foreground transition-colors" />
      <Separator orientation="vertical" className="h-4 opacity-40" />
      {children}
    </header>
  );
};
