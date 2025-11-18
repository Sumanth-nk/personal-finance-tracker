import React from 'react';
import { format } from 'date-fns';
import { Expense } from '../types/expense';

interface RecentTransactionsProps {
  expenses: Expense[];
}

export function RecentTransactions({ expenses }: RecentTransactionsProps) {
  return (
    <div className="overflow-hidden">
      <div className="px-6 py-4 border-b dark:border-gray-700">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">Recent Transactions</h3>
      </div>
      <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
        {expenses.map((expense) => (
          <li key={expense.id} className="px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">{expense.description}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {format(new Date(expense.date), 'MMM d, yyyy')} • {expense.category}
                </p>
              </div>
              <div className="flex items-center">
                <span className={`text-sm font-medium ${
                  expense.amount > 100 ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'
                }`}>
                  {expense.currency} {expense.amount.toFixed(2)}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}