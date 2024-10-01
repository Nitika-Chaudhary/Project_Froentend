import React from 'react'

export const submitAPI = (formData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Form submitted:', formData);
        resolve(true); // Simulates a successful submission
      }, 1000);
    });
  };
