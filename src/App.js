
import './App.css';
import { useReducer} from 'react';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';
import Header from './components/Header';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Home from './components/Home';
import Menu from './components/Menu';
import Signup from './components/Signup';
import ConfirmedBooking from './components/ConfirmedBooking';
import { submitAPI } from './Api'; 

// Reducer function to manage available times state
const timesReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE_TIMES':
      return action.payload;
    case 'UPDATE_TIMES':
      return action.payload;
    default:
      return state;
  }
};

// Fetch data from API
const fetchData = async (date) => {
  const response = await fetch(`/api/availableTimes?date=${date}`);
  const data = await response.json();
  return data;
};

// Initialize times (returns action)
const initializeTimes = async () => {
  const today = new Date().toISOString().split('T')[0]; // Format date as YYYY-MM-DD
  // const times = await fetchData(today);
   const times = ["17:00", "18:00", "19:00", "20:00", "21:00", "22:00"];
  return { type: 'INITIALIZE_TIMES', payload: times };
};

// const updateTimes = (state, action) => {
//   switch (action.type) {
//     case 'UPDATE_TIMES':
//       return initializeTimes(); 
//     default:
//       return state;
//   }
// };

const updateTimes = async (selectedDate) => {
  const times = await fetchData(selectedDate);
  return { type: 'UPDATE_TIMES', payload: times };
};


function App() {

  const [availableTimes, dispatch] = useReducer(updateTimes, initializeTimes());

  const navigate = useNavigate();
  // Submit form function
  const submitForm = async (formData) => {
    const isSubmitted = await submitAPI(formData);
    
    if (isSubmitted) {
      // Navigate to the confirmation page if the API call is successful
      navigate('/confirmed');
    } else {
      // Handle submission failure (optional)
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <>
    <Header/>
    <div>
        <nav>
          <ul>
            <li> <img src='./assets/images/little-logo.jpg' alt='logo'/></li>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/menu">Menu</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/menu" element={<Menu/>}></Route>
          <Route path="/signup" element={<Signup/>}></Route>
          <Route path="/confirmed" element={<ConfirmedBooking />} />
        </Routes>
      </div>
   <BookingForm submitForm={submitForm} availableTimes={availableTimes}
    dispatch={dispatch}  timesReducer={timesReducer} 
    updateTimes={updateTimes} initializeTimes={initializeTimes}/>
    <Footer/>
    
    </>
  );
}

export default App;
