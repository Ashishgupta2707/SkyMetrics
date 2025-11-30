# SkyMetrics

A modern, responsive weather application built with Angular 20 that provides real-time weather information for any location worldwide. SkyMetrics features a beautiful, intuitive interface and comprehensive weather data display.

## 🌟 Features

- **Location Search**: Search for weather information by city name
- **Temperature Conversion**: Toggle between Celsius and Fahrenheit with real-time conversion
- **Comprehensive Weather Data**: 
  - Current temperature with min/max indicators
  - Weather condition description
  - Feels like temperature
  - Atmospheric pressure
  - Humidity percentage
  - Wind speed
  - Sunrise and sunset times (timezone-adjusted)
- **Modern UI**: Beautiful, responsive design built with Tailwind CSS
- **Loading States**: Visual feedback during API requests
- **Notifications**: Toast notifications for user actions and feedback
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## 📸 Screenshots

### Main Weather Dashboard
![Main Weather Dashboard](./screenshots/weatherApp.PNG)
*The main weather interface showing current conditions, temperature, and weather details*

<!-- ### Location Search
![Location Search](./screenshots/location-search.png)
*Search functionality for finding weather information by city name*

### Temperature Toggle
![Temperature Toggle](./screenshots/temperature-toggle.png)
*Toggle between Celsius and Fahrenheit with real-time conversion*

### Weather Details
![Weather Details](./screenshots/weather-details.png)
*Comprehensive weather information including feels like, pressure, humidity, wind speed, sunrise, and sunset*

### Mobile View
![Mobile View](./screenshots/mobile-view.png)
*Responsive design optimized for mobile devices*

> **Note**: To add screenshots, place your image files in a `screenshots/` directory in the project root and update the paths above. Recommended image format: PNG or JPG. Recommended size: 1200x800px for desktop screenshots, 400x800px for mobile screenshots. -->

## 🛠️ Tech Stack

- **Framework**: Angular 20.1.0
- **Language**: TypeScript 5.8.2
- **Styling**: Tailwind CSS 3.4.18
- **State Management**: Angular Signals
- **HTTP Client**: Angular HttpClient with RxJS
- **API**: Open Weather API (via RapidAPI)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher recommended)
- npm (comes with Node.js)
- Angular CLI 20.1.4 or higher

## 🚀 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd SkyMetrics
```

2. Install dependencies:
```bash
npm install
```


### Running the Application

Start the development server:
```bash
npm start
# or
ng serve
```

Navigate to `http://localhost:4200/` in your browser. The application will automatically reload when you modify source files.

## 📁 Project Structure

```
SkyMetrics/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── loader/          # Loading indicator component
│   │   │   ├── notification/    # Toast notification component
│   │   │   └── weather/         # Main weather display component
│   │   ├── services/
│   │   │   ├── fetcher/         # HTTP service for API calls
│   │   │   ├── loader/          # Loading state service
│   │   │   └── notification/    # Notification service
│   │   ├── enviroments/
│   │   │   └── environment.ts   # Environment configuration
│   │   ├── app.ts               # Root component
│   │   ├── app.html             # Root template
│   │   ├── app.routes.ts        # Application routes
│   │   └── app.config.ts        # Application configuration
│   ├── index.html
│   ├── main.ts                  # Application entry point
│   └── styles.scss              # Global styles
├── angular.json                  # Angular CLI configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
└── package.json                 # Project dependencies
```

## 🎯 Key Components

### Weather Component
The main component that displays weather information. Features include:
- Location search input
- Temperature display with unit toggle
- Weather details grid
- API integration for fetching weather data

### Loader Component
Displays a loading indicator during API requests with customizable messages.

### Notification Component
Shows toast-style notifications for user feedback (success, error, info messages).

## 🔧 Services

### Fetcher Service
Handles all HTTP requests to external APIs. Supports GET and POST methods with customizable headers and parameters.

### Loader Service
Manages loading state using Angular signals. Provides methods to show/hide the loader with custom messages.

### Notification Service
Manages notification state using Angular signals. Provides methods to display notifications with configurable duration and type.

## 🏗️ Building for Production

To build the project for production:

```bash
npm run build
# or
ng build
```

The build artifacts will be stored in the `dist/` directory. The production build optimizes the application for performance and speed.

## 🧪 Testing

Run unit tests:
```bash
npm test
# or
ng test
```

Tests are executed using the [Karma](https://karma-runner.github.io) test runner.

## 📝 API Integration

SkyMetrics uses the Open Weather API via RapidAPI. To use this application:

1. Sign up for a RapidAPI account at [rapidapi.com](https://rapidapi.com)
2. Subscribe to the Open Weather API
3. Get your API key from the RapidAPI dashboard
4. Update the API key in the weather component (see Configuration section above)

**Note**: The current implementation has the API key hardcoded. For production use, consider:
- Using environment variables
- Implementing a backend proxy to hide API keys
- Using Angular's environment configuration files

## 🎨 Styling

The application uses Tailwind CSS for styling. The configuration can be found in `tailwind.config.js`. The design features:
- Gradient backgrounds
- Responsive grid layouts
- Smooth transitions and hover effects
- Modern card-based UI components

## 🔄 State Management

The application uses Angular Signals for reactive state management:
- Component state is managed with signals
- Services expose computed signals for reactive updates
- No external state management library required

## 📱 Browser Support

SkyMetrics supports all modern browsers:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is private and proprietary.

## 🙏 Acknowledgments

- [Angular](https://angular.io) - The web framework
- [Tailwind CSS](https://tailwindcss.com) - The CSS framework
- [Open Weather API](https://rapidapi.com/community/api/open-weather-map) - Weather data provider

## 📞 Support

For issues, questions, or contributions, please open an issue in the repository.


