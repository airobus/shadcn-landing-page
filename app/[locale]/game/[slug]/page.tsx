import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';
import gamesData from '@/data/games.json';
import { GameDetailSection } from '@/components/layout/sections/game-detail';

interface Props {
  params: { 
    locale: string;
    slug: string;
  };
}

export async function generateStaticParams() {
  return gamesData.map((game) => ({
    slug: game.slug,
  }));
}

export async function generateMetadata({ params: { locale, slug } }: Props): Promise<Metadata> {
  const game = gamesData.find(g => g.slug === slug);
  
  if (!game) {
    return {
      title: 'Game Not Found',
    };
  }

  const gameData = game.i18n[locale as keyof typeof game.i18n] || game.i18n.en;
  
  return {
    title: `${gameData.name} - Gaming Portal`,
    description: gameData.description,
    openGraph: {
      title: gameData.name,
      description: gameData.description,
      images: [game.cover_image_url],
      type: 'website',
    },
    alternates: {
      languages: {
        'en': `/en/game/${slug}`,
        'zh-TW': `/zh-TW/game/${slug}`,
        'ja': `/ja/game/${slug}`,
      },
    },
  };
}

export default function GamePage({ params: { locale, slug } }: Props) {
  const game = gamesData.find(g => g.slug === slug);
  
  if (!game) {
    notFound();
  }

  return <GameDetailSection game={game} locale={locale} />;
}