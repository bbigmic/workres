'use client';

import { useState } from 'react';
import { 
  BarChart3, 
  ArrowLeft,
  Calendar,
  Users,
  Clock,
  TrendingUp,
  TrendingDown,
  Activity
} from 'lucide-react';

interface StatisticsData {
  period: string;
  totalEmployees: number;
  activeEmployees: number;
  totalWorkHours: number;
  averageWorkHours: number;
  totalAbsences: number;
  vacationDays: number;
  sickLeaveDays: number;
  otherAbsenceDays: number;
  weekendHours: number;
  holidayHours: number;
  productivity: number;
}

export default function StatisticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedGroup, setSelectedGroup] = useState('all');

  const periods = [
    { id: 'week', name: 'Tydzień', days: 7 },
    { id: 'month', name: 'Miesiąc', days: 30 },
    { id: 'quarter', name: 'Kwartał', days: 90 },
    { id: 'year', name: 'Rok', days: 365 }
  ];

  const groups = [
    { id: 'all', name: 'Wszystkie grupy' },
    { id: 'morning', name: 'Zmiana poranna' },
    { id: 'afternoon', name: 'Zmiana popołudniowa' },
    { id: 'night', name: 'Zmiana nocna' },
    { id: 'production', name: 'Produkcja' },
    { id: 'quality', name: 'Kontrola jakości' },
    { id: 'warehouse', name: 'Magazyn' }
  ];

  // Przykładowe dane statystyk
  const statisticsData: StatisticsData = {
    period: 'Sierpień 2024',
    totalEmployees: 24,
    activeEmployees: 22,
    totalWorkHours: 3520,
    averageWorkHours: 160,
    totalAbsences: 15,
    vacationDays: 8,
    sickLeaveDays: 5,
    otherAbsenceDays: 2,
    weekendHours: 480,
    holidayHours: 120,
    productivity: 87.5
  };

  const weeklyData = [
    { week: 'Tydzień 1', hours: 840, absences: 2 },
    { week: 'Tydzień 2', hours: 880, absences: 1 },
    { week: 'Tydzień 3', hours: 800, absences: 4 },
    { week: 'Tydzień 4', hours: 760, absences: 3 }
  ];

  const groupPerformance = [
    { group: 'Zmiana poranna', hours: 1200, productivity: 92 },
    { group: 'Zmiana popołudniowa', hours: 1120, productivity: 88 },
    { group: 'Zmiana nocna', hours: 800, productivity: 85 },
    { group: 'Produkcja', hours: 1600, productivity: 90 },
    { group: 'Kontrola jakości', hours: 640, productivity: 95 },
    { group: 'Magazyn', hours: 880, productivity: 87 }
  ];

  const absenceTrends = [
    { month: 'Styczeń', vacation: 12, sickLeave: 8, other: 3 },
    { month: 'Luty', vacation: 10, sickLeave: 6, other: 2 },
    { month: 'Marzec', vacation: 15, sickLeave: 9, other: 4 },
    { month: 'Kwiecień', vacation: 8, sickLeave: 7, other: 1 },
    { month: 'Maj', vacation: 14, sickLeave: 5, other: 3 },
    { month: 'Czerwiec', vacation: 11, sickLeave: 8, other: 2 },
    { month: 'Lipiec', vacation: 16, sickLeave: 4, other: 2 },
    { month: 'Sierpień', vacation: 8, sickLeave: 5, other: 2 }
  ];

  const getProductivityColor = (productivity: number) => {
    if (productivity >= 90) return 'text-green-600';
    if (productivity >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getProductivityIcon = (productivity: number) => {
    if (productivity >= 90) return <TrendingUp className="h-4 w-4 text-green-600" />;
    if (productivity >= 80) return <Activity className="h-4 w-4 text-yellow-600" />;
    return <TrendingDown className="h-4 w-4 text-red-600" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.history.back()}
                className="text-gray-400 hover:text-gray-600"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">
                Statystyki
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={selectedPeriod}
                onChange={(e) => setSelectedPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                {periods.map(period => (
                  <option key={period.id} value={period.id}>{period.name}</option>
                ))}
              </select>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                {groups.map(group => (
                  <option key={group.id} value={group.id}>{group.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Aktywni pracownicy</p>
                <p className="text-2xl font-bold text-gray-900">{statisticsData.activeEmployees}</p>
                <p className="text-sm text-gray-500">z {statisticsData.totalEmployees} ogółem</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Łączne godziny pracy</p>
                <p className="text-2xl font-bold text-gray-900">{statisticsData.totalWorkHours}h</p>
                <p className="text-sm text-gray-500">średnio {statisticsData.averageWorkHours}h/os.</p>
              </div>
              <Clock className="h-8 w-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Nieobecności</p>
                <p className="text-2xl font-bold text-gray-900">{statisticsData.totalAbsences}</p>
                <p className="text-sm text-gray-500">
                  {statisticsData.vacationDays} urlop, {statisticsData.sickLeaveDays} L4
                </p>
              </div>
              <Calendar className="h-8 w-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Wydajność</p>
                <p className="text-2xl font-bold text-gray-900">{statisticsData.productivity}%</p>
                <p className="text-sm text-gray-500">średnia dla wszystkich grup</p>
              </div>
              <BarChart3 className="h-8 w-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Detailed Statistics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Trends */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Trendy tygodniowe
            </h2>
            <div className="space-y-4">
              {weeklyData.map((week, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{week.week}</p>
                    <p className="text-sm text-gray-500">{week.hours}h pracy</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{week.absences} nieobecności</p>
                    <p className="text-sm font-medium text-gray-900">
                      {Math.round((week.hours / 8 / 5) * 100)}% obecności
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Group Performance */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Wydajność grup
            </h2>
            <div className="space-y-4">
              {groupPerformance.map((group, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="font-medium text-gray-900">{group.group}</p>
                    <p className="text-sm text-gray-500">{group.hours}h pracy</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getProductivityIcon(group.productivity)}
                    <span className={`font-medium ${getProductivityColor(group.productivity)}`}>
                      {group.productivity}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Absence Trends */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Trendy nieobecności
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Miesiąc
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Razem
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {absenceTrends.map((month, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {month.month}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {month.vacation}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {month.sickLeave}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {month.other}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {month.vacation + month.sickLeave + month.other}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Godziny specjalne</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Weekendy</span>
                <span className="font-medium">{statisticsData.weekendHours}h</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Święta</span>
                <span className="font-medium">{statisticsData.holidayHours}h</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-sm font-medium text-gray-900">Razem</span>
                <span className="font-bold text-gray-900">
                  {statisticsData.weekendHours + statisticsData.holidayHours}h
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Podział nieobecności</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Urlopy</span>
                <span className="font-medium text-green-600">{statisticsData.vacationDays}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">L4</span>
                <span className="font-medium text-red-600">{statisticsData.sickLeaveDays}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Inne</span>
                <span className="font-medium text-yellow-600">{statisticsData.otherAbsenceDays}</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Wskaźniki</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Średnia obecność</span>
                <span className="font-medium">
                  {Math.round((statisticsData.activeEmployees / statisticsData.totalEmployees) * 100)}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Średnie godziny/dzień</span>
                <span className="font-medium">
                  {Math.round(statisticsData.totalWorkHours / 30 / statisticsData.activeEmployees)}h
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Wydajność ogólna</span>
                <span className="font-medium">{statisticsData.productivity}%</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 