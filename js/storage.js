const STORAGE_KEY = 'travel_weather_planner_trips';

export function getSavedTrips() {
    const rawData = localStorage.getItem(STORAGE_KEY);
    return rawData ? JSON.parse(rawData) : [];
}

export function saveTripToStorage(newTrip) {
    const currentTrips = getSavedTrips();
    const isDuplicate = currentTrips.some(
        (trip) => trip.destination.toLowerCase() === newTrip.destination.toLowerCase() && trip.date === newTrip.date
    );

    if (!isDuplicate) {
        currentTrips.unshift(newTrip);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(currentTrips));
    }

    return currentTrips;
}

export function deleteTripFromStorage(tripId) {
    const currentTrips = getSavedTrips();
    const updatedTrips = currentTrips.filter((trip) => trip.id !== tripId);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedTrips));
    return updatedTrips;
}
