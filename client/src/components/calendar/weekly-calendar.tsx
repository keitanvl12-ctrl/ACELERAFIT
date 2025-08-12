import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function WeeklyCalendar() {
  const [currentWeek, setCurrentWeek] = useState(new Date());

  const { data: weekWorkouts } = useQuery({
    queryKey: ["/api/calendar/week", currentWeek.toISOString()],
  });

  const getWeekDays = () => {
    const startOfWeek = new Date(currentWeek);
    const day = startOfWeek.getDay();
    const diff = startOfWeek.getDate() - day + (day === 0 ? -6 : 1); // Monday start
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

  const getWorkoutForDay = (date: Date) => {
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
      rest: { name: 'Descanso', color: 'bg-gray-100 text-gray-600' },
      yoga: { name: 'Yoga', color: 'bg-green-100 text-green-600' }
    };
    return categories[category as keyof typeof categories] || categories.rest;
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    const newWeek = new Date(currentWeek);
    newWeek.setDate(currentWeek.getDate() + (direction === 'next' ? 7 : -7));
    setCurrentWeek(newWeek);
  };

  const formatWeekRange = () => {
    const start = weekDays[0];
    const end = weekDays[6];
    return `${start.getDate()}-${end.getDate()} ${start.toLocaleDateString('pt-BR', { month: 'short' })} ${start.getFullYear()}`;
  };

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-900">Calendário Semanal</h3>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" onClick={() => navigateWeek('prev')}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-gray-900 font-medium min-w-[150px] text-center">
            {formatWeekRange()}
          </span>
          <Button variant="ghost" size="icon" onClick={() => navigateWeek('next')}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Card>
        <CardContent className="p-0">
          <div className="grid grid-cols-7 gap-0">
            {weekDays.map((date, index) => {
              const dayWorkouts = getWorkoutForDay(date);
              const isToday = date.toDateString() === new Date().toDateString();
              
              return (
                <div key={index} className="p-4 border-r border-gray-200 last:border-r-0 min-h-[120px]">
                  <div className="text-center">
                    <p className="text-gray-600 text-xs font-medium uppercase">
                      {weekDayNames[index]}
                    </p>
                    <p className={`text-lg font-semibold mt-1 ${
                      isToday 
                        ? "bg-primary text-white rounded-full w-8 h-8 flex items-center justify-center mx-auto" 
                        : "text-gray-900"
                    }`}>
                      {date.getDate()}
                    </p>
                  </div>
                  
                  <div className="mt-3 space-y-1">
                    {dayWorkouts.length > 0 ? (
                      dayWorkouts.slice(0, 2).map((workout: any, workoutIndex: number) => {
                        const categoryInfo = getWorkoutCategory(workout.workout?.category || 'rest');
                        return (
                          <div 
                            key={workoutIndex}
                            className={`text-xs px-2 py-1 rounded text-center ${categoryInfo.color}`}
                          >
                            {categoryInfo.name}
                          </div>
                        );
                      })
                    ) : index === 5 ? ( // Saturday
                      <div className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded text-center">
                        Descanso
                      </div>
                    ) : index === 6 ? ( // Sunday
                      <div className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded text-center">
                        Yoga
                      </div>
                    ) : null}
                    
                    {dayWorkouts.length > 2 && (
                      <div className="text-xs text-gray-500 text-center">
                        +{dayWorkouts.length - 2} mais
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
