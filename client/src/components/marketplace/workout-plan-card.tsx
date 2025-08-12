import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, Heart, Share, Clock, Users, Trophy } from "lucide-react";
import { useState } from "react";

interface WorkoutPlanCardProps {
  plan: {
    id: string;
    name: string;
    description: string;
    price: string;
    duration: number;
    rating: string;
    reviewCount: number;
    imageUrl?: string;
    isFeatured?: boolean;
    trainer?: {
      firstName: string;
      lastName: string;
      profileImage?: string;
    };
    difficulty?: string;
    category?: string;
    workoutsCount?: number;
  };
  onPurchase?: (planId: string) => void;
  onViewDetails?: (planId: string) => void;
}

export default function WorkoutPlanCard({ plan, onPurchase, onViewDetails }: WorkoutPlanCardProps) {
  const [isFavorited, setIsFavorited] = useState(false);

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty?.toLowerCase()) {
      case "beginner":
        return "bg-green-100 text-green-700";
      case "intermediate":
        return "bg-yellow-100 text-yellow-700";
      case "advanced":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getCategoryColor = (category?: string) => {
    const colors = {
      strength: "bg-blue-100 text-blue-700",
      cardio: "bg-accent/10 text-accent",
      flexibility: "bg-purple-100 text-purple-700",
      "weight-loss": "bg-orange-100 text-orange-700",
      "muscle-gain": "bg-primary/10 text-primary",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-600";
  };

  const handlePurchase = () => {
    onPurchase?.(plan.id);
  };

  const handleViewDetails = () => {
    onViewDetails?.(plan.id);
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: plan.name,
        text: plan.description,
        url: window.location.href,
      });
    }
  };

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 group">
      {/* Image and Badges */}
      <div className="relative">
        <img 
          src={plan.imageUrl || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop"} 
          alt={plan.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Top Badges */}
        <div className="absolute top-4 left-4 flex flex-col space-y-2">
          {plan.isFeatured && (
            <Badge className="bg-primary text-white shadow-md">
              Em Destaque
            </Badge>
          )}
          {plan.difficulty && (
            <Badge className={getDifficultyColor(plan.difficulty)}>
              {plan.difficulty}
            </Badge>
          )}
        </div>

        {/* Price Badge */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm font-bold backdrop-blur-sm">
          R$ {plan.price}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-16 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button 
            size="sm" 
            variant="ghost" 
            className="bg-white/90 hover:bg-white text-gray-700 rounded-full p-2"
            onClick={toggleFavorite}
          >
            <Heart className={`h-4 w-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
          </Button>
          <Button 
            size="sm" 
            variant="ghost" 
            className="bg-white/90 hover:bg-white text-gray-700 rounded-full p-2"
            onClick={handleShare}
          >
            <Share className="h-4 w-4" />
          </Button>
        </div>

        {/* Quick Preview on Hover */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-center justify-center">
          <Button 
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white text-gray-900 hover:bg-gray-100"
            onClick={handleViewDetails}
          >
            Visualização Rápida
          </Button>
        </div>
      </div>
      
      <CardContent className="p-6">
        {/* Trainer Info */}
        <div className="flex items-center mb-3">
          <img 
            src={plan.trainer?.profileImage || "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=50&h=50&fit=crop&crop=face"} 
            alt={plan.trainer?.firstName}
            className="w-8 h-8 rounded-full mr-3 object-cover"
          />
          <div className="flex-1">
            <span className="text-gray-600 text-sm font-medium">
              {plan.trainer?.firstName} {plan.trainer?.lastName}
            </span>
          </div>
          <div className="flex items-center text-yellow-500">
            <Star className="h-4 w-4 fill-current" />
            <span className="ml-1 text-gray-600 text-sm font-medium">
              {plan.rating}
            </span>
          </div>
        </div>
        
        {/* Plan Title and Description */}
        <h3 className="font-bold text-gray-900 mb-2 text-lg line-clamp-1">
          {plan.name}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
          {plan.description}
        </p>
        
        {/* Plan Stats */}
        <div className="flex items-center justify-between mb-4 text-sm text-gray-600">
          <div className="flex items-center space-x-4">
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{plan.duration} semanas</span>
            </div>
            {plan.workoutsCount && (
              <div className="flex items-center">
                <Trophy className="h-4 w-4 mr-1" />
                <span>{plan.workoutsCount} treinos</span>
              </div>
            )}
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{plan.reviewCount} avaliações</span>
          </div>
        </div>

        {/* Category Tags */}
        {plan.category && (
          <div className="mb-4">
            <Badge className={getCategoryColor(plan.category)}>
              {plan.category}
            </Badge>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2">
          <Button 
            className="w-full bg-primary text-white hover:bg-red-600 transition-colors"
            onClick={handlePurchase}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Comprar por R$ {plan.price}
          </Button>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex-1" 
              size="sm"
              onClick={handleViewDetails}
            >
              Ver Detalhes
            </Button>
            <Button 
              variant="outline" 
              className="flex-1" 
              size="sm"
            >
              Prévia Grátis
            </Button>
          </div>
        </div>

        {/* Social Proof */}
        {plan.reviewCount > 50 && (
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex items-center text-xs text-gray-500">
              <Trophy className="h-3 w-3 mr-1" />
              <span>Mais de {plan.reviewCount} pessoas já compraram este plano</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
