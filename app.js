// Global Constants
const API_KEY = 'ADD_API_KEY';
const limit = 9;
const rating = 'g';


const searchItem = document.querySelector("#search-item");
const searchForm = document.querySelector("#search-form");
const gifArea = document.querySelector("#gif-area");
const loadMore = document.querySelector("#load-more");
var pages = 0;
var searchTerm = '';
async function getResults(q) {
    try {
        const res = await fetch(`https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${q}&limit=${limit}&rating=${rating}&offset=${pages*limit}`);
        const data = await res.json();        
        displayResults(data.data);
        loadMore.classList.remove("invisible"); 
    } catch (error) {
        console.error(error);        
    }
   
}
function displayResults(response) {    
    response.forEach((gif) => {
        const newDiv = document.createElement('div');
        const newGif = document.createElement('img');
        newGif.src = gif.images.fixed_width.url;        
        newDiv.classList.add("gif-item");
        newDiv.append(newGif)
        gifArea.append(newDiv);
        
    })

}
function handleFormSubmit(event) {
    loadMore.classList.add("invisible");
    gifArea.textContent = '';    
    getResults(searchItem.value);
    searchTerm = searchItem.value;
    searchItem.value = ''    
    event.preventDefault();
}
function showMore() {
    getResults(searchTerm); 
    pages += 1;     
}
searchForm.addEventListener('submit', handleFormSubmit);
loadMore.addEventListener('click', showMore);
