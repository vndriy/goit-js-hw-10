const BASE_URL = 'https://api.thecatapi.com/v1';
const API_KEY = 'live_PcXA3xkVgRX98jlVOqMAIuf5wFBk6K0DvXfdqvT9akkU7uPL7uHZy4cPLQDXsa0X'



export function fetchBreeds() {
    return fetch(`${BASE_URL}/breeds?api_key=${API_KEY}`)
        .then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error(response.statusText)
        }
        return response.json()
})
        .catch(error => {
            console.log(error);
            
        });
};

export function fetchCatByBreed(breedId) {
    return fetch(`${BASE_URL}/images/search?api_key=${API_KEY}&breed_ids=${breedId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(response.statusText)
            }
            return response.json();
        });
}
