import React from 'react';
import { useNotifications } from '../hooks/useNotifications';
import { Download, Upload, FileText, FileSpreadsheet } from 'lucide-react';
import { backupData, restoreData, exportToPDF, exportToCSV } from '../services/exportService';
import { useExpenses } from '../hooks/useExpenses';

export function Settings() {
  const { notificationsEnabled, toggleNotifications } = useNotifications();
  const { expenses } = useExpenses();
  const [currency, setCurrency] = React.useState('USD');
  const [language, setLanguage] = React.useState('en');
  const [restoreError, setRestoreError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleRestore = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      await restoreData(file);
      window.location.reload(); // Reload to apply restored data
    } catch (error) {
      setRestoreError((error as Error).message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Settings</h2>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm">
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {/* Notifications Section */}
          <div className="px-6 py-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Notifications</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage your notification preferences
                </p>
              </div>
              <button
                onClick={toggleNotifications}
                className={`relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
                  notificationsEnabled ? 'bg-indigo-600' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    notificationsEnabled ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Export & Backup Section */}
          <div className="px-6 py-5">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              Export & Backup
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col space-y-2">
                <button
                  onClick={() => exportToPDF(expenses)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Export as PDF
                </button>
                <button
                  onClick={() => exportToCSV(expenses)}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <FileSpreadsheet className="h-5 w-5 mr-2" />
                  Export as CSV
                </button>
                <button
                  onClick={backupData}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <Download className="h-5 w-5 mr-2" />
                  Backup Data
                </button>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <Upload className="h-5 w-5 mr-2" />
                  Restore Data
                </button>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleRestore}
                  accept=".json"
                  className="hidden"
                />
                {restoreError && (
                  <p className="text-sm text-red-600 dark:text-red-400">{restoreError}</p>
                )}
              </div>
            </div>
          </div>

          {/* Currency Section */}
          <div className="px-6 py-5">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Currency</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Choose your preferred currency
            </p>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="USD">USD - US Dollar</option>
              <option value="EUR">EUR - Euro</option>
              <option value="GBP">GBP - British Pound</option>
              <option value="JPY">JPY - Japanese Yen</option>
              <option value="CAD">CAD - Canadian Dollar</option>
            </select>
          </div>

          {/* Language Section */}
          <div className="px-6 py-5">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Language</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Choose your preferred language
            </p>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
            >
              <option value="en">English</option>
              <option value="es">Español</option>
              <option value="fr">Français</option>
              <option value="de">Deutsch</option>
              <option value="it">Italiano</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}