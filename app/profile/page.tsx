'use client';
import { BackgroundLines } from "@/components/ui/background-lines";
import { ChevronLeft, LogOut, Award, Star, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../firebase";

export default function Profile() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        // Redirect to home if not logged in
        router.push('/');
      } else {
        setUser(currentUser);
        setLoading(false);
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen w-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-500">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-white pb-20">
      {/* Hero Section */}
      <div className="w-full flex flex-col text-center items-center justify-center relative overflow-hidden py-24 px-5 bg-black text-white">
        <Button 
          variant="outline" 
          className="absolute left-4 md:left-10 top-12 z-10 text-black border-white"
          onClick={() => router.push('/')}
        >
          <ChevronLeft className="mr-2" size={16} /> Back to Home
        </Button>
        <Button 
          variant="destructive" 
          className="absolute right-4 md:right-10 top-12 z-10"
          onClick={handleLogout}
        >
          <LogOut className="mr-2" size={16} /> Sign Out
        </Button>
        
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2">
          Your Profile
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl">
          {user?.email}
        </p>
      </div>

      {/* Stats Section */}
      <div className="w-full max-w-4xl mt-[-40px] px-5 z-10">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg p-8">
          
          <h2 className="text-2xl font-bold mb-6 border-b pb-4 text-black">Gamification Dashboard</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center">
              <Star className="text-yellow-500 mb-2" size={32} />
              <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Total XP</span>
              <span className="text-3xl font-mono font-bold text-black mt-1">1,250</span>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center">
              <ShieldCheck className="text-blue-500 mb-2" size={32} />
              <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Global Rank</span>
              <span className="text-3xl font-bold text-black mt-1">#42</span>
            </div>
            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 flex flex-col items-center">
              <Award className="text-purple-500 mb-2" size={32} />
              <span className="text-gray-500 text-sm font-semibold uppercase tracking-wider">Badges Earned</span>
              <span className="text-3xl font-bold text-black mt-1">3</span>
            </div>
          </div>

          <h3 className="text-xl font-bold mb-4 text-black">Your Badges</h3>
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 px-4 py-3 rounded-full">
              <span className="text-2xl">🚀</span>
              <span className="font-semibold text-blue-900">First Login</span>
            </div>
            <div className="flex items-center gap-3 bg-green-50 border border-green-100 px-4 py-3 rounded-full">
              <span className="text-2xl">🔥</span>
              <span className="font-semibold text-green-900">3-Day Streak</span>
            </div>
            <div className="flex items-center gap-3 bg-purple-50 border border-purple-100 px-4 py-3 rounded-full">
              <span className="text-2xl">💻</span>
              <span className="font-semibold text-purple-900">React Beginner</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
