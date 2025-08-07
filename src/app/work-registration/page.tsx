'use client';

import { useState } from 'react';
import { 
  Clock, 
  Calendar,
  Users,
  Check,
  X,
  ArrowLeft,
  Save,
  AlertTriangle
} from 'lucide-react';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  isActive: boolean;
  groups: string[];
  hasAbsence: boolean;
}

interface WorkRecord {
  employeeId: string;
  startTime: string;
  endTime: string;
  hours: number;
}

export default function WorkRegistrationPage() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedGroups, setSelectedGroups] = useState<string[]>([]);
  const [workRecords, setWorkRecords] = useState<WorkRecord[]>([]);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const groups = [
    { id: '1', name: 'Zmiana poranna', description: '6:00-14:00' },
    { id: '2', name: 'Zmiana popołudniowa', description: '14:00-22:00' },
    { id: '3', name: 'Zmiana nocna', description: '22:00-6:00' },
    { id: '4', name: 'Produkcja', description: 'Dział produkcji' },
    { id: '5', name: 'Kontrola jakości', description: 'Dział QC' },
    { id: '6', name: 'Magazyn', description: 'Dział magazynowy' }
  ];

  const employees: Employee[] = [
    {
      id: '1',
      firstName: 'Jan',
      lastName: 'Kowalski',
      nickname: 'Jan K.',
      isActive: true,
      groups: ['Zmiana poranna', 'Produkcja'],
      hasAbsence: false
    },
    {
      id: '2',
      firstName: 'Anna',
      lastName: 'Nowak',
      nickname: 'Anna N.',
      isActive: true,
      groups: ['Zmiana popołudniowa', 'Kontrola jakości'],
      hasAbsence: true
    },
    {
      id: '3',
      firstName: 'Piotr',
      lastName: 'Wiśniewski',
      nickname: 'Piotr W.',
      isActive: true,
      groups: ['Zmiana poranna', 'Magazyn'],
      hasAbsence: false
    },
    {
      id: '4',
      firstName: 'Maria',
      lastName: 'Kowalczyk',
      nickname: 'Maria K.',
      isActive: true,
      groups: ['Zmiana popołudniowa', 'Produkcja'],
      hasAbsence: false
    },
    {
      id: '5',
      firstName: 'Tomasz',
      lastName: 'Lewandowski',
      nickname: 'Tomasz L.',
      isActive: true,
      groups: ['Zmiana nocna', 'Magazyn'],
      hasAbsence: false
    }
  ];

  const timeSlots = [
    { id: 'morning', name: 'Rano', startTime: '06:00', endTime: '14:00', hours: 8 },
    { id: 'afternoon', name: 'Popołudnie', startTime: '14:00', endTime: '22:00', hours: 8 },
    { id: 'night', name: 'Noc', startTime: '22:00', endTime: '06:00', hours: 8 },
    { id: 'custom', name: 'Własne godziny', startTime: '', endTime: '', hours: 0 }
  ];

  const filteredEmployees = employees.filter(employee =>
    selectedGroups.length === 0 || 
    employee.groups.some(group => selectedGroups.includes(group))
  );

  const handleGroupToggle = (groupId: string) => {
    setSelectedGroups(prev => 
      prev.includes(groupId) 
        ? prev.filter(id => id !== groupId)
        : [...prev, groupId]
    );
  };

  const handleEmployeeToggle = (employeeId: string, checked: boolean) => {
    if (checked) {
      // Dodaj domyślny czas pracy (rano)
      setWorkRecords(prev => [...prev, {
        employeeId,
        startTime: '06:00',
        endTime: '14:00',
        hours: 8
      }]);
    } else {
      // Usuń z listy
      setWorkRecords(prev => prev.filter(record => record.employeeId !== employeeId));
    }
  };

  const updateWorkRecord = (employeeId: string, field: keyof WorkRecord, value: string | number) => {
    setWorkRecords(prev => prev.map(record => 
      record.employeeId === employeeId 
        ? { ...record, [field]: value }
        : record
    ));
  };

  const calculateHours = (startTime: string, endTime: string) => {
    if (!startTime || !endTime) return 0;
    
    const start = new Date(`2000-01-01T${startTime}`);
    const end = new Date(`2000-01-01T${endTime}`);
    
    if (end < start) {
      end.setDate(end.getDate() + 1); // Przejście przez północ
    }
    
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60);
  };

  const handleTimeSlotChange = (employeeId: string, timeSlotId: string) => {
    const timeSlot = timeSlots.find(ts => ts.id === timeSlotId);
    if (timeSlot && timeSlotId !== 'custom') {
      updateWorkRecord(employeeId, 'startTime', timeSlot.startTime);
      updateWorkRecord(employeeId, 'endTime', timeSlot.endTime);
      updateWorkRecord(employeeId, 'hours', timeSlot.hours);
    }
  };

  const getEmployeeWorkRecord = (employeeId: string) => {
    return workRecords.find(record => record.employeeId === employeeId);
  };

  const isEmployeeSelected = (employeeId: string) => {
    return workRecords.some(record => record.employeeId === employeeId);
  };

  const totalHours = workRecords.reduce((sum, record) => sum + record.hours, 0);

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
                Rejestracja czasu pracy
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowConfirmation(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                disabled={workRecords.length === 0}
              >
                <Save className="h-4 w-4" />
                <span>Zapisz rejestrację</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Date Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex items-center space-x-4">
            <Calendar className="h-5 w-5 text-gray-400" />
            <label className="text-sm font-medium text-gray-700">
              Data rejestracji:
            </label>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
            />
          </div>
        </div>

        {/* Groups Selection */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">
            Wybierz grupy/zmiany
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {groups.map(group => (
              <div
                key={group.id}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedGroups.includes(group.id)
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => handleGroupToggle(group.id)}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium text-gray-900">{group.name}</h3>
                    <p className="text-sm text-gray-500">{group.description}</p>
                  </div>
                  {selectedGroups.includes(group.id) && (
                    <Check className="h-5 w-5 text-blue-600" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Employees List */}
        {selectedGroups.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="px-6 py-4 border-b border-gray-200">
              <h2 className="text-lg font-medium text-gray-900">
                Pracownicy ({filteredEmployees.length})
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Zaznacz pracowników do rejestracji czasu pracy
              </p>
            </div>
            <div className="divide-y divide-gray-200">
              {filteredEmployees.map((employee) => {
                const workRecord = getEmployeeWorkRecord(employee.id);
                const isSelected = isEmployeeSelected(employee.id);
                
                return (
                  <div key={employee.id} className="px-6 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleEmployeeToggle(employee.id, e.target.checked)}
                          disabled={employee.hasAbsence}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <div>
                          <h3 className="text-lg font-medium text-gray-900">
                            {employee.firstName} {employee.lastName}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Ksywka: {employee.nickname}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {employee.groups.map(group => (
                              <span
                                key={group}
                                className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {group}
                              </span>
                            ))}
                          </div>
                          {employee.hasAbsence && (
                            <div className="flex items-center space-x-1 mt-1">
                              <AlertTriangle className="h-3 w-3 text-red-500" />
                              <span className="text-xs text-red-600">Nieobecny w tym dniu</span>
                            </div>
                          )}
                        </div>
                      </div>
                      
                      {isSelected && workRecord && (
                        <div className="flex items-center space-x-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                              Godziny pracy
                            </label>
                            <select
                              value={timeSlots.find(ts => 
                                ts.startTime === workRecord.startTime && 
                                ts.endTime === workRecord.endTime
                              )?.id || 'custom'}
                              onChange={(e) => handleTimeSlotChange(employee.id, e.target.value)}
                              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                            >
                              {timeSlots.map(timeSlot => (
                                <option key={timeSlot.id} value={timeSlot.id}>
                                  {timeSlot.name} {timeSlot.startTime && `(${timeSlot.startTime}-${timeSlot.endTime})`}
                                </option>
                              ))}
                            </select>
                          </div>
                          
                          <div className="grid grid-cols-2 gap-2">
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Od
                              </label>
                              <input
                                type="time"
                                value={workRecord.startTime}
                                onChange={(e) => {
                                  updateWorkRecord(employee.id, 'startTime', e.target.value);
                                  updateWorkRecord(employee.id, 'hours', calculateHours(e.target.value, workRecord.endTime));
                                }}
                                className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                              />
                            </div>
                            <div>
                              <label className="block text-xs font-medium text-gray-700 mb-1">
                                Do
                              </label>
                              <input
                                type="time"
                                value={workRecord.endTime}
                                onChange={(e) => {
                                  updateWorkRecord(employee.id, 'endTime', e.target.value);
                                  updateWorkRecord(employee.id, 'hours', calculateHours(workRecord.startTime, e.target.value));
                                }}
                                className="px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                              />
                            </div>
                          </div>
                          
                          <div>
                            <label className="block text-xs font-medium text-gray-700 mb-1">
                              Godziny
                            </label>
                            <div className="px-3 py-1 text-sm font-medium text-gray-900 bg-gray-100 rounded-md">
                              {workRecord.hours.toFixed(1)}h
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Summary */}
        {workRecords.length > 0 && (
          <div className="mt-6 bg-blue-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-blue-900 mb-2">
              Podsumowanie rejestracji
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-blue-700">Liczba pracowników</p>
                <p className="text-2xl font-bold text-blue-900">{workRecords.length}</p>
              </div>
              <div>
                <p className="text-sm text-blue-700">Łączne godziny</p>
                <p className="text-2xl font-bold text-blue-900">{totalHours.toFixed(1)}h</p>
              </div>
              <div>
                <p className="text-sm text-blue-700">Data</p>
                <p className="text-lg font-medium text-blue-900">
                  {new Date(selectedDate).toLocaleDateString('pl-PL')}
                </p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Potwierdź rejestrację
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Czy na pewno chcesz zapisać rejestrację czasu pracy dla {workRecords.length} pracowników?
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowConfirmation(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Anuluj
                </button>
                <button
                  onClick={() => {
                    // Tutaj będzie logika zapisywania
                    alert('Rejestracja została zapisana!');
                    setShowConfirmation(false);
                  }}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Zapisz
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 