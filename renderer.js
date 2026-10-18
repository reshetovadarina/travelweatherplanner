const errorContainer = document.querySelector('#error-message');
const wishlistForm = document.querySelector('#wishlist-form');
const weatherResultContainer = document.querySelector('#weather-result');
const savedTripsList = document.querySelector('#saved-trips-list');


export function showWishlistForm() {
    wishlistForm.classList.remove('hidden');
}

export function hideWishlistForm() {
    wishlistForm.reset();
    wishlistForm.classList.add('hidden');
}

export function renderWeatherCard(weatherData) {
    weatherResultContainer.innerHTML = '';

    weatherResultContainer.innerHTML = `
        <div class="weather-card animate-fade-in">
            <h3 class="card-title">Поточна погода в: <strong>${weatherData.destination}, ${weatherData.country}</strong></h3>

            <div class="weather-main-info">
                <span class="weather-temp">${weatherData.temperature}°C</span>
                <span class="weather-desc">${weatherData.condition}</span>
            </div>

            <div class="weather-details-grid">
                <div class="detail-item">
                    <span> Відчувається як:</span>
                    <strong>${weatherData.feelsLike}°C</strong>
                </div>
                <div class="detail-item">
                    <span> Вологість:</span>
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
        savedTripsList.innerHTML = '<div class="no-trips">Список порожній. Будь ласка, додайте перше місто у свій wishlist!</div>';
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
                    <span class="trip-weather-info" style="font-size: 0.9rem; color: var(--text-muted); margin-top: 2px;">
                         Поточна погода: ${trip.condition} (${trip.temperature}°C)
                    </span>
                    <span class="trip-added-date" style="font-size: 0.75rem; color: #94a3b8; margin-top: 4px; display: block;">
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
