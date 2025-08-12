import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Star, ShoppingCart, Filter } from "lucide-react";

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const { data: workoutPlans, isLoading } = useQuery({
    queryKey: ["/api/marketplace/plans"],
  });

  const filteredPlans = workoutPlans?.filter((plan: any) => {
    const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         plan.trainer?.firstName.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch;
  }) || [];

  const sortedPlans = [...filteredPlans].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return parseFloat(a.price) - parseFloat(b.price);
      case "price-high":
        return parseFloat(b.price) - parseFloat(a.price);
      case "rating":
        return parseFloat(b.rating) - parseFloat(a.rating);
      case "duration":
        return b.duration - a.duration;
      default: // featured
        return b.isFeatured - a.isFeatured;
    }
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-xl"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Marketplace de Treinos</h1>
        <p className="text-gray-600">Descubra treinos profissionais criados por personal trainers</p>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Buscar treinos ou personal trainers..."
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
              <SelectItem value="strength">Força</SelectItem>
              <SelectItem value="cardio">Cardio</SelectItem>
              <SelectItem value="flexibility">Flexibilidade</SelectItem>
              <SelectItem value="weight-loss">Emagrecimento</SelectItem>
              <SelectItem value="muscle-gain">Ganho de Massa</SelectItem>
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger>
              <SelectValue placeholder="Ordenar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Em destaque</SelectItem>
              <SelectItem value="rating">Melhor avaliação</SelectItem>
              <SelectItem value="price-low">Menor preço</SelectItem>
              <SelectItem value="price-high">Maior preço</SelectItem>
              <SelectItem value="duration">Duração</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center justify-between mt-4">
          <p className="text-sm text-gray-600">
            {sortedPlans.length} planos de treino encontrados
          </p>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filtros avançados
          </Button>
        </div>
      </div>

      {/* Workout Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPlans.map((plan: any) => (
          <Card key={plan.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img 
                src={plan.imageUrl || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop"} 
                alt={plan.name}
                className="w-full h-48 object-cover"
              />
              {plan.isFeatured && (
                <Badge className="absolute top-4 left-4 bg-primary text-white">
                  Em Destaque
                </Badge>
              )}
              <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm font-bold">
                R$ {plan.price}
              </div>
            </div>
            
            <CardContent className="p-6">
              <div className="flex items-center mb-3">
                <img 
                  src={plan.trainer?.profileImage || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=50&h=50&fit=crop&crop=face"} 
                  alt={plan.trainer?.firstName}
                  className="w-8 h-8 rounded-full mr-2"
                />
                <span className="text-gray-600 text-sm">
                  {plan.trainer?.firstName} {plan.trainer?.lastName}
                </span>
              </div>
              
              <h3 className="font-semibold text-gray-900 mb-2">{plan.name}</h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {plan.description}
              </p>
              
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center text-yellow-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-gray-600 text-sm">
                    {plan.rating} ({plan.reviewCount})
                  </span>
                </div>
                <span className="text-gray-600 text-sm font-medium">
                  {plan.duration} semanas
                </span>
              </div>

              <div className="space-y-2">
                <Button className="w-full bg-primary text-white hover:bg-red-600">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Comprar Plano
                </Button>
                <Button variant="outline" className="w-full">
                  Ver Detalhes
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedPlans.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🛒</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {searchTerm ? "Nenhum plano encontrado" : "Nenhum plano disponível"}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? "Tente ajustar sua busca" : "Novos planos serão adicionados em breve"}
          </p>
          {searchTerm && (
            <Button 
              variant="outline" 
              onClick={() => setSearchTerm("")}
            >
              Limpar busca
            </Button>
          )}
        </div>
      )}

      {/* Call to Action for Trainers */}
      <div className="mt-12 bg-gradient-to-r from-primary to-red-600 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-4">Você é um Personal Trainer?</h2>
        <p className="text-lg mb-6 opacity-90">
          Crie e venda seus próprios planos de treino na nossa plataforma
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
            Começar a Vender
          </Button>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-primary">
            Saiba Mais
          </Button>
        </div>
      </div>
    </div>
  );
}
