import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dumbbell, Clock } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface WorkoutCardProps {
  userWorkout: any;
}

export default function WorkoutCard({ userWorkout }: WorkoutCardProps) {
  const queryClient = useQueryClient();
  const workout = userWorkout.workout;
  const progress = userWorkout.progress || { completedExercises: 0, totalExercises: 0 };
  const progressPercentage = progress.totalExercises > 0 ? (progress.completedExercises / progress.totalExercises) * 100 : 0;

  const startWorkoutMutation = useMutation({
    mutationFn: () => apiRequest("PATCH", `/api/workouts/${userWorkout.id}/progress`, {
      progress: { ...progress, started: true },
      completedDate: null
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workouts/today"] });
    },
  });

  const continueWorkoutMutation = useMutation({
    mutationFn: () => apiRequest("PATCH", `/api/workouts/${userWorkout.id}/progress`, {
      progress: { ...progress, resumed: true }
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/workouts/today"] });
    },
  });

  const handleStart = () => {
    startWorkoutMutation.mutate();
  };

  const handleContinue = () => {
    continueWorkoutMutation.mutate();
  };

  const getStatusBadge = () => {
    if (userWorkout.completedDate) {
      return <Badge className="bg-acelera-blue text-white">Concluído</Badge>;
    }
    if (progressPercentage > 0) {
      return <Badge className="bg-acelera-orange text-white">Em Progresso</Badge>;
    }
    return <Badge className="bg-gray-500 text-white">Agendado</Badge>;
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'chest':
        return <Dumbbell className="text-acelera-orange h-5 w-5" />;
      case 'cardio':
        return <div className="text-acelera-blue h-5 w-5 flex items-center justify-center">🏃</div>;
      default:
        return <Dumbbell className="text-acelera-orange h-5 w-5" />;
    }
  };

  if (!workout) return null;

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="bg-acelera-orange/10 p-2 rounded-lg mr-3">
              {getCategoryIcon(workout.category)}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{workout.name}</h4>
              <div className="flex items-center text-gray-600 text-sm">
                <Clock className="h-4 w-4 mr-1" />
                {workout.duration} min
              </div>
            </div>
          </div>
          {getStatusBadge()}
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
            <span>Progresso</span>
            <span>{progress.completedExercises}/{progress.totalExercises} exercícios</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {userWorkout.completedDate ? (
          <Button variant="outline" className="w-full" disabled>
            Treino Concluído
          </Button>
        ) : progressPercentage > 0 ? (
          <Button 
            onClick={handleContinue}
            disabled={continueWorkoutMutation.isPending}
            className="w-full bg-acelera-orange text-white hover:bg-acelera-orange-light"
          >
            {continueWorkoutMutation.isPending ? "Carregando..." : "Continuar Treino"}
          </Button>
        ) : (
          <Button 
            onClick={handleStart}
            disabled={startWorkoutMutation.isPending}
            className="w-full bg-acelera-orange text-white hover:bg-acelera-orange-light"
          >
            {startWorkoutMutation.isPending ? "Carregando..." : "Iniciar Treino"}
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
