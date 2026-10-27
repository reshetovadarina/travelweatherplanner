const errorContainer = document.querySelector('#error-message');
const wishlistForm = document.querySelector('#wishlist-form');
const wishlistDateInput = document.querySelector('#wishlist-date-input');
const wishlistErrorContainer = document.querySelector('#wishlist-error-message');
const weatherResultContainer = document.querySelector('#weather-result');
const savedTripsList = document.querySelector('#saved-trips-list');
const submitButton = document.querySelector('#search-form .btn-submit');
const destinationInput = document.querySelector('#destination-input');

export function showWishlistForm() {
    const todayStr = new Date().toISOString().split('T')[0];
    wishlistDateInput.min = todayStr;

    wishlistForm.classList.remove('hidden');
    clearWishlistErrorMessage();
}

export function hideWishlistForm() {
    wishlistForm.reset();
    wishlistForm.classList.add('hidden');
    clearWishlistErrorMessage();
}

export function showWishlistErrorMessage(message) {
    wishlistErrorContainer.textContent = message;
    wishlistErrorContainer.classList.remove('hidden');
}

export function clearWishlistErrorMessage() {
    wishlistErrorContainer.textContent = '';
    wishlistErrorContainer.classList.add('hidden');
}

export function showLoadingIndicator() {
    submitButton.disabled = true;
    destinationInput.disabled = true;
    submitButton.innerHTML = `<span class="spinner"></span> Завантаження...`;
}

export function hideLoadingIndicator() {
    submitButton.disabled = false;
    destinationInput.disabled = false;
    submitButton.textContent = 'Дізнатись погоду';
}

export function renderWeatherCard(weatherData) {
    weatherResultContainer.innerHTML = `
        <div class="weather-card animate-fade-in">
            <h3 class="card-title">Поточна погода в: <strong>${weatherData.destination}, ${weatherData.country}</strong></h3>

            <div class="weather-main-info">
                <span class="weather-temp">${weatherData.temperature}°C</span>
                <span class="weather-desc">${weatherData.condition}</span>
            </div>

            <div class="weather-details-grid">
                <div class="detail-item">
                    <span>Відчувається як:</span>
                    <strong>${weatherData.feelsLike}°C</strong>
                </div>
                <div class="detail-item">
                    <span>Вологість:</span>
                    <strong>${weatherData.humidity}%</strong>
                </div>
                <div class="detail-item">
                    <span> Тиск:</span>
                    <strong>${weatherData.pressure} гПа</strong>
                </div>
                <div class="detail-item">
                    <span> Вітер:</span>
                    <strong>${weatherData.windSpeed} м/с</strong>
                </div>
            </div>
        </div>
    `;
    showWishlistForm();
}

export function renderSavedTrips(tripsList) {
    savedTripsList.innerHTML = '';

    if (tripsList.length === 0) {
        savedTripsList.innerHTML = '<div class="no-trips">Список порожній. Додайте першу подорож!</div>';
        return;
    }

    tripsList.forEach(trip => {
        const card = document.createElement('div');
        card.className = 'saved-trip-item animate-fade-in';

        const noteHTML = trip.note ? `<p class="trip-note"> ${trip.note}</p>` : '';

        card.innerHTML = `
            <div class="trip-header-row">
                <div class="trip-info">
                    <span class="trip-city"><strong>${trip.destination}</strong>, ${trip.country}</span>
                    <span class="trip-date"> Дата поїздки: <strong>${trip.travelDate}</strong></span>
                    <span class="trip-weather-info">
                         Погода на момент додавання: ${trip.condition} (${trip.temperature}°C)
                    </span>
                    <span class="trip-added-date">
                        Створено: ${trip.addedAt}
                    </span>
                </div>
                <button class="btn-delete" data-id="${trip.id}">Видалити</button>
            </div>
            ${noteHTML}
        `;

        savedTripsList.appendChild(card);
    });
}

export function showErrorMessage(message) {
    errorContainer.textContent = message;
    errorContainer.classList.remove('hidden');

    hideWishlistForm();
}

export function clearErrorMessage() {
    errorContainer.textContent = '';
    errorContainer.classList.add('hidden');
}
