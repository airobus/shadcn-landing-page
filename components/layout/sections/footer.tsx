"use client";
import { Separator } from "@/components/ui/separator";
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from "next/link";

export const FooterSection = () => {
  const t = useTranslations('Footer');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <footer id="footer" className="container py-24 sm:py-32">
      <div className="p-10 bg-card border border-secondary rounded-2xl">
        <div className="grid grid-cols-2 md:grid-cols-4 xl:grid-cols-6 gap-x-12 gap-y-8">
          <div className="col-span-full xl:col-span-2">
            <Link href={`/${locale}`} className="flex font-bold items-center">
              <div className="w-9 h-9 mr-2 bg-gradient-to-tr from-primary via-primary/70 to-primary rounded-lg border border-secondary flex items-center justify-center text-white">
                🎮
              </div>
              <h3 className="text-2xl">Gaming Portal</h3>
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">{t('about')}</h3>
            <div>
              <Link href={`/${locale}/about`} className="opacity-60 hover:opacity-100">
                {t('about')}
              </Link>
            </div>
            <div>
              <Link href={`/${locale}/contact`} className="opacity-60 hover:opacity-100">
                {t('contact')}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Legal</h3>
            <div>
              <Link href={`/${locale}/privacy`} className="opacity-60 hover:opacity-100">
                {t('privacy')}
              </Link>
            </div>
            <div>
              <Link href={`/${locale}/terms`} className="opacity-60 hover:opacity-100">
                {t('terms')}
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Games</h3>
            <div>
              <Link href={`/${locale}/games`} className="opacity-60 hover:opacity-100">
                All Games
              </Link>
            </div>
            <div>
              <Link href={`/${locale}/categories`} className="opacity-60 hover:opacity-100">
                Categories
              </Link>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <h3 className="font-bold text-lg">Social</h3>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Twitter
              </Link>
            </div>
            <div>
              <Link href="#" className="opacity-60 hover:opacity-100">
                Discord
              </Link>
            </div>
          </div>
        </div>

        <Separator className="my-6" />
        <section className="text-center">
          <p className="text-muted-foreground">
            {t('copyright')}
          </p>
        </section>
      </div>
    </footer>
  );
};