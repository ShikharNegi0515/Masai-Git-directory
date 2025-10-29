const cities = [
    { city: "Delhi", pollution: 280, population: 32, region: "North" },
    { city: "Mumbai", pollution: 190, population: 25, region: "West" },
    { city: "Kolkata", pollution: 210, population: 18, region: "East" },
    { city: "Chennai", pollution: 130, population: 13, region: "South" },
    { city: "Bangalore", pollution: 120, population: 14, region: "South" },
    { city: "Hyderabad", pollution: 155, population: 16, region: "South" },
    { city: "Ahmedabad", pollution: 175, population: 20, region: "West" },
    { city: "Pune", pollution: 140, population: 10, region: "West" },
    { city: "Jaipur", pollution: 160, population: 9, region: "North" },
    { city: "Lucknow", pollution: 220, population: 19, region: "North" },
    { city: "Chandigarh", pollution: 145, population: 6, region: "North" },
    { city: "Patna", pollution: 240, population: 12, region: "East" },
    { city: "Bhopal", pollution: 170, population: 15, region: "Central" },
    { city: "Indore", pollution: 150, population: 14, region: "Central" },
    { city: "Nagpur", pollution: 160, population: 8, region: "Central" },
    { city: "Surat", pollution: 180, population: 11, region: "West" },
    { city: "Varanasi", pollution: 230, population: 17, region: "North" },
    { city: "Visakhapatnam", pollution: 125, population: 9, region: "South" },
    { city: "Raipur", pollution: 200, population: 13, region: "Central" },
    { city: "Guwahati", pollution: 110, population: 7, region: "East" }
];

const polluted = cities.filter(c => c.pollution > 150);

const highPopPolluted = polluted.filter(c => c.population >= 15);

const sortedCities = highPopPolluted.sort((a, b) => a.city.localeCompare(b.city));

const totalPollution = sortedCities.reduce((sum, c) => sum + c.pollution, 0);

const top3Polluted = [...sortedCities]
    .sort((a, b) => b.pollution - a.pollution)
    .slice(0, 3)
    .map(c => c.city);

const groupedByRegion = sortedCities.reduce((acc, c) => {
    if (!acc[c.region]) acc[c.region] = [];
    acc[c.region].push(c.city);
    return acc;
}, {});

console.log("Filtered & Sorted Cities:", sortedCities.map(c => c.city));
console.log("Total Pollution:", totalPollution);
console.log("Top 3 Polluted Cities:", top3Polluted);
console.log("Grouped by Region:", groupedByRegion);