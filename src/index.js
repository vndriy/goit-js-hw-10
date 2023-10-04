import { fetchBreeds, fetchCatByBreed } from "./cat-api";
import SlimSelect from "slim-select";




const selector = document.querySelector('.breed-select');

const result = document.querySelector('.cat-info');
const loader = document.querySelector('.loader')
const errorMessage = document.querySelector('.error');


fetchBreeds()
    .then(data => {
        console.log(data);
        const markupSelectors = data.map(breed => `<option value="${breed.id}">${breed.name}</option>`);
        selector.insertAdjacentHTML('beforeend', markupSelectors.join(''));
        hideLoader();
        new SlimSelect({
            select: selector
})
    })
    .catch(error => {
        console.log(error);
errorMessage.classList.remove('hidden');


    })


selector.addEventListener('change', () => {
    showLoader();

    const selectedId = selector.value;
    fetchCatByBreed(selectedId)
        .then(data => { 
            console.log(data);
            const catImg = data[0].url;
            const breedsName = data[0].breeds[0].name;
            const descr = data[0].breeds[0].description;
            const temperament = data[0].breeds[0].temperament;
            const markupResult =
                `<img src="${catImg}" alt="${breedsName}" width=300 class="cats-image"/>
    <h1>${breedsName}</h1>
                <p class="descript">${descr}</p>

                <h3>Temperament:</h3>
                <p>${temperament}</p>`
            result.innerHTML = ('beforeend', markupResult)
            hideLoader();


        })
        .catch(error => {
            console.log(error);
errorMessage.classList.remove('hidden');
        })
});
    
function showLoader() {
    loader.classList.remove('hidden');
    selector.classList.add('hidden');
    result.classList.add('hidden');
}

function hideLoader() {
    loader.classList.add('hidden');
    selector.classList.remove('hidden');
    result.classList.remove('hidden');
}