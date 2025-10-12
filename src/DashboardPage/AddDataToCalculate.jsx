import React, { useState } from "react";

const API_URL = "https://nomad-atlas-server-pi.vercel.app/cost-calculator";

const AddDataToCalculate = () => {
  // tab management
  const [active, setActive] = useState("list");

  //   data from api
  const [countries, setCountries] = useState([]);

  // loading & messages
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  // serach
  const [searchTerm, setSearchTerm] = useState("");

  //form data
  const [country, setCountry] = useState("");
  const [cities, setCities] = useState({
    name: "",
    livingCost: "",
    luxuryScroe: "",
  });

  // Edit mode
  const [editMode, setEditMode] = useState(false);
  const [editingId, setEditingId] = useState(null);

  // Delete confirmation
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <h1>Hello i am data for add and delete and check city.</h1>
    </div>
  );
};

export default AddDataToCalculate;
