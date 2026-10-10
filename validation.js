export function validateDestination(destination) {
    const trimmedInput = destination.trim();

    if (!trimmedInput) {
        throw new Error("Назва міста не може бути порожньою.");
    }

    if (trimmedInput.length < 2) {
        throw new Error("Назва міста має містити щонайменше 2 символи.");
    }

    const englishLettersOnly = /^[a-zA-Z\s-]+$/;

    if (!englishLettersOnly.test(trimmedInput)) {
        throw new Error("Будь ласка, вводьте назву міста лише англійськими літерами (наприклад: London, Kyiv).");
    }

    return true;
}

export function validateTravelDate(travelDateString) {
    if (!travelDateString) {
        throw new Error("Будь ласка, виберіть дату подорожі.");
    }

    const inputDate = new Date(travelDateString);
    const today = new Date();

    today.setHours(0, 0, 0, 0);
    inputDate.setHours(0, 0, 0, 0);

    if (inputDate < today) {
        throw new Error("Дата подорожі не може бути в минулому.");
    }

    return true;
}
