import React from 'react';
import { ExpenseChart } from '../components/ExpenseChart';
import { InsightsPanel } from '../components/InsightsPanel';
import { RecentTransactions } from '../components/RecentTransactions';
import { useExpenses } from '../hooks/useExpenses';

export function Dashboard() {
  const { expenses } = useExpenses();
  
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyExpenses = expenses.filter(
    expense => new Date(expense.date).getMonth() === new Date().getMonth()
  );
  const monthlyTotal = monthlyExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="space-y-6">
      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Total Expenses</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            ${totalExpenses.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Monthly Expenses</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            ${monthlyTotal.toFixed(2)}
          </p>
        </div>
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Average Daily</h3>
          <p className="mt-2 text-3xl font-bold text-gray-900 dark:text-white">
            ${(monthlyTotal / 30).toFixed(2)}
          </p>
        </div>
      </div>

      {/* Charts and Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ExpenseChart expenses={expenses} />
        </div>
        <div>
          <InsightsPanel expenses={expenses} />
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <RecentTransactions expenses={expenses.slice(0, 5)} />
      </div>
    </div>
  );
}