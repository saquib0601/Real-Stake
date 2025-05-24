import Image from 'next/image';

export default function PropertyPopup({ property, onClose }) {
  const handleWhatsAppClick = () => {
    const message = `Hello, I'm interested in the property: ${property.title}`;
    const whatsappUrl = `https://wa.me/${'7992271691'}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="relative h-64 w-full">
          <Image
             src={property?.images?.[0]?.url || '/images/placeholder-property.jpg'}
             alt={property.title}
            fill
            className="object-cover rounded-t-lg"
          />
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-white rounded-full p-2 shadow-md hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">{property.title}</h2>
          <p className="text-3xl font-bold text-blue-600 mb-4">
            ${property.price.toLocaleString()}
          </p>
          <p className="text-gray-600 mb-6">{property.description}</p>

          {property.features && property.features.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Features</h3>
              <ul className="grid grid-cols-2 gap-2">
                {property.features.map((feature, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {property.images && property.images.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">Additional Images</h3>
              <div className="grid grid-cols-3 gap-2">
                {property.images.map((image, index) => (
                  <div key={index} className="relative h-24">
                    <Image
                      src={image.url}
                      alt={`Property image ${index + 1}`}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          <button
            onClick={handleWhatsAppClick}
            className="w-full bg-green-500 text-white py-3 px-6 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition-colors"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
            </svg>
            Contact on WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
} 