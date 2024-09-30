import React from 'react'
import { useState } from 'react'

const BookingForm = () => {
    const[resDate, setResDate]= useState("");
    const[resTime, setResTime] = useState("");
    const[guests, setGuests]= useState(1);
    const[occasion, setOccasion]= useState("");

    const [availableTimes, setAvailableTimes] = useState([
      "17:00",
      "18:00",
      "19:00",
      "20:00",
      "21:00",
      "22:00",
    ]);

const handleSubmit = (e)=>{
    e.preventDefault();
    console.log({ resDate, resTime, guests, occasion });
}

  return (
<>
      <form onSubmit={handleSubmit} style={{ display: "grid", maxWidth: "200px", gap: "20px" }}>
        <fieldset>

   <label htmlFor="res-date">Choose date</label>
   <input type="date"
   id="res-date"
   value={resDate}
   onChange={(e)=>setResDate(e.target.value)} />

   <label htmlFor="res-time">Choose time</label>
   <select id="res-time" value={resTime}  onChange={(e)=> setResTime(e.target.value)}>
    {availableTimes.map((time)=>(
        <option key={time} value={time}>
            {time}
        </option>
    ))}
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
