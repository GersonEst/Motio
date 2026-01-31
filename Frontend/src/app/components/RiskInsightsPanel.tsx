import { AlertCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface RiskInsightsPanelProps {
  fallRisk: 'Low' | 'Moderate' | 'High';
  mobilityTrend: 'Stable' | 'Gradually Declining' | 'Rapid Change';
  recentAlerts: Array<{ id: string; message: string; date: string }>;
}

export function RiskInsightsPanel({ fallRisk, mobilityTrend, recentAlerts }: RiskInsightsPanelProps) {
  const getFallRiskColor = () => {
    if (fallRisk === 'Low') return 'bg-green-100 text-green-700 border-green-200';
    if (fallRisk === 'Moderate') return 'bg-orange-100 text-orange-700 border-orange-200';
    return 'bg-red-100 text-red-700 border-red-200';
  };

  const getFallRiskPercentage = () => {
    if (fallRisk === 'Low') return 25;
    if (fallRisk === 'Moderate') return 60;
    return 90;
  };

  const getMobilityIcon = () => {
    if (mobilityTrend === 'Stable') return <Minus className="w-4 h-4 text-green-600" />;
    if (mobilityTrend === 'Gradually Declining') return <TrendingDown className="w-4 h-4 text-orange-600" />;
    return <TrendingDown className="w-4 h-4 text-red-600" />;
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm space-y-6">
      <h2 className="text-lg font-semibold text-gray-900">Risk & Clinical Insights</h2>

      {/* Fall Risk Indicator */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <h3 className="text-sm font-medium text-gray-700">Fall Risk</h3>
          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getFallRiskColor()}`}>
            {fallRisk}
          </span>
        </div>
        
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              fallRisk === 'Low' ? 'bg-green-500' :
              fallRisk === 'Moderate' ? 'bg-orange-500' : 'bg-red-500'
            }`}
            style={{ width: `${getFallRiskPercentage()}%` }}
          />
        </div>
        
        <p className="text-xs text-gray-500">
          Based on gait stability, turning performance, and historical patterns
        </p>
      </div>

      {/* Mobility Trend */}
      <div className="space-y-2">
        <h3 className="text-sm font-medium text-gray-700">Mobility Trend</h3>
        <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg">
          {getMobilityIcon()}
          <span className="text-sm font-medium text-gray-900">{mobilityTrend}</span>
        </div>
      </div>

      {/* Recent Alerts */}
      <div className="space-y-3">
        <h3 className="text-sm font-medium text-gray-700">Recent Alerts</h3>
        <div className="space-y-2">
          {recentAlerts.length === 0 ? (
            <p className="text-sm text-gray-500 italic">No recent alerts</p>
          ) : (
            recentAlerts.map((alert) => (
              <div
                key={alert.id}
                className="flex gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg"
              >
                <AlertCircle className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{alert.message}</p>
                  <p className="text-xs text-gray-500 mt-1">{alert.date}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
