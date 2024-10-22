import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

jest.mock('./components/MoviesList', () => () => <div>MoviesList Component</div>);
jest.mock('./components/Dashboard', () => () => <div>Dashboard Component</div>);

describe('App component', () => {
  test('renders Dashboard by default', () => {
    render(<App />);

    expect(screen.getByText(/Dashboard Component/i)).toBeInTheDocument();
  });

  test('renders MoviesList when clicking on List link', async () => {
    render(<App />);

    const moviesLink = screen.getByText(/List/i);
    moviesLink.click();

    await waitFor(() => {
      expect(screen.getByText(/MoviesList Component/i)).toBeInTheDocument();
    });
  });

  test('renders the title of the app', () => {
    render(<App />);

    expect(screen.getByText(/Frontend React Test/i)).toBeInTheDocument();
  });
});
