import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Flame, Trophy, Weight, Star, Plus, Dumbbell } from "lucide-react";
import WorkoutCard from "@/components/workout/workout-card";
import WeeklyCalendar from "@/components/calendar/weekly-calendar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useQuery<{
    todayWorkouts: number;
    streak: number;
    currentWeight: string;
    ranking: string;
    [key: string]: any;
  }>({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: todayWorkouts, isLoading: workoutsLoading } = useQuery<any[]>({
    queryKey: ["/api/workouts/today"],
  });

  const { data: featuredPlans, isLoading: plansLoading } = useQuery<any[]>({
    queryKey: ["/api/marketplace/featured"],
  });

  const { data: metrics } = useQuery<{
    weight: string;
    bodyFat: string;
    muscleMass: string;
    hydration: string;
    [key: string]: any;
  }>({
    queryKey: ["/api/metrics"],
  });

  if (statsLoading) {
    return (
      <div className="mx-auto px-4 py-4 max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-7xl">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-20 bg-gray-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto px-4 py-4 max-w-sm sm:max-w-md md:max-w-4xl lg:max-w-7xl">
      {/* Mobile Header with Logo */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl sm:text-2xl font-bold text-acelera-blue">Bom dia, João!</h1>
          </div>
          <Button className="bg-acelera-orange text-white hover:bg-acelera-orange-light px-3 py-2 text-sm transition-colors">
            <Plus className="w-4 h-4 mr-1" />
            <span className="hidden sm:inline">Novo </span>Treino
          </Button>
        </div>
        
        <div className="text-center sm:text-left">
          <p className="text-gray-600 text-sm sm:text-base">Pronto para treinar hoje?</p>
        </div>
      </div>

      {/* Stats Cards - Mobile Optimized */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mb-6">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col items-center md:flex-row md:items-start">
              <div className="bg-acelera-orange/10 p-2 md:p-3 rounded-lg mb-2 md:mb-0 md:mr-4">
                <Flame className="text-acelera-orange h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="text-center md:text-left">
                <p className="text-gray-600 text-xs md:text-sm">Treinos Hoje</p>
                <p className="text-lg md:text-2xl font-bold text-gray-900">{stats?.todayWorkouts ?? 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col items-center md:flex-row md:items-start">
              <div className="bg-acelera-blue/10 p-2 md:p-3 rounded-lg mb-2 md:mb-0 md:mr-4">
                <Trophy className="text-acelera-blue h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="text-center md:text-left">
                <p className="text-gray-600 text-xs md:text-sm">Sequência</p>
                <p className="text-lg md:text-2xl font-bold text-gray-900">{stats?.streak ?? 0} dias</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col items-center md:flex-row md:items-start">
              <div className="bg-acelera-orange/10 p-2 md:p-3 rounded-lg mb-2 md:mb-0 md:mr-4">
                <Weight className="text-acelera-orange h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="text-center md:text-left">
                <p className="text-gray-600 text-xs md:text-sm">Peso Atual</p>
                <p className="text-lg md:text-2xl font-bold text-gray-900">{stats?.currentWeight ?? '0'}kg</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col items-center md:flex-row md:items-start">
              <div className="bg-acelera-blue/10 p-2 md:p-3 rounded-lg mb-2 md:mb-0 md:mr-4">
                <Star className="text-acelera-blue h-5 w-5 md:h-6 md:w-6" />
              </div>
              <div className="text-center md:text-left">
                <p className="text-gray-600 text-xs md:text-sm">Ranking</p>
                <p className="text-lg md:text-2xl font-bold text-gray-900">{stats?.ranking ?? '#-'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Today's Workouts - Mobile Optimized */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg md:text-xl font-bold text-gray-900">Treinos de Hoje</h3>
          <Button variant="outline" size="sm" className="text-sm">
            Ver Todos
          </Button>
        </div>
        
        {workoutsLoading ? (
          <div className="space-y-4">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="h-32 md:h-40 bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="space-y-4 md:grid md:grid-cols-2 md:gap-6 md:space-y-0">
            {(todayWorkouts || []).map((userWorkout: any) => (
              <WorkoutCard 
                key={userWorkout.id} 
                userWorkout={userWorkout}
              />
            ))}
            {(!todayWorkouts || (todayWorkouts || []).length === 0) && (
              <Card className="p-6 text-center">
                <div className="text-4xl mb-4">💪</div>
                <p className="text-gray-600 mb-4">Nenhum treino programado para hoje</p>
                <Button className="bg-acelera-orange text-white hover:bg-acelera-orange-light">
                  <Plus className="w-4 h-4 mr-2" />
                  Adicionar Treino
                </Button>
              </Card>
            )}
          </div>
        )}
      </div>

      {/* Calendar Section - Mobile Optimized */}
      <div className="mb-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4">Calendário Semanal</h3>
        <WeeklyCalendar />
      </div>

      {/* Body Metrics - Mobile Optimized */}
      {metrics && (
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Métricas Corporais</h3>
            <Button variant="outline" size="sm" className="text-sm">
              <Plus className="w-4 h-4 mr-1" />
              Nova
            </Button>
          </div>
          
          <Card>
            <CardContent className="p-4 md:p-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <div className="bg-blue-100 p-3 rounded-lg mx-auto w-12 h-12 flex items-center justify-center mb-2">
                    <Weight className="text-blue-600 h-5 w-5" />
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Peso</p>
                  <p className="font-semibold text-gray-900">{metrics?.weight ?? '0'} kg</p>
                  <p className="text-xs text-accent">-0.8 kg</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 p-3 rounded-lg mx-auto w-12 h-12 flex items-center justify-center mb-2">
                    <div className="text-purple-600 text-sm font-bold">%</div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Gordura</p>
                  <p className="font-semibold text-gray-900">{metrics?.bodyFat ?? '0'}%</p>
                  <p className="text-xs text-accent">-1.2%</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-green-100 p-3 rounded-lg mx-auto w-12 h-12 flex items-center justify-center mb-2">
                    <div className="text-green-600 text-lg">💪</div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Músculo</p>
                  <p className="font-semibold text-gray-900">{metrics?.muscleMass ?? '0'} kg</p>
                  <p className="text-xs text-accent">+0.5 kg</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-yellow-100 p-3 rounded-lg mx-auto w-12 h-12 flex items-center justify-center mb-2">
                    <div className="text-yellow-600 text-lg">💧</div>
                  </div>
                  <p className="text-xs text-gray-600 mb-1">Hidratação</p>
                  <p className="font-semibold text-gray-900">{metrics?.hydration ?? '0'}%</p>
                  <p className="text-xs text-red-500">-2.1%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Featured Marketplace Plans - Mobile Optimized */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg md:text-xl font-bold text-gray-900">Marketplace</h3>
            <p className="text-gray-600 text-sm">Treinos de personal trainers</p>
          </div>
          <Button variant="outline" size="sm" className="text-sm">
            Ver Mais
          </Button>
        </div>
        
        {plansLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {(featuredPlans || []).slice(0, 3).map((plan: any) => (
              <Card key={plan.id} className="overflow-hidden">
                <div className="relative">
                  <img 
                    src={plan.imageUrl} 
                    alt={plan.name}
                    className="w-full h-32 md:h-48 object-cover"
                  />
                  <Badge className="absolute top-2 left-2 bg-primary text-white text-xs">
                    Bestseller
                  </Badge>
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
                    R$ {plan.price}
                  </div>
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center mb-2">
                    <img 
                      src={plan.trainer?.profileImage} 
                      alt={plan.trainer?.firstName}
                      className="w-6 h-6 rounded-full mr-2"
                    />
                    <span className="text-gray-600 text-xs">
                      {plan.trainer?.firstName} {plan.trainer?.lastName}
                    </span>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm">{plan.name}</h4>
                  <p className="text-gray-600 text-xs mb-3 line-clamp-2">{plan.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-yellow-500">
                      <Star className="h-3 w-3 fill-current" />
                      <span className="ml-1 text-gray-600 text-xs">
                        {plan.rating} ({plan.reviewCount})
                      </span>
                    </div>
                    <span className="text-gray-600 text-xs">{plan.duration} sem</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}