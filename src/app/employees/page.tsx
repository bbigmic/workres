'use client';

import { useState } from 'react';
import { 
  Search, 
  Filter, 
  Edit, 
  Trash2,
  Calendar,
  UserPlus,
  ArrowLeft
} from 'lucide-react';

interface Employee {
  id: string;
  firstName: string;
  lastName: string;
  nickname: string;
  isActive: boolean;
  groups: string[];
  absences: Absence[];
}

interface Absence {
  id: string;
  type: 'VACATION' | 'SICK_LEAVE' | 'OTHER';
  startDate: string;
  endDate: string;
  reason?: string;
}

export default function EmployeesPage() {
  const [employees] = useState<Employee[]>([
    {
      id: '1',
      firstName: 'Jan',
      lastName: 'Kowalski',
      nickname: 'Jan K.',
      isActive: true,
      groups: ['Zmiana poranna', 'Produkcja'],
      absences: []
    },
    {
      id: '2',
      firstName: 'Anna',
      lastName: 'Nowak',
      nickname: 'Anna N.',
      isActive: true,
      groups: ['Zmiana popołudniowa', 'Kontrola jakości'],
      absences: [
        {
          id: '1',
          type: 'VACATION',
          startDate: '2024-08-15',
          endDate: '2024-08-20',
          reason: 'Urlop wypoczynkowy'
        }
      ]
    },
    {
      id: '3',
      firstName: 'Piotr',
      lastName: 'Wiśniewski',
      nickname: 'Piotr W.',
      isActive: true,
      groups: ['Zmiana poranna', 'Magazyn'],
      absences: []
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [showAbsenceModal, setShowAbsenceModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const groups = ['Zmiana poranna', 'Zmiana popołudniowa', 'Zmiana nocna', 'Produkcja', 'Kontrola jakości', 'Magazyn'];

  const filteredEmployees = employees.filter(employee => {
    const matchesSearch = 
      employee.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      employee.nickname.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesGroup = selectedGroup === '' || employee.groups.includes(selectedGroup);
    
    return matchesSearch && matchesGroup;
  });

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
      case 'VACATION': return 'bg-green-100 text-green-800';
      case 'SICK_LEAVE': return 'bg-red-100 text-red-800';
      case 'OTHER': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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
                Pracownicy
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2">
                <UserPlus className="h-4 w-4" />
                <span>Dodaj pracownika</span>
              </button>
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
                Wyszukaj
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Imię, nazwisko lub ksywka..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Grupa/Zmiana
              </label>
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Wszystkie grupy</option>
                {groups.map(group => (
                  <option key={group} value={group}>{group}</option>
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

        {/* Employees List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">
              Lista pracowników ({filteredEmployees.length})
            </h2>
          </div>
          <div className="divide-y divide-gray-200">
            {filteredEmployees.map((employee) => (
              <div key={employee.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {employee.firstName[0]}{employee.lastName[0]}
                      </span>
                    </div>
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
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {/* Absences */}
                    {employee.absences.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {employee.absences.map(absence => (
                          <span
                            key={absence.id}
                            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getAbsenceTypeColor(absence.type)}`}
                          >
                            {getAbsenceTypeLabel(absence.type)}
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => {
                          setSelectedEmployee(employee);
                          setShowAbsenceModal(true);
                        }}
                        className="text-blue-600 hover:text-blue-800 p-1"
                        title="Dodaj nieobecność"
                      >
                        <Calendar className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-gray-600 p-1">
                        <Edit className="h-4 w-4" />
                      </button>
                      <button className="text-red-400 hover:text-red-600 p-1">
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Absence Modal */}
      {showAbsenceModal && selectedEmployee && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Dodaj nieobecność - {selectedEmployee.firstName} {selectedEmployee.lastName}
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Typ nieobecności
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900">
                    <option value="VACATION">Urlop</option>
                    <option value="SICK_LEAVE">L4</option>
                    <option value="OTHER">Inne</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data rozpoczęcia
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Data zakończenia
                  </label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Powód (opcjonalnie)
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Wprowadź powód nieobecności..."
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAbsenceModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Dodaj nieobecność
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 