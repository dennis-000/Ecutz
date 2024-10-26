import React from 'react';

const BarberServices = () => {
  const services = [
    {
      id: 1,
      name: "Classic Haircut",
      price: 30,
      duration: "30 min",
      description: "Traditional haircut including neck trim and styling for a clean, professional look"
    },
    {
      id: 2,
      name: "Beard Trim & Shape",
      price: 25,
      duration: "20 min",
      description: "Expert beard grooming service including shape design and precise trimming"
    },
    {
      id: 3,
      name: "Hot Towel Shave",
      price: 35,
      duration: "40 min",
      description: "Premium straight razor shave with hot towel treatment for ultimate relaxation"
    },
    {
      id: 4,
      name: "Haircut & Beard Combo",
      price: 50,
      duration: "50 min",
      description: "Complete grooming package combining our classic haircut with beard trim service"
    },
    {
      id: 5,
      name: "Kids Haircut",
      price: 20,
      duration: "20 min",
      description: "Gentle and patient haircut service specially designed for children under 12"
    }
  ];

  return (
    <div className="mt-[30px]">
      <h3 className="text-[20px] leading-[30px] text-headingColor font-semibold">
        Available Services ✂️
      </h3>

      <div className="mt-[30px] grid gap-5">
        {services.map((service) => (
          <div 
            key={service.id} 
            className="p-4 rounded-md border border-solid border-[#0066ff34] hover:shadow-md transition-all"
          >
            <div className="flex items-center justify-between flex-wrap">
              <div className="flex-1">
                <h4 className="text-[18px] leading-7 font-semibold text-headingColor">
                  {service.name}
                </h4>
                <p className="text-[14px] leading-6 font-[400] text-textColor mt-2">
                  {service.description}
                </p>
                <span className="text-[14px] leading-6 font-[400] text-textColor flex items-center gap-2">
                  ⏱️ {service.duration}
                </span>
              </div>
              
              <div className="flex flex-col items-end gap-3">
                <span className="text-[16px] leading-7 lg:text-[18px] lg:leading-8 font-bold text-headingColor">
                  ${service.price}
                </span>
                <button 
                  className="bg-primaryColor py-2 px-4 text-white text-[14px] leading-6 font-[600] 
                    rounded-md hover:bg-irisBlueColor transition-all"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BarberServices;