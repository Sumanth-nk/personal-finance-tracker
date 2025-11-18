import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Receipt, 
  Target, 
  PieChart, 
  Wallet, 
  Settings as SettingsIcon,
  Bell,
  Moon,
  Sun
} from 'lucide-react';
import { NotificationCenter } from './NotificationCenter';
import { useTheme } from '../hooks/useTheme';

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Expenses', href: '/expenses', icon: Receipt },
    { name: 'Goals', href: '/goals', icon: Target },
    { name: 'Reports', href: '/reports', icon: PieChart },
    { name: 'Budget', href: '/budget', icon: Wallet },
    { name: 'Settings', href: '/settings', icon: SettingsIcon },
  ];

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'dark bg-gray-900' : 'bg-gray-100'}`}>
      <div className="flex h-screen">
        {/* Sidebar */}
        <div className="w-64 bg-white dark:bg-gray-800 shadow-lg">
          <div className="flex items-center justify-center h-16 border-b dark:border-gray-700">
            <Wallet className="h-8 w-8 text-indigo-600" />
            <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">ExpenseTracker</span>
          </div>
          <nav className="mt-6">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-6 py-3 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
                    location.pathname === item.href ? 'bg-indigo-50 dark:bg-indigo-900/50 border-r-4 border-indigo-600' : ''
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="mx-3">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top header */}
          <header className="h-16 bg-white dark:bg-gray-800 shadow-sm flex items-center justify-between px-6">
            <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
              {navigation.find(item => item.href === location.pathname)?.name || 'Dashboard'}
            </h1>
            <div className="flex items-center space-x-4">
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                {theme === 'dark' ? (
                  <Sun className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                ) : (
                  <Moon className="h-5 w-5 text-gray-600" />
                )}
              </button>
              <NotificationCenter />
            </div>
          </header>

          {/* Main content area */}
          <main className="flex-1 overflow-y-auto p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}