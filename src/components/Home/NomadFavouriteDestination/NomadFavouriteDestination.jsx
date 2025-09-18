import React, { useEffect, useState } from 'react';
import destinationsData from './NomadFavouriteDestinations.json'

const NomadFavouriteDestination = () => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        setDestinations(destinationsData);
    }, []);

    return (
        <section className="px-5 md:px-10 lg:px-20 py-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Nomads’ Favourite Destinations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {destinations.map((item) => (
                    <div
                        key={item.id}
                        className="rounded-xl transition flex flex-col"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-lg text-start font-semibold mb-2">{item.title}</h3>
                        <p className="text-blue-600 text-start text-sm">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default NomadFavouriteDestination;