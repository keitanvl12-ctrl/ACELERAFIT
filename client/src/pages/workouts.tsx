import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Plus, Clock, Dumbbell, Users, Library } from "lucide-react";
import ExerciseLibrary from "@/components/exercise-library";

export default function Workouts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const { data: workouts, isLoading } = useQuery({
    queryKey: ["/api/workouts"],
  });

  const filteredWorkouts = (workouts as any[])?.filter((workout: any) => {
    const matchesSearch = workout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         workout.description?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || workout.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === "all" || workout.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesCategory && matchesDifficulty;
  }) || [];

  const getCategoryColor = (category: string) => {
    const colors = {
      chest: "bg-primary/10 text-primary",
      back: "bg-blue-100 text-blue-600",
      legs: "bg-purple-100 text-purple-600",
      shoulders: "bg-yellow-100 text-yellow-600",
      cardio: "bg-accent/10 text-accent",
      arms: "bg-orange-100 text-orange-600",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-600";
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: "bg-green-100 text-green-600",
      intermediate: "bg-yellow-100 text-yellow-600",
      advanced: "bg-red-100 text-red-600",
    };
    return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-600";
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-64 bg-gray-200 rounded-xl"></div>
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
          <h1 className="text-3xl font-bold text-acelera-blue">Treinos</h1>
          <p className="text-gray-600">Gerencie seus treinos e explore nossa biblioteca completa de exercícios</p>
        </div>
        <Button className="bg-acelera-blue text-white hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Criar Treino
        </Button>
      </div>

      <Tabs defaultValue="meus-treinos" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="meus-treinos">Meus Treinos</TabsTrigger>
          <TabsTrigger value="biblioteca">Biblioteca de Exercícios</TabsTrigger>
        </TabsList>

        <TabsContent value="meus-treinos" className="space-y-6">

      {/* Filters */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar treinos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger>
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as categorias</SelectItem>
              <SelectItem value="chest">Peito</SelectItem>
              <SelectItem value="back">Costas</SelectItem>
              <SelectItem value="legs">Pernas</SelectItem>
              <SelectItem value="shoulders">Ombros</SelectItem>
              <SelectItem value="arms">Braços</SelectItem>
              <SelectItem value="cardio">Cardio</SelectItem>
            </SelectContent>
          </Select>

          <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
            <SelectTrigger>
              <SelectValue placeholder="Dificuldade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as dificuldades</SelectItem>
              <SelectItem value="beginner">Iniciante</SelectItem>
              <SelectItem value="intermediate">Intermediário</SelectItem>
              <SelectItem value="advanced">Avançado</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Users className="w-4 h-4 mr-2" />
            Públicos
          </Button>
        </div>
      </div>

      {/* Workouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredWorkouts.map((workout: any) => (
          <Card key={workout.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 mb-2">{workout.name}</h3>
                  <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                    {workout.description || "Sem descrição"}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2 mb-4">
                <Badge className={getCategoryColor(workout.category)}>
                  {workout.category}
                </Badge>
                <Badge className={getDifficultyColor(workout.difficulty)}>
                  {workout.difficulty}
                </Badge>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {workout.duration} min
                </div>
                <div className="flex items-center">
                  <Dumbbell className="h-4 w-4 mr-1" />
                  {Array.isArray(workout.exercises) ? workout.exercises.length : 0} exercícios
                </div>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-acelera-blue text-white hover:bg-blue-700">
                  Iniciar Treino
                </Button>
                <div className="flex space-x-2">
                  <Button variant="outline" className="flex-1" size="sm">
                    Editar
                  </Button>
                  <Button variant="outline" className="flex-1" size="sm">
                    Agendar
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

          {filteredWorkouts.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 text-6xl mb-4">🏋️</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {searchTerm || selectedCategory !== "all" || selectedDifficulty !== "all" 
                  ? "Nenhum treino encontrado" 
                  : "Nenhum treino criado ainda"
                }
              </h3>
              <p className="text-gray-600 mb-4">
                {searchTerm || selectedCategory !== "all" || selectedDifficulty !== "all"
                  ? "Tente ajustar os filtros de busca"
                  : "Comece criando seu primeiro treino personalizado"
                }
              </p>
              <Button className="bg-acelera-blue text-white hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Criar Primeiro Treino
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="biblioteca" className="space-y-6">
          <ExerciseLibrary />
        </TabsContent>
      </Tabs>
    </div>
  );
}
