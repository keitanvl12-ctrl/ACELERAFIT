import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight, Plus, Calendar as CalendarIcon, Clock, Dumbbell } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [viewMode, setViewMode] = useState<"month" | "week">("month");
  const [showAddWorkout, setShowAddWorkout] = useState(false);

  const { data: weekWorkouts } = useQuery({
    queryKey: ["/api/calendar/week", selectedDate.toISOString()],
  });

  const { data: workouts } = useQuery({
    queryKey: ["/api/workouts"],
  });

  const getWorkoutForDate = (date: Date) => {
    const dateKey = date.toISOString().split('T')[0];
    return weekWorkouts?.[dateKey] || [];
  };

  const getWorkoutCategory = (category: string) => {
    const categories = {
      chest: { name: 'Peito', color: 'bg-primary/10 text-primary' },
      cardio: { name: 'Cardio', color: 'bg-accent/10 text-accent' },
      back: { name: 'Costas', color: 'bg-blue-100 text-blue-600' },
      legs: { name: 'Pernas', color: 'bg-purple-100 text-purple-600' },
      shoulders: { name: 'Ombros', color: 'bg-yellow-100 text-yellow-600' },
      arms: { name: 'Braços', color: 'bg-orange-100 text-orange-600' },
    };
    return categories[category as keyof typeof categories] || { name: category, color: 'bg-gray-100 text-gray-600' };
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(selectedDate.getMonth() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  const getWeekDays = () => {
    const startOfWeek = new Date(selectedDate);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1);
    startOfWeek.setDate(diff);

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const weekDays = getWeekDays();
  const weekDayNames = ['SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB', 'DOM'];

  const formatDateRange = () => {
    if (viewMode === "week") {
      const start = weekDays[0];
      const end = weekDays[6];
      return `${start.getDate()}-${end.getDate()} ${start.toLocaleDateString('pt-BR', { month: 'short' })} ${start.getFullYear()}`;
    }
    return selectedDate.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Calendário de Treinos</h1>
          <p className="text-gray-600">Organize e acompanhe seus treinos</p>
        </div>
        <div className="flex items-center space-x-4 mt-4 sm:mt-0">
          <Select value={viewMode} onValueChange={(value: "month" | "week") => setViewMode(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="month">Mês</SelectItem>
              <SelectItem value="week">Semana</SelectItem>
            </SelectContent>
          </Select>
          <Dialog open={showAddWorkout} onOpenChange={setShowAddWorkout}>
            <DialogTrigger asChild>
              <Button className="bg-primary text-white hover:bg-red-600">
                <Plus className="w-4 h-4 mr-2" />
                Agendar Treino
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agendar Novo Treino</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Selecionar Treino</label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Escolha um treino" />
                    </SelectTrigger>
                    <SelectContent>
                      {workouts?.map((workout: any) => (
                        <SelectItem key={workout.id} value={workout.id}>
                          {workout.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium">Data</label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => date && setSelectedDate(date)}
                    className="rounded-md border"
                  />
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={() => setShowAddWorkout(false)}>
                    Cancelar
                  </Button>
                  <Button className="bg-primary text-white hover:bg-red-600">
                    Agendar
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="icon" onClick={() => navigateMonth('prev')}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-semibold text-gray-900 capitalize">
          {formatDateRange()}
        </h2>
        <Button variant="ghost" size="icon" onClick={() => navigateMonth('next')}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {viewMode === "month" ? (
        /* Month View */
        <Card>
          <CardContent className="p-6">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={(date) => date && setSelectedDate(date)}
              className="w-full"
              components={{
                Day: ({ date, ...props }) => {
                  const dayWorkouts = getWorkoutForDate(date);
                  return (
                    <div className="relative">
                      <button {...props} className="w-full h-12 hover:bg-gray-100 rounded-md">
                        {date.getDate()}
                      </button>
                      {dayWorkouts.length > 0 && (
                        <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                          <div className="w-2 h-2 bg-primary rounded-full"></div>
                        </div>
                      )}
                    </div>
                  );
                }
              }}
            />
          </CardContent>
        </Card>
      ) : (
        /* Week View */
        <Card>
          <CardContent className="p-0">
            <div className="grid grid-cols-7 gap-0">
              {weekDays.map((date, index) => {
                const dayWorkouts = getWorkoutForDate(date);
                const isToday = date.toDateString() === new Date().toDateString();
                const isSelected = date.toDateString() === selectedDate.toDateString();
                
                return (
                  <div 
                    key={index} 
                    className="border-r border-gray-200 last:border-r-0 min-h-[200px] cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedDate(date)}
                  >
                    <div className="p-4">
                      <div className="text-center mb-3">
                        <p className="text-gray-600 text-xs font-medium uppercase">
                          {weekDayNames[index]}
                        </p>
                        <p className={`text-lg font-semibold mt-1 ${
                          isToday 
                            ? "bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto" 
                            : isSelected
                            ? "bg-primary/10 text-primary rounded-full w-8 h-8 flex items-center justify-center mx-auto"
                            : "text-gray-900"
                        }`}>
                          {date.getDate()}
                        </p>
                      </div>
                      
                      <div className="space-y-2">
                        {dayWorkouts.slice(0, 3).map((userWorkout: any, workoutIndex: number) => {
                          const workout = userWorkout.workout;
                          if (!workout) return null;
                          
                          const categoryInfo = getWorkoutCategory(workout.category);
                          return (
                            <div 
                              key={workoutIndex}
                              className={`text-xs px-2 py-1 rounded ${categoryInfo.color} cursor-pointer hover:opacity-80`}
                            >
                              <div className="font-medium truncate">{workout.name}</div>
                              <div className="flex items-center text-xs opacity-75">
                                <Clock className="h-3 w-3 mr-1" />
                                {workout.duration}min
                              </div>
                            </div>
                          );
                        })}
                        
                        {dayWorkouts.length > 3 && (
                          <div className="text-xs text-gray-500 text-center py-1">
                            +{dayWorkouts.length - 3} mais
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Selected Date Details */}
      {selectedDate && (
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {selectedDate.toLocaleDateString('pt-BR', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </h3>
              <Button size="sm" variant="outline">
                <Plus className="w-4 h-4 mr-1" />
                Adicionar Treino
              </Button>
            </div>
            
            <div className="space-y-4">
              {getWorkoutForDate(selectedDate).map((userWorkout: any) => {
                const workout = userWorkout.workout;
                if (!workout) return null;
                
                const categoryInfo = getWorkoutCategory(workout.category);
                const progress = userWorkout.progress || { completedExercises: 0, totalExercises: 0 };
                const isCompleted = userWorkout.completedDate;
                
                return (
                  <div key={userWorkout.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="bg-white p-2 rounded-lg">
                        <Dumbbell className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{workout.name}</h4>
                        <div className="flex items-center space-x-4 text-sm text-gray-600">
                          <div className="flex items-center">
                            <Clock className="h-4 w-4 mr-1" />
                            {workout.duration} min
                          </div>
                          <Badge className={categoryInfo.color}>
                            {categoryInfo.name}
                          </Badge>
                          {isCompleted && (
                            <Badge className="bg-accent text-white">Concluído</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {!isCompleted && (
                        <Button size="sm" className="bg-primary text-white hover:bg-red-600">
                          Iniciar
                        </Button>
                      )}
                      <Button size="sm" variant="outline">
                        Detalhes
                      </Button>
                    </div>
                  </div>
                );
              })}
              
              {getWorkoutForDate(selectedDate).length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <CalendarIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Nenhum treino agendado para este dia</p>
                  <Button className="mt-4 bg-primary text-white hover:bg-red-600">
                    <Plus className="w-4 h-4 mr-2" />
                    Agendar Treino
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
