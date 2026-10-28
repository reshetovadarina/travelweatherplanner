export function validateDestination(destination) {
    if (!destination) {
        throw new Error('Помилка при пошуку міста: назва пункту призначення не може бути порожньою.');
    }

    if (destination.length < 2) {
        throw new Error('Помилка при пошуку міста: назва має містити щонайменше 2 символи.');
    }

    const englishLettersOnly = /^[a-zA-Z\s-]+$/;
    if (!englishLettersOnly.test(destination)) {
        throw new Error(
            'Помилка при пошуку міста: введіть назву лише англійськими літерами (наприклад: Kyiv, London).'
        );
    }
}

export function validateTravelDate(travelDateString) {
    if (!travelDateString) {
        throw new Error('Помилка при плануванні дати: будь ласка, виберіть дату подорожі.');
    }

    const inputDate = new Date(travelDateString);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    if (inputDate < today) {
        throw new Error('Помилка при плануванні дати: дата подорожі не може бути в минулому.');
    }
}
