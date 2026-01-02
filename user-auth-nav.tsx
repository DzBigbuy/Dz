'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Briefcase, Users, LogIn, LogOut, UserCircle } from 'lucide-react';
import { useUser, useAuth, useFirestore, useMemoFirebase } from '@/firebase';
import { signOut, getAuth } from 'firebase/auth';
import { doc } from 'firebase/firestore';
import { useDoc } from '@/firebase/firestore/use-doc';
import { Skeleton } from './ui/skeleton';

const navLinks = [
  { href: "/trader-ads", label1: "إعلانات", label2: "التجار", icon: <Briefcase className="h-5 w-5" /> },
  { href: "/marketer-ads", label1: "إعلانات", label2: "المسوقين", icon: <Users className="h-5 w-5" /> },
];

interface UserProfile {
    firstName: string;
    lastName: string;
}

export function UserAuthNav() {
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const firestore = useFirestore();

  const userProfileRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, 'users', user.uid, 'profile', user.uid);
  }, [firestore, user]);

  const { data: userProfile, isLoading: isProfileLoading } = useDoc<UserProfile>(userProfileRef);

  const handleLogout = () => {
    const authInstance = getAuth();
    signOut(authInstance);
  };

  return (
    <nav className="w-full bg-background border-b border-border shadow-sm py-2">
      <div className="container mx-auto flex items-center justify-center gap-1">
        {navLinks.map((link) => (
          <Button asChild variant="ghost" key={link.href} className="h-auto">
            <Link
              href={link.href}
              className="flex items-center gap-2 text-foreground transition-colors hover:text-primary px-2 py-1"
            >
              {link.icon}
              <div className="flex flex-col items-start leading-tight text-sm">
                <span>{link.label1}</span>
                <span>{link.label2}</span>
              </div>
            </Link>
          </Button>
        ))}

        {isUserLoading || (user && isProfileLoading) ? (
            <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-24" />
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
            </div>
        ) : user && userProfile ? (
          <>
            <span className="text-sm text-foreground mx-2">
              أهلاً, {userProfile.firstName}
            </span>
            <Link href="/account">
              <Button variant="outline">
                <UserCircle className="ml-2 h-4 w-4" />
                حسابي
              </Button>
            </Link>
            <Button onClick={handleLogout} variant="destructive">
              <LogOut className="ml-2 h-4 w-4" />
              خروج
            </Button>
          </>
        ) : (
          <Link href="/login">
            <Button className="font-bold rounded-full bg-primary text-primary-foreground hover:bg-primary/90">
              <LogIn className="ml-2 h-4 w-4" />
              التسجيل
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

    