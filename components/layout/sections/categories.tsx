"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import { icons } from "lucide-react";
import Link from "next/link";
import categoriesData from '@/data/categories.json';

export const CategoriesSection = () => {
  const t = useTranslations('Categories');
  const params = useParams();
  const locale = params.locale as string;

  return (
    <section id="categories" className="container py-24 sm:py-32">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          {t('title')}
        </h2>
        <p className="text-xl text-muted-foreground">
          {t('description')}
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        {categoriesData.map((category) => {
          const categoryData = category.i18n[locale] || category.i18n.en;
          
          return (
            <Card 
              key={category.slug} 
              className="group hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer bg-card/50 backdrop-blur-sm"
            >
              <CardHeader className="text-center pb-2">
                <div className={`${category.color} p-4 rounded-full w-16 h-16 mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                  <Icon
                    name={category.icon as keyof typeof icons}
                    size={24}
                    color="white"
                    className="text-white"
                  />
                </div>
                <CardTitle className="text-lg">{categoryData.name}</CardTitle>
              </CardHeader>
              <CardContent className="text-center pt-0">
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {categoryData.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Button asChild size="lg">
          <Link href={`/${locale}/categories`}>
            {t('view_all')}
          </Link>
        </Button>
      </div>
    </section>
  );
};