import React from 'react';
import { Goal } from '../types/expense';
import { Target } from 'lucide-react';

interface GoalTrackerProps {
  goals: Goal[];
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
}

export function GoalTracker({ goals, onAddGoal }: GoalTrackerProps) {
  const [showForm, setShowForm] = React.useState(false);
  const [newGoal, setNewGoal] = React.useState({
    name: '',
    targetAmount: 0,
    currentAmount: 0,
    deadline: '',
    category: '',
    currency: 'USD',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddGoal(newGoal);
    setShowForm(false);
    setNewGoal({
      name: '',
      targetAmount: 0,
      currentAmount: 0,
      deadline: '',
      category: '',
      currency: 'USD',
    });
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Savings Goals</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200"
        >
          <Target className="h-4 w-4 mr-1" />
          Add Goal
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 space-y-4">
          <input
            type="text"
            placeholder="Goal Name"
            value={newGoal.name}
            onChange={(e) => setNewGoal({ ...newGoal, name: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
          <input
            type="number"
            placeholder="Target Amount"
            value={newGoal.targetAmount}
            onChange={(e) => setNewGoal({ ...newGoal, targetAmount: Number(e.target.value) })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
          <input
            type="date"
            value={newGoal.deadline}
            onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
          <button
            type="submit"
            className="w-full inline-flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Save Goal
          </button>
        </form>
      )}

      <div className="space-y-4">
        {goals.map((goal) => (
          <div key={goal.id} className="border rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="font-medium text-gray-900">{goal.name}</h3>
              <span className="text-sm text-gray-500">
                Due {new Date(goal.deadline).toLocaleDateString()}
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-indigo-600 h-2.5 rounded-full"
                style={{ width: `${(goal.currentAmount / goal.targetAmount) * 100}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center mt-2 text-sm">
              <span className="text-gray-500">
                {goal.currency} {goal.currentAmount} of {goal.targetAmount}
              </span>
              <span className="text-gray-500">
                {((goal.currentAmount / goal.targetAmount) * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}