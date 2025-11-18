import React from 'react';
import { useExpenses } from '../hooks/useExpenses';
import { startOfMonth, endOfMonth } from 'date-fns';

export function Budget() {
  const { expenses } = useExpenses();
  const [budgets, setBudgets] = React.useState<Record<string, number>>({
    food: 500,
    transport: 300,
    entertainment: 200,
    utilities: 400,
    shopping: 300,
  });

  const currentMonthExpenses = expenses.filter(expense => {
    const expenseDate = new Date(expense.date);
    return expenseDate >= startOfMonth(new Date()) && 
           expenseDate <= endOfMonth(new Date());
  });

  const categoryTotals = currentMonthExpenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<string, number>);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Monthly Budget</h2>
      </div>

      <div className="grid gap-6">
        {Object.entries(budgets).map(([category, budget]) => {
          const spent = categoryTotals[category] || 0;
          const percentage = (spent / budget) * 100;

          return (
            <div key={category} className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg font-medium capitalize text-gray-900 dark:text-white">
                  {category}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  ${spent.toFixed(2)} / ${budget}
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div
                  className={`h-2.5 rounded-full ${
                    percentage > 90 ? 'bg-red-600' :
                    percentage > 75 ? 'bg-yellow-400' :
                    'bg-green-600'
                  }`}
                  style={{ width: `${Math.min(percentage, 100)}%` }}
                ></div>
              </div>
              <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                {percentage > 100 ? (
                  <span className="text-red-600 dark:text-red-400">
                    Over budget by ${(spent - budget).toFixed(2)}
                  </span>
                ) : (
                  <span>
                    ${(budget - spent).toFixed(2)} remaining
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}