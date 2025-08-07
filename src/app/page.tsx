'use client';

import { useState } from 'react';
import { 
  Users, 
  Calendar, 
  Clock, 
  FileText, 
  Settings, 
  UserPlus,
  BarChart3,
  LogOut
} from 'lucide-react';

export default function Home() {
  const [userRole, setUserRole] = useState<'ADMIN' | 'HR' | 'MANAGER' | 'EMPLOYEE'>('MANAGER');

  const menuItems = [
    {
      title: 'Pracownicy',
      description: 'Zarządzanie listą pracowników',
      icon: Users,
      href: '/employees',
      roles: ['ADMIN', 'HR', 'MANAGER']
    },
    {
      title: 'Kalendarz nieobecności',
      description: 'Widok nieobecności w kalendarzu',
      icon: Calendar,
      href: '/calendar',
      roles: ['ADMIN', 'HR', 'MANAGER']
    },
    {
      title: 'Rejestracja czasu pracy',
      description: 'Rejestracja godzin pracy pracowników',
      icon: Clock,
      href: '/work-registration',
      roles: ['ADMIN', 'MANAGER']
    },
    {
      title: 'Raporty',
      description: 'Generowanie raportów Excel',
      icon: FileText,
      href: '/reports',
      roles: ['ADMIN', 'HR']
    },
    {
      title: 'Dodaj pracownika',
      description: 'Dodawanie nowych pracowników',
      icon: UserPlus,
      href: '/employees/add',
      roles: ['ADMIN', 'HR']
    },
    {
      title: 'Statystyki',
      description: 'Podgląd statystyk pracy',
      icon: BarChart3,
      href: '/statistics',
      roles: ['ADMIN', 'HR', 'MANAGER']
    },
    {
      title: 'Ustawienia',
      description: 'Konfiguracja aplikacji',
      icon: Settings,
      href: '/settings',
      roles: ['ADMIN']
    }
  ];

  const filteredMenuItems = menuItems.filter(item => 
    item.roles.includes(userRole)
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                WorkRes
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Rola:</span>
                <select
                  value={userRole}
                  onChange={(e) => setUserRole(e.target.value as any)}
                  className="text-sm border border-gray-300 rounded-md px-2 py-1 text-gray-900"
                >
                  <option value="ADMIN">Admin</option>
                  <option value="HR">HR</option>
                  <option value="MANAGER">Kierownik</option>
                  <option value="EMPLOYEE">Pracownik</option>
                </select>
              </div>
              <button className="text-gray-400 hover:text-gray-600">
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Panel główny
          </h2>
          <p className="text-gray-600">
            Wybierz funkcję, którą chcesz wykonać
          </p>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenuItems.map((item) => (
            <div
              key={item.title}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => window.location.href = item.href}
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <item.icon className="h-6 w-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Users className="h-8 w-8 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Aktywni pracownicy
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  24
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Nieobecności dzisiaj
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  3
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Clock className="h-8 w-8 text-orange-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-500">
                  Godziny pracy dzisiaj
                </p>
                <p className="text-2xl font-semibold text-gray-900">
                  168
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
