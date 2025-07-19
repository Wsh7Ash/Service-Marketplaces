# Service Marketplace Mobile App

A React Native mobile application that connects service providers with customers. The platform facilitates connections between local service providers and customers, taking a 5-15% commission on transactions.

## Features

- User authentication (login/register)
- Service provider profiles and listings
- Category-based service browsing
- Search and filter functionality
- Booking and scheduling system
- Real-time messaging between users
- Ratings and reviews
- Secure payment processing
- Commission-based revenue model (5-15%)

## Tech Stack

- **Frontend**: React Native with Expo
- **UI Components**: React Native Elements
- **Navigation**: React Navigation
- **State Management**: React Context API
- **Local Storage**: Expo SecureStore
- **Type Safety**: TypeScript

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Expo CLI (`npm install -g expo-cli`)
- iOS Simulator (for Mac) or Android Studio (for Android development)

## Installation

1. Clone the repository:
   ```bash
   git clone [repository-url]
   cd service-marketplace
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Run on iOS or Android:
   - For iOS: Press 'i' in the terminal or run `npm run ios`
   - For Android: Press 'a' in the terminal or run `npm run android`

## Project Structure

```
service-marketplace/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Button.tsx
│   │   └── Card.tsx
│   ├── screens/       # Screen components
│   │   ├── AuthScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── SearchScreen.tsx
│   │   ├── BookingsScreen.tsx
│   │   └── ProfileScreen.tsx
│   ├── context/       # React Context for state management
│   │   └── AuthContext.tsx
│   └── navigation/    # Navigation configuration
├── App.tsx           # Root component
├── package.json      # Dependencies and scripts
└── tsconfig.json    # TypeScript configuration
```

## Available Scripts

- `npm start` - Start the Expo development server
- `npm run ios` - Run the app in iOS simulator
- `npm run android` - Run the app in Android emulator
- `npm run web` - Run the app in web browser
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Development Guidelines

1. **Code Style**
   - Follow TypeScript best practices
   - Use functional components with hooks
   - Maintain consistent naming conventions
   - Write self-documenting code with clear variable names

2. **Component Structure**
   - Keep components focused and single-responsibility
   - Use TypeScript interfaces for props
   - Implement proper error handling
   - Add loading states for async operations

3. **State Management**
   - Use React Context for global state
   - Keep component state local when possible
   - Implement proper data caching
   - Handle loading and error states

4. **Navigation**
   - Use React Navigation for routing
   - Implement proper authentication flow
   - Handle deep linking
   - Maintain navigation state

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support, email support@servicemarketplace.com or join our Slack channel. 