import { getProperties } from '@/lib/sanity';
import PropertyCard from '@/components/PropertyCard';

export const revalidate = 60; // Revalidate every 60 seconds

export default async function Home() {
  const properties = await getProperties();
  console.log(properties)

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Available Properties
        </h1>
        
        {properties.length === 0 ? (
          <p className="text-center text-gray-500">No properties available at the moment.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
