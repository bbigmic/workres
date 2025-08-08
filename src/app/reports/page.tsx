'use client';

import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Calendar,
  Users,
  Clock,
  ArrowLeft,
  BarChart3
} from 'lucide-react';

interface ReportData {
  employeeName: string;
  workDays: number;
  weekendDays: number;
  holidays: number;
  totalWorkHours: number;
  totalWeekendHours: number;
  totalHolidayHours: number;
  vacationDays: number;
  sickLeaveDays: number;
  otherAbsenceDays: number;
  dailyHours: { [date: string]: number };
}

export default function ReportsPage() {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);

  const groups = [
    'Zmiana poranna',
    'Zmiana popołudniowa', 
    'Zmiana nocna',
    'Produkcja',
    'Kontrola jakości',
    'Magazyn'
  ];

  // Przykładowe dane raportu
  const sampleReportData: ReportData[] = [
    {
      employeeName: 'Jan Kowalski',
      workDays: 20,
      weekendDays: 4,
      holidays: 1,
      totalWorkHours: 160,
      totalWeekendHours: 32,
      totalHolidayHours: 8,
      vacationDays: 2,
      sickLeaveDays: 0,
      otherAbsenceDays: 0,
      dailyHours: {
        '2024-08-01': 8,
        '2024-08-02': 8,
        '2024-08-03': 8,
        '2024-08-05': 8,
        '2024-08-06': 8,
        '2024-08-07': 8,
        '2024-08-08': 8,
        '2024-08-09': 8,
        '2024-08-10': 8,
        '2024-08-12': 8,
        '2024-08-13': 8,
        '2024-08-14': 8,
        '2024-08-15': 0, // urlop
        '2024-08-16': 0, // urlop
        '2024-08-17': 8,
        '2024-08-19': 8,
        '2024-08-20': 8,
        '2024-08-21': 8,
        '2024-08-22': 8,
        '2024-08-23': 8,
        '2024-08-24': 8,
        '2024-08-26': 8,
        '2024-08-27': 8,
        '2024-08-28': 8,
        '2024-08-29': 8,
        '2024-08-30': 8,
        '2024-08-31': 8
      }
    },
    {
      employeeName: 'Anna Nowak',
      workDays: 18,
      weekendDays: 6,
      holidays: 1,
      totalWorkHours: 144,
      totalWeekendHours: 48,
      totalHolidayHours: 8,
      vacationDays: 0,
      sickLeaveDays: 2,
      otherAbsenceDays: 0,
      dailyHours: {
        '2024-08-01': 8,
        '2024-08-02': 8,
        '2024-08-03': 8,
        '2024-08-05': 8,
        '2024-08-06': 8,
        '2024-08-07': 8,
        '2024-08-08': 8,
        '2024-08-09': 8,
        '2024-08-10': 8,
        '2024-08-12': 8,
        '2024-08-13': 8,
        '2024-08-14': 8,
        '2024-08-15': 8,
        '2024-08-16': 8,
        '2024-08-17': 8,
        '2024-08-19': 0, // L4
        '2024-08-20': 0, // L4
        '2024-08-21': 8,
        '2024-08-22': 8,
        '2024-08-23': 8,
        '2024-08-24': 8,
        '2024-08-26': 8,
        '2024-08-27': 8,
        '2024-08-28': 8,
        '2024-08-29': 8,
        '2024-08-30': 8,
        '2024-08-31': 8
      }
    },
    {
      employeeName: 'Piotr Wiśniewski',
      workDays: 22,
      weekendDays: 2,
      holidays: 1,
      totalWorkHours: 176,
      totalWeekendHours: 16,
      totalHolidayHours: 8,
      vacationDays: 0,
      sickLeaveDays: 0,
      otherAbsenceDays: 1,
      dailyHours: {
        '2024-08-01': 8,
        '2024-08-02': 8,
        '2024-08-03': 8,
        '2024-08-05': 8,
        '2024-08-06': 8,
        '2024-08-07': 8,
        '2024-08-08': 8,
        '2024-08-09': 8,
        '2024-08-10': 8,
        '2024-08-12': 8,
        '2024-08-13': 8,
        '2024-08-14': 8,
        '2024-08-15': 8,
        '2024-08-16': 8,
        '2024-08-17': 8,
        '2024-08-19': 8,
        '2024-08-20': 8,
        '2024-08-21': 8,
        '2024-08-22': 8,
        '2024-08-23': 8,
        '2024-08-24': 8,
        '2024-08-25': 0, // inne
        '2024-08-26': 8,
        '2024-08-27': 8,
        '2024-08-28': 8,
        '2024-08-29': 8,
        '2024-08-30': 8,
        '2024-08-31': 8
      }
    }
  ];

  const generateReport = () => {
    setIsGenerating(true);
    // Symulacja generowania raportu
    setTimeout(() => {
      setReportData(sampleReportData);
      setIsGenerating(false);
    }, 2000);
  };

  const exportToExcel = () => {
    // Tutaj będzie logika eksportu do Excel
    alert('Raport został wyeksportowany do Excel!');
  };

  const getDateRange = () => {
    if (!startDate || !endDate) return '';
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString('pl-PL')} - ${end.toLocaleDateString('pl-PL')}`;
  };

  const getTotalSummary = () => {
    if (reportData.length === 0) return null;
    
    return {
      totalEmployees: reportData.length,
      totalWorkHours: reportData.reduce((sum, emp) => sum + emp.totalWorkHours, 0),
      totalWeekendHours: reportData.reduce((sum, emp) => sum + emp.totalWeekendHours, 0),
      totalHolidayHours: reportData.reduce((sum, emp) => sum + emp.totalHolidayHours, 0),
      totalVacationDays: reportData.reduce((sum, emp) => sum + emp.vacationDays, 0),
      totalSickLeaveDays: reportData.reduce((sum, emp) => sum + emp.sickLeaveDays, 0),
      totalOtherAbsenceDays: reportData.reduce((sum, emp) => sum + emp.otherAbsenceDays, 0)
    };
  };

  const summary = getTotalSummary();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-3">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.history.back()}
                className="text-gray-400 hover:text-gray-600 p-1"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Raporty
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              {reportData.length > 0 && (
                <button 
                  onClick={exportToExcel}
                  className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
                >
                  <Download className="h-4 w-4" />
                  <span>Eksportuj Excel</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Report Configuration */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Konfiguracja raportu
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data rozpoczęcia
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data zakończenia
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              />
            </div>
            <div className="flex items-end">
              <button
                onClick={generateReport}
                disabled={!startDate || !endDate || isGenerating}
                className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                <FileText className="h-4 w-4" />
                <span>{isGenerating ? 'Generowanie...' : 'Generuj raport'}</span>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grupy pracowników
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
              {groups.map(group => (
                <label key={group} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedGroups.includes(group)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedGroups(prev => [...prev, group]);
                      } else {
                        setSelectedGroups(prev => prev.filter(g => g !== group));
                      }
                    }}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <span className="text-sm text-gray-700">{group}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Report Header */}
        {reportData.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Raport czasu pracy
              </h2>
              <div className="text-sm text-gray-500">
                Okres: {getDateRange()}
              </div>
            </div>
            
            {/* Summary Stats */}
            {summary && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-blue-600" />
                    <span className="text-sm font-medium text-blue-700">Pracownicy</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-900">{summary.totalEmployees}</p>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-green-600" />
                    <span className="text-sm font-medium text-green-700">Godziny robocze</span>
                  </div>
                  <p className="text-2xl font-bold text-green-900">{summary.totalWorkHours}h</p>
                </div>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-orange-600" />
                    <span className="text-sm font-medium text-orange-700">Weekendy/Święta</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-900">
                    {summary.totalWeekendHours + summary.totalHolidayHours}h
                  </p>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5 text-purple-600" />
                    <span className="text-sm font-medium text-purple-700">Nieobecności</span>
                  </div>
                  <p className="text-2xl font-bold text-purple-900">
                    {summary.totalVacationDays + summary.totalSickLeaveDays + summary.totalOtherAbsenceDays}
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Report Table */}
        {reportData.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">
                Szczegółowy raport
              </h3>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Pracownik
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Dni robocze
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Weekendy
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Święta
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Godziny robocze
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Weekendy + Święta
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Urlop
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      L4
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Inne
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {reportData.map((employee, index) => (
                    <tr key={index} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {employee.employeeName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.workDays}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.weekendDays}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.holidays}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.totalWorkHours}h
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.totalWeekendHours + employee.totalHolidayHours}h
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.vacationDays}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.sickLeaveDays}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {employee.otherAbsenceDays}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Instructions */}
        {reportData.length === 0 && (
          <div className="bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              Instrukcja generowania raportu
            </h3>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Wybierz okres raportowania (data rozpoczęcia i zakończenia)</li>
              <li>• Opcjonalnie wybierz grupy pracowników do raportu</li>
              <li>• Kliknij &quot;Generuj raport&quot; aby utworzyć raport</li>
              <li>• Raport zawiera szczegółowe informacje o godzinach pracy i nieobecnościach</li>
              <li>• Możesz eksportować raport do formatu Excel</li>
            </ul>
          </div>
        )}
      </main>
    </div>
  );
} 