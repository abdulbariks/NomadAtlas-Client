const localServicesData = {
  visaRequirements: [
    {
      id: 1,
      country: "Thailand",
      visaType: "Digital Nomad Visa",
      duration: "1 Year",
      requirements:
        "Proof of income ($2,000/month), remote job, valid health insurance",
      updated: "2025-05-10",
    },
    {
      id: 2,
      country: "Portugal",
      visaType: "Temporary Stay Visa",
      duration: "1 Year (extendable)",
      requirements:
        "Remote work proof, criminal record clearance, income over €3,000/month",
      updated: "2025-03-22",
    },
    {
      id: 3,
      country: "Indonesia (Bali)",
      visaType: "Remote Work Visa",
      duration: "6 Months",
      requirements:
        "Proof of income ($2,500/month), valid return ticket, health insurance",
      updated: "2025-04-15",
    },
  ],

  simCardsInternet: [
    {
      id: 1,
      country: "Thailand",
      provider: "AIS",
      plan: "10GB for $5",
      coverage: "Nationwide 4G/5G",
      purchase: "Airport booths, 7-Eleven stores",
    },
    {
      id: 2,
      country: "Vietnam",
      provider: "Viettel",
      plan: "8GB for $3",
      coverage: "Excellent city coverage",
      purchase: "Convenience stores or Viettel shops",
    },
    {
      id: 3,
      country: "Portugal",
      provider: "Vodafone",
      plan: "15GB for €10",
      coverage: "Strong 4G/5G across major cities",
      purchase: "Kiosks, airports, or Vodafone stores",
    },
  ],

  healthcareEmergency: [
    {
      id: 1,
      name: "Bangkok Hospital",
      type: "Hospital",
      contact: "+66 2 310 3000",
      address: "Bangkok, Thailand",
      emergencyNumber: "1669",
    },
    {
      id: 2,
      name: "Lisbon Medical Center",
      type: "Clinic",
      contact: "+351 21 222 3333",
      address: "Lisbon, Portugal",
      emergencyNumber: "112",
    },
    {
      id: 3,
      name: "Bali International Clinic",
      type: "Clinic",
      contact: "+62 361 789 123",
      address: "Denpasar, Bali",
      emergencyNumber: "118",
    },
  ],

  transportation: [
    {
      id: 1,
      country: "Thailand",
      type: "Ride-sharing",
      apps: ["Grab", "Bolt"],
      tip: "Use Grab for airport rides; cheaper than taxis.",
    },
    {
      id: 2,
      country: "Portugal",
      type: "Public Transport",
      details: "Metro, trams, and buses available via 'Viva Viagem' card.",
      tip: "Buy rechargeable travel cards for discounts.",
    },
    {
      id: 3,
      country: "Vietnam",
      type: "Bike Rentals",
      details: "Scooter rentals widely available with daily or weekly plans.",
      tip: "Always wear a helmet and keep an international driving permit.",
    },
  ],
};

export default localServicesData;
