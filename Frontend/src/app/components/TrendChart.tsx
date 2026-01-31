import { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Pill } from 'lucide-react';

interface TrendChartProps {
  data: any[];
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

export function TrendChart({ data, timeRange, onTimeRangeChange }: TrendChartProps) {
  const [activeTab, setActiveTab] = useState<'tremor' | 'gait' | 'turning' | 'combined'>('combined');

  const timeRanges = ['Week', 'Month', '6 Months', 'Year'];

  const getVisibleLines = () => {
    if (activeTab === 'tremor') return ['tremor'];
    if (activeTab === 'gait') return ['gait'];
    if (activeTab === 'turning') return ['turning'];
    return ['tremor', 'gait', 'turning'];
  };

  const visibleLines = getVisibleLines();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold text-gray-900">Trends Over Time</h2>
        
        {/* Time Range Selector */}
        <div className="flex gap-2">
          {timeRanges.map((range) => (
            <button
              key={range}
              onClick={() => onTimeRangeChange(range)}
              className={`px-4 py-1.5 text-sm rounded-lg transition-colors ${
                timeRange === range
                  ? 'bg-blue-100 text-blue-700 font-medium'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        {[
          { id: 'combined', label: 'Combined View' },
          { id: 'tremor', label: 'Tremor' },
          { id: 'gait', label: 'Gait' },
          { id: 'turning', label: 'Turning' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2 text-sm font-medium transition-colors border-b-2 ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Chart */}
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="date"
              tick={{ fill: '#6b7280', fontSize: 12 }}
              stroke="#e5e7eb"
            />
            <YAxis
              tick={{ fill: '#6b7280', fontSize: 12 }}
              stroke="#e5e7eb"
              domain={[0, 100]}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
              }}
              labelStyle={{ color: '#374151', fontWeight: '600' }}
            />
            <Legend
              wrapperStyle={{ paddingTop: '20px' }}
              iconType="line"
            />
            {visibleLines.includes('tremor') && (
              <Line
                type="monotone"
                dataKey="tremor"
                name="Tremor Severity"
                stroke="#a855f7"
                strokeWidth={2}
                dot={{ fill: '#a855f7', r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
            {visibleLines.includes('gait') && (
              <Line
                type="monotone"
                dataKey="gait"
                name="Gait Stability"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
            {visibleLines.includes('turning') && (
              <Line
                type="monotone"
                dataKey="turning"
                name="Turning Performance"
                stroke="#f97316"
                strokeWidth={2}
                dot={{ fill: '#f97316', r: 4 }}
                activeDot={{ r: 6 }}
              />
            )}
            {/* Medication markers */}
            {data.map((entry, index) => {
              if (entry.medChange) {
                return (
                  <g key={`med-${index}`}>
                    <circle
                      cx={`${(index / data.length) * 100}%`}
                      cy="10"
                      r="4"
                      fill="#10b981"
                    />
                  </g>
                );
              }
              return null;
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend for medication changes */}
      <div className="mt-4 flex items-center gap-2 text-xs text-gray-500">
        <Pill className="w-4 h-4 text-green-500" />
        <span>Green markers indicate medication changes</span>
      </div>
    </div>
  );
}
