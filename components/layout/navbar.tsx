"use client";
import { Menu, Search, Globe } from "lucide-react";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Separator } from "../ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import Link from "next/link";
import { ToggleTheme } from "./toogle-theme";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';

interface RouteProps {
  href: string;
  label: string;
}

export const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const t = useTranslations('Header');
  const params = useParams();
  const locale = params.locale as string;

  const routeList: RouteProps[] = [
    {
      href: `/${locale}`,
      label: t('home'),
    },
    {
      href: `/${locale}/games`,
      label: t('games'),
    },
    {
      href: `/${locale}/categories`,
      label: t('categories'),
    },
  ];

  return (
    <header className="shadow-inner bg-opacity-15 w-[90%] md:w-[70%] lg:w-[75%] lg:max-w-screen-xl top-5 mx-auto sticky border border-secondary z-40 rounded-2xl flex justify-between items-center p-2 bg-card">
      <Link href={`/${locale}`} className="font-bold text-lg flex items-center">
        <div className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white flex items-center justify-center">
          🎮
        </div>
        Gaming Portal
      </Link>

      {/* Search Bar - Desktop */}
      <div className="hidden lg:flex flex-1 max-w-md mx-4">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder={t('search_placeholder')}
            className="pl-10 bg-background/50"
          />
        </div>
      </div>

      {/* Mobile Menu */}
      <div className="flex items-center lg:hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Menu
              onClick={() => setIsOpen(!isOpen)}
              className="cursor-pointer lg:hidden"
            />
          </SheetTrigger>

          <SheetContent
            side="left"
            className="flex flex-col justify-between rounded-tr-2xl rounded-br-2xl bg-card border-secondary"
          >
            <div>
              <SheetHeader className="mb-4 ml-4">
                <SheetTitle className="flex items-center">
                  <Link href={`/${locale}`} className="flex items-center">
                    <div className="bg-gradient-to-tr border-secondary from-primary via-primary/70 to-primary rounded-lg w-9 h-9 mr-2 border text-white flex items-center justify-center">
                      🎮
                    </div>
                    Gaming Portal
                  </Link>
                </SheetTitle>
              </SheetHeader>

              {/* Mobile Search */}
              <div className="mb-4 px-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder={t('search_placeholder')}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {routeList.map(({ href, label }) => (
                  <Button
                    key={href}
                    onClick={() => setIsOpen(false)}
                    asChild
                    variant="ghost"
                    className="justify-start text-base"
                  >
                    <Link href={href}>{label}</Link>
                  </Button>
                ))}
              </div>
            </div>

            <SheetFooter className="flex-col sm:flex-col justify-start items-start">
              <Separator className="mb-2" />
              <LanguageSwitcher />
              <ToggleTheme />
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Navigation */}
      <NavigationMenu className="hidden lg:block mx-auto">
        <NavigationMenuList>
          {routeList.map(({ href, label }) => (
            <NavigationMenuItem key={href}>
              <NavigationMenuLink asChild>
                <Link href={href} className="text-base px-4 py-2 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors">
                  {label}
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      {/* Desktop Actions */}
      <div className="hidden lg:flex items-center gap-2">
        <LanguageSwitcher />
        <ToggleTheme />
      </div>
    </header>
  );
};