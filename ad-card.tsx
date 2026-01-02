import Image from 'next/image';
import Link from 'next/link';
import type { Ad } from '@/lib/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface AdCardProps {
  ad: Ad;
}

export function AdCard({ ad }: AdCardProps) {
  return (
    <Link href={`/ads/${ad.id}`} className="block group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="relative w-full h-48">
          <Image
            src={ad.image.imageUrl}
            alt={ad.image.description}
            data-ai-hint={ad.image.imageHint}
            fill
            className="object-cover"
          />
        </div>
        <CardHeader>
          <div className="flex justify-between items-start">
            <CardTitle className="text-lg font-bold leading-tight group-hover:text-primary transition-colors">{ad.title}</CardTitle>
            <Badge variant={ad.userType === 'trader' ? 'default' : 'secondary'}>
              {ad.userType === 'trader' ? 'تاجر' : 'مسوق'}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground pt-1">{ad.category}</p>
        </CardHeader>
        <CardContent className="flex-grow">
          <CardDescription className="line-clamp-3">{ad.description}</CardDescription>
        </CardContent>
        <CardFooter className="flex justify-between items-center bg-muted/50 p-4">
          <span className="text-lg font-bold text-primary">{ad.price} ر.س</span>
          <Button variant="ghost" size="sm">
            عرض التفاصيل
            <ArrowLeft className="mr-2 h-4 w-4" />
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}

    