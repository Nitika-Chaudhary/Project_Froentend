import { render, screen, fireEvent} from '@testing-library/react';
import BookingForm from './components/BookingForm';
import {initializeTimes, updateTimes} from './App';

import { render, screen, fireEvent } from '@testing-library/react';
import BookingForm from './BookingForm';

// Mock the dispatch function
const mockDispatch = jest.fn();

describe('BookingForm', () => {
  
  test('renders the form elements correctly', () => {
    render(<BookingForm availableTimes={["17:00", "18:00", "19:00"]} dispatch={mockDispatch} />);

    // Check if the form elements are rendered
    expect(screen.getByLabelText(/Choose date/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Choose time/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Number of guests/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Occasion/i)).toBeInTheDocument();
    expect(screen.getByText(/Make Your reservation/i)).toBeInTheDocument();
  });

  test('handles date change and dispatches the correct action', () => {
    render(<BookingForm availableTimes={["17:00", "18:00"]} dispatch={mockDispatch} />);

    const dateInput = screen.getByLabelText(/Choose date/i);
    fireEvent.change(dateInput, { target: { value: '2024-10-01' } });

    // Assert that the dispatch function was called with the right action
    expect(mockDispatch).toHaveBeenCalledWith({ type: 'UPDATE_TIMES', payload: '2024-10-01' });
  });

  test('handles form submission correctly', () => {
    render(<BookingForm availableTimes={["17:00", "18:00"]} dispatch={mockDispatch} />);

    // Set up form values
    const dateInput = screen.getByLabelText(/Choose date/i);
    const timeSelect = screen.getByLabelText(/Choose time/i);
    const guestsInput = screen.getByLabelText(/Number of guests/i);
    const occasionSelect = screen.getByLabelText(/Occasion/i);

    // Simulate user interactions
    fireEvent.change(dateInput, { target: { value: '2024-10-01' } });
    fireEvent.change(timeSelect, { target: { value: '17:00' } });
    fireEvent.change(guestsInput, { target: { value: '3' } });
    fireEvent.change(occasionSelect, { target: { value: 'Birthday' } });

    // Submit the form
    const submitButton = screen.getByText(/Make Your reservation/i);
    fireEvent.click(submitButton);

    // Expect that form submission would log the data (in real-world testing you would mock and check submit behavior)
    expect(console.log).toHaveBeenCalledWith({
      resDate: '2024-10-01',
      resTime: '17:00',
      guests: '3',
      occasion: 'Birthday',
    });
  });

});


test('initializeTimes returns the correct initial times', () => {
  const times = initializeTimes();
  expect(times).toEqual(["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"]);
});

test('updateTimes returns the same state when called', () => {
  const initialState = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  const action = { type: 'UPDATE_TIMES', payload: "2023-09-29" }; // Mock action
  
  const newState = updateTimes(initialState, action);
  expect(newState).toEqual(initialState);
});