# WorkRes - Aplikacja Zarządzania Czasem Pracy

Kompleksowa aplikacja PWA do rejestracji i zarządzania czasem pracy pracowników, z uwzględnieniem różnych ról użytkowników.

## 🚀 Funkcjonalności

### Główne moduły:
- **Zarządzanie pracownikami** - lista pracowników z możliwością dodawania nieobecności
- **Kalendarz nieobecności** - interaktywny widok kalendarza z filtrowaniem
- **Rejestracja czasu pracy** - rejestracja godzin pracy przez kierowników zmian
- **Raporty** - generowanie raportów Excel z podsumowaniami
- **Powiadomienia** - ostrzeżenia o kolizjach (np. urlop i praca w tym samym dniu)

### Role użytkowników:
- **Admin** - pełny dostęp do wszystkich funkcji
- **HR** - zarządzanie pracownikami, nieobecnościami i raportami
- **Kierownik** - rejestracja czasu pracy i podgląd nieobecności
- **Pracownik** - podstawowy dostęp do informacji

## 🛠️ Technologie

- **Frontend**: Next.js 14, TypeScript, Tailwind CSS
- **Baza danych**: SQLite z Prisma ORM
- **PWA**: Service Worker, Manifest, Offline support
- **UI/UX**: Responsive design, Mobile-first approach

## 📦 Instalacja

1. **Sklonuj repozytorium:**
```bash
git clone <repository-url>
cd workres-app
```

2. **Zainstaluj zależności:**
```bash
npm install
```

3. **Skonfiguruj bazę danych:**
```bash
npx prisma migrate dev
```

4. **Uruchom aplikację:**
```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem: `http://localhost:3000`

## 🗄️ Struktura bazy danych

### Główne tabele:
- **users** - użytkownicy systemu z rolami
- **employees** - pracownicy z danymi osobowymi
- **groups** - grupy/zmiany pracowników
- **work_records** - rejestracja czasu pracy
- **absences** - nieobecności pracowników

### Relacje:
- Pracownicy mogą należeć do wielu grup
- Każdy pracownik może mieć wiele wpisów czasu pracy
- Nieobecności są powiązane z pracownikami

## 📱 PWA Features

- **Offline support** - aplikacja działa bez internetu
- **Install prompt** - możliwość instalacji na urządzeniach mobilnych
- **Responsive design** - optymalizacja dla mobile/desktop
- **Push notifications** - powiadomienia o ważnych zdarzeniach

## 🔧 Konfiguracja

### Zmienne środowiskowe (.env):
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Struktura projektu:
```
src/
├── app/                    # App Router (Next.js 14)
│   ├── employees/         # Zarządzanie pracownikami
│   ├── calendar/          # Kalendarz nieobecności
│   ├── work-registration/ # Rejestracja czasu pracy
│   ├── reports/           # Raporty
│   └── page.tsx          # Dashboard główny
├── components/            # Komponenty React
├── lib/                  # Utilities i helpers
└── types/                # Definicje TypeScript
```

## 📊 Raporty

### Dostępne raporty:
- **Raport czasu pracy** - szczegółowe godziny pracowników
- **Podsumowanie nieobecności** - urlopy, L4, inne
- **Statystyki grup** - wydajność zespołów
- **Eksport Excel** - raporty w formacie .xlsx

### Kolumny w raporcie:
- Nazwisko i imię pracownika
- Ilość godzin pracy w poszczególnych dniach
- Suma godzin roboczych
- Suma godzin weekendowych i świątecznych
- Liczba dni nieobecności (Urlopy, L4, Inne)

## 🔐 Bezpieczeństwo

- **Role-based access control** - kontrola dostępu na podstawie ról
- **Input validation** - walidacja danych wejściowych
- **SQL injection protection** - Prisma ORM
- **XSS protection** - Next.js built-in security

## 📱 Mobile Features

- **Touch-friendly interface** - optymalizacja dla dotyku
- **Swipe gestures** - nawigacja gestami
- **Offline-first** - praca bez internetu
- **Fast loading** - optymalizacja wydajności

## 🚀 Deployment

### Vercel (zalecane):
```bash
npm run build
vercel --prod
```

### Docker:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## 📈 Monitoring

- **Error tracking** - automatyczne raportowanie błędów
- **Performance monitoring** - metryki wydajności
- **User analytics** - analiza użycia aplikacji

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)
- **Email**: support@workres.com

---

**WorkRes** - Usprawnij zarządzanie czasem pracy w Twojej organizacji! ⏰👥
