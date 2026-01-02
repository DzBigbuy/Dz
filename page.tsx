'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser, useFirestore, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User, Mail, Phone, Calendar } from 'lucide-react';

interface UserProfile {
    firstName: string;
    lastName: string;
    email: string;
    userType: 'trader' | 'marketer';
    phoneNumber: string;
    registrationDate: string;
    profilePictureURL?: string;
}

export default function AccountPage() {
    const { user, isUserLoading } = useUser();
    const firestore = useFirestore();
    const router = useRouter();

    useEffect(() => {
        if (!isUserLoading && !user) {
            router.push('/login');
        }
    }, [user, isUserLoading, router]);

    const userProfileRef = useMemoFirebase(() => {
        if (!firestore || !user) return null;
        return doc(firestore, 'users', user.uid, 'profile', user.uid);
    }, [firestore, user]);

    const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

    if (isUserLoading || isProfileLoading || !userProfile) {
        return (
            <div className="container mx-auto py-8 px-4">
                <Card className="max-w-2xl mx-auto">
                    <CardHeader>
                        <Skeleton className="h-8 w-48 mb-2" />
                        <Skeleton className="h-4 w-64" />
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center gap-4">
                            <Skeleton className="h-24 w-24 rounded-full" />
                            <div className="space-y-2">
                                <Skeleton className="h-6 w-32" />
                                <Skeleton className="h-5 w-20" />
                            </div>
                        </div>
                        <div className="space-y-4">
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                            <Skeleton className="h-5 w-full" />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }
    
    const registrationDate = new Date(userProfile.registrationDate);
    const formattedDate = !isNaN(registrationDate.getTime()) 
        ? registrationDate.toLocaleDateString('ar-EG', { year: 'numeric', month: 'long', day: 'numeric' })
        : 'تاريخ غير صالح';

    return (
        <div className="container mx-auto py-8 px-4">
            <Card className="max-w-2xl mx-auto shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold">ملفي الشخصي</CardTitle>
                    <CardDescription>هنا يمكنك عرض تفاصيل حسابك.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center gap-6 border-b pb-6">
                        <Avatar className="h-24 w-24 border-4 border-primary">
                            <AvatarImage src={userProfile.profilePictureURL} alt={`${userProfile.firstName} ${userProfile.lastName}`} />
                            <AvatarFallback className="text-3xl bg-muted">
                                {userProfile.firstName.charAt(0)}{userProfile.lastName.charAt(0)}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-2xl font-bold">{userProfile.firstName} {userProfile.lastName}</h2>
                            <Badge variant={userProfile.userType === 'trader' ? 'default' : 'secondary'} className="mt-2 text-sm">
                                {userProfile.userType === 'trader' ? 'تاجر' : 'مسوق'}
                            </Badge>
                        </div>
                    </div>
                    <div className="grid gap-4 text-base">
                       <div className="flex items-center gap-3">
                           <User className="h-5 w-5 text-primary" />
                           <span className="font-semibold">الاسم:</span>
                           <span>{userProfile.firstName} {userProfile.lastName}</span>
                       </div>
                        <div className="flex items-center gap-3">
                           <Mail className="h-5 w-5 text-primary" />
                           <span className="font-semibold">البريد الإلكتروني:</span>
                           <span>{userProfile.email}</span>
                       </div>
                        <div className="flex items-center gap-3">
                           <Phone className="h-5 w-5 text-primary" />
                           <span className="font-semibold">رقم الهاتف:</span>
                           <span>{userProfile.phoneNumber || 'لم يتم إضافته'}</span>
                       </div>
                        <div className="flex items-center gap-3">
                           <Calendar className="h-5 w-5 text-primary" />
                           <span className="font-semibold">تاريخ التسجيل:</span>
                           <span>{formattedDate}</span>
                       </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

    