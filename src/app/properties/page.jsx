'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyCard from '../../components/PropertyCard';
import { getProperties } from '@/lib/sanity';

const TABS = [
  { label: 'All Properties', value: 'all' },
  { label: 'Available', value: 'available' },
  { label: 'Fully Funded', value: 'fully-funded' },
  { label: 'Coming Soon', value: 'coming-soon' },
];

export default function PropertyPage() {
  const [activeTab, setActiveTab] = useState('all');
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const data = await getProperties();
        console.log(data);
        setProperties(data);
      } catch (err) {
        setError('Failed to fetch properties');
        console.error('Error fetching properties:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Filter properties based on active tab
  const filteredProperties = properties.filter((property) => {
    if (activeTab === 'all') return true;
    return property.status === activeTab;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-8">
        <div className="text-center text-red-500">
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 py-4 sm:py-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6">Properties</h1>
      <div className="flex flex-wrap gap-2 sm:gap-4 mb-6 sm:mb-8">
        {TABS.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-3 sm:px-6 py-2 rounded-full text-sm sm:text-base font-semibold transition-colors duration-300 focus:outline-none whitespace-nowrap ${
              activeTab === tab.value
                ? 'bg-green-200 text-green-900 shadow'
                : 'bg-white text-gray-500 border border-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <AnimatePresence>
          {filteredProperties.map((property) => (
            <motion.div
              key={property._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.4, type: 'spring' }}
            >
              <PropertyCard
                id={property._id}
                type={property.type}
                status={property.status}
                title={property.propertyName}
                location={property.location}
                price={`AED ${property.price.toLocaleString()}`}
                funded={property.funded}
                totalReturn={property.totalReturn}
                yearlyReturn={property.yearlyReturn}
                netYield={property.netYield}
                image={property.mainImage?.url || '/placeholder-property.jpg'}
                tag={property.status}
                ready={property.ready}
                rented={property.rented}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
} 