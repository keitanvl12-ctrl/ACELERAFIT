import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Play, Plus, Info } from "lucide-react";

interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroup: string;
  equipment: string;
  difficulty: string;
  instructions: string[];
  tips: string[];
  variations?: string[];
}

// Biblioteca completa de exercícios baseada na pesquisa
const exerciseDatabase: Exercise[] = [
  // PEITO
  {
    id: "ex1",
    name: "Supino Reto com Barra",
    description: "Exercício fundamental para desenvolvimento do peitoral maior",
    muscleGroup: "chest",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions: [
      "Deite no banco com os pés firmes no chão",
      "Segure a barra com pegada ligeiramente mais larga que os ombros",
      "Desça a barra até tocar o peito",
      "Empurre a barra para cima de forma controlada"
    ],
    tips: [
      "Mantenha as escápulas retraídas",
      "Não rebata a barra no peito",
      "Respire fundo na descida e expire na subida"
    ],
    variations: ["Supino Inclinado", "Supino Declinado", "Supino com Halteres"]
  },
  {
    id: "ex2",
    name: "Flexão de Braço",
    description: "Exercício básico de peso corporal para peito e tríceps",
    muscleGroup: "chest",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions: [
      "Posição de prancha com mãos na largura dos ombros",
      "Desça o corpo até o peito quase tocar o chão",
      "Empurre para cima até os braços estenderem",
      "Mantenha o corpo reto durante todo movimento"
    ],
    tips: [
      "Mantenha o core contraído",
      "Olhe para frente, não para baixo",
      "Controle a descida"
    ],
    variations: ["Flexão Diamante", "Flexão Inclinada", "Flexão com Palmas"]
  },
  {
    id: "ex3",
    name: "Crucifixo com Halteres",
    description: "Exercício de isolamento para o peitoral",
    muscleGroup: "chest",
    equipment: "dumbbell",
    difficulty: "intermediate",
    instructions: [
      "Deite no banco segurando halteres acima do peito",
      "Abra os braços em arco com leve flexão nos cotovelos",
      "Desça até sentir alongamento no peito",
      "Retorne à posição inicial contraindo o peitoral"
    ],
    tips: [
      "Mantenha a curvatura dos cotovelos",
      "Controle o movimento na descida",
      "Foque na contração do peitoral"
    ],
    variations: ["Crucifixo Inclinado", "Crucifixo no Cabo", "Peck Deck"]
  },

  // COSTAS
  {
    id: "ex4",
    name: "Barra Fixa",
    description: "Exercício completo para desenvolvimento do dorsal",
    muscleGroup: "back",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions: [
      "Segure a barra com pegada pronada (palmas para frente)",
      "Puxe o corpo para cima até o queixo passar da barra",
      "Desça de forma controlada até os braços estenderem",
      "Mantenha o core contraído"
    ],
    tips: [
      "Evite balançar o corpo",
      "Puxe com os músculos das costas",
      "Mantenha os ombros para baixo"
    ],
    variations: ["Barra Fixa Supinada", "Barra Fixa Neutra", "Barra Fixa Assistida"]
  },
  {
    id: "ex5",
    name: "Remada Curvada com Barra",
    description: "Exercício composto para desenvolvimento completo das costas",
    muscleGroup: "back",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions: [
      "Segure a barra com pegada pronada",
      "Incline o tronco para frente mantendo as costas retas",
      "Puxe a barra em direção ao abdômen",
      "Retorne controladamente à posição inicial"
    ],
    tips: [
      "Mantenha o joelho levemente flexionado",
      "Contraia as escápulas na subida",
      "Não use impulso do quadril"
    ],
    variations: ["Remada com Halteres", "Remada T-Bar", "Remada no Cabo"]
  },
  {
    id: "ex6",
    name: "Levantamento Terra",
    description: "Exercício fundamental para toda a cadeia posterior",
    muscleGroup: "back",
    equipment: "barbell",
    difficulty: "advanced",
    instructions: [
      "Posicione os pés na largura do quadril",
      "Segure a barra com pegada mista ou pronada",
      "Mantenha as costas retas e levante pela extensão do quadril",
      "Termine em pé com ombros para trás"
    ],
    tips: [
      "Inicie o movimento pelo quadril",
      "Mantenha a barra próxima ao corpo",
      "Não arredonde as costas"
    ],
    variations: ["Terra Romeno", "Terra Sumo", "Terra com Pegada Snatch"]
  },

  // PERNAS
  {
    id: "ex7",
    name: "Agachamento Livre",
    description: "Rei dos exercícios para membros inferiores",
    muscleGroup: "legs",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions: [
      "Posicione a barra nas costas (trapézio)",
      "Pés na largura do ombro, dedos levemente para fora",
      "Desça empurrando o quadril para trás",
      "Suba empurrando pelos calcanhares"
    ],
    tips: [
      "Mantenha o joelho alinhado com o pé",
      "Desça até o quadril abaixo do joelho",
      "Mantenha o peito erguido"
    ],
    variations: ["Agachamento Frontal", "Agachamento Búlgaro", "Agachamento Goblet"]
  },
  {
    id: "ex8",
    name: "Leg Press 45°",
    description: "Exercício guiado para quadríceps e glúteos",
    muscleGroup: "legs",
    equipment: "machine",
    difficulty: "beginner",
    instructions: [
      "Sente no equipamento com costas apoiadas",
      "Posicione os pés na plataforma na largura do ombro",
      "Desça controladamente até 90 graus",
      "Empurre a plataforma de volta"
    ],
    tips: [
      "Não trave completamente os joelhos",
      "Mantenha os pés firmes na plataforma",
      "Controle a descida"
    ],
    variations: ["Leg Press Horizontal", "Leg Press com Pés Altos", "Leg Press Unilateral"]
  },
  {
    id: "ex9",
    name: "Avanço (Afundo)",
    description: "Exercício unilateral para pernas e glúteos",
    muscleGroup: "legs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions: [
      "Dê um passo à frente com uma perna",
      "Desça o quadril até formar 90 graus em ambos joelhos",
      "Empurre pela perna da frente para voltar",
      "Alterne as pernas"
    ],
    tips: [
      "Mantenha o tronco ereto",
      "Não deixe o joelho passar da ponta do pé",
      "Distribua o peso entre as duas pernas"
    ],
    variations: ["Avanço com Halteres", "Avanço Reverso", "Avanço Lateral"]
  },

  // OMBROS
  {
    id: "ex10",
    name: "Desenvolvimento com Barra",
    description: "Exercício principal para desenvolvimento dos ombros",
    muscleGroup: "shoulders",
    equipment: "barbell",
    difficulty: "intermediate",
    instructions: [
      "Segure a barra na altura dos ombros",
      "Empurre a barra acima da cabeça",
      "Estenda completamente os braços",
      "Desça controladamente"
    ],
    tips: [
      "Mantenha o core contraído",
      "Não arqueie excessivamente as costas",
      "Empurre a cabeça para frente na subida"
    ],
    variations: ["Desenvolvimento com Halteres", "Desenvolvimento Arnold", "Desenvolvimento Sentado"]
  },
  {
    id: "ex11",
    name: "Elevação Lateral",
    description: "Exercício de isolamento para o deltóide médio",
    muscleGroup: "shoulders",
    equipment: "dumbbell",
    difficulty: "beginner",
    instructions: [
      "Segure halteres ao lado do corpo",
      "Eleve os braços lateralmente até a altura dos ombros",
      "Pause no topo do movimento",
      "Desça controladamente"
    ],
    tips: [
      "Mantenha leve flexão nos cotovelos",
      "Não use impulso",
      "Controle a descida"
    ],
    variations: ["Elevação Frontal", "Elevação Posterior", "Elevação no Cabo"]
  },

  // BRAÇOS - BÍCEPS
  {
    id: "ex12",
    name: "Rosca Direta com Barra",
    description: "Exercício básico para bíceps",
    muscleGroup: "arms",
    equipment: "barbell",
    difficulty: "beginner",
    instructions: [
      "Segure a barra com pegada supinada",
      "Mantenha os cotovelos junto ao corpo",
      "Flexione os braços levando a barra ao peito",
      "Desça controladamente"
    ],
    tips: [
      "Não balance o corpo",
      "Mantenha os cotovelos fixos",
      "Contraia o bíceps no topo"
    ],
    variations: ["Rosca com Halteres", "Rosca Martelo", "Rosca Scott"]
  },

  // BRAÇOS - TRÍCEPS
  {
    id: "ex13",
    name: "Tríceps Pulley",
    description: "Exercício de isolamento para tríceps",
    muscleGroup: "arms",
    equipment: "cable",
    difficulty: "beginner",
    instructions: [
      "Segure a barra no pulley alto",
      "Mantenha cotovelos junto ao corpo",
      "Estenda os braços para baixo",
      "Retorne controladamente"
    ],
    tips: [
      "Não mova os cotovelos",
      "Contraia o tríceps na extensão",
      "Use pegada firme"
    ],
    variations: ["Tríceps Francês", "Mergulho", "Extensão com Halteres"]
  },

  // ABDOMINAIS
  {
    id: "ex14",
    name: "Prancha (Plank)",
    description: "Exercício isométrico para core",
    muscleGroup: "abs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions: [
      "Posição de flexão apoiado nos antebraços",
      "Mantenha o corpo em linha reta",
      "Contraia abdômen e glúteos",
      "Segure a posição pelo tempo determinado"
    ],
    tips: [
      "Não eleve o quadril",
      "Mantenha respiração normal",
      "Contraia todo o core"
    ],
    variations: ["Prancha Lateral", "Prancha com Elevação de Perna", "Prancha Dinâmica"]
  },
  {
    id: "ex15",
    name: "Abdominal Tradicional",
    description: "Exercício clássico para reto abdominal",
    muscleGroup: "abs",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions: [
      "Deite com joelhos flexionados",
      "Mãos atrás da cabeça ou cruzadas no peito",
      "Levante o tronco em direção aos joelhos",
      "Desça controladamente"
    ],
    tips: [
      "Não puxe a cabeça",
      "Expire na subida",
      "Mantenha pés no chão"
    ],
    variations: ["Abdominal com Pernas Elevadas", "Abdominal Bicicleta", "Abdominal V-Up"]
  },

  // CARDIO
  {
    id: "ex16",
    name: "Burpee",
    description: "Exercício funcional de alta intensidade",
    muscleGroup: "cardio",
    equipment: "bodyweight",
    difficulty: "intermediate",
    instructions: [
      "Posição em pé",
      "Agache e coloque as mãos no chão",
      "Pule para posição de prancha",
      "Faça uma flexão",
      "Volte para agachamento e pule"
    ],
    tips: [
      "Mantenha ritmo constante",
      "Não comprometa a forma",
      "Respire de forma controlada"
    ],
    variations: ["Burpee com Salto", "Half Burpee", "Burpee com Peso"]
  },
  {
    id: "ex17",
    name: "Mountain Climbers",
    description: "Exercício cardio que trabalha core e pernas",
    muscleGroup: "cardio",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions: [
      "Posição de prancha",
      "Alterne joelhos em direção ao peito",
      "Mantenha quadril baixo",
      "Movimento rápido e controlado"
    ],
    tips: [
      "Mantenha mãos firmes",
      "Core sempre contraído",
      "Respire continuamente"
    ],
    variations: ["Mountain Climbers Cruzados", "Mountain Climbers Lentos", "Mountain Climbers com Salto"]
  },
  {
    id: "ex18",
    name: "Corrida Estacionária",
    description: "Cardio básico de baixo impacto",
    muscleGroup: "cardio",
    equipment: "bodyweight",
    difficulty: "beginner",
    instructions: [
      "Eleve os joelhos alternadamente",
      "Mantenha postura ereta",
      "Balance os braços naturalmente",
      "Controle a intensidade"
    ],
    tips: [
      "Aterrisse na ponta dos pés",
      "Mantenha ritmo constante",
      "Respire profundamente"
    ],
    variations: ["High Knees", "Corrida Calcanhar-Glúteo", "Corrida com Mudança de Direção"]
  }
];

