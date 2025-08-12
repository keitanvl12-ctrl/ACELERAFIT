interface AceleraLogoProps {
  className?: string;
  showText?: boolean;
}

export function AceleraLogo({ className = "h-8", showText = false }: AceleraLogoProps) {
  return (
    <div className={`flex items-center ${className}`}>
      {/* Logo AceleraFit exatamente como na imagem fornecida */}
      <svg 
        viewBox="0 0 300 60" 
        className="h-full w-auto"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Letra A em azul */}
        <path 
          d="M8 50 L22 15 L36 50 M14 38 L30 38" 
          stroke="#1e3a8a" 
          strokeWidth="6" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          fill="none"
        />
        
        {/* Setas laranja - formato exato da imagem */}
        <g>
          <path 
            d="M40 25 L52 25 L48 21 M52 25 L48 29" 
            stroke="#f97316" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
          <path 
            d="M40 35 L52 35 L48 31 M52 35 L48 39" 
            stroke="#f97316" 
            strokeWidth="4" 
            strokeLinecap="round" 
            strokeLinejoin="round"
            fill="none"
          />
        </g>
        
        {/* Texto "Acelera" em azul */}
        <text x="65" y="35" fill="#1e3a8a" fontSize="24" fontWeight="600" fontFamily="Inter, sans-serif">
          Acelera
        </text>
        
        {/* Texto "Fit" em laranja */}
        <text x="180" y="35" fill="#f97316" fontSize="24" fontWeight="600" fontFamily="Inter, sans-serif">
          Fit
        </text>
      </svg>
    </div>
  );
}