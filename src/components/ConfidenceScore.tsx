interface ConfidenceScoreProps {
  score: number; // 0-100
  size?: number;
}

export function ConfidenceScore({ score, size = 32 }: ConfidenceScoreProps) {
  const radius = (size - 4) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  const getColor = (score: number) => {
    if (score >= 80) return '#14b8a6'; // teal-500
    if (score >= 60) return '#3b82f6'; // blue-500
    if (score >= 40) return '#f59e0b'; // amber-500
    return '#ef4444'; // red-500
  };

  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1f2937"
          strokeWidth="3"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={getColor(score)}
          strokeWidth="3"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-500"
        />
      </svg>
      <div 
        className="absolute inset-0 flex items-center justify-center text-[10px]"
        style={{ color: getColor(score) }}
      >
        {score}%
      </div>
    </div>
  );
}
