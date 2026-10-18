const API_KEY = '995dd282529ced4808cb6801f4e1123c';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
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

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 401) {
                throw new Error("Помилка при завантаженні погоди: Ваш API-ключ ще активується на серверах OpenWeatherMap. Будь ласка, зачекайте.");
            }
            if (response.status === 404) {
                throw new Error("Помилка при завантаженні погоди: Місто не знайдено");
            }
            throw new Error(`Помилка при завантаженні погоди: Статус сервера ${response.status}`);
        }

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Помилка при завантаженні погоди: Сервер повернув некоректний формат відповіді.");
        }

        const data = await response.json();
        return mapWeatherData(data);

    } catch (error) {
        throw error;
    }
}
