/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const BarberServices = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedService, setSelectedService] = useState(null);
  const [selectedBarber, setSelectedBarber] = useState(null);
  const [selectedServices, setSelectedServices] = useState([]);
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [emailReminder, setEmailReminder] = useState(false);

  const categories = [
    { id: 1, name: 'Haircuts' },
    { id: 2, name: 'Beard Services' },
  ];

  const services = {
    Haircuts: [
      {
        id: 1,
        name: 'Classic Haircut',
        price: 30,
        duration: '30 min',
        description: 'Traditional haircut including neck trim and styling.',
      },
      {
        id: 2,
        name: 'Fade Haircut',
        price: 35,
        duration: '30 min',
        description: 'Stylish fade haircut tailored to your preferences.',
      },
    ],
    'Beard Services': [
      {
        id: 3,
        name: 'Beard Trim & Shape',
        price: 25,
        duration: '20 min',
        description: 'Expert beard grooming service including shape design.',
      },
      {
        id: 4,
        name: 'Beard Styling',
        price: 20,
        duration: '15 min',
        description: 'Stylish beard styling for a polished look.',
      },
    ],
  };

  const barbers = [
    { id: 1, name: 'John Doe', experience: '5 years', specialization: 'Haircuts' },
    { id: 2, name: 'Jane Smith', experience: '3 years', specialization: 'Beard Services' },
  ];

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedService(null); // Reset service when category changes
  };

  const handleBookClick = (service) => {
    setSelectedService(service);
    setIsModalOpen(true);
  };

  const handleAddService = () => {
    if (selectedService && selectedBarber) {
      setSelectedServices([...selectedServices, { ...selectedService, barber: selectedBarber }]);
      setSelectedService(null);
      setSelectedBarber(null);
      setDate('');
      setTime('');
    }
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedService(null);
    setSelectedBarber(null);
    setSelectedServices([]);
    setDate('');
    setTime('');
  };

  const handleConfirmBooking = () => {
    // Handle confirmation logic, e.g., API call
    alert('Booking confirmed!');
    handleModalClose();
  };

  return (
    <div className="mt-[30px]">
      <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">Available Services ✂️</h3>

      <div className="mt-[30px]">
        <h4 className="text-[18px] font-semibold">Select Service Category:</h4>
        <div className="flex gap-3 mb-5">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.name)}
              className={`py-2 px-4 rounded ${selectedCategory === category.name ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {selectedCategory && (
          <>
            <h4 className="text-[18px] font-semibold">Select a Service:</h4>
            <div className="grid gap-5 mb-5">
              {services[selectedCategory].map(service => (
                <div 
                  key={service.id} 
                  className="p-4 rounded-md border border-solid border-[#0066ff34] hover:shadow-md transition-all"
                >
                  <h4 className="text-[18px] leading-7 font-semibold text-headingColor">{service.name}</h4>
                  <p className="text-[14px] leading-6 font-[400] text-textColor mt-2">{service.description}</p>
                  <span className="text-[14px] leading-6 font-[400] text-textColor flex items-center gap-2">⏱️ {service.duration}</span>
                  <span className="text-[16px] leading-7 lg:text-[18px] lg:leading-8 font-bold text-headingColor">${service.price}</span>
                  <button 
                    onClick={() => handleBookClick(service)}
                    className="bg-primaryColor py-2 px-4 text-white text-[14px] leading-6 font-[600] rounded-md hover:bg-irisBlueColor transition-all mt-2"
                  >
                    Book Now
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-80 shadow-lg">
            <h2 className="text-xl font-bold mb-4">Booking Details</h2>

            {selectedServices.length > 0 && (
              <div className="mb-4">
                <h3 className="text-lg font-semibold">Selected Services:</h3>
                <ul className="list-disc ml-5 mt-2">
                  {selectedServices.map((service, index) => (
                    <li key={index} className="text-sm">
                      {service.name} (by {service.barber.name}) - ${service.price}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <label className="block mb-2">Select Barber:</label>
            <select
              onChange={(e) => setSelectedBarber(barbers.find(barber => barber.id === parseInt(e.target.value)))}
              className="border p-2 rounded w-full mb-3"
            >
              <option value="">Select Barber</option>
              {barbers.map(barber => (
                <option key={barber.id} value={barber.id}>
                  {barber.name} ({barber.specialization}) - {barber.experience}
                </option>
              ))}
            </select>

            <label className="block mb-2">Select Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />

            <label className="block mb-2">Select Time:</label>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="border p-2 rounded w-full mb-3"
            />

            <label className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={emailReminder}
                onChange={() => setEmailReminder(!emailReminder)}
                className="mr-2"
              />
              Send me a reminder via email/SMS
            </label>

            <button 
              onClick={handleAddService}
              className="bg-secondaryColor py-2 px-4 text-white rounded-md w-full mt-3"
            >
              Add Another Service
            </button>

            <button 
              onClick={handleConfirmBooking}
              className="bg-primaryColor py-2 px-4 text-white rounded-md w-full mt-3"
            >
              Confirm Booking
            </button>

            <button 
              onClick={handleModalClose}
              className="bg-gray-300 py-2 px-4 text-black rounded-md w-full mt-3"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BarberServices;
