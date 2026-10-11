const API_KEY = '995dd282529ced4808cb6801f4e1123c';
const BASE_URL = 'https://openweathermap.org';

export async function fetchWeatherData(destination) {
    const url = `${BASE_URL}?q=${encodeURIComponent(destination)}&appid=${API_KEY}&units=metric&lang=uk`;

    try {
        const response = await fetch(url);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error("Місто не знайдено. Перевірте правильність написання англійською.");
            }
            throw new Error("Не вдалося зв'язатися з сервером погоди. Спробуйте пізніше.");
        }

        const data = await response.json();

        return {
            destination: data.name,                         // Назва міста
            temperature: Math.round(data.main.temp),        // Температура (°C)
            feelsLike: Math.round(data.main.feels_like),    // Відчувається як (°C)
            condition: data.weather[0].description,         // Опис погоди
            humidity: data.main.humidity,                   // Вологість (%)
            pressure: data.main.pressure,                   // Тиск (гПа)
            windSpeed: data.wind.speed                      // Швидкість вітру (м/с)
        };

    } catch (error) {
        throw error;
    }
}
