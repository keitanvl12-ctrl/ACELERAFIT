import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";
import { AceleraLogo } from "@/components/ui/acelera-logo";

export default function Header() {
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Dashboard" },
    { href: "/workouts", label: "Treinos" },
    { href: "/calendar", label: "Calendário" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/progress", label: "Progresso" },
    { href: "/financeiro", label: "Meu Financeiro" },
  ];

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="mx-auto px-4">
        <div className="flex justify-between items-center h-14 md:h-16">
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0">
              <AceleraLogo className="h-10 hover:opacity-80 transition-opacity cursor-pointer" />
            </Link>
            <nav className="hidden md:ml-8 md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`font-medium pb-1 text-sm transition-colors ${
                    location === item.href || (location === "/" && item.href === "/")
                      ? "text-acelera-blue border-b-2 border-acelera-orange"
                      : "text-gray-500 hover:text-acelera-blue"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center space-x-2 md:space-x-4">
            <Button variant="ghost" size="icon" className="h-8 w-8 md:h-10 md:w-10">
              <Bell className="h-4 w-4 md:h-5 md:w-5" />
            </Button>
            <div className="flex items-center space-x-1 md:space-x-2">
              <img 
                src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop&crop=face" 
                alt="User Avatar" 
                className="w-8 h-8 md:w-10 md:h-10 rounded-full"
              />
              <span className="hidden sm:inline text-gray-900 font-medium text-sm md:text-base">João Silva</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
