import { Home, Dumbbell, Calendar, Store, TrendingUp, CreditCard } from "lucide-react";
import { Link, useLocation } from "wouter";

export default function MobileNav() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", icon: Home, label: "Início" },
    { href: "/workouts", icon: Dumbbell, label: "Treinos" },
    { href: "/calendar", icon: Calendar, label: "Agenda" },
    { href: "/marketplace", icon: Store, label: "Loja" },
    { href: "/financeiro", icon: CreditCard, label: "Financeiro" },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-inset-bottom">
      <div className="flex justify-around py-2 pb-safe">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location === item.href || (location === "/" && item.href === "/");
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center py-2 px-2 min-w-0 flex-1 ${
                isActive ? "text-acelera-orange" : "text-gray-500"
              } active:scale-95 transition-all duration-200`}
            >
              <div className={`p-1 rounded-lg ${isActive ? 'bg-acelera-orange/10' : ''}`}>
                <Icon className="h-5 w-5" />
              </div>
              <span className="text-xs mt-1 truncate w-full text-center">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
