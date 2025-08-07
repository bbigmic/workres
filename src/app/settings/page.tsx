'use client';

import { useState } from 'react';
import { 
  ArrowLeft,
  Users,
  Shield,
  Database,
  Bell,
  Trash2,
  Plus,
  Edit
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'HR' | 'MANAGER' | 'EMPLOYEE';
  isActive: boolean;
}

interface AbsenceType {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('users');
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [showAddAbsenceTypeModal, setShowAddAbsenceTypeModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const users: User[] = [
    { id: '1', name: 'Jan Kowalski', email: 'jan.kowalski@firma.pl', role: 'ADMIN', isActive: true },
    { id: '2', name: 'Anna Nowak', email: 'anna.nowak@firma.pl', role: 'HR', isActive: true },
    { id: '3', name: 'Piotr Wiśniewski', email: 'piotr.wisniewski@firma.pl', role: 'MANAGER', isActive: true },
    { id: '4', name: 'Maria Kowalczyk', email: 'maria.kowalczyk@firma.pl', role: 'EMPLOYEE', isActive: false }
  ];

  const absenceTypes: AbsenceType[] = [
    { id: '1', name: 'Urlop wypoczynkowy', description: 'Standardowy urlop pracowniczy', isActive: true },
    { id: '2', name: 'Urlop na żądanie', description: 'Urlop na żądanie pracownika', isActive: true },
    { id: '3', name: 'Zwolnienie lekarskie', description: 'L4 - zwolnienie lekarskie', isActive: true },
    { id: '4', name: 'Szkolenie', description: 'Szkolenia i kursy', isActive: true },
    { id: '5', name: 'Delegacja', description: 'Wyjazdy służbowe', isActive: false }
  ];

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'Administrator';
      case 'HR': return 'HR';
      case 'MANAGER': return 'Kierownik';
      case 'EMPLOYEE': return 'Pracownik';
      default: return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ADMIN': return 'bg-red-100 text-red-800';
      case 'HR': return 'bg-blue-100 text-blue-800';
      case 'MANAGER': return 'bg-green-100 text-green-800';
      case 'EMPLOYEE': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const tabs = [
    { id: 'users', name: 'Użytkownicy', icon: Users },
    { id: 'permissions', name: 'Uprawnienia', icon: Shield },
    { id: 'absence-types', name: 'Typy nieobecności', icon: Bell },
    { id: 'data', name: 'Zarządzanie danymi', icon: Database }
  ];

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
                Ustawienia
              </h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'users' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Zarządzanie użytkownikami
                  </h2>
                  <button
                    onClick={() => setShowAddUserModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Dodaj użytkownika</span>
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Użytkownik
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Email
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Rola
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Akcje
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">{user.email}</div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                              {getRoleLabel(user.role)}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              user.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {user.isActive ? 'Aktywny' : 'Nieaktywny'}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <button className="text-blue-600 hover:text-blue-900 mr-3">
                              <Edit className="h-4 w-4" />
                            </button>
                            <button className="text-red-600 hover:text-red-900">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'permissions' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Konfiguracja uprawnień
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-md font-medium text-gray-900 mb-4">Administrator</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Pełny dostęp do wszystkich funkcji</li>
                      <li>• Zarządzanie użytkownikami i rolami</li>
                      <li>• Konfiguracja systemu</li>
                      <li>• Usuwanie danych</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-md font-medium text-gray-900 mb-4">HR</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Zarządzanie pracownikami</li>
                      <li>• Rejestracja nieobecności</li>
                      <li>• Generowanie raportów</li>
                      <li>• Przypisywanie do grup</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-md font-medium text-gray-900 mb-4">Kierownik</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Rejestracja czasu pracy</li>
                      <li>• Podgląd nieobecności</li>
                      <li>• Edycja ksywki pracowników</li>
                      <li>• Przypisywanie do grup</li>
                    </ul>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6">
                    <h3 className="text-md font-medium text-gray-900 mb-4">Pracownik</h3>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li>• Podgląd własnych danych</li>
                      <li>• Podgląd harmonogramu</li>
                      <li>• Ograniczone uprawnienia</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'absence-types' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-medium text-gray-900">
                    Typy nieobecności
                  </h2>
                  <button
                    onClick={() => setShowAddAbsenceTypeModal(true)}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center space-x-2"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Dodaj typ</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {absenceTypes.map((type) => (
                    <div key={type.id} className="bg-white border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-gray-900">{type.name}</h3>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                          type.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          {type.isActive ? 'Aktywny' : 'Nieaktywny'}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-900 text-sm">
                          <Edit className="h-4 w-4" />
                        </button>
                        <button className="text-red-600 hover:text-red-900 text-sm">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'data' && (
              <div>
                <h2 className="text-lg font-medium text-gray-900 mb-6">
                  Zarządzanie danymi
                </h2>
                <div className="space-y-6">
                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-md font-medium text-gray-900 mb-4">
                      Eksport danych
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Wyeksportuj wszystkie dane aplikacji w formacie JSON lub CSV.
                    </p>
                    <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                      Eksportuj dane
                    </button>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-md font-medium text-gray-900 mb-4">
                      Usuwanie starych danych
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Usuń stare wpisy z bazy danych. Ta operacja jest nieodwracalna.
                    </p>
                    <div className="flex items-center space-x-4">
                      <select className="px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900">
                        <option value="1">Starsze niż 1 rok</option>
                        <option value="2">Starsze niż 2 lata</option>
                        <option value="5">Starsze niż 5 lat</option>
                      </select>
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center space-x-2"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span>Usuń dane</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-lg p-6">
                    <h3 className="text-md font-medium text-gray-900 mb-4">
                      Synchronizacja
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      Konfiguracja synchronizacji danych między urządzeniami.
                    </p>
                    <div className="flex items-center space-x-4">
                      <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                        Włącz synchronizację
                      </button>
                      <span className="text-sm text-gray-500">Automatyczna co 5 minut</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Add User Modal */}
      {showAddUserModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Dodaj nowego użytkownika
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Imię i nazwisko
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Wprowadź imię i nazwisko"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="user@firma.pl"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Rola
                  </label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900">
                    <option value="EMPLOYEE">Pracownik</option>
                    <option value="MANAGER">Kierownik</option>
                    <option value="HR">HR</option>
                    <option value="ADMIN">Administrator</option>
                  </select>
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddUserModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Dodaj użytkownika
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Add Absence Type Modal */}
      {showAddAbsenceTypeModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Dodaj typ nieobecności
              </h3>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nazwa typu
                  </label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="np. Szkolenie"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Opis
                  </label>
                  <textarea
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Opis typu nieobecności..."
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddAbsenceTypeModal(false)}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                  >
                    Anuluj
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Dodaj typ
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Potwierdź usunięcie danych
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Czy na pewno chcesz usunąć stare dane? Ta operacja jest nieodwracalna.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200"
                >
                  Anuluj
                </button>
                <button
                  onClick={() => {
                    alert('Dane zostały usunięte!');
                    setShowDeleteConfirm(false);
                  }}
                  className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                  Usuń dane
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 