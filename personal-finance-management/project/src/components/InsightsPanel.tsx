import React from 'react';
import { AlertTriangle, TrendingUp, TrendingDown, Info } from 'lucide-react';
import { Expense } from '../types/expense';
import { generateExpenseInsights } from '../services/aiService';

interface InsightsPanelProps {
  expenses: Expense[];
}

export function InsightsPanel({ expenses }: InsightsPanelProps) {
  const [insights, setInsights] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchInsights() {
      setLoading(true);
      const newInsights = await generateExpenseInsights(expenses);
      setInsights(newInsights);
      setLoading(false);
    }

    fetchInsights();
  }, [expenses]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'warning':
        return <TrendingUp className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          AI-Powered Insights
        </h2>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        AI-Powered Insights
      </h2>
      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className={`flex items-start space-x-3 p-4 rounded-lg ${
              insight.type === 'alert'
                ? 'bg-red-50 dark:bg-red-900/20'
                : insight.type === 'warning'
                ? 'bg-yellow-50 dark:bg-yellow-900/20'
                : 'bg-blue-50 dark:bg-blue-900/20'
            }`}
          >
            {getIcon(insight.type)}
            <div>
              <p className={`text-sm ${
                insight.type === 'alert'
                  ? 'text-red-700 dark:text-red-300'
                  : insight.type === 'warning'
                  ? 'text-yellow-700 dark:text-yellow-300'
                  : 'text-blue-700 dark:text-blue-300'
              }`}>
                {insight.message}
              </p>
            </div>
          </div>
        ))}
        {insights.length === 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
            No insights available at the moment
          </p>
        )}
      </div>
    </div>
  );
}