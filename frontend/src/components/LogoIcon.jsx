export function LogoIcon({ className = "w-10 h-10" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Cyan to Purple Gradient */}
        <linearGradient
          id="sdGradient"
          x1="0%"
          y1="50%"
          x2="100%"
          y2="50%"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#00E5FF" />
          <stop offset="45%" stopColor="#29B6F6" />
          <stop offset="75%" stopColor="#8E24AA" />
          <stop offset="100%" stopColor="#D500F9" />
        </linearGradient>
      </defs>

      {/* S + D Interlocking Path */}
      <path
        d="M 45 60 
           C 25 60, 15 45, 15 32 
           C 15 18, 30 10, 52 10 
           C 78 10, 95 28, 112 48 
           L 142 82 
           C 158 100, 172 110, 188 110 
           C 202 110, 212 98, 212 82 
           C 212 65, 198 52, 178 52 
           C 158 52, 142 68, 128 85 
           L 100 115 
           C 85 130, 68 138, 48 138 
           C 28 138, 10 125, 10 102 
           C 10 82, 25 68, 45 68 Z"
        fill="url(#sdGradient)"
      />
    </svg>
  );
}