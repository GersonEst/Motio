import { useState } from 'react';
import { Download, Filter } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

// Mock cohort data
const cohortData = [
  { month: 'Month 0', early: 75, mid: 58, advanced: 42 },
  { month: 'Month 1', early: 74, mid: 56, advanced: 40 },
  { month: 'Month 2', early: 73, mid: 55, advanced: 38 },
  { month: 'Month 3', early: 72, mid: 53, advanced: 36 },
  { month: 'Month 4', early: 71, mid: 52, advanced: 35 },
  { month: 'Month 5', early: 70, mid: 50, advanced: 33 },
  { month: 'Month 6', early: 69, mid: 49, advanced: 32 },
];

const patientCohort = [
  { id: '1', name: 'Patient A', age: 65, stage: 'Stage 2', avgTremor: 45, avgGait: 62, avgTurning: 68 },
  { id: '2', name: 'Patient B', age: 72, stage: 'Stage 3', avgTremor: 52, avgGait: 48, avgTurning: 54 },
  { id: '3', name: 'Patient C', age: 58, stage: 'Stage 1', avgTremor: 38, avgGait: 75, avgTurning: 78 },
  { id: '4', name: 'Patient D', age: 70, stage: 'Stage 2', avgTremor: 48, avgGait: 58, avgTurning: 65 },
  { id: '5', name: 'Patient E', age: 67, stage: 'Stage 3', avgTremor: 55, avgGait: 44, avgTurning: 50 },
  { id: '6', name: 'Patient F', age: 61, stage: 'Stage 1', avgTremor: 35, avgGait: 78, avgTurning: 82 },
];

export function ResearchMode() {
  const [ageFilter, setAgeFilter] = useState('all');
  const [stageFilter, setStageFilter] = useState('all');
  const [treatmentFilter, setTreatmentFilter] = useState('all');

  return (
    <div className="flex-1 bg-gray-50 overflow-auto">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Research Mode</h1>
            <p className="text-sm text-gray-600 mt-1">Cohort analysis and comparative data insights</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            <Download className="w-4 h-4" />
            Export Data
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-8 space-y-6">
        {/* Filters */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="w-5 h-5 text-gray-600" />
            <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
              <select
                value={ageFilter}
                onChange={(e) => setAgeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Ages</option>
                <option value="50-60">50-60</option>
                <option value="60-70">60-70</option>
                <option value="70+">70+</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Disease Stage</label>
              <select
                value={stageFilter}
                onChange={(e) => setStageFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Stages</option>
                <option value="stage1">Stage 1</option>
                <option value="stage2">Stage 2</option>
                <option value="stage3">Stage 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Treatment Type</label>
              <select
                value={treatmentFilter}
                onChange={(e) => setTreatmentFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Treatments</option>
                <option value="levodopa">Levodopa</option>
                <option value="dopamine">Dopamine Agonists</option>
                <option value="mao">MAO-B Inhibitors</option>
              </select>
            </div>
          </div>
        </div>

        {/* Cohort Comparison Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">Cohort Progression by Disease Stage</h2>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={cohortData} margin={{ top: 5, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="month"
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  stroke="#e5e7eb"
                />
                <YAxis
                  tick={{ fill: '#6b7280', fontSize: 12 }}
                  stroke="#e5e7eb"
                  domain={[0, 100]}
                  label={{ value: 'Composite Motor Score', angle: -90, position: 'insideLeft', style: { fill: '#6b7280' } }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'white',
                    border: '1px solid #e5e7eb',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: '20px' }} />
                <Line
                  type="monotone"
                  dataKey="early"
                  name="Early Stage (1-2)"
                  stroke="#10b981"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="mid"
                  name="Mid Stage (2-3)"
                  stroke="#f59e0b"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
                <Line
                  type="monotone"
                  dataKey="advanced"
                  name="Advanced Stage (3+)"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Patient Cohort Table */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Patient Cohort Summary</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Patient ID
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Age
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Tremor
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Gait
                  </th>
                  <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Avg Turning
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {patientCohort.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4 text-sm text-gray-900 font-medium">
                      {patient.name}
                    </td>
                    <td className="py-4 px-4 text-sm text-gray-600 text-center">
                      {patient.age}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <span className="px-2.5 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">
                        {patient.stage}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-center font-medium text-purple-600">
                      {patient.avgTremor}
                    </td>
                    <td className="py-4 px-4 text-sm text-center font-medium text-blue-600">
                      {patient.avgGait}
                    </td>
                    <td className="py-4 px-4 text-sm text-center font-medium text-orange-600">
                      {patient.avgTurning}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Total Patients</p>
            <p className="text-3xl font-semibold text-gray-900">127</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Avg Age</p>
            <p className="text-3xl font-semibold text-gray-900">66.5</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Data Points</p>
            <p className="text-3xl font-semibold text-gray-900">4,832</p>
          </div>
          <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
            <p className="text-sm text-gray-600 mb-1">Study Duration</p>
            <p className="text-3xl font-semibold text-gray-900">18 mo</p>
          </div>
        </div>
      </div>
    </div>
  );
}
