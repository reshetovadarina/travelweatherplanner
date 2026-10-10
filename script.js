import { validateDestination } from './validation.js';

const searchForm = document.querySelector('#search-form');
const destinationInput = document.querySelector('#destination-input');

searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const cityValue = destinationInput.value;

    try {
        validateDestination(cityValue);
        console.log("Валідація успішна.", cityValue);

    } catch (error) {
        alert(error.message);
    }
});
