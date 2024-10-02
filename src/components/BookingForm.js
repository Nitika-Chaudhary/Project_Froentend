import React from 'react'
import { useState, useEffect, useReducer } from 'react'

const BookingForm = ({timesReducer, updateTimes, initializeTimes, submitForm}) => {
    const[resDate, setResDate]= useState("");
    const[resTime, setResTime] = useState("");
    const[guests, setGuests]= useState(1);
    const[occasion, setOccasion]= useState("");
    const [isFormValid, setIsFormValid] = useState(false);

    // Initialize availableTimes using useReducer
    const [availableTimes, dispatch] = useReducer(timesReducer, []);

    // Initialize the times on component mount
    useEffect(() => {
        const initTimes = async () => {
            const action = await initializeTimes();
            dispatch(action);
        };
        initTimes();
    }, [initializeTimes]);


const handleSubmit = (e)=>{
    e.preventDefault();
    console.log({ resDate, resTime, guests, occasion });
    const formData = {
      resDate,
      resTime,
      guests,
      occasion
    };
    submitForm(formData);
};

// const handleDateChange = (e) => {
//   setResDate(e.target.value);
//   dispatch({ type: 'UPDATE_TIMES', payload: e.target.value }); 
// };

const handleDateChange = async (e) => {
  const selectedDate = e.target.value;
  setResDate(selectedDate);
  // Fetch available times based on the selected date
  const action = await updateTimes(selectedDate);
  dispatch(action);
};

  // Client-side validation to check form validity
  useEffect(() => {
    // Check if all required fields are filled and valid
    const isValid =
      resDate &&
      resTime &&
      guests >= 1 &&
      guests <= 10 &&
      occasion;
    setIsFormValid(isValid);
  }, [resDate, resTime, guests, occasion]);

  return (
<>
      <form onSubmit={handleSubmit} style={styles.form} aria-label="Booking Form">
        <fieldset  style={styles.fieldset}>
        <legend style={styles.legend}>Make Your Reservation</legend>
   <label htmlFor="res-date" style={styles.label}>Choose date</label>
   <input type="date"
   id="res-date"
   value={resDate}
   onChange={handleDateChange} required />

<label htmlFor="res-time" style={styles.label}>Choose time</label>
          <select
            id="res-time"
            value={resTime}
            onChange={(e) => setResTime(e.target.value)}
            required  aria-label="Reservation Time"
          >
            {availableTimes.length > 0 ? (
              availableTimes.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))
            ) : (
              <option value="">No available times</option>
            )}
          </select>

   <label htmlFor="guests" style={styles.label}>Number of guests</label>
   <input type="number" id="guests" value={guests} min="1" max="10"
    onChange={(e)=> setGuests(e.target.value)} 
    required   aria-label="Number of Guests"/>

   <label htmlFor="occasion" style={styles.label}>Occasion</label>
   <select id="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)}
    required
    aria-label="Occasion">
      <option>Birthday</option>
      <option>Anniversary</option>
   </select>

   <button type="submit" aria-label="Make Your reservation" disabled={!isFormValid}  style={styles.button}>
   Make Your Reservation
   </button>
   </fieldset>
</form>
</>
  )
}

const styles = {
  
  form: {
    display: 'flex',
    justifyContent:"centre",
    alignItems:'centre',
    flexDirection: 'column',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
    width: '400px',
    margin:'auto'

  },
  fieldset: {
    border: 'none',
    display: 'flex',
    justifyContent:"centre",
    flexDirection: 'column',
    gap: '20px',
  },
  legend: {
    fontSize: '1.5rem',
    marginBottom: '10px',
    textAlign: 'center',
    color: '#333',
  },
  label: {
    fontSize: '1rem',
    marginBottom: '5px',
    color: '#555',
  },
  input: {
    padding: '10px',
    fontSize: '1rem',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  button: {
    padding: '10px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};


export default BookingForm;
