// TimeZoneConverter.jsx
import { useEffect, useState, useMemo } from 'react';
import { Globe, Clock } from 'lucide-react';

/**
 * Primary color (update here if needed)
 */
const PRIMARY_COLOR = '#11c3c0'; // <-- user's color

/* -------------------- Helpers -------------------- */
const TIME_ZONE_DATA = [
  { city: "New York, USA", zone: "America/New_York", offset: "UTC-5" },
  { city: "London, UK", zone: "Europe/London", offset: "UTC+0" },
  { city: "Paris, France", zone: "Europe/Paris", offset: "UTC+1" },
  { city: "Berlin, Germany", zone: "Europe/Berlin", offset: "UTC+1" },
  { city: "Dubai, UAE", zone: "Asia/Dubai", offset: "UTC+4" },
  { city: "Mumbai, India", zone: "Asia/Kolkata", offset: "UTC+5:30" },
  { city: "Dhaka, Bangladesh", zone: "Asia/Dhaka", offset: "UTC+6" },
  { city: "Singapore, SG", zone: "Asia/Singapore", offset: "UTC+8" },
  { city: "Shanghai, China", zone: "Asia/Shanghai", offset: "UTC+8" },
  { city: "Tokyo, Japan", zone: "Asia/Tokyo", offset: "UTC+9" },
  { city: "Sydney, Australia", zone: "Australia/Sydney", offset: "UTC+10" },
  { city: "Los Angeles, USA", zone: "America/Los_Angeles", offset: "UTC-8" },
  { city: "Mexico City, MX", zone: "America/Mexico_City", offset: "UTC-6" },
  { city: "São Paulo, Brazil", zone: "America/Sao_Paulo", offset: "UTC-3" },
  { city: "Johannesburg, SA", zone: "Africa/Johannesburg", offset: "UTC+2" },
  { city: "Cairo, Egypt", zone: "Africa/Cairo", offset: "UTC+2" },
  { city: "Vancouver, Canada", zone: "America/Vancouver", offset: "UTC-7" },
  { city: "Lagos, Nigeria", zone: "Africa/Lagos", offset: "UTC+1" },
  { city: "Hong Kong, HK", zone: "Asia/Hong_Kong", offset: "UTC+8" },
  { city: "Auckland, NZ", zone: "Pacific/Auckland", offset: "UTC+12" },
  { city: "Lisbon, Portugal", zone: "Europe/Lisbon", offset: "UTC+0" },
  { city: "Barcelona, Spain", zone: "Europe/Madrid", offset: "UTC+1" },
  { city: "Bangkok, Thailand", zone: "Asia/Bangkok", offset: "UTC+7" },
  { city: "Chiang Mai, Thailand", zone: "Asia/Bangkok", offset: "UTC+7" },
  { city: "Medellín, Colombia", zone: "America/Bogota", offset: "UTC-5" },
  { city: "Bali, Indonesia", zone: "Asia/Makassar", offset: "UTC+8" },
  { city: "Canggu (Bali), Indonesia", zone: "Asia/Makassar", offset: "UTC+8" },
  { city: "Porto, Portugal", zone: "Europe/Lisbon", offset: "UTC+0" },
  { city: "Buenos Aires, Argentina", zone: "America/Argentina/Buenos_Aires", offset: "UTC-3" },
  { city: "Jakarta, Indonesia", zone: "Asia/Jakarta", offset: "UTC+7" },
  { city: "Kuala Lumpur, Malaysia", zone: "Asia/Kuala_Lumpur", offset: "UTC+8" },
  { city: "Ho Chi Minh City, Vietnam", zone: "Asia/Ho_Chi_Minh", offset: "UTC+7" },
  { city: "Tbilisi, Georgia", zone: "Asia/Tbilisi", offset: "UTC+4" },
  { city: "Prague, Czech Republic", zone: "Europe/Prague", offset: "UTC+1" },
  { city: "Cape Town, South Africa", zone: "Africa/Johannesburg", offset: "UTC+2" },
  { city: "Da Nang, Vietnam", zone: "Asia/Ho_Chi_Minh", offset: "UTC+7" },
  { city: "Budapest, Hungary", zone: "Europe/Budapest", offset: "UTC+1" },
  { city: "Santiago, Chile", zone: "America/Santiago", offset: "UTC-4" },
  { city: "Istanbul, Turkey", zone: "Europe/Istanbul", offset: "UTC+3" }
];

const LOCAL_STORAGE_KEY_1 = 'tz1';
const LOCAL_STORAGE_KEY_2 = 'tz2';
const VALID_ZONES = TIME_ZONE_DATA.map(tz => tz.zone);

const getCityName = (zone) => {
  const data = TIME_ZONE_DATA.find(tz => tz.zone === zone);
  return data ? data.city : "Select City";
};

const formatTime = (zone) => {
  const now = new Date();

  const timeOptions = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
    timeZone: zone,
  };

  const dateOptions = {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: zone,
  };

  const time = new Intl.DateTimeFormat('en-US', timeOptions).format(now);
  const date = new Intl.DateTimeFormat('en-US', dateOptions).format(now);

  return { time, date };
};

const calculateDifference = (zone1, zone2, city1Name, city2Name) => {
  if (!zone1 || !zone2 || zone1 === "" || zone2 === "") {
    return "Time Difference: Select both zones to compare.";
  }

  const d1 = new Date().toLocaleString('en-US', { timeZone: zone1 });
  const d2 = new Date().toLocaleString('en-US', { timeZone: zone2 });

  const date1 = new Date(d1);
  const date2 = new Date(d2);

  let diffMs = date2.getTime() - date1.getTime();

  const oneDayMs = 24 * 60 * 60 * 1000;
  if (Math.abs(diffMs) > oneDayMs / 2) {
    if (diffMs > 0) diffMs -= oneDayMs;
    else diffMs += oneDayMs;
  }

  const totalMinutes = Math.round(diffMs / (1000 * 60));
  const hours = Math.floor(Math.abs(totalMinutes) / 60);
  const minutes = Math.abs(totalMinutes) % 60;

  const sign = diffMs > 0 ? "Ahead of" : diffMs < 0 ? "Behind" : "is the Same as";

  if (diffMs === 0) {
    return `${city1Name} and ${city2Name} are in the same time zone.`;
  } else {
    return `${city2Name} is ${sign} ${city1Name} by ${hours} hours and ${minutes} minutes.`;
  }
};

/**
 * Small helper to convert hex to rgba with opacity
 */
const hexToRgba = (hex, alpha = 1) => {
  const raw = hex.replace('#', '');
  const bigint = parseInt(raw, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

/* -------------------- TimeCard -------------------- */
const TimeCard = ({ id, label, selectedZone, setZone, storageKey, time, date, cityName }) => {
  const [searchQuery, setSearchQuery] = useState(cityName === "Select City" ? "" : cityName);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [hoveredZone, setHoveredZone] = useState(null);

  useEffect(() => {
    if (selectedZone) {
      const city = getCityName(selectedZone);
      if (city !== "Select City") setSearchQuery(city);
    }
  }, [selectedZone]);

  const filteredCities = useMemo(() => {
    if (searchQuery.length < 2) return [];
    const q = searchQuery.toLowerCase();
    return TIME_ZONE_DATA.filter(tz =>
      tz.city.toLowerCase().includes(q) || tz.offset.toLowerCase().includes(q)
    ).slice(0, 10);
  }, [searchQuery]);

  const handleSelectCity = (tz) => {
    setZone(tz.zone);
    localStorage.setItem(storageKey, tz.zone);
    setSearchQuery(tz.city);
    setIsDropdownOpen(false);
  };

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
    setIsDropdownOpen(true);
  };

  const handleInputBlur = () => {
    // small delay to allow click
    setTimeout(() => setIsDropdownOpen(false), 150);
  };

  const cardStyle = {
    borderTopWidth: '8px',
    borderTopStyle: 'solid',
    borderTopColor: 'var(--primary)',
  };

  const labelStyle = { color: 'var(--primary)' };
  const timeStyle = { color: 'var(--primary)' };
  const focusRing = isFocused ? { boxShadow: `0 0 0 6px ${hexToRgba(PRIMARY_COLOR, 0.10)}` } : {};

  return (
    <div
      id={`card-${id}`}
      className="time-card bg-white rounded-[2rem] shadow-2xl p-6 sm:p-10 hover:shadow-3xl hover:scale-[1.01] transition-all duration-300 relative"
      style={cardStyle}
    >
      <label htmlFor={`timezone-search-${id}`} className="block text-sm font-semibold mb-2" style={labelStyle}>
        {label}
      </label>

      <div className="relative">
        <input
          id={`timezone-search-${id}`}
          type="text"
          value={searchQuery}
          placeholder="Search city or UTC offset (e.g., Tokyo or +9)..."
          onChange={handleInputChange}
          onFocus={() => { setIsDropdownOpen(true); setIsFocused(true); }}
          onBlur={() => { handleInputBlur(); setIsFocused(false); }}
          className="w-full p-4 text-base bg-gray-50 border border-gray-200 rounded-xl transition-shadow pr-10"
          style={{ ...focusRing }}
          autoComplete="off"
        />

        {isDropdownOpen && filteredCities.length > 0 && (
          <ul
            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-2xl max-h-60 overflow-y-auto"
            style={{ boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}
          >
            {filteredCities.map((tz) => {
              const hovered = hoveredZone === tz.zone;
              return (
                <li
                  key={tz.zone}
                  onMouseDown={() => handleSelectCity(tz)}
                  onMouseEnter={() => setHoveredZone(tz.zone)}
                  onMouseLeave={() => setHoveredZone(null)}
                  className="cursor-pointer p-3 transition-colors border-b border-gray-100 last:border-b-0 flex justify-between items-center"
                  style={{
                    backgroundColor: hovered ? hexToRgba(PRIMARY_COLOR, 0.08) : undefined
                  }}
                >
                  <span className="font-medium text-gray-800">{tz.city}</span>
                  <span className="text-gray-500 text-sm font-mono">{tz.offset}</span>
                </li>
              );
            })}
          </ul>
        )}

        <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
      </div>

      <div className="mt-8 text-center">
        <p id={`city-name-${id}`} className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 tracking-wide">
          {cityName}
        </p>

        <p id={`current-time-${id}`} className="time-display font-extrabold text-5xl sm:text-7xl tabular-nums leading-tight" style={timeStyle}>
          {time}
        </p>

        <p id={`current-date-${id}`} className="text-md text-gray-600 mt-4 font-medium">
          {date}
        </p>
      </div>
    </div>
  );
};

/* -------------------- Main: TimeZoneConverter -------------------- */
const TimeZoneConverter = () => {
  const DEFAULT_ZONE_1 = "America/New_York";
  const DEFAULT_ZONE_2 = "Europe/London";

  const getInitialZone = (key, defaultZone) => {
    const storedZone = localStorage.getItem(key);
    if (storedZone && VALID_ZONES.includes(storedZone)) return storedZone;
    if (storedZone) localStorage.removeItem(key); // clear invalid
    return defaultZone;
  };

  const [zone1, setZone1] = useState(getInitialZone(LOCAL_STORAGE_KEY_1, DEFAULT_ZONE_1));
  const [zone2, setZone2] = useState(getInitialZone(LOCAL_STORAGE_KEY_2, DEFAULT_ZONE_2));

  const [time1, setTime1] = useState('--:--:--');
  const [date1, setDate1] = useState('Select a zone');
  const [time2, setTime2] = useState('--:--:--');
  const [date2, setDate2] = useState('Select a zone');
  const [differenceText, setDifferenceText] = useState('Calculating...');

  const city1Name = useMemo(() => getCityName(zone1), [zone1]);
  const city2Name = useMemo(() => getCityName(zone2), [zone2]);

  const updateAllDisplays = () => {
    if (zone1) {
      const { time, date } = formatTime(zone1);
      setTime1(time);
      setDate1(date);
    } else {
      setTime1('--:--:--');
      setDate1('Select a zone');
    }

    if (zone2) {
      const { time, date } = formatTime(zone2);
      setTime2(time);
      setDate2(date);
    } else {
      setTime2('--:--:--');
      setDate2('Select a zone');
    }

    setDifferenceText(calculateDifference(zone1, zone2, city1Name, city2Name));
  };

  useEffect(() => {
    updateAllDisplays();
    const intervalId = setInterval(updateAllDisplays, 1000);
    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zone1, zone2, city1Name, city2Name]);

  // gradient pair (primary -> darker)
  const secondary = '#0aa3a0'; // complementary darker teal for gradients

  return (
    <div
      className="min-h-screen text-gray-800 p-4 sm:p-8"
      style={{
        fontFamily: 'Inter, sans-serif',
        background: `linear-gradient(180deg, ${hexToRgba(PRIMARY_COLOR, 0.06)} 0%, ${hexToRgba(PRIMARY_COLOR, 0.03)} 100%)`,
        '--primary': PRIMARY_COLOR
      }}
    >
      <div className="max-w-4xl mx-auto py-10 mt-16">
        {/* Header */}
        <header className="text-center mb-16">
          <h1
            className="text-4xl sm:text-5xl font-extrabold mb-3 flex items-center justify-center gap-3"
            style={{
              background: `linear-gradient(90deg, ${PRIMARY_COLOR}, ${secondary})`,
              WebkitBackgroundClip: 'text',
              backgroundClip: 'text',
              color: 'transparent'
            }}
          >
            <Globe className="w-8 h-8" style={{ color: PRIMARY_COLOR }} /> Global Time Sync
          </h1>

          <p className="text-xl text-gray-600">
            Compare local time between two cities instantly for seamless remote work planning.
          </p>
        </header>

        <div id="converter-container" className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <TimeCard
            id={1}
            label="City 1 (Your Location)"
            selectedZone={zone1}
            setZone={setZone1}
            storageKey={LOCAL_STORAGE_KEY_1}
            time={time1}
            date={date1}
            cityName={city1Name}
          />

          <TimeCard
            id={2}
            label="City 2 (Meeting Location)"
            selectedZone={zone2}
            setZone={setZone2}
            storageKey={LOCAL_STORAGE_KEY_2}
            time={time2}
            date={date2}
            cityName={city2Name}
          />
        </div>

        <div
          id="time-difference"
          className="text-center mt-10 p-6 rounded-2xl shadow-xl text-lg sm:text-xl font-bold transition-all hover:shadow-2xl hover:scale-[1.02]"
          style={{
            color: '#ffffff',
            background: `linear-gradient(90deg, ${PRIMARY_COLOR}, ${secondary})`
          }}
        >
          <Clock className="w-6 h-6 inline mr-3 align-text-bottom" style={{ color: 'white' }} /> {differenceText}
        </div>
      </div>
    </div>
  );
};

export default TimeZoneConverter;
