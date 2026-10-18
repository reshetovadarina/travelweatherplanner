import { validateDestination, validateTravelDate } from './validation.js';
import { fetchWeatherData } from './api.js';
import { renderWeatherCard, showErrorMessage, clearErrorMessage, renderSavedTrips, hideWishlistForm } from './renderer.js';
import { saveTripToStorage, getSavedTrips, deleteTripFromStorage } from './storage.js';

const searchForm = document.querySelector('#search-form');
const destinationInput = document.querySelector('#destination-input');
const wishlistForm = document.querySelector('#wishlist-form');
const wishlistDateInput = document.querySelector('#wishlist-date-input');
const wishlistNoteInput = document.querySelector('#wishlist-note-input');
const savedTripsList = document.querySelector('#saved-trips-list');

let activeWeatherData = null;

const initialTrips = getSavedTrips();
renderSavedTrips(initialTrips);

searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    clearErrorMessage();
    const cityValue = destinationInput.value.trim();

    try {
        validateDestination(cityValue);
        const weatherData = await fetchWeatherData(cityValue);
        activeWeatherData = weatherData;
        renderWeatherCard(weatherData);
    } catch (error) {
        showErrorMessage(error.message);
        activeWeatherData = null;
    }
});

wishlistForm.addEventListener('submit', (event) => {
    event.preventDefault();
    clearErrorMessage();

    const travelDateValue = wishlistDateInput.value;
    const noteValue = wishlistNoteInput.value.trim();

    const today = new Date();
    const addedDate = today.toLocaleDateString('uk-UA', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    try {
        validateTravelDate(travelDateValue);

        const formattedTravelDate = new Date(travelDateValue).toLocaleDateString('uk-UA', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });

        const wishlistPlan = {
            id: Date.now().toString(),
            travelDate: formattedTravelDate,
            addedAt: addedDate,
            note: noteValue,
            ...activeWeatherData
        };

        const updatedTrips = saveTripToStorage(wishlistPlan);
        renderSavedTrips(updatedTrips);

        hideWishlistForm();
        searchForm.reset();
        activeWeatherData = null;

    } catch (error) {
        showErrorMessage(error.message);
    }
});

savedTripsList.addEventListener('click', (event) => {
    if (event.target.classList.contains('btn-delete')) {
        const tripId = event.target.getAttribute('data-id');
        const updatedTrips = deleteTripFromStorage(tripId);
        renderSavedTrips(updatedTrips);
    }
});
