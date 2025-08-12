import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp, Trophy, Medal, Award } from "lucide-react";
import { useState } from "react";

export default function RankingList() {
  const [timeFrame, setTimeFrame] = useState("week");

  const { data: ranking, isLoading } = useQuery({
    queryKey: ["/api/ranking", timeFrame],
  });

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Award className="h-5 w-5 text-amber-600" />;
      default:
        return <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600">
          {position}
        </div>;
    }
  };

  const getRankBadge = (position: number) => {
    if (position <= 3) {
      const colors = {
        1: "bg-yellow-100 text-yellow-700",
        2: "bg-gray-100 text-gray-700", 
        3: "bg-amber-100 text-amber-700"
      };
      return colors[position as keyof typeof colors];
    }
    return "bg-gray-50 text-gray-600";
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-6 bg-gray-200 rounded w-1/3"></div>
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4 py-3">
                <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
                <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const currentUserIndex = (ranking || []).findIndex((user: any) => user.userId === "user1");
  const currentUser = (ranking || [])[currentUserIndex >= 0 ? currentUserIndex : 0];

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Ranking de Progresso</h2>
            <p className="text-gray-600">Veja como você está se saindo</p>
          </div>
          <Select value={timeFrame} onValueChange={setTimeFrame}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Esta semana</SelectItem>
              <SelectItem value="month">Este mês</SelectItem>
              <SelectItem value="year">Este ano</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Current User Highlight */}
        {currentUser && (
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Badge className={`mr-4 ${getRankBadge(currentUserIndex + 1)}`}>
                  #{currentUserIndex + 1}
                </Badge>
                <img 
                  src={currentUser.user?.profileImage || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=50&h=50&fit=crop&crop=face"} 
                  alt={currentUser.user?.firstName}
                  className="w-10 h-10 rounded-full mr-3"
                />
                <div>
                  <p className="font-medium text-gray-900">
                    {currentUser.user?.firstName} {currentUser.user?.lastName} (Você)
                  </p>
                  <p className="text-gray-600 text-sm">
                    {currentUser.workoutsCompleted} treinos completados
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-gray-900">{currentUser.points} pts</p>
                <div className="flex items-center text-accent text-sm">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  +89 esta semana
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Top Rankings */}
        <div className="space-y-3">
          {(ranking || []).slice(0, 10).map((user: any, index: number) => {
            const isCurrentUser = user.userId === "user1";
            
            return (
              <div 
                key={user.id}
                className={`flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0 ${
                  isCurrentUser ? "bg-primary/5 rounded-lg px-4 -mx-4" : ""
                }`}
              >
                <div className="flex items-center">
                  <div className="w-8 mr-4">
                    {getRankIcon(index + 1)}
                  </div>
                  <img 
                    src={user.user?.profileImage || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=50&h=50&fit=crop&crop=face"} 
                    alt={user.user?.firstName}
                    className="w-10 h-10 rounded-full mr-3"
                  />
                  <div>
                    <p className={`font-medium ${isCurrentUser ? "text-primary" : "text-gray-900"}`}>
                      {user.user?.firstName} {user.user?.lastName}
                      {isCurrentUser && " (Você)"}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {user.workoutsCompleted} treinos completados
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-gray-900">{user.points} pts</p>
                  <div className="flex items-center text-accent text-sm">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    +{Math.floor(Math.random() * 100 + 50)} esta semana
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <button className="text-primary hover:text-red-600 font-medium transition-colors">
            Ver ranking completo
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
