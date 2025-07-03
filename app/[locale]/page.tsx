import { HeroSection } from "@/components/layout/sections/hero";
import { FeaturedGamesSection } from "@/components/layout/sections/featured-games";
import { CategoriesSection } from "@/components/layout/sections/categories";
import { FooterSection } from "@/components/layout/sections/footer";
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

interface Props {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'Hero' });
  
  return {
    title: `${t('title')} ${t('subtitle')} - Gaming Portal`,
    description: t('description'),
    openGraph: {
      title: `${t('title')} ${t('subtitle')}`,
      description: t('description'),
      type: 'website',
    },
  };
}

export default function Home({ params: { locale } }: Props) {
  return (
    <>
      <HeroSection />
      <FeaturedGamesSection />
      <CategoriesSection />
      <FooterSection />
    </>
  );
}