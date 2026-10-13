const weatherResultContainer = document.querySelector('#weather-result');
const errorContainer = document.querySelector('#error-message');
const wishlistForm = document.querySelector('#wishlist-form');
const savedTripsList = document.querySelector('#saved-trips-list');

export function renderWeatherCard(weatherData) {
    weatherResultContainer.innerHTML = '';

    weatherResultContainer.innerHTML = `
        <div class="weather-card animate-fade-in">
            <h3 class="card-title">Поточна погода в: <strong>${weatherData.destination}</strong></h3>

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
    wishlistForm.classList.remove('hidden');
}

export function showErrorMessage(message) {
    errorContainer.textContent = message;
    errorContainer.classList.remove('hidden');
}
   wishlistForm.classList.add('hidden');

export function clearErrorMessage() {
    errorContainer.textContent = '';
    errorContainer.classList.add('hidden');
}

export function renderSavedTrips(tripsList) {
    const savedTripsList = document.querySelector('#saved-trips-list');
    savedTripsList.innerHTML = '';

    if (tripsList.length === 0) {
        savedTripsList.innerHTML = '<li class="no-trips">Список порожній. Додайте першу подорож!</li>';
        return;
    }

    tripsList.forEach(trip => {
        const li = document.createElement('li');
        li.className = 'saved-trip-item animate-fade-in';

        let noteHTML = '';
        if (trip.note) {
            noteHTML = '<p class="trip-note">📝 ' + trip.note + '</p>';
        }

        li.innerHTML = `
            <div class="trip-info">
                <span class="trip-city"><strong>${trip.destination}</strong></span>
                <span class="trip-date">📅 ${trip.date} (${trip.temperature}°C)</span>
                ` + noteHTML + `
            </div>
            <button class="btn-delete" data-id="${trip.id}">Видалити</button>
        `;

        savedTripsList.appendChild(li);
    });
}
