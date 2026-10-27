const API_KEY = '995dd282529ced4808cb6801f4e1123c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
const ERROR_PREFIX = 'Помилка при завантаженні погоди';

function getErrorMessage(status) {
    switch (status) {
        case 401:
            return `${ERROR_PREFIX}: Ваш API-ключ недійсний або ще активується на серверах.`;
        case 404:
            return `${ERROR_PREFIX}: Місто не знайдено`;
        default:
            return `${ERROR_PREFIX}: Статус сервера ${status}`;
    }
}


function mapWeatherData(data) {
    return {
        destination: data.name,
        country: data.sys.country,
        temperature: Math.round(data.main.temp),
        feelsLike: Math.round(data.main.feels_like),
        condition: data.weather[0].description,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        windSpeed: data.wind.speed
    };
}

export async function fetchWeatherData(destination) {
    const url = `${BASE_URL}?q=${encodeURIComponent(destination)}&appid=${API_KEY}&units=metric&lang=uk`;

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error(getErrorMessage(response.status));
    }

    const contentType = response.headers.get("content-type");
    if (!contentType || !contentType.includes("application/json")) {
        throw new Error(`${ERROR_PREFIX}: Сервер повернув некоректний формат відповіді.`);
    }

    const data = await response.json();
    return mapWeatherData(data);
}
