import { useState } from 'react';
import { Clock, Pill, Plus } from 'lucide-react';
import { BiomarkerCard } from '@/app/components/BiomarkerCard';
import { TrendChart } from '@/app/components/TrendChart';
import { RiskInsightsPanel } from '@/app/components/RiskInsightsPanel';
import { SessionHistory } from '@/app/components/SessionHistory';

// Mock data
const tremorSparkline = [45, 48, 46, 50, 47, 49, 48, 46, 44, 45, 43, 42];
const gaitSparkline = [68, 65, 67, 64, 66, 63, 65, 62, 64, 60, 62, 58];
const turningSparkline = [72, 74, 71, 73, 70, 72, 68, 70, 67, 69, 65, 63];

const trendData = [
  { date: 'Jan 1', tremor: 45, gait: 68, turning: 72 },
  { date: 'Jan 8', tremor: 48, gait: 65, turning: 74 },
  { date: 'Jan 15', tremor: 46, gait: 67, turning: 71, medChange: true },
  { date: 'Jan 22', tremor: 50, gait: 64, turning: 73 },
  { date: 'Jan 29', tremor: 47, gait: 66, turning: 70 },
  { date: 'Feb 5', tremor: 49, gait: 63, turning: 72 },
  { date: 'Feb 12', tremor: 48, gait: 65, turning: 68 },
  { date: 'Feb 19', tremor: 46, gait: 62, turning: 70 },
  { date: 'Feb 26', tremor: 44, gait: 64, turning: 67 },
  { date: 'Mar 4', tremor: 45, gait: 60, turning: 69 },
  { date: 'Mar 11', tremor: 43, gait: 62, turning: 65 },
  { date: 'Mar 18', tremor: 42, gait: 58, turning: 63 },
];

const recentAlerts = [
  {
    id: '1',
    message: 'Increased gait variability detected',
    date: 'March 15, 2026',
  },
  {
    id: '2',
    message: 'Turn duration slower than baseline',
    date: 'March 12, 2026',
  },
];

const sessionHistory = [
  { id: '1', date: 'Mar 18, 2026', tremorScore: 42, gaitScore: 58, turnScore: 63, hasNotes: true },
  { id: '2', date: 'Mar 11, 2026', tremorScore: 43, gaitScore: 62, turnScore: 65, hasNotes: false },
  { id: '3', date: 'Mar 4, 2026', tremorScore: 45, gaitScore: 60, turnScore: 69, hasNotes: true },
  { id: '4', date: 'Feb 26, 2026', tremorScore: 44, gaitScore: 64, turnScore: 67, hasNotes: false },
  { id: '5', date: 'Feb 19, 2026', tremorScore: 46, gaitScore: 62, turnScore: 70, hasNotes: false },
];

export function PatientDashboard() {
  const [timeRange, setTimeRange] = useState('Month');

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Robert Mitchell</h1>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <span>Age 68</span>
              <span>•</span>
              <span>Stage 2 Parkinson's</span>
              <span>•</span>
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                <span>Last sync: 2 hours ago</span>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-3">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium">
                <Pill className="w-3 h-3" />
                <span>Levodopa 100mg TID</span>
              </div>
            </div>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Plus className="w-4 h-4" />
            Add Clinical Note
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-6">
        {/* Key Motor Biomarkers */}
        <div className="grid grid-cols-3 gap-6">
          <BiomarkerCard
            title="Tremor Severity"
            subtitle="4–6 Hz Band Power"
            value={42}
            trend="down"
            status="Improving"
            accentColor="#a855f7"
            sparklineData={tremorSparkline}
          />
          <BiomarkerCard
            title="Gait Stability"
            subtitle="Stride-to-Stride Variability"
            value={58}
            trend="down"
            status="Declining"
            accentColor="#3b82f6"
            sparklineData={gaitSparkline}
            unit="%"
          />
          <BiomarkerCard
            title="Turning Ability"
            subtitle="Average Turn Duration"
            value={63}
            trend="down"
            status="Declining"
            accentColor="#f97316"
            sparklineData={turningSparkline}
          />
        </div>

        {/* Trends and Risk Insights */}
        <div className="grid grid-cols-3 gap-6">
          <div className="col-span-2">
            <TrendChart
              data={trendData}
              timeRange={timeRange}
              onTimeRangeChange={setTimeRange}
            />
          </div>
          <div>
            <RiskInsightsPanel
              fallRisk="Moderate"
              mobilityTrend="Gradually Declining"
              recentAlerts={recentAlerts}
            />
          </div>
        </div>

        {/* Session History */}
        <SessionHistory sessions={sessionHistory} />
      </div>
    </div>
  );
}
