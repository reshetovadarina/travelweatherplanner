const API_KEY = '995dd282529ced4808cb6801f4e1123c';
const BASE_URL = 'https://openweathermap.org';

function mapWeatherData(data) {
    return {
        destination: data.name,
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

    try {
        const response = await fetch(url);

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Помилка при завантаженні погоди: Сервер повернув некоректну відповідь. Ваш API-ключ ще активується (це займає 1-2 години).");
        }

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Помилка при завантаженні погоди: Місто не знайдено");
            }
            if (response.status === 401) {
                throw new Error("Помилка при завантаженні погоди: API-ключ не активовано або вказано невірно.");
            }
            throw new Error(`Помилка при завантаженні погоди: Статус сервера ${response.status}`);
        }

        const data = await response.json();

        return mapWeatherData(data);

    } catch (error) {
        throw error;
    }
}
