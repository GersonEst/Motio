import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface BiomarkerCardProps {
  title: string;
  subtitle: string;
  value: number;
  trend: 'up' | 'down' | 'stable';
  status: 'Stable' | 'Increasing' | 'Improving' | 'Declining';
  accentColor: string;
  sparklineData: number[];
  unit?: string;
}

export function BiomarkerCard({
  title,
  subtitle,
  value,
  trend,
  status,
  accentColor,
  sparklineData,
  unit = '',
}: BiomarkerCardProps) {
  const getTrendIcon = () => {
    if (trend === 'up') return <TrendingUp className="w-4 h-4" />;
    if (trend === 'down') return <TrendingDown className="w-4 h-4" />;
    return <Minus className="w-4 h-4" />;
  };

  const getStatusColor = () => {
    if (status === 'Stable') return 'bg-green-100 text-green-700';
    if (status === 'Improving') return 'bg-blue-100 text-blue-700';
    if (status === 'Increasing') return 'bg-orange-100 text-orange-700';
    return 'bg-red-100 text-red-700';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
          <p className="text-xs text-gray-500 mt-1">{subtitle}</p>
        </div>
        <div className={`px-2.5 py-1 rounded-md text-xs font-medium ${getStatusColor()}`}>
          {status}
        </div>
      </div>

      <div className="flex items-end gap-3 mb-4">
        <div className={`text-4xl font-semibold`} style={{ color: accentColor }}>
          {value}
          {unit && <span className="text-xl text-gray-400 ml-1">{unit}</span>}
        </div>
        <div className="flex items-center gap-1 mb-1.5" style={{ color: accentColor }}>
          {getTrendIcon()}
        </div>
      </div>

      {/* Sparkline */}
      <div className="h-12 flex items-end gap-0.5">
        {sparklineData.map((point, index) => {
          const maxValue = Math.max(...sparklineData);
          const height = (point / maxValue) * 100;
          return (
            <div
              key={index}
              className="flex-1 rounded-t"
              style={{
                height: `${height}%`,
                backgroundColor: accentColor,
                opacity: 0.6,
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
