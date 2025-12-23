# 📚 ELA - English Learning App

ELA is a modern, comprehensive platform designed to streamline English learning through **Spaced Repetition**, **Interactive Mock Tests**, and **AI-Driven Personalization**. Built with a focus on scalability and user experience, it leverages **.NET 9 Clean Architecture** on the backend and a high-performance **React 19** frontend.

## 🌟 Key Features

### 🧠 Vocabulary & Flashcards
- **Personalized Decks**: Organize vocabulary into custom decks for focused learning.
- **Spaced Repetition System (SRS)**: Optimized learning using the **SM-2 Algorithm** to maximize retention and minimize study time.
- **Rich Vocab Data**: Manage words with IPA, multiple definitions, examples, and part-of-speech categorization.

### 🤖 AI-Powered Learning (Gemini Integration)
- **Topic-Based Generation**: Instantly generate structured vocabulary lists based on any topic (e.g., "Space Exploration", "Business Meetings").
- **Dynamic Mock Tests**: Generate realistic practice questions for all four language skills.
- **Intelligent Suggestions**: Get AI-recommended topics to diversify your learning.

### 📝 Comprehensive Mock Tests
- **Listening**: Interactive audio-based questions (placeholder support).
- **Reading**: Passage analysis and comprehension checks.
- **Speaking**: Practice with preparing and responding to prompts within time limits.
- **Writing**: Task-based writing prompts with image-based stimulation.

### 📊 Progress Tracking
- **Quiz History**: Detailed logs of your quiz performance.
- **Learning Analytics**: Track your progress over time through intuitive dashboards.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: [.NET 9](https://dotnet.microsoft.com/en-us/download/dotnet/9.0)
- **Architecture**: **Clean Architecture** (Domain, Application, Infrastructure, API)
- **Database**: **PostgreSQL** with **Entity Framework Core**
- **AI Service**: **Google Gemini 1.5**
- **API Documentation**: **Scalar UI** (Modern Swagger alternative)
- **Design Patterns**: Domain-Driven Design (DDD), Result Pattern, Guard Clauses

### Frontend
- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand)
- **Routing**: [TanStack Router](https://tanstack.com/router)
- **Data Fetching**: [TanStack Query v5](https://tanstack.com/query)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites
- [.NET 9 SDK](https://dotnet.microsoft.com/download/dotnet/9.0)
- [Node.js (v18+)](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Gemini API Key](https://aistudio.google.com/app/apikey)

### Backend Setup
1. **Configure Connection**: Update `src/ELA.Api/appsettings.json` with your PostgreSQL string.
2. **AI Configuration**: Ensure `Gemini:ApiKey` is set in user secrets or environment variables.
3. **Database Migration**:
   ```bash
   dotnet ef database update --project src/ELA.Infrastructure --startup-project src/ELA.Api
   ```
4. **Run API**:
   ```bash
   dotnet run --project src/ELA.Api
   ```

### Frontend Setup
1. **Navigate to app**:
   ```bash
   cd src/ELA.ClientApp
   ```
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Run Dev Server**:
   ```bash
   npm run dev
   ```

---

## 📂 Project Structure

```text
├── src
│   ├── ELA.Api            # ASP.NET Core Web API
│   ├── ELA.Application    # Use cases, interfaces, and DTOs
│   ├── ELA.Domain         # Domain entities and business rules
│   ├── ELA.Infrastructure # Data persistence and external services
│   └── ELA.ClientApp      # React 19 Frontend (Vite)
├── tests                  # Unit and Integration tests
└── ELA.sln                # Solution file
```

---

## 📖 Learn More

- [Clean Architecture Overview](https://8thlight.com/blog/uncle-bob/2012/08/13/the-clean-architecture.html)
- [TanStack Router Docs](https://tanstack.com/router/latest/docs/framework/react/overview)
- [Google Gemini API Docs](https://ai.google.dev/docs)

## 🔖 License

MIT — Free to use and modify.