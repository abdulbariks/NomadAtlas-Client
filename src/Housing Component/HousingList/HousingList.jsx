import React, { useEffect, useState } from "react";
import destinations from "../../pages/Destination/Destination.json";
import BookingModal from "../BookingModel/BookingModel";
import PropertyCard from "../PropertyCard/PropertyCard";
import FilterBar from "../FilterBar/FilterBar";

export default function HousingList() {
  const [filters, setFilters] = useState({});
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      try {
        let items = [...destinations]; // ✅ Copy all destinations first

        // ✅ Filtering logic
        if (filters.q && filters.q.trim() !== "") {
          items = items.filter((i) =>
            (i.title + " " + i.name + " " + i.country)
              .toLowerCase()
              .includes(filters.q.toLowerCase())
          );
        }

        if (filters.type && filters.type !== "All") {
          items = items.filter(
            (i) =>
              i.type &&
              i.type.toLowerCase() === filters.type.toLowerCase()
          );
        }

        if (filters.priceRange && filters.priceRange !== "All") {
          items = items.filter((i) => i.priceRange === filters.priceRange);
        }

        if (filters.maxPrice && filters.maxPrice > 0) {
          items = items.filter(
            (i) => i.pricePerMonth <= Number(filters.maxPrice)
          );
        }

        // ✅ Always limit to 8 results — even after filters
        items = items.slice(0, 8);

        if (mounted) setList(items);
      } catch (err) {
        console.error(err);
        if (mounted) setMessage("Failed to load destinations");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => (mounted = false);
  }, [filters]);

  // ✅ Booking Handlers
  const openBooking = (item) => setSelected(item);
  const closeBooking = () => setSelected(null);

  const handleBook = async (form) => {
    if (!selected) return;
    setMessage("Sending booking request...");
    try {
      console.log("Booking (local):", selected.id, form);
      setMessage("Booking request sent successfully!");
      setTimeout(() => setMessage(""), 2000);
      closeBooking();
    } catch (err) {
      console.error(err);
      setMessage(err.message || "Booking failed");
    }
  };

  return (
    <div className="mx-5 md:mx-10 lg:mx-20 my-12 px-3 py-6 rounded-md">
      {/* 🔹 Heading Section */}
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-800">
          Find Destination
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore handpicked destinations perfect for digital nomads, remote
          workers, and travelers. Filter by price, housing type, and amenities
          to find your next ideal stay around the world.
        </p>
      </div>

      {/* 🔹 Filter Bar */}
      <FilterBar filters={filters} setFilters={setFilters} />

      {message && <div className="mb-4 alert alert-info">{message}</div>}

      {/* 🔹 Grid Section */}
      {loading ? (
        <div className="text-center py-20">Loading...</div>
      ) : list.length > 0 ? (
        // ✅ 4 cards per row, only 8 cards total
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {list.slice(0, 8).map((item) => (
            <PropertyCard
              key={item.id}
              item={{
                ...item,
                pricePerMonth:
                  item.pricePerMonth || item.price || item.discountPrice,
              }}
              onOpenBooking={openBooking}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-600">
          No destinations found.
        </div>
      )}

      {/* 🔹 Booking Modal */}
      {selected && (
        <BookingModal
          housing={selected}
          onClose={closeBooking}
          onBook={handleBook}
        />
      )}
    </div>
  );
}
