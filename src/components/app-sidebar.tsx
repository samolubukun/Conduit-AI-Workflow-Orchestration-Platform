"use client";

import {
  CoinsIcon,
  FolderOpenIcon,
  HistoryIcon,
  KeyIcon,
  LogOutIcon,
  PlusIcon,
  ChevronsUpDown,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { unifiedSignOut } from "@/lib/unified-auth-client";
import { useCreditBalance } from "@/features/billing/hooks/use-billing";
import { TopUpDialog } from "@/components/billing/top-up-dialog";
import { useUnifiedSession } from "@/hooks/use-unified-session";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const menuItems = [
  {
    title: "Workspace",
    items: [
      {
        title: "Workflows",
        icon: FolderOpenIcon,
        url: "/workflows",
      },
      {
        title: "Credentials",
        icon: KeyIcon,
        url: "/credentials",
      },
      {
        title: "Executions",
        icon: HistoryIcon,
        url: "/executions",
      },
    ],
  },
];

export const AppSidebar = () => {
  const pathname = usePathname();
  const [topUpOpen, setTopUpOpen] = useState(false);
  const { data: balanceData } = useCreditBalance();
  const { session } = useUnifiedSession();

  const user = session?.user;
  const displayName = user?.name ?? user?.email?.split("@")[0] ?? "User";
  const email = user?.email ?? "";
  const initials = displayName
    .split(" ")
    .map((n: string) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <>
      <TopUpDialog open={topUpOpen} onOpenChange={setTopUpOpen} />
      <Sidebar collapsible="icon">
        {/* Logo / Brand */}
        <SidebarHeader className="border-b border-sidebar-border/60 pb-3">
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="gap-x-3 h-10 px-3 hover:bg-transparent active:bg-transparent">
              <Link href="/" prefetch>
                <Image
                  src="/logos/logo-light.svg"
                  alt="Conduit"
                  width={26}
                  height={26}
                  className="shrink-0"
                />
                <span className="font-semibold text-sm tracking-tight">Conduit</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarHeader>

        {/* Navigation */}
        <SidebarContent className="pt-2">
          {menuItems.map((group) => (
            <SidebarGroup key={group.title}>
              <SidebarGroupLabel className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground/60 px-3 mb-1">
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {group.items.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton
                        tooltip={item.title}
                        isActive={
                          item.url === "/"
                            ? pathname === "/"
                            : pathname.startsWith(item.url)
                        }
                        asChild
                        className="gap-x-3 h-9 px-3 rounded-md font-medium text-sm transition-all"
                      >
                        <Link href={item.url} prefetch>
                          <item.icon className="size-4 shrink-0" />
                          <span>{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          ))}
        </SidebarContent>

        {/* Footer */}
        <SidebarFooter className="border-t border-sidebar-border/60 pt-3 gap-y-1">
          <SidebarMenu>
            {/* Credits */}
            <SidebarMenuItem>
              <SidebarMenuButton
                tooltip="Credits"
                className="gap-x-3 h-9 px-3 justify-between rounded-md"
                onClick={() => setTopUpOpen(true)}
              >
                <div className="flex items-center gap-x-2">
                  <CoinsIcon className="h-4 w-4 text-amber-400 shrink-0" />
                  <span className="text-sm font-medium">
                    {balanceData?.credits ?? 0} Credits
                  </span>
                </div>
                <div className="flex items-center text-xs text-primary font-semibold">
                  <PlusIcon className="size-3 mr-0.5" />
                  <span>Top up</span>
                </div>
              </SidebarMenuButton>
            </SidebarMenuItem>

            <SidebarSeparator className="my-1" />

            {/* User Profile */}
            <SidebarMenuItem>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton
                    tooltip={displayName}
                    className="gap-x-3 h-10 px-3 rounded-md data-[state=open]:bg-sidebar-accent"
                  >
                    <Avatar className="size-6 shrink-0">
                      <AvatarImage src={user?.image ?? undefined} />
                      <AvatarFallback className="text-[10px] font-semibold bg-primary/15 text-primary">
                        {initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0 flex-1 text-left">
                      <span className="text-xs font-semibold truncate leading-tight">
                        {displayName}
                      </span>
                      {email && (
                        <span className="text-[10px] text-muted-foreground truncate leading-tight">
                          {email}
                        </span>
                      )}
                    </div>
                    <ChevronsUpDown className="size-3.5 shrink-0 text-muted-foreground" />
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="top"
                  align="start"
                  className="w-52"
                >
                  <div className="px-3 py-2 border-b border-border/60">
                    <p className="text-xs font-semibold truncate">{displayName}</p>
                    {email && (
                      <p className="text-[10px] text-muted-foreground truncate">{email}</p>
                    )}
                  </div>
                  <DropdownMenuSeparator className="my-1" />
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive gap-x-2 cursor-pointer"
                    onClick={() => unifiedSignOut("/login")}
                  >
                    <LogOutIcon className="size-3.5" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
    </>
  );
};
