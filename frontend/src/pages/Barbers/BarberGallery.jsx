import React, { useState } from 'react';
import classicFade from '../../assets/images/classicFade.jpg';
import beardTrimming from '../../assets/images/beardTrimming.jpg';

const BarberGallery = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const images = [
    {
      id: 1,
      url: classicFade,
      caption: 'Classic Fade Haircut',
    },
    {
      id: 2,
      url: beardTrimming,
      caption: 'Beard Trimming',
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="mt-10 mx-auto max-w-4xl">
      <h3 className="text-2xl font-bold text-center text-headingColor mb-6">
        Barber Shop Gallery
      </h3>

      <div className="relative w-full h-[350px] bg-gray-100 rounded-lg shadow-lg overflow-hidden">
        {/* Main Image */}
        <div className="relative w-full h-full transition-all duration-300 ease-in-out">
          <img
            src={images[currentIndex].url}
            alt={images[currentIndex].caption}
            className="w-full h-full object-contain transition-transform duration-500 ease-in-out transform hover:scale-105"
          />

          {/* Caption */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-3 text-center">
            <p className="text-lg font-semibold">{images[currentIndex].caption}</p>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-opacity-80 transition-colors"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-5 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 text-white w-12 h-12 rounded-full flex items-center justify-center hover:bg-opacity-80 transition-colors"
          >
            →
          </button>
        </div>

        {/* Dots Navigation */}
        <div className="absolute bottom-5 left-0 right-0 flex justify-center gap-3">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-primaryColor w-4 h-4'
                  : 'bg-white bg-opacity-50 hover:bg-opacity-80'
              }`}
            ></button>
          ))}
        </div>
      </div>

      {/* Thumbnail Strip */}
      <div className="mt-6 flex justify-center gap-4 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => goToSlide(index)}
            className={`flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-transform transform hover:scale-105 ${
              index === currentIndex
                ? 'border-primaryColor'
                : 'border-gray-300 hover:border-gray-400'
            }`}
          >
            <img
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default BarberGallery;
