import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Weight, TrendingUp, Calendar, Target, Plus, Award } from "lucide-react";
import RankingList from "@/components/ranking/ranking-list";

export default function ProgressPage() {
  const { data: metrics, isLoading: metricsLoading } = useQuery({
    queryKey: ["/api/metrics"],
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: ranking } = useQuery({
    queryKey: ["/api/ranking"],
  });

  if (metricsLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Meu Progresso</h1>
          <p className="text-gray-600">Acompanhe sua evolução fitness</p>
        </div>
        <Button className="bg-primary text-white hover:bg-red-600">
          <Plus className="w-4 h-4 mr-2" />
          Nova Medição
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Treinos Concluídos</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.workoutsCompleted ?? 0}</p>
              </div>
              <div className="bg-primary/10 p-3 rounded-lg">
                <Target className="text-primary h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Sequência Atual</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.streak ?? 0} dias</p>
              </div>
              <div className="bg-accent/10 p-3 rounded-lg">
                <Calendar className="text-accent h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pontuação Total</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.points ?? 0}</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-lg">
                <Award className="text-yellow-600 h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Posição no Ranking</p>
                <p className="text-2xl font-bold text-gray-900">{stats?.ranking ?? "#-"}</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <TrendingUp className="text-purple-600 h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Body Metrics */}
        <div>
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Métricas Corporais</h2>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Adicionar
                </Button>
              </div>

              {metrics ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <Weight className="text-blue-600 h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Peso Corporal</p>
                        <p className="text-gray-600 text-sm">Última medição</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-lg">{metrics?.weight ?? '0'} kg</p>
                      <div className="flex items-center text-accent text-sm">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        -0.8 kg
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <div className="bg-purple-100 p-3 rounded-lg mr-4">
                        <div className="text-purple-600 h-5 w-5 flex items-center justify-center font-bold">%</div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Gordura Corporal</p>
                        <p className="text-gray-600 text-sm">Bioimpedância</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-lg">{metrics?.bodyFat ?? '0'}%</p>
                      <div className="flex items-center text-accent text-sm">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        -1.2%
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <div className="bg-green-100 p-3 rounded-lg mr-4">
                        <div className="text-green-600 h-5 w-5 flex items-center justify-center">💪</div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Massa Muscular</p>
                        <p className="text-gray-600 text-sm">Bioimpedância</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-lg">{metrics?.muscleMass ?? '0'} kg</p>
                      <div className="flex items-center text-accent text-sm">
                        <TrendingUp className="h-3 w-3 mr-1" />
                        +0.5 kg
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-4">
                    <div className="flex items-center">
                      <div className="bg-yellow-100 p-3 rounded-lg mr-4">
                        <div className="text-yellow-600 h-5 w-5 flex items-center justify-center">💧</div>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">Nível de Hidratação</p>
                        <p className="text-gray-600 text-sm">Bioimpedância</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-900 text-lg">{metrics?.hydration ?? '0'}%</p>
                      <div className="flex items-center text-red-500 text-sm">
                        <TrendingUp className="h-3 w-3 mr-1 rotate-180" />
                        -2.1%
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-gray-500">
                  <div className="text-4xl mb-4">📊</div>
                  <p className="mb-4">Nenhuma medição registrada ainda</p>
                  <Button className="bg-primary text-white hover:bg-red-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Primeira Medição
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Goals Section */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Metas</h2>
                <Button variant="outline" size="sm">
                  <Plus className="w-4 h-4 mr-1" />
                  Nova Meta
                </Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">Perder 5kg</h3>
                    <Badge className="bg-yellow-100 text-yellow-600">Em andamento</Badge>
                  </div>
                  <Progress value={60} className="h-2 mb-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>3kg perdidos</span>
                    <span>2kg restantes</span>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-gray-900">30 treinos no mês</h3>
                    <Badge className="bg-accent text-white">Concluída</Badge>
                  </div>
                  <Progress value={100} className="h-2 mb-2" />
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>32 treinos realizados</span>
                    <span>Meta superada!</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Ranking */}
        <div>
          <RankingList />
          
          {/* Achievements */}
          <Card className="mt-8">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Conquistas</h2>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-yellow-50 rounded-lg">
                  <div className="text-3xl mb-2">🏆</div>
                  <p className="font-medium text-gray-900 text-sm">Primeira Vitória</p>
                  <p className="text-gray-600 text-xs">Primeiro treino concluído</p>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl mb-2">🔥</div>
                  <p className="font-medium text-gray-900 text-sm">Sequência de Fogo</p>
                  <p className="text-gray-600 text-xs">7 dias consecutivos</p>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl mb-2">💪</div>
                  <p className="font-medium text-gray-900 text-sm">Força Total</p>
                  <p className="text-gray-600 text-xs">50 treinos de força</p>
                </div>
                
                <div className="text-center p-4 bg-gray-50 rounded-lg opacity-50">
                  <div className="text-3xl mb-2">⭐</div>
                  <p className="font-medium text-gray-600 text-sm">Estrela Cadente</p>
                  <p className="text-gray-500 text-xs">30 dias consecutivos</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
