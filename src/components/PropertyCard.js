'use client'
import Image from 'next/image';
import { useState } from 'react';
import PropertyPopup from './PropertyPopup';

export default function PropertyCard({ property }) {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-300"
        onClick={() => setIsPopupOpen(true)}
      >
        <div className="relative h-48 w-full">
          <Image
            src={property?.images?.[0]?.url || '/images/placeholder-property.jpg'}
            alt={property?.title || 'Property image'}
            fill
            className="object-cover"
            
          />
        </div>
        <div className="p-4">
          <h3 className="text-xl font-semibold mb-2">{property.title}</h3>
          <p className="text-gray-600 mb-2 line-clamp-2">{property.description}</p>
          <p className="text-lg font-bold text-blue-600">${property.price.toLocaleString()}</p>
        </div>
      </div>

      {isPopupOpen && (
        <PropertyPopup 
          property={property} 
          onClose={() => setIsPopupOpen(false)} 
        />
      )}
    </>
  );
} 