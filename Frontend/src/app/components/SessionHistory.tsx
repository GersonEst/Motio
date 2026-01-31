import { FileText } from 'lucide-react';

interface SessionHistoryProps {
  sessions: Array<{
    id: string;
    date: string;
    tremorScore: number;
    gaitScore: number;
    turnScore: number;
    hasNotes: boolean;
  }>;
}

export function SessionHistory({ sessions }: SessionHistoryProps) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600';
    if (score >= 40) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Session History</h2>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tremor Score
              </th>
              <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Gait Score
              </th>
              <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Turn Score
              </th>
              <th className="text-center py-3 px-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Notes
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sessions.map((session) => (
              <tr key={session.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-4 px-4 text-sm text-gray-900">
                  {session.date}
                </td>
                <td className={`py-4 px-4 text-sm text-center font-medium ${getScoreColor(session.tremorScore)}`}>
                  {session.tremorScore}
                </td>
                <td className={`py-4 px-4 text-sm text-center font-medium ${getScoreColor(session.gaitScore)}`}>
                  {session.gaitScore}
                </td>
                <td className={`py-4 px-4 text-sm text-center font-medium ${getScoreColor(session.turnScore)}`}>
                  {session.turnScore}
                </td>
                <td className="py-4 px-4 text-center">
                  {session.hasNotes && (
                    <button className="text-blue-600 hover:text-blue-700">
                      <FileText className="w-4 h-4" />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
