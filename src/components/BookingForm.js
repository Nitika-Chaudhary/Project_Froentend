import React from 'react'
import { useState, useEffect, useReducer } from 'react'

const BookingForm = ({timesReducer, updateTimes, initializeTimes, submitForm}) => {
    const[resDate, setResDate]= useState("");
    const[resTime, setResTime] = useState("");
    const[guests, setGuests]= useState(1);
    const[occasion, setOccasion]= useState("");

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
}

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


  return (
<>
      <form onSubmit={handleSubmit} style={{ display: "grid", maxWidth: "200px", gap: "20px" }}>
        <fieldset>

   <label htmlFor="res-date">Choose date</label>
   <input type="date"
   id="res-date"
   value={resDate}
   onChange={handleDateChange} />

<label htmlFor="res-time">Choose time</label>
          <select
            id="res-time"
            value={resTime}
            onChange={(e) => setResTime(e.target.value)}
            required
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

   <label htmlFor="guests">Number of guests</label>
   <input type="number" id="guests" value={guests} min="1" max="10" onChange={(e)=> setGuests(e.target.value)} />

   <label htmlFor="occasion">Occasion</label>
   <select id="occasion" value={occasion} onChange={(e) => setOccasion(e.target.value)}>
      <option>Birthday</option>
      <option>Anniversary</option>
   </select>

   <input type="submit" value="Make Your reservation"/>
   </fieldset>
</form>
</>
  )
}

export default BookingForm;
