import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Plus, Calendar } from "lucide-react";

interface MetricData {
  value: string;
  change: string;
  trend: "up" | "down" | "neutral";
  unit: string;
  lastMeasured?: string;
}

interface MetricsCardProps {
  title: string;
  icon: React.ReactNode;
  iconColor: string;
  metrics: {
    current: MetricData;
    target?: MetricData;
    history?: MetricData[];
  };
  showAddButton?: boolean;
  onAddMeasurement?: () => void;
}

export default function MetricsCard({ 
  title, 
  icon, 
  iconColor, 
  metrics, 
  showAddButton = true,
  onAddMeasurement 
}: MetricsCardProps) {
  const getTrendIcon = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3" />;
      case "down":
        return <TrendingDown className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getTrendColor = (trend: "up" | "down" | "neutral") => {
    switch (trend) {
      case "up":
        return "text-accent";
      case "down":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const calculateProgress = () => {
    if (!metrics.target) return 0;
    const current = parseFloat(metrics.current.value);
    const target = parseFloat(metrics.target.value);
    return Math.min((current / target) * 100, 100);
  };

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className={`${iconColor} p-2 rounded-lg mr-3`}>
              {icon}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">{title}</h3>
              {metrics.current.lastMeasured && (
                <p className="text-gray-600 text-xs flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {metrics.current.lastMeasured}
                </p>
              )}
            </div>
          </div>
          {showAddButton && (
            <Button 
              size="sm" 
              variant="outline"
              onClick={onAddMeasurement}
            >
              <Plus className="h-3 w-3" />
            </Button>
          )}
        </div>

        {/* Current Value */}
        <div className="mb-4">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-gray-900">
              {metrics.current.value}
              <span className="text-sm font-normal text-gray-600 ml-1">
                {metrics.current.unit}
              </span>
            </span>
            {metrics.current.change && (
              <div className={`flex items-center text-sm ${getTrendColor(metrics.current.trend)}`}>
                {getTrendIcon(metrics.current.trend)}
                <span className="ml-1">{metrics.current.change}</span>
              </div>
            )}
          </div>
        </div>

        {/* Target Progress */}
        {metrics.target && (
          <div className="mb-4">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>Meta: {metrics.target.value}{metrics.target.unit}</span>
              <span>{calculateProgress().toFixed(0)}%</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
          </div>
        )}

        {/* Historical Data */}
        {metrics.history && metrics.history.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-gray-700">Histórico Recente</h4>
            <div className="space-y-1">
              {metrics.history.slice(0, 3).map((entry, index) => (
                <div key={index} className="flex items-center justify-between text-xs">
                  <span className="text-gray-600">{entry.lastMeasured}</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-900">
                      {entry.value}{entry.unit}
                    </span>
                    {entry.change && (
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getTrendColor(entry.trend)} border-current`}
                      >
                        {entry.change}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="flex-1 text-xs">
              Ver Gráfico
            </Button>
            <Button size="sm" variant="outline" className="flex-1 text-xs">
              Exportar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
