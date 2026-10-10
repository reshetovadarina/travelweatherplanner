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
