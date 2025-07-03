"use client";
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { GameCard } from '@/components/ui/game-card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import gamesData from '@/data/games.json';

export const FeaturedGamesSection = () => {
  const t = useTranslations('Hero');
  const params = useParams();
  const locale = params.locale as string;

  const featuredGames = gamesData.filter(game => game.isFeatured);

  return (
    <section className="container py-24 sm:py-32">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('featured_games')}
        </h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          {t('description')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
        {featuredGames.map((game) => (
          <GameCard key={game.slug} game={game} locale={locale} />
        ))}
      </div>

      <div className="text-center">
        <Button asChild size="lg" variant="outline">
          <Link href={`/${locale}/games`}>
            {t('browse_games')}
          </Link>
        </Button>
      </div>
    </section>
  );
};