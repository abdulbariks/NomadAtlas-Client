import { useEffect, useState, useMemo } from 'react';
import { Globe, Clock } from 'lucide-react';

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
        if (diffMs > 0) {
            diffMs -= oneDayMs;
        } else {
            diffMs += oneDayMs;
        }
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

const TimeCard = ({ id, label, selectedZone, setZone, storageKey, time, date, cityName, accentColor, focusRingColor }) => {

    const [searchQuery, setSearchQuery] = useState(cityName === "Select City" ? "" : cityName);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    useEffect(() => {
        if (selectedZone) {
            const city = getCityName(selectedZone);
            if (city !== "Select City") {
                setSearchQuery(city);
            }
        }
    }, [selectedZone]);

    const filteredCities = useMemo(() => {

        if (searchQuery.length < 2) return [];

        const query = searchQuery.toLowerCase();
        return TIME_ZONE_DATA.filter(tz =>
            tz.city.toLowerCase().includes(query) || tz.offset.toLowerCase().includes(query)
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
        setTimeout(() => setIsDropdownOpen(false), 150);
    };

    return (
        <div
            id={`card-${id}`}

            className={`time-card bg-white rounded-[2rem] shadow-2xl p-6 sm:p-10 border-t-8 ${accentColor.replace('500', '600')} hover:shadow-3xl hover:scale-[1.01] transition-all duration-300 relative`}
        >
            <label htmlFor={`timezone-search-${id}`} className={`block text-sm font-semibold mb-2 ${accentColor.replace('border-t-4', 'text')}`}>
                {label}
            </label>
            <div className="relative">
                <input
                    id={`timezone-search-${id}`}
                    type="text"
                    value={searchQuery}
                    placeholder="Search city or UTC offset (e.g., Tokyo or +9)..."
                    onChange={handleInputChange}
                    onFocus={() => setIsDropdownOpen(true)}
                    onBlur={handleInputBlur}

                    className={`w-full p-4 text-base bg-gray-100 border border-gray-300 rounded-xl focus:ring-4 ${focusRingColor} focus:ring-opacity-50 focus:border-transparent transition-shadow pr-10`}
                    autoComplete="off"
                />

                {isDropdownOpen && filteredCities.length > 0 && (
                    <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-2xl max-h-60 overflow-y-auto custom-scroll">
                        {filteredCities.map((tz) => (
                            <li
                                key={tz.zone}

                                onMouseDown={() => handleSelectCity(tz)}
                                className="cursor-pointer p-3 hover:bg-indigo-100 transition-colors border-b border-gray-200 last:border-b-0 flex justify-between items-center"
                            >
                                <span className="font-medium">{tz.city}</span>
                                <span className="text-gray-500 text-sm font-mono">{tz.offset}</span>
                            </li>
                        ))}
                    </ul>
                )}

                <Globe className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none" />
            </div>


            <div className="mt-8 text-center">

                <p id={`city-name-${id}`} className="text-xl sm:text-2xl font-semibold mb-4 text-gray-700 tracking-wide">
                    {cityName}
                </p>


                <p id={`current-time-${id}`} className={`time-display font-extrabold text-5xl sm:text-7xl ${accentColor.replace('border-t-4', 'text').replace('600', '700')} tabular-nums leading-tight`}>
                    {time}
                </p>


                <p id={`current-date-${id}`} className="text-md text-black mt-4">
                    {date}
                </p>
            </div>
        </div>
    );
};

const TimeZoneConverter = () => {

    const DEFAULT_ZONE_1 = "America/New_York";
    const DEFAULT_ZONE_2 = "Europe/London";

    const getInitialZone = (key, defaultZone) => {
        const storedZone = localStorage.getItem(key);
        if (storedZone && VALID_ZONES.includes(storedZone)) {
            return storedZone;
        }
        // If it's invalid (like the old 'America/Rio_de_Janeiro') or null, clear it from storage
        if (storedZone) {
            localStorage.removeItem(key);
        }
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
    }, [zone1, zone2, city1Name, city2Name]);

    return (
        <div className="min-h-screen bg-white text-gray-800 p-4 sm:p-8"
            style={{ fontFamily: 'Inter, sans-serif' }}>

            <div className="max-w-4xl mx-auto py-10 mt-16">
                {/* Header */}
                <header className="text-center mb-16">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-indigo-700 mb-3 flex items-center justify-center gap-3">
                        <Globe className="w-8 h-8" /> Global Time Sync
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
                        accentColor="border-indigo-600 text-indigo-600"
                        focusRingColor="focus:ring-indigo-500"
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
                        accentColor="border-purple-600 text-purple-600"
                        focusRingColor="focus:ring-purple-500"
                    />

                </div>

                <div id="time-difference"
                    className="text-center mt-10 p-6 bg-gray-100 rounded-2xl shadow-xl border-l-8 border-r-8 border-indigo-500 text-lg sm:text-xl text-gray-700 font-bold transition-all">
                    <Clock className="w-6 h-6 inline mr-3 align-text-bottom text-indigo-500" /> {differenceText}
                </div>


            </div>
        </div>
    );
};

export default TimeZoneConverter;