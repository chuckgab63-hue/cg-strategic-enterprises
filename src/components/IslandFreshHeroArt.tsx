export default function IslandFreshHeroArt() {
  return (
    <svg
      viewBox="0 0 1200 520"
      className="if-hero-art"
      role="img"
      aria-label="Illustration of an Island Fresh meal container beside a nutrition facts label, framed by palm fronds"
    >
      <defs>
        <linearGradient id="ifSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0B2B21" />
          <stop offset="55%" stopColor="#12402F" />
          <stop offset="100%" stopColor="#1B5540" />
        </linearGradient>
        <linearGradient id="ifSun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#F0B347" />
          <stop offset="100%" stopColor="#E2930B" />
        </linearGradient>
        <linearGradient id="ifWater" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1B5540" />
          <stop offset="100%" stopColor="#0E3527" />
        </linearGradient>

        {/* One frond, drawn once and reused at different angles */}
        <g id="ifFrond">
          <path d="M0 0 C 60 -6, 140 -10, 210 -4" stroke="#0A241C" strokeWidth="5" fill="none" strokeLinecap="round" />
          {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
            const x = 14 + i * 25;
            const len = 54 - i * 4.5;
            return (
              <g key={`u${i}`}>
                <path
                  d={`M${x} ${-2 - i * 0.8} Q ${x + 16} ${-2 - i * 0.8 - len * 0.8}, ${x + 40} ${-2 - i * 0.8 - len} Q ${x + 20} ${-2 - i * 0.8 - len * 0.45}, ${x + 4} ${-2 - i * 0.8}`}
                  fill="#0A241C"
                />
                <path
                  d={`M${x} ${2 + i * 0.4} Q ${x + 16} ${2 + i * 0.4 + len * 0.8}, ${x + 40} ${2 + i * 0.4 + len} Q ${x + 20} ${2 + i * 0.4 + len * 0.45}, ${x + 4} ${2 + i * 0.4}`}
                  fill="#0A241C"
                />
              </g>
            );
          })}
        </g>
      </defs>

      {/* Sky */}
      <rect width="1200" height="520" fill="url(#ifSky)" />

      {/* Sun */}
      <circle cx="905" cy="170" r="96" fill="url(#ifSun)" opacity="0.92" />

      {/* Horizon water */}
      <path d="M0 386 L1200 362 L1200 520 L0 520 Z" fill="url(#ifWater)" />
      <path d="M0 386 L1200 362" stroke="#2E7C5C" strokeWidth="2" opacity="0.5" />

      {/* Sand */}
      <path d="M0 452 C 260 436, 620 446, 1200 430 L1200 520 L0 520 Z" fill="#E8DFC8" opacity="0.14" />

      {/* Palm fronds framing the top corners */}
      <g opacity="0.95">
        <use href="#ifFrond" transform="translate(-10 78) rotate(14)" />
        <use href="#ifFrond" transform="translate(-24 132) rotate(-10)" />
        <use href="#ifFrond" transform="translate(-6 30) rotate(38)" />
      </g>
      <g opacity="0.95">
        <use href="#ifFrond" transform="translate(1210 70) rotate(166) " />
        <use href="#ifFrond" transform="translate(1222 128) rotate(194)" />
        <use href="#ifFrond" transform="translate(1206 22) rotate(142)" />
      </g>

      {/* ---- Meal container, three compartments, slight tilt ---- */}
      <g transform="translate(232 246) rotate(-6)">
        {/* shadow */}
        <rect x="10" y="18" width="392" height="216" rx="18" fill="#061A14" opacity="0.5" />
        {/* tray body */}
        <rect x="0" y="0" width="392" height="216" rx="18" fill="#F3F6F1" />
        <rect x="0" y="0" width="392" height="216" rx="18" fill="none" stroke="#C6D3C6" strokeWidth="2" />
        {/* divider lines */}
        <path d="M232 10 L232 206" stroke="#D3DED3" strokeWidth="3" />
        <path d="M232 110 L384 110" stroke="#D3DED3" strokeWidth="3" />

        {/* protein: grilled chicken */}
        <g>
          <rect x="24" y="30" width="184" height="156" rx="12" fill="#EDE2CC" />
          <path d="M44 74 q 30 -30 66 -16 q 36 14 44 46 q 8 32 -26 44 q -34 12 -64 -4 q -30 -16 -20 -70 z" fill="#C98A45" />
          <path d="M60 78 q 26 -20 54 -8" stroke="#A96C2E" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M56 104 q 30 -16 62 -4" stroke="#A96C2E" strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M58 130 q 30 -14 60 -2" stroke="#A96C2E" strokeWidth="5" fill="none" strokeLinecap="round" />
        </g>

        {/* rice */}
        <g>
          <rect x="248" y="24" width="122" height="74" rx="10" fill="#F7F4EA" />
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((i) => (
            <ellipse
              key={i}
              cx={262 + (i % 4) * 30 + (i % 2) * 6}
              cy={40 + Math.floor(i / 4) * 20}
              rx="9"
              ry="5"
              fill="#E4DCC6"
              transform={`rotate(${(i * 37) % 90} ${262 + (i % 4) * 30} ${40 + Math.floor(i / 4) * 20})`}
            />
          ))}
        </g>

        {/* greens */}
        <g>
          <rect x="248" y="122" width="122" height="70" rx="10" fill="#E4EFDF" />
          <path d="M258 168 q 18 -34 44 -30 q -6 28 -30 34 z" fill="#3E7D3A" />
          <path d="M292 172 q 14 -36 44 -34 q -4 30 -32 38 z" fill="#4E9445" />
          <circle cx="342" cy="146" r="10" fill="#C6472F" />
          <circle cx="322" cy="140" r="7" fill="#D4593C" />
        </g>
      </g>

      {/* ---- Nutrition facts label: the hero element ---- */}
      <g transform="translate(686 190) rotate(3)">
        <rect x="8" y="12" width="270" height="300" rx="6" fill="#061A14" opacity="0.55" />
        <rect x="0" y="0" width="270" height="300" rx="6" fill="#FFFFFF" />
        <g fontFamily="Karla, Helvetica, Arial, sans-serif" fill="#111111">
          <text x="16" y="38" fontSize="27" fontWeight="700" letterSpacing="-0.5">Nutrition Facts</text>
          <rect x="16" y="46" width="238" height="2" fill="#111111" />
          <text x="16" y="66" fontSize="12">1 serving per container</text>
          <text x="16" y="84" fontSize="13" fontWeight="700">Serving size — 1 meal</text>
          <rect x="16" y="92" width="238" height="9" fill="#111111" />

          <text x="16" y="116" fontSize="10">Amount per serving</text>
          <text x="16" y="148" fontSize="25" fontWeight="700">Calories</text>
          <text x="254" y="148" fontSize="31" fontWeight="700" textAnchor="end">360</text>
          <rect x="16" y="158" width="238" height="4" fill="#111111" />

          <text x="254" y="176" fontSize="10" fontWeight="700" textAnchor="end">% Daily Value*</text>
          <rect x="16" y="182" width="238" height="1" fill="#111111" />

          <text x="16" y="200" fontSize="12"><tspan fontWeight="700">Total Fat</tspan> 9g</text>
          <text x="254" y="200" fontSize="12" fontWeight="700" textAnchor="end">12%</text>
          <rect x="16" y="207" width="238" height="1" fill="#CCCCCC" />

          <text x="16" y="225" fontSize="12"><tspan fontWeight="700">Total Carbohydrate</tspan> 38g</text>
          <text x="254" y="225" fontSize="12" fontWeight="700" textAnchor="end">14%</text>
          <rect x="16" y="232" width="238" height="1" fill="#CCCCCC" />

          <text x="30" y="248" fontSize="12">Dietary Fiber 6g</text>
          <text x="254" y="248" fontSize="12" fontWeight="700" textAnchor="end">21%</text>
          <rect x="16" y="255" width="238" height="1" fill="#CCCCCC" />

          <text x="16" y="273" fontSize="12"><tspan fontWeight="700">Protein</tspan> 30g</text>
          <text x="254" y="273" fontSize="12" fontWeight="700" textAnchor="end">60%</text>
          <rect x="16" y="280" width="238" height="4" fill="#111111" />

          <text x="16" y="294" fontSize="9" fill="#555555">Garlic Chicken, Jasmine Rice, Black Beans</text>
        </g>
      </g>
    </svg>
  );
}