interface ExerciseLibraryProps {
  onSelectExercise?: (exercise: Exercise) => void;
  selectedExercises?: string[];
}

export default function ExerciseLibrary({ onSelectExercise, selectedExercises = [] }: ExerciseLibraryProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState("all");
  const [selectedEquipment, setSelectedEquipment] = useState("all");
  const [selectedDifficulty, setSelectedDifficulty] = useState("all");

  const filteredExercises = exerciseDatabase.filter((exercise) => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         exercise.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesMuscleGroup = selectedMuscleGroup === "all" || exercise.muscleGroup === selectedMuscleGroup;
    const matchesEquipment = selectedEquipment === "all" || exercise.equipment === selectedEquipment;
    const matchesDifficulty = selectedDifficulty === "all" || exercise.difficulty === selectedDifficulty;
    
    return matchesSearch && matchesMuscleGroup && matchesEquipment && matchesDifficulty;
  });

  const getMuscleGroupName = (group: string) => {
    const names = {
      chest: "Peito",
      back: "Costas", 
      legs: "Pernas",
      shoulders: "Ombros",
      arms: "Braços",
      abs: "Abdômen",
      cardio: "Cardio"
    };
    return names[group as keyof typeof names] || group;
  };

  const getEquipmentName = (equipment: string) => {
    const names = {
      barbell: "Barra",
      dumbbell: "Halter",
      machine: "Máquina",
      bodyweight: "Peso Corporal",
      cable: "Cabo"
    };
    return names[equipment as keyof typeof names] || equipment;
  };

  const getDifficultyName = (difficulty: string) => {
    const names = {
      beginner: "Iniciante",
      intermediate: "Intermediário", 
      advanced: "Avançado"
    };
    return names[difficulty as keyof typeof names] || difficulty;
  };

  const getDifficultyColor = (difficulty: string) => {
    const colors = {
      beginner: "bg-green-100 text-green-600",
      intermediate: "bg-yellow-100 text-yellow-600",
      advanced: "bg-red-100 text-red-600",
    };
    return colors[difficulty as keyof typeof colors] || "bg-gray-100 text-gray-600";
  };

  const getMuscleGroupColor = (group: string) => {
    const colors = {
      chest: "bg-acelera-blue/10 text-acelera-blue",
      back: "bg-blue-100 text-blue-600",
      legs: "bg-purple-100 text-purple-600",
      shoulders: "bg-yellow-100 text-yellow-600",
      arms: "bg-acelera-orange/10 text-acelera-orange",
      abs: "bg-green-100 text-green-600",
      cardio: "bg-red-100 text-red-600"
    };
    return colors[group as keyof typeof colors] || "bg-gray-100 text-gray-600";
  };

  const exercisesByMuscleGroup = exerciseDatabase.reduce((acc, exercise) => {
    if (!acc[exercise.muscleGroup]) {
      acc[exercise.muscleGroup] = [];
    }
    acc[exercise.muscleGroup].push(exercise);
    return acc;
  }, {} as Record<string, Exercise[]>);

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader>
          <CardTitle className="text-acelera-blue">Biblioteca de Exercícios</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Buscar exercícios..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <Select value={selectedMuscleGroup} onValueChange={setSelectedMuscleGroup}>
              <SelectTrigger>
                <SelectValue placeholder="Grupo Muscular" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os grupos</SelectItem>
                <SelectItem value="chest">Peito</SelectItem>
                <SelectItem value="back">Costas</SelectItem>
                <SelectItem value="legs">Pernas</SelectItem>
                <SelectItem value="shoulders">Ombros</SelectItem>
                <SelectItem value="arms">Braços</SelectItem>
                <SelectItem value="abs">Abdômen</SelectItem>
                <SelectItem value="cardio">Cardio</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
              <SelectTrigger>
                <SelectValue placeholder="Equipamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="barbell">Barra</SelectItem>
                <SelectItem value="dumbbell">Halter</SelectItem>
                <SelectItem value="machine">Máquina</SelectItem>
                <SelectItem value="bodyweight">Peso Corporal</SelectItem>
                <SelectItem value="cable">Cabo</SelectItem>
              </SelectContent>
            </Select>

            <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
              <SelectTrigger>
                <SelectValue placeholder="Dificuldade" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                <SelectItem value="beginner">Iniciante</SelectItem>
                <SelectItem value="intermediate">Intermediário</SelectItem>
                <SelectItem value="advanced">Avançado</SelectItem>
              </SelectContent>
            </Select>

            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedMuscleGroup("all");
                setSelectedEquipment("all");
                setSelectedDifficulty("all");
              }}
              variant="outline"
            >
              Limpar Filtros
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Lista de Exercícios */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-8">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="chest">Peito</TabsTrigger>
          <TabsTrigger value="back">Costas</TabsTrigger>
          <TabsTrigger value="legs">Pernas</TabsTrigger>
          <TabsTrigger value="shoulders">Ombros</TabsTrigger>
          <TabsTrigger value="arms">Braços</TabsTrigger>
          <TabsTrigger value="abs">Abdômen</TabsTrigger>
          <TabsTrigger value="cardio">Cardio</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredExercises.map((exercise) => (
              <ExerciseCard 
                key={exercise.id} 
                exercise={exercise} 
                onSelect={onSelectExercise}
                isSelected={selectedExercises.includes(exercise.id)}
                getMuscleGroupColor={getMuscleGroupColor}
                getDifficultyColor={getDifficultyColor}
                getEquipmentName={getEquipmentName}
                getDifficultyName={getDifficultyName}
              />
            ))}
          </div>
        </TabsContent>

        {Object.entries(exercisesByMuscleGroup).map(([muscleGroup, exercises]) => (
          <TabsContent key={muscleGroup} value={muscleGroup} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {exercises
                .filter(exercise => 
                  (searchTerm === "" || exercise.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                   exercise.description.toLowerCase().includes(searchTerm.toLowerCase())) &&
                  (selectedEquipment === "all" || exercise.equipment === selectedEquipment) &&
                  (selectedDifficulty === "all" || exercise.difficulty === selectedDifficulty)
                )
                .map((exercise) => (
                  <ExerciseCard 
                    key={exercise.id} 
                    exercise={exercise} 
                    onSelect={onSelectExercise}
                    isSelected={selectedExercises.includes(exercise.id)}
                    getMuscleGroupColor={getMuscleGroupColor}
                    getDifficultyColor={getDifficultyColor}
                    getEquipmentName={getEquipmentName}
                    getDifficultyName={getDifficultyName}
                  />
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>

      {filteredExercises.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">💪</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Nenhum exercício encontrado
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros de busca
          </p>
        </div>
      )}
    </div>
  );
}

interface ExerciseCardProps {
  exercise: Exercise;
  onSelect?: (exercise: Exercise) => void;
  isSelected: boolean;
  getMuscleGroupColor: (group: string) => string;
  getDifficultyColor: (difficulty: string) => string;
  getEquipmentName: (equipment: string) => string;
  getDifficultyName: (difficulty: string) => string;
}

function ExerciseCard({ 
  exercise, 
  onSelect, 
  isSelected, 
  getMuscleGroupColor, 
  getDifficultyColor, 
  getEquipmentName, 
  getDifficultyName 
}: ExerciseCardProps) {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className={`transition-all duration-200 hover:shadow-lg ${isSelected ? 'ring-2 ring-acelera-blue' : ''}`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg text-acelera-blue mb-2">{exercise.name}</CardTitle>
            <p className="text-gray-600 text-sm mb-3">{exercise.description}</p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Badge className={getMuscleGroupColor(exercise.muscleGroup)}>
            {exercise.muscleGroup.charAt(0).toUpperCase() + exercise.muscleGroup.slice(1)}
          </Badge>
          <Badge className={getDifficultyColor(exercise.difficulty)}>
            {getDifficultyName(exercise.difficulty)}
          </Badge>
          <Badge variant="outline">
            {getEquipmentName(exercise.equipment)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {showDetails && (
          <div className="space-y-3 border-t pt-3">
            <div>
              <h4 className="font-semibold text-sm mb-2">Instruções:</h4>
              <ol className="text-sm text-gray-600 space-y-1">
                {exercise.instructions.map((instruction, index) => (
                  <li key={index} className="flex">
                    <span className="mr-2 text-acelera-blue">{index + 1}.</span>
                    <span>{instruction}</span>
                  </li>
                ))}
              </ol>
            </div>
            
            <div>
              <h4 className="font-semibold text-sm mb-2">Dicas:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                {exercise.tips.map((tip, index) => (
                  <li key={index} className="flex">
                    <span className="mr-2 text-acelera-orange">•</span>
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>

            {exercise.variations && exercise.variations.length > 0 && (
              <div>
                <h4 className="font-semibold text-sm mb-2">Variações:</h4>
                <div className="flex flex-wrap gap-1">
                  {exercise.variations.map((variation, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      {variation}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        
        <div className="flex gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setShowDetails(!showDetails)}
            className="flex-1"
          >
            <Info className="h-4 w-4 mr-1" />
            {showDetails ? "Ocultar" : "Detalhes"}
          </Button>
          
          {onSelect && (
            <Button 
              size="sm" 
              onClick={() => onSelect(exercise)}
              className={`flex-1 ${isSelected ? 'bg-green-600 hover:bg-green-700' : 'bg-acelera-blue hover:bg-blue-700'}`}
            >
              <Plus className="h-4 w-4 mr-1" />
              {isSelected ? "Selecionado" : "Adicionar"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}