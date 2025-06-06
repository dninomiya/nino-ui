"use client";

import * as React from "react";

import { SearchForm } from "@/components/search-form";
import { Button } from "@/components/ui/button";
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
  useSidebar,
} from "@/components/ui/sidebar";
import { GITHUB_URL, X_URL, YOUTUBE_URL } from "@/lib/constants";
import { DocSchema } from "@/lib/types";
import { SiGithub, SiX, SiYoutube } from "@icons-pack/react-simple-icons";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./sidebar-logo/logo";
export function AppSidebar({
  docSchema,
  ...props
}: React.ComponentProps<typeof Sidebar> & {
  docSchema: DocSchema;
}) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const { toggleSidebar, isMobile } = useSidebar();
  const data = {
    navMain: docSchema,
  };

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <Logo />
        <SearchForm docSchema={docSchema} />
      </SidebarHeader>
      <SidebarContent>
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel>{item.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      isActive={pathname === `/${item.id}`}
                      onClick={() => {
                        if (isMobile) {
                          toggleSidebar();
                        }
                      }}
                    >
                      <Link href={`/${item.id}`}>{item.title}</Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-2 px-2 py-2">
          <Button
            variant="ghost"
            size="icon"
            className="size-8"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            <Sun className="size-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">テーマを切り替え</span>
          </Button>
          <span className="flex-1"></span>
          <Button variant="ghost" size="icon" className="size-8" asChild>
            <Link href={GITHUB_URL} target="_blank" rel="noopener noreferrer">
              <SiGithub />
              <span className="sr-only">GitHubリポジトリを開く</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="size-8" asChild>
            <Link href={X_URL} target="_blank" rel="noopener noreferrer">
              <SiX />
              <span className="sr-only">X を開く</span>
            </Link>
          </Button>
          <Button variant="ghost" size="icon" className="size-8" asChild>
            <Link href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
              <SiYoutube />
              <span className="sr-only">YouTubeを開く</span>
            </Link>
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
