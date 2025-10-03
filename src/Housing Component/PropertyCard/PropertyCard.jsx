import React, { useState } from 'react';
import { motion } from 'framer-motion';

function Carousel({ images = [] }) {
  const [i, setI] = useState(0);
  if (!images.length) return <img src="https://via.placeholder.com/600x400?text=No+Image" alt="no" className="w-full h-48 object-cover" />;

  const prev = () => setI(p => (p - 1 + images.length) % images.length);
  const next = () => setI(p => (p + 1) % images.length);

  return (
    <div className="relative h-48">
      <img src={images[i]} alt={`img-${i}`} className="w-full h-full object-cover rounded-t-md" />
      {images.length > 1 && (
        <>
          <button onClick={prev} className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-sm carousel-arrow">‹</button>
          <button onClick={next} className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-sm carousel-arrow">›</button>
        </>
      )}
    </div>
  );
}

export default function PropertyCard({ item, onOpenBooking }) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} className="card bg-white shadow-sm rounded-md overflow-hidden">
      <Carousel images={item.images || []} />
      <div className="p-4">
        <div className="flex justify-between">
          <div>
            <h4 className="font-semibold">{item.title}</h4>
            <p className="text-xs text-gray-500">{item.city} • {item.type}</p>
          </div>
          <div className="text-right">
            <div className="text-sm">Per month</div>
            <div className="font-bold">${item.pricePerMonth ?? '—'}</div>
            <div className="text-xs text-gray-500">{item.priceRange || ''}</div>
          </div>
        </div>

        <div className="mt-3 flex gap-2 flex-wrap">
          {item.amenities?.wifi && <span className="badge badge-sm">WiFi</span>}
          {item.amenities?.kitchen && <span className="badge badge-sm">Kitchen</span>}
          {item.amenities?.ac && <span className="badge badge-sm">AC</span>}
          {item.amenities?.workspace && <span className="badge badge-sm">Workspace</span>}
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-600 line-clamp-2">{item.description || ''}</div>
          <div className="flex gap-2">
            {item.bookingLink ? (
              <a href={item.bookingLink} target="_blank" rel="noreferrer" className="bg-blue-200 p-1 rounded-md">Book</a>
            ) : (
              <button onClick={() => onOpenBooking(item)} className=" bg-blue-200 p-1 rounded-md ">Request</button>
            )}
            <button className="btn bg-blue-400 rounded-md p-1">Details</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
