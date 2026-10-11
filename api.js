const API_KEY = '995dd282529ced4808cb6801f4e1123c';
const BASE_URL = 'https://openweathermap.org';
export async function fetchWeatherData(destination) {
    const url = `${BASE_URL}?q=${encodeURIComponent(destination)}&appid=${API_KEY}&units=metric&lang=uk`;

    try {
        const response = await fetch(url);

        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Помилка при завантаженні погоди: Сервер повернув некоректну відповідь. Ваш API-ключ ще активується ");
        }

        if (response.status === 404) {
            throw new Error("Помилка при завантаженні погоди: Місто не знайдено");
        }

        if (!response.ok) {
            throw new Error(`Помилка при завантаженні погоди: Статус сервера ${response.status}`);
        }

        const data = await response.json();

        return {
            destination: data.name,
            temperature: Math.round(data.main.temp),
            feelsLike: Math.round(data.main.feels_like),
            condition: data.weather[0].description,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            windSpeed: data.wind.speed
        };

    } catch (error) {
        throw error;
    }
}
