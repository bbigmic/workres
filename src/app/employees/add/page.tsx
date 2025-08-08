'use client';

import { useState } from 'react';
import { 
  UserPlus, 
  ArrowLeft,
  Save,
  X,
  Check
} from 'lucide-react';

interface EmployeeForm {
  firstName: string;
  lastName: string;
  nickname: string;
  groups: string[];
}

export default function AddEmployeePage() {
  const [formData, setFormData] = useState<EmployeeForm>({
    firstName: '',
    lastName: '',
    nickname: '',
    groups: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const availableGroups = [
    'Zmiana poranna',
    'Zmiana popołudniowa',
    'Zmiana nocna',
    'Produkcja',
    'Kontrola jakości',
    'Magazyn',
    'Administracja',
    'IT'
  ];

  const generateNickname = (firstName: string, lastName: string) => {
    if (!firstName || !lastName) return '';
    return `${firstName} ${lastName.charAt(0)}.`;
  };

  const handleInputChange = (field: keyof EmployeeForm, value: string | string[]) => {
    setFormData(prev => {
      const newData = { ...prev, [field]: value };
      
      // Automatyczne generowanie ksywki
      if (field === 'firstName' || field === 'lastName') {
        const firstName = field === 'firstName' ? value as string : prev.firstName;
        const lastName = field === 'lastName' ? value as string : prev.lastName;
        newData.nickname = generateNickname(firstName, lastName);
      }
      
      return newData;
    });
  };

  const handleGroupToggle = (group: string) => {
    setFormData(prev => ({
      ...prev,
      groups: prev.groups.includes(group)
        ? prev.groups.filter(g => g !== group)
        : [...prev.groups, group]
    }));
  };

  const validateForm = () => {
    if (!formData.firstName.trim()) return 'Imię jest wymagane';
    if (!formData.lastName.trim()) return 'Nazwisko jest wymagane';
    if (!formData.nickname.trim()) return 'Ksywka jest wymagana';
    if (formData.groups.length === 0) return 'Wybierz przynajmniej jedną grupę';
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const error = validateForm();
    if (error) {
      alert(error);
      return;
    }

    setIsSubmitting(true);
    
    // Symulacja zapisu do bazy danych
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
      
      // Reset formularza po sukcesie
      setTimeout(() => {
        setFormData({
          firstName: '',
          lastName: '',
          nickname: '',
          groups: []
        });
        setShowSuccess(false);
      }, 2000);
    }, 1000);
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
                Dodaj pracownika
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                <Save className="h-4 w-4" />
                <span>{isSubmitting ? 'Zapisywanie...' : 'Zapisz pracownika'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {showSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Check className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">
                Pracownik został pomyślnie dodany!
              </span>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Dane osobowe
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Imię *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => handleInputChange('firstName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Wprowadź imię"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nazwisko *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => handleInputChange('lastName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Wprowadź nazwisko"
                  required
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ksywka/Skrót *
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={formData.nickname}
                    onChange={(e) => handleInputChange('nickname', e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                    placeholder="Domyślnie: Imię + pierwsza litera nazwiska"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const nickname = generateNickname(formData.firstName, formData.lastName);
                      handleInputChange('nickname', nickname);
                    }}
                    className="px-3 py-2 text-sm text-blue-600 hover:text-blue-800 border border-blue-300 rounded-md hover:bg-blue-50"
                  >
                    Generuj
                  </button>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  Ksywka jest automatycznie generowana jako &quot;imię + pierwsza litera nazwiska&quot;, 
                  ale można ją edytować na dowolną nazwę.
                </p>
              </div>
            </div>
          </div>

          {/* Groups Assignment */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Przypisanie do grup/zmian *
            </h2>
            <p className="text-sm text-gray-600 mb-4">
              Wybierz grupy lub zmiany, do których ma należeć pracownik. 
              Można wybrać wiele grup jednocześnie.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableGroups.map(group => (
                <div
                  key={group}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    formData.groups.includes(group)
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => handleGroupToggle(group)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium text-gray-900">{group}</h3>
                      <p className="text-sm text-gray-500">
                        {group.includes('Zmiana') ? 'Zmiana robocza' : 'Dział'}
                      </p>
                    </div>
                    {formData.groups.includes(group) && (
                      <Check className="h-5 w-5 text-blue-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            {formData.groups.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Wybrane grupy:</strong> {formData.groups.join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* Additional Information */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Informacje dodatkowe
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Uwagi (opcjonalnie)
                </label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-gray-900"
                  placeholder="Dodatkowe informacje o pracowniku..."
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isActive"
                  defaultChecked
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="isActive" className="text-sm text-gray-700">
                  Pracownik aktywny (może rejestrować czas pracy)
                </label>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => window.history.back()}
              className="px-6 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Anuluj</span>
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              <UserPlus className="h-4 w-4" />
              <span>{isSubmitting ? 'Zapisywanie...' : 'Dodaj pracownika'}</span>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
} 