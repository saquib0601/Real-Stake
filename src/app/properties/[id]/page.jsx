'use client'

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { getPropertyBySlug } from '@/lib/sanity';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './carousel.module.scss';

function PropertyImageCarousel({ images, property }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [mainViewportRef, mainEmbla] = useEmblaCarousel({ loop: true });
  const [thumbViewportRef, thumbEmbla] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  });

  const onThumbClick = useCallback(
    (index) => {
      if (!mainEmbla || !thumbEmbla) return;
      mainEmbla.scrollTo(index);
    },
    [mainEmbla, thumbEmbla]
  );

  const onSelect = useCallback(() => {
    if (!mainEmbla || !thumbEmbla) return;
    setSelectedIndex(mainEmbla.selectedScrollSnap());
    thumbEmbla.scrollTo(mainEmbla.selectedScrollSnap());
  }, [mainEmbla, thumbEmbla, setSelectedIndex]);

  useEffect(() => {
    if (!mainEmbla) return;
    onSelect();
    mainEmbla.on('select', onSelect);
  }, [mainEmbla, onSelect]);

  return (
    <div className="space-y-4">
      <div className="relative h-[300px] sm:h-[400px] w-full rounded-2xl overflow-hidden">
        <div className={styles.embla} ref={mainViewportRef}>
          <div className={styles.embla__container}>
            {images.map((image, index) => (
              <div key={index} className={styles.embla__slide}>
                <Image
                  src={image.url}
                  alt={image.alt || 'Property image'}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end p-4 sm:p-8">
          <div className="text-white">
            <div className="flex flex-wrap gap-2 sm:gap-4 mb-2 sm:mb-4">
              {property?.status && (
                <span className="bg-green-700 text-white text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full font-semibold">
                  {property?.status}
                </span>
              )}
              {property.type && (
                <span className={`text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full font-semibold ${
                  property.type === 'high-yield' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {property?.type}
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-4xl font-bold mb-1 sm:mb-2">{property.propertyName}</h1>
            <p className="text-base sm:text-lg">{property.location}</p>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className={styles['embla-thumbs']} ref={thumbViewportRef}>
        <div className={styles['embla-thumbs__container']}>
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => onThumbClick(index)}
              className={`${styles['embla-thumbs__slide']} ${
                index === selectedIndex ? styles.selected : ''
              }`}
            >
              <Image
                src={image.url}
                alt={image.alt || 'Property thumbnail'}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PropertyDetail() {
  const params = useParams();
  const router = useRouter();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log(params.id);
    const fetchProperty = async () => {
      try {
        const data = await getPropertyBySlug(params.id);
        console.log(data);
        if (!data) {
          setError('Property not found');
          return;
        }
        setProperty(data);
      } catch (err) {
        setError('Failed to fetch property details');
        console.error('Error fetching property:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperty();
  }, [params.id]);

  const handleWhatsAppEnquiry = () => {
    // Format the message with property details
    const message = `Hello, I'm interested in the property:\n\n` +
      `Property: ${property.propertyName}\n` +
      `Location: ${property.location}\n` +
      `Price: AED ${property.price.toLocaleString()}\n\n` +
      `Could you please provide more information?`;
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // WhatsApp business number - replace with your actual business number
    const whatsappNumber = '7992271691'; // Replace with your actual WhatsApp number
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappUrl, '_blank');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-8">
        <div className="text-center text-red-500">
          <p>{error || 'Property not found'}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4 sm:mb-6 transition-colors text-sm sm:text-base"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z"
            clipRule="evenodd"
          />
        </svg>
        Back to Properties
      </button>

      {/* Hero Section */}
      <PropertyImageCarousel images={property.images} property={property} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 mb-4 sm:mb-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">Property Description</h2>
            <p className="text-gray-600 text-sm sm:text-base mb-4 sm:mb-6">{property.description}</p>
            
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4">Features</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
              {property.features.map((feature, index) => (
                <div key={index} className="flex items-center gap-2 text-sm sm:text-base">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Investment Details Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6 lg:sticky lg:top-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">Investment Details</h2>
            
            <div className="space-y-4 sm:space-y-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-600 text-sm sm:text-base">Property Price</span>
                  <span className="text-lg sm:text-xl font-bold text-green-600">AED {property.price.toLocaleString()}</span>
                </div>
                <div className="w-full h-2 bg-gray-100 rounded-full">
                  <div
                    className="h-2 bg-green-400 rounded-full transition-all duration-500"
                    style={{ width: `${property.funded}%` }}
                  />
                </div>
                <span className="text-xs sm:text-sm text-gray-500 mt-1 block">{property.funded}% funded</span>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Minimum Investment</span>
                  <span className="font-semibold">{property.investmentDetails.minimumInvestment}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Target Return</span>
                  <span className="font-semibold">{property.investmentDetails.targetReturn}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Projected Rental Yield</span>
                  <span className="font-semibold">{property.investmentDetails.projectedRentalYield}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Investment Period</span>
                  <span className="font-semibold">{property.investmentDetails.investmentPeriod}</span>
                </div>
                <div className="flex justify-between text-sm sm:text-base">
                  <span className="text-gray-600">Expected ROI</span>
                  <span className="font-semibold">{property.investmentDetails.expectedROI}</span>
                </div>
              </div>

              <button 
                onClick={handleWhatsAppEnquiry}
                className="w-full bg-green-600 text-white py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors text-sm sm:text-base"
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 