'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function PropertyCard({
  id,
  type,
  status,
  title,
  location,
  price,
  funded,
  totalReturn,
  yearlyReturn,
  netYield,
  image,
  ready,
  rented,
}) {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/properties/${id}`);
  };

  return (
    <div 
      onClick={handleClick}
      className="bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transition-all duration-300 hover:shadow-xl h-[420px] md:h-[500px] cursor-pointer"
    >
      <div className="relative h-48 w-full">
        <Image
          src={image || '/images/placeholder-property.jpg'}
          alt={title}
          fill
          className="object-cover"
        />
        {status && (
          <span className="absolute top-3 left-3 bg-green-700 text-white text-xs px-3 py-1 rounded-full font-semibold shadow">{status}</span>
        )}
        {type && (
          <span className={`absolute top-3 right-3 text-xs px-3 py-1 rounded-full font-semibold shadow ${
            type === 'High Yield' ? 'bg-blue-100 text-blue-800' : 'bg-yellow-100 text-yellow-800'
          }`}>
            {type}
          </span>
        )}
      </div>
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center text-xs text-gray-500 mb-1 space-x-2">
            <span>1</span>
            <span>| 0</span>
            <span>{ready ? 'Ready' : rented ? 'Rented' : ''}</span>
            <span>| </span>
            <span className="flex items-center gap-1">
              <span className="i-flag-uae w-4 h-4 inline-block" /> Dubai
            </span>
          </div>
          <h3 className="text-lg font-semibold mb-2 leading-tight">{title}</h3>
        </div>
        <div className="mt-2 mb-3">
          <span className="text-green-600 text-xl font-bold">{price}</span>
          <span className="ml-2 text-xs text-gray-400">{funded}% funded</span>
          <div className="w-full h-2 bg-gray-100 rounded-full mt-2">
            <div
              className="h-2 bg-green-400 rounded-full transition-all duration-500"
              style={{ width: `${funded}%` }}
            />
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-3 text-xs grid grid-cols-1 gap-1">
          <div className="flex justify-between"><span>5 year total return</span><span className="font-bold">{totalReturn}</span></div>
          <div className="flex justify-between"><span>Yearly investment return</span><span className="font-bold">{yearlyReturn}</span></div>
          <div className="flex justify-between"><span>Projected net yield</span><span className="font-bold">{netYield}</span></div>
        </div>
      </div>
    </div>
  );
} 