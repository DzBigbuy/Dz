"use client";

import { useEffect, useState } from "react";
import { getPersonalizedAdRecommendations, PersonalizedAdRecommendationsOutput } from "@/ai/flows/personalized-ad-recommendations";
import { Ad } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Lightbulb, ThumbsUp } from "lucide-react";
import Link from "next/link";
import { Skeleton } from "./ui/skeleton";

// Mock user profile
const mockUserProfile = {
  userId: "user-123",
  userType: "trader" as const,
  interests: ["اكسسوارات", "تسويق رقمي"],
  pastInteractions: ["ad-2"],
};

export function RecommendedAds({ availableAds }: { availableAds: Ad[] }) {
  const [recommendations, setRecommendations] = useState<PersonalizedAdRecommendationsOutput | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecommendations() {
      try {
        setLoading(true);
        const availableAdsData = availableAds.map(ad => ({
          adId: ad.id,
          title: ad.title,
          description: ad.description,
          category: ad.category
        }));

        const result = await getPersonalizedAdRecommendations({
          userProfile: mockUserProfile,
          availableAds: availableAdsData,
        });
        setRecommendations(result);
      } catch (error) {
        console.error("Failed to fetch recommendations:", error);
        setRecommendations({ recommendedAds: [] }); // Set to empty on error
      } finally {
        setLoading(false);
      }
    }

    fetchRecommendations();
  }, [availableAds]);

  const recommendedAdDetails = recommendations?.recommendedAds.map(rec => {
    const adDetail = availableAds.find(ad => ad.id === rec.adId);
    return { ...adDetail, reason: rec.reason };
  }).filter(Boolean) as (Ad & { reason: string })[];


  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl md:text-4xl font-headline font-bold mb-2 flex items-center gap-3">
          <Lightbulb className="h-8 w-8 text-accent" />
          مقترح لك
        </h2>
        <p className="text-muted-foreground">إعلانات المسوقين التي قد تهمك بناءً على اهتماماتك.</p>
      </div>
      
      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="flex flex-col p-4"><Skeleton className="h-24 w-full" /></Card>
          <Card className="flex flex-col p-4"><Skeleton className="h-24 w-full" /></Card>
        </div>
      )}

      {!loading && recommendedAdDetails.length === 0 && (
         <Card className="text-center p-8">
            <p className="text-muted-foreground">لا توجد توصيات متاحة في الوقت الحالي.</p>
        </Card>
      )}

      {!loading && recommendedAdDetails.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedAdDetails.map((ad) => (
            <Card key={ad.id} className="p-0 overflow-hidden flex flex-col">
              <CardHeader>
                  <CardTitle className="text-lg font-bold">{ad.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow space-y-3">
                <p className="text-sm text-muted-foreground line-clamp-2">{ad.description}</p>
                <div className="flex items-start gap-2 p-3 bg-primary/5 rounded-md border-r-4 border-accent">
                    <ThumbsUp className="h-5 w-5 text-accent flex-shrink-0 mt-1" />
                    <p className="text-sm text-foreground">
                        <span className="font-bold">لماذا نوصي به:</span> {ad.reason}
                    </p>
                </div>
              </CardContent>
              <div className="bg-muted/50 p-4 flex justify-between items-center">
                <span className="font-bold text-primary">{ad.price} ر.س</span>
                <Link href={`/ads/${ad.id}`}>
                    <Button variant="outline">مشاهدة الإعلان</Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

    