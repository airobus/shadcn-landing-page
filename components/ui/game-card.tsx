"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Play, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from 'next-intl';

interface Game {
  slug: string;
  isFeatured: boolean;
  game_url: string;
  cover_image_url: string;
  developer: string;
  rating: string;
  votes: string;
  tags: string[];
  category: string;
  i18n: {
    [key: string]: {
      name: string;
      description: string;
    };
  };
}

interface GameCardProps {
  game: Game;
  locale: string;
  size?: 'default' | 'large';
}

export function GameCard({ game, locale, size = 'default' }: GameCardProps) {
  const t = useTranslations('GameCard');
  const gameData = game.i18n[locale] || game.i18n.en;

  const cardClass = size === 'large' 
    ? "group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm border-primary/20"
    : "group hover:shadow-lg transition-all duration-300 hover:scale-[1.02] bg-card/50 backdrop-blur-sm";

  return (
    <Card className={cardClass}>
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <Image
            src={game.cover_image_url}
            alt={gameData.name}
            width={400}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {game.isFeatured && (
            <Badge className="absolute top-2 left-2 bg-primary/90 text-primary-foreground">
              ⭐ Featured
            </Badge>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button size="lg" className="bg-primary/90 hover:bg-primary">
              <Play className="w-5 h-5 mr-2" />
              {t('play_now')}
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <div className="space-y-3">
          <div>
            <h3 className="font-bold text-lg line-clamp-1">{gameData.name}</h3>
            <p className="text-sm text-muted-foreground">{t('by')} {game.developer}</p>
          </div>
          
          <p className="text-sm text-muted-foreground line-clamp-2">
            {gameData.description}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{game.rating}</span>
              <span className="text-xs text-muted-foreground">
                ({parseInt(game.votes).toLocaleString()} {t('votes')})
              </span>
            </div>
            <Users className="w-4 h-4 text-muted-foreground" />
          </div>
          
          <div className="flex flex-wrap gap-1">
            {game.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          
          <div className="flex space-x-2">
            <Button asChild className="flex-1">
              <a href={game.game_url} target="_blank" rel="noopener noreferrer">
                <Play className="w-4 h-4 mr-2" />
                {t('play_now')}
              </a>
            </Button>
            <Button asChild variant="outline" size="sm">
              <Link href={`/${locale}/game/${game.slug}`}>
                Info
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}