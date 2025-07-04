"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Play, Star, TrendingUp, Users, Gamepad2 } from "lucide-react";
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import gamesData from '@/data/games.json';

export const HeroSection = () => {
  const t = useTranslations('Hero');
  const params = useParams();
  const locale = params.locale as string;
  const [searchQuery, setSearchQuery] = useState("");

  // Get featured games for quick access
  const featuredGames = gamesData.filter(game => game.isFeatured).slice(0, 3);

  // Stats for the gaming portal
  const stats = [
    { icon: Gamepad2, value: "1000+", label: "Games" },
    { icon: Users, value: "50K+", label: "Players" },
    { icon: Star, value: "4.8", label: "Rating" },
    { icon: TrendingUp, value: "24/7", label: "Available" }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-secondary/10" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary/20 rounded-full blur-3xl animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <div className="container relative z-10 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className="text-center lg:text-left space-y-8">
            {/* Badge */}
            <Badge className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-primary/10 text-primary border-primary/20">
              <Star className="w-4 h-4" />
              {t('featured_games')}
            </Badge>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
                  {t('title')}
                </span>
                <br />
                <span className="text-foreground">
                  {t('subtitle')}
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                {t('description')}
              </p>
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto lg:mx-0">
              <div className="relative group">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5 group-focus-within:text-primary transition-colors" />
                <Input
                  placeholder={t('search_placeholder') || "Search for games..."}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-4 py-6 text-lg bg-background/50 backdrop-blur-sm border-2 border-border/50 focus:border-primary/50 transition-all duration-300 rounded-xl"
                />
                <Button 
                  size="lg" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 rounded-lg"
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="text-lg px-8 py-6 rounded-xl">
                <Link href={`/${locale}/games`}>
                  <Play className="w-5 h-5 mr-2" />
                  {t('play_now')}
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6 rounded-xl border-2">
                <Link href={`/${locale}/categories`}>
                  {t('browse_games')}
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center lg:text-left">
                  <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                    <stat.icon className="w-5 h-5 text-primary" />
                    <span className="text-2xl font-bold text-foreground">{stat.value}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Featured Games Preview */}
          <div className="relative">
            <div className="grid gap-6">
              {/* Main Featured Game */}
              {featuredGames[0] && (
                <div className="relative group cursor-pointer">
                  <div className="relative overflow-hidden rounded-2xl bg-card border-2 border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]">
                    <div className="aspect-video relative">
                      <Image
                        src={featuredGames[0].cover_image_url}
                        alt={featuredGames[0].i18n[locale]?.name || featuredGames[0].i18n.en.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      
                      {/* Play Button Overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button size="lg" className="bg-primary/90 hover:bg-primary backdrop-blur-sm">
                          <Play className="w-6 h-6 mr-2" />
                          {t('play_now')}
                        </Button>
                      </div>

                      {/* Game Info Overlay */}
                      <div className="absolute bottom-4 left-4 right-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-white font-bold text-lg mb-1">
                              {featuredGames[0].i18n[locale]?.name || featuredGames[0].i18n.en.name}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-white/90 text-sm">{featuredGames[0].rating}</span>
                              <span className="text-white/70 text-sm">
                                ({parseInt(featuredGames[0].votes).toLocaleString()})
                              </span>
                            </div>
                          </div>
                          <Badge className="bg-primary/90 text-primary-foreground">
                            Featured
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Secondary Featured Games */}
              <div className="grid grid-cols-2 gap-4">
                {featuredGames.slice(1, 3).map((game, index) => (
                  <div key={game.slug} className="relative group cursor-pointer">
                    <div className="relative overflow-hidden rounded-xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-300 hover:scale-[1.02]">
                      <div className="aspect-square relative">
                        <Image
                          src={game.cover_image_url}
                          alt={game.i18n[locale]?.name || game.i18n.en.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        
                        {/* Play Button Overlay */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button size="sm" className="bg-primary/90 hover:bg-primary backdrop-blur-sm">
                            <Play className="w-4 h-4" />
                          </Button>
                        </div>

                        {/* Game Info */}
                        <div className="absolute bottom-2 left-2 right-2">
                          <h4 className="text-white font-semibold text-sm mb-1 line-clamp-1">
                            {game.i18n[locale]?.name || game.i18n.en.name}
                          </h4>
                          <div className="flex items-center gap-1">
                            <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            <span className="text-white/90 text-xs">{game.rating}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-primary/20 rounded-full blur-xl animate-bounce delay-300" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-secondary/20 rounded-full blur-xl animate-bounce delay-700" />
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="text-center mt-20 pt-12 border-t border-border/50">
          <p className="text-muted-foreground mb-6 text-lg">
            Join thousands of players worldwide
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2">
              No Download Required
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              Free to Play
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              Instant Access
            </Badge>
            <Badge variant="secondary" className="px-4 py-2">
              Cross Platform
            </Badge>
          </div>
        </div>
      </div>
    </section>
  );
};