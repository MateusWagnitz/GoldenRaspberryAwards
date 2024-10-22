# Golden Raspberry Awards - Frontend React Test

This project is a frontend interface that displays the nominees and winners list for the Worst Picture category at the Golden Raspberry Awards. The application features a Dashboard and a complete movie list, using React, TypeScript, TailwindCSS, RxJS, and Jest for testing.

## Table of Contents

- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Technologies Used](#technologies-used)
- [Testing](#testing)
- [Architectural Choices](#architectural-choices)

## Installation

### Prerequisites

Before starting, make sure you have the following tools installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)

### Installation Steps

1. Clone this repository:

   ```bash
   git clone https://github.com/your-username/golden-raspberry-awards.git
   ```

2. Navigate into the project directory:

   ```bash
   cd golden-raspberry-awards
   ```

3. Install the dependencies:

   ```bash
   npm install
   ```

4. Run the project:

   ```bash
   npm start
   ```

   The project will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

In the project directory, you can run the following scripts:

- `npm start`: Runs the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
- `npm test`: Runs the test suite using Jest. The tests cover both logic and component rendering.
- `npm run build`: Builds the app for production. The optimized files are placed in the build folder.

## Project Structure

The project is organized as follows:

```
├── src
│   ├── __tests__               # Unit tests
│   ├── components              # React components
│   │   ├── Dashboard.tsx       # Dashboard view
│   │   ├── MoviesList.tsx      # Movies list view
│   │   └── __tests__           # Component tests
│   │       ├── Dashboard.test.tsx
│   │       └── MoviesList.test.tsx
│   ├── services                # Data logic (service layer)
│   │   ├── dashboardService.ts # Dashboard service
│   │   ├── movieListService.ts # Movie list service
│   │   └── __tests__           # Service tests
│   │       ├── dashboardService.test.ts
│   │       └── movieListService.test.ts
│   ├── controller              # Controller layer, API communication
│   │   └── apiController.ts    # API controller
│   ├── models                  # Type and model definitions
│   │   └── models.ts
│   ├── App.tsx                 # Main component with routing
│   ├── index.tsx               # Main React entry point
│   ├── jest.config.ts          # Jest configuration
│   ├── tailwind.config.js      # TailwindCSS configuration
│   ├── index.css               # Global styles
│   ├── App.css                 # App-specific styles
│   ├── react-app-env.d.ts      # React app environment types
│   ├── reportWebVitals.ts      # Web vitals reporting
│   └── setupTests.ts           # Jest setup
├── package.json
├── tsconfig.json               # TypeScript configuration
├── jest.config.js              # Jest configuration
├── postcss.config.js           # PostCSS configuration
└── README.md
```

### Components

- **App.tsx**: The main component that organizes routing between the Dashboard and MoviesList using react-router-dom.
- **Dashboard.tsx**: Displays detailed information like the years with multiple winners, top studios, and producers with the largest/smallest gap between wins.
- **MoviesList.tsx**: Displays all movies with filters for year and winners.

### Services

- **dashboardService.ts**: Contains functions that connect the API to the dashboard, such as fetching years with multiple winners and studios with wins.
- **movieListService.ts**: Contains the logic for fetching the movie list, including pagination and filters for year and winner.

### Controller

- **apiController.ts**: A controller that handles direct communication with the external API to fetch movie and winner data.

### Models

- **models.ts**: Defines TypeScript types for the application's data, such as YearWinner, StudioWin, ProducerInterval, and Movie.

## Tests

The tests are split into two categories:

- **Logic Tests (services)**: Use `jest.mock` to simulate API behavior and test service logic.
- **Component Tests (components)**: Use `@testing-library/react` to simulate user interactions and verify correct component rendering.

## Technologies Used

- **React**: The main library for building the user interface.
- **TypeScript**: A superset of JavaScript to ensure type safety.
- **TailwindCSS**: A utility-first CSS framework for component styling.
- **RxJS**: Used to handle asynchronous streams in API communication.
- **Jest**: A testing framework for unit tests focused on JavaScript/TypeScript.
- **React Testing Library**: Used to test React components and user interactions.

## Testing

The project uses Jest and React Testing Library for testing, focusing on ensuring that both service logic and component rendering work as expected.

### Running the Tests

Run the following command to execute the test suite:


```bash
npm test
```


## Architectural Choices

- **Componentization**: The application is divided into reusable components (Dashboard, MoviesList) to facilitate maintainability and scalability. Each component has a clear responsibility, improving testability.
- **Separation of Logic**: The business logic is extracted into the service layer (`services/`), while the controller layer handles API interaction (`controller/`). This separation improves maintainability and allows code reuse across different parts of the app.
- **Use of RxJS**: RxJS was chosen to handle asynchronous requests and reactive data flows. This makes it easier to manage multiple API calls and build cleaner, scalable asynchronous logic.
- **Testability**: The choice of Jest and React Testing Library ensures that the project has reasonable test coverage. Using mocks simplifies simulating interactions and allows for efficient testing of navigation and API calls.
- **Styling with TailwindCSS**: TailwindCSS simplifies styling by keeping the CSS modular and allowing for rapid prototyping. It also contributes to cleaner CSS without style conflicts.
