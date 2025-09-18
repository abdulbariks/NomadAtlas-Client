import React, { useEffect, useState } from 'react';
import destinationsData from "./PopularDestination.json";

const PopularDestination = () => {
    const [destinations, setDestinations] = useState([]);

    useEffect(() => {
        setDestinations(destinationsData);
    }, []);
    return (
        <section className="px-5 md:px-10 lg:px-20 py-10">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
                Popular Destinations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {destinations.map((item) => (
                    <div
                        key={item.id}
                        className="bg-white rounded-xl shadow-md hover:shadow-lg transition p-4 flex flex-col items-center text-center"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-full h-40 object-cover rounded-lg mb-4"
                        />
                        <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default PopularDestination;