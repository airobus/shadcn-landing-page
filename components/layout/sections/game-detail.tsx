"use client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Star, Play, Users, ArrowLeft, ExternalLink } from "lucide-react";
import { useTranslations } from 'next-intl';
import Image from "next/image";
import Link from "next/link";
import { useParams } from 'next/navigation';

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

interface GameDetailSectionProps {
  game: Game;
  locale: string;
}

export function GameDetailSection({ game, locale }: GameDetailSectionProps) {
  const t = useTranslations('GameCard');
  const params = useParams();
  const gameData = game.i18n[locale] || game.i18n.en;

  return (
    <div className="container py-8">
      {/* Back Button */}
      <div className="mb-6">
        <Button asChild variant="ghost">
          <Link href={`/${locale}`}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Games
          </Link>
        </Button>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Game Image */}
        <div className="space-y-4">
          <div className="relative overflow-hidden rounded-lg">
            <Image
              src={game.cover_image_url}
              alt={gameData.name}
              width={600}
              height={400}
              className="w-full h-[400px] object-cover"
            />
            {game.isFeatured && (
              <Badge className="absolute top-4 left-4 bg-primary/90 text-primary-foreground">
                ⭐ Featured
              </Badge>
            )}
          </div>
          
          {/* Play Button */}
          <Button asChild size="lg" className="w-full">
            <a href={game.game_url} target="_blank" rel="noopener noreferrer">
              <Play className="w-5 h-5 mr-2" />
              {t('play_now')}
              <ExternalLink className="w-4 h-4 ml-2" />
            </a>
          </Button>
        </div>

        {/* Game Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">{gameData.name}</h1>
            <p className="text-lg text-muted-foreground">{t('by')} {game.developer}</p>
          </div>

          {/* Rating */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-lg font-medium">{game.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="w-5 h-5 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {parseInt(game.votes).toLocaleString()} {t('votes')}
              </span>
            </div>
          </div>

          {/* Description */}
          <Card>
            <CardHeader>
              <CardTitle>About This Game</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {gameData.description}
              </p>
            </CardContent>
          </Card>

          {/* Tags */}
          <div>
            <h3 className="font-semibold mb-3">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {game.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>

          {/* Game Info */}
          <Card>
            <CardHeader>
              <CardTitle>Game Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Developer:</span>
                <span>{game.developer}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Category:</span>
                <span className="capitalize">{game.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Rating:</span>
                <span>{game.rating}/10</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Total Votes:</span>
                <span>{parseInt(game.votes).toLocaleString()}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}