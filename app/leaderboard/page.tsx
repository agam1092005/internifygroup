'use client';
import { BackgroundLines } from "@/components/ui/background-lines";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Leaderboard() {
  const router = useRouter();

  // Dummy leaderboard data
  const users = [
    { rank: 1, name: "Alice Johnson", xp: 15420, badges: 12 },
    { rank: 2, name: "Bob Smith", xp: 14200, badges: 10 },
    { rank: 3, name: "Charlie Davis", xp: 13500, badges: 9 },
    { rank: 4, name: "Diana Prince", xp: 12800, badges: 8 },
    { rank: 5, name: "Evan Wright", xp: 11500, badges: 6 },
  ];

  return (
    <div className="min-h-screen w-screen flex flex-col items-center bg-white pb-20">
      {/* Hero Section */}
      <div className="w-full flex flex-col text-center items-center justify-center align-center relative overflow-hidden py-24 px-5">
        <BackgroundLines className="absolute inset-0 w-full h-full -z-10">{null}</BackgroundLines>
        
        <Button 
          variant="outline" 
          className="absolute left-4 md:left-10 top-12 z-10"
          onClick={() => router.push('/')}
        >
          <ChevronLeft className="mr-2" size={16} /> Back
        </Button>
        
        <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight mb-4 text-black">
          Global Leaderboard
        </h1>
        <p className="text-sm md:text-xl font-semibold text-gray-600 mb-4 max-w-2xl">
          Compete, earn XP, and climb the ranks to showcase your skills.
        </p>
      </div>

      {/* Table Section */}
      <div className="w-full max-w-4xl mt-4 px-5 z-10">
        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-xs md:text-sm uppercase tracking-wider font-semibold">
                <th className="py-4 px-6">Rank</th>
                <th className="py-4 px-6">Developer</th>
                <th className="py-4 px-6 text-right">XP</th>
                <th className="py-4 px-6 text-right">Badges</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {users.map((user) => (
                <tr key={user.rank} className="hover:bg-gray-50 transition-colors group">
                  <td className="py-4 px-6 font-bold text-gray-900 group-hover:text-black">
                    #{user.rank}
                  </td>
                  <td className="py-4 px-6 font-medium text-gray-800">
                    {user.name}
                  </td>
                  <td className="py-4 px-6 text-right font-mono text-gray-900 font-semibold">
                    {user.xp.toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-right text-gray-600">
                    {user.badges}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
