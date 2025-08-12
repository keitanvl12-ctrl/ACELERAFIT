# FitTrain - Fitness Training Platform

## Overview

FitTrain is a comprehensive fitness training platform that connects students with trainers through a modern web application. The platform features workout management, progress tracking, social elements with rankings and points, and a marketplace for premium workout plans. Built as a full-stack application with a React frontend and Express.js backend, it provides both free community workouts and paid premium content from certified trainers.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (August 12, 2025)

- **Brand Identity Migration**: Successfully migrated from FitTrain to AceleraFit brand identity
- **Logo Implementation**: Integrated official AceleraFit logo in header navigation
- **Color Scheme Update**: Applied brand colors throughout the application (blue: #1e3a8a, orange: #f97316)
- **Component Updates**: Updated all UI components to use AceleraFit brand colors
- **System Migration**: Completed migration from Replit Agent to Replit environment with all dependencies properly installed

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development practices
- **Routing**: Wouter for lightweight client-side routing with path-based navigation
- **State Management**: TanStack Query (React Query) for server state management, caching, and synchronization
- **UI Framework**: shadcn/ui components built on Radix UI primitives for accessible, customizable components
- **Styling**: Tailwind CSS with custom design system including CSS variables for theming
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework for RESTful API endpoints
- **Language**: TypeScript throughout the stack for consistency and type safety
- **API Design**: RESTful endpoints following conventional patterns (/api/resource structure)
- **Error Handling**: Centralized error middleware with structured error responses
- **Development**: Hot-reload development server with request logging and performance monitoring

### Database Architecture
- **ORM**: Drizzle ORM for type-safe database queries and migrations
- **Database**: PostgreSQL configured for production use
- **Connection**: Neon Database serverless PostgreSQL for scalable cloud hosting
- **Schema Design**: Normalized relational structure with proper foreign key relationships
- **Key Tables**: users, workouts, userWorkouts, bodyMetrics, workoutPlans, userPoints for comprehensive fitness tracking

### Data Storage Design
- **User Management**: Separate user types (students/trainers) with role-based features
- **Workout System**: Public and private workouts with JSON-based exercise storage for flexibility
- **Progress Tracking**: Body metrics tracking with historical data and user workout completion records
- **Social Features**: Points system, streaks, and ranking functionality for user engagement
- **Marketplace**: Premium workout plans with pricing and trainer attribution

### Authentication & Authorization
- **Session Management**: PostgreSQL-based session storage using connect-pg-simple
- **User Context**: Hardcoded user context for development (user1) with plans for full authentication
- **Security**: Prepared for production authentication system integration

### Component Architecture
- **Design System**: Consistent component library with variants using class-variance-authority
- **Layout**: Responsive design with mobile-first approach and dedicated mobile navigation
- **Reusability**: Modular components for workouts, metrics, rankings, and marketplace items
- **Accessibility**: Built on Radix UI primitives ensuring WCAG compliance

## External Dependencies

### Database Services
- **Neon Database**: Serverless PostgreSQL hosting with connection pooling
- **Drizzle Kit**: Database migrations and schema management tools

### UI & Styling
- **Radix UI**: Comprehensive primitive component library for accessibility
- **Tailwind CSS**: Utility-first CSS framework with PostCSS processing
- **Lucide React**: Consistent icon library for user interface elements
- **Google Fonts**: Web font integration for Inter and other typefaces

### Development Tools
- **Vite**: Fast build tool with HMR and optimized bundling
- **ESBuild**: JavaScript bundler for server-side code compilation
- **TypeScript**: Static typing for enhanced development experience

### State Management & Data Fetching
- **TanStack Query**: Server state synchronization with caching and background updates
- **React Hook Form**: Form state management with validation integration

### Date & Time Handling
- **date-fns**: Comprehensive date manipulation and formatting utilities

### Replit Integration
- **Replit-specific plugins**: Development environment integration with error overlays and cartographer for enhanced debugging