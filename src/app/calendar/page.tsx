'use client';

import { useState } from 'react';
import { 
  ChevronLeft, 
  ChevronRight,
  Filter,
  ArrowLeft
} from 'lucide-react';

interface Absence {
  id: string;
  employeeId: string;
  employeeName: string;
  type: 'VACATION' | 'SICK_LEAVE' | 'OTHER';
  startDate: Date;
  endDate: Date;
  reason?: string;
}

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedEmployee, setSelectedEmployee] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Przykładowe dane nieobecności
  const absences: Absence[] = [
    {
      id: '1',
      employeeId: '1',
      employeeName: 'Jan Kowalski',
      type: 'VACATION',
      startDate: new Date(2024, 7, 15), // 15 sierpnia
      endDate: new Date(2024, 7, 20),   // 20 sierpnia
      reason: 'Urlop wypoczynkowy'
    },
    {
      id: '2',
      employeeId: '2',
      employeeName: 'Anna Nowak',
      type: 'SICK_LEAVE',
      startDate: new Date(2024, 7, 10), // 10 sierpnia
      endDate: new Date(2024, 7, 12),   // 12 sierpnia
      reason: 'Zwolnienie lekarskie'
    },
    {
      id: '3',
      employeeId: '3',
      employeeName: 'Piotr Wiśniewski',
      type: 'OTHER',
      startDate: new Date(2024, 7, 25), // 25 sierpnia
      endDate: new Date(2024, 7, 25),   // 25 sierpnia
      reason: 'Szkolenie'
    }
  ];

  const employees = ['Jan Kowalski', 'Anna Nowak', 'Piotr Wiśniewski', 'Maria Kowalczyk', 'Tomasz Lewandowski'];
  const absenceTypes = ['VACATION', 'SICK_LEAVE', 'OTHER'];

  const getAbsenceTypeLabel = (type: string) => {
    switch (type) {
      case 'VACATION': return 'Urlop';
      case 'SICK_LEAVE': return 'L4';
      case 'OTHER': return 'Inne';
      default: return type;
    }
  };

  const getAbsenceTypeColor = (type: string) => {
    switch (type) {
      case 'VACATION': return 'bg-green-100 text-green-800 border-green-200';
      case 'SICK_LEAVE': return 'bg-red-100 text-red-800 border-red-200';
      case 'OTHER': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    return { daysInMonth, startingDayOfWeek };
  };

  const getMonthName = (date: Date) => {
    const months = [
      'Styczeń', 'Luty', 'Marzec', 'Kwiecień', 'Maj', 'Czerwiec',
      'Lipiec', 'Sierpień', 'Wrzesień', 'Październik', 'Listopad', 'Grudzień'
    ];
    return months[date.getMonth()];
  };

  const getAbsencesForDate = (date: Date) => {
    return absences.filter(absence => {
      const checkDate = new Date(date);
      return checkDate >= absence.startDate && checkDate <= absence.endDate &&
             (selectedEmployee === '' || absence.employeeName === selectedEmployee) &&
             (selectedType === '' || absence.type === selectedType);
    });
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentDate);
  const days = [];
  
  // Dodaj puste dni na początku
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push(null);
  }
  
  // Dodaj dni miesiąca
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
  }

  const goToPreviousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
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
                Kalendarz nieobecności
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Pracownik
              </label>
              <select
                value={selectedEmployee}
                onChange={(e) => setSelectedEmployee(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="">Wszyscy pracownicy</option>
                {employees.map(employee => (
                  <option key={employee} value={employee}>{employee}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Typ nieobecności
              </label>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
              >
                <option value="">Wszystkie typy</option>
                {absenceTypes.map(type => (
                  <option key={type} value={type}>{getAbsenceTypeLabel(type)}</option>
                ))}
              </select>
            </div>
            <div className="flex items-end">
              <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-200 flex items-center justify-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filtruj</span>
              </button>
            </div>
          </div>
        </div>

        {/* Calendar */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          {/* Calendar Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={goToPreviousMonth}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <h2 className="text-xl font-semibold text-gray-900">
                  {getMonthName(currentDate)} {currentDate.getFullYear()}
                </h2>
                <button
                  onClick={goToNextMonth}
                  className="p-2 text-gray-400 hover:text-gray-600"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <button
                onClick={() => setCurrentDate(new Date())}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                Dzisiaj
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="p-6">
            {/* Day Headers */}
            <div className="grid grid-cols-7 gap-1 mb-2">
              {['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz'].map(day => (
                <div key={day} className="text-center text-sm font-medium text-gray-500 py-2">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar Days */}
            <div className="grid grid-cols-7 gap-1">
              {days.map((date, index) => (
                <div
                  key={index}
                  className={`min-h-[120px] p-2 border border-gray-200 ${
                    date ? 'bg-white' : 'bg-gray-50'
                  } ${date && isToday(date) ? 'ring-2 ring-blue-500' : ''}`}
                >
                  {date && (
                    <>
                      <div className="text-sm font-medium text-gray-900 mb-1">
                        {date.getDate()}
                      </div>
                      <div className="space-y-1">
                        {getAbsencesForDate(date).map(absence => (
                          <div
                            key={absence.id}
                            className={`text-xs p-1 rounded border ${getAbsenceTypeColor(absence.type)}`}
                            title={`${absence.employeeName} - ${getAbsenceTypeLabel(absence.type)}`}
                          >
                            <div className="font-medium truncate">
                              {absence.employeeName.split(' ')[0]}
                            </div>
                            <div className="truncate">
                              {getAbsenceTypeLabel(absence.type)}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Legenda</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-green-100 border border-green-200 rounded"></div>
              <span className="text-sm text-gray-700">Urlop</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-red-100 border border-red-200 rounded"></div>
              <span className="text-sm text-gray-700">L4</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-yellow-100 border border-yellow-200 rounded"></div>
              <span className="text-sm text-gray-700">Inne</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
} 