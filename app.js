const apiKey = 'upbc8Esy7mP3seS1ZxmOyUpP3mtxP55CyJYBHr8iqyk'; 
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&count=10`;
const searchApiUrl = `https://api.unsplash.com/search/photos?client_id=${apiKey}`;

document.getElementById('search-button').addEventListener('click', () => {
    const query = document.getElementById('search-input').value;
    if (query) {
        loadImages(query, true); 
    }
});

const tags = ['dog', 'cat', 'puppy', 'art', 'natural', 'universe', 'AI', 'computer', 'wolf', 'kids'];
const tagContainer = document.querySelector('.tag-container');

tags.forEach(tag => {
    let button = document.createElement('button');
    button.textContent = tag;
    button.addEventListener('click', () => {
        loadImages(tag, true);
    });
    tagContainer.appendChild(button);
});

function loadImages(query, isSearch = false) {
    const url = isSearch ? `${searchApiUrl}&query=${query}&per_page=10` : apiUrl;
    console.log('Requesting URL:', url); 

    fetch(url)
        .then(response => response.json())
        .then(data => {
            const images = isSearch ? data.results : data; 
            displayImages(images);
        })
        .catch(error => console.error('Error:', error));
}

function displayImages(images) {
    const imageGrid = document.querySelector('.image-grid');
    imageGrid.innerHTML = '';
    images.forEach(img => {
        const imgElement = document.createElement('img');
        imgElement.src = img.urls.small;
        imgElement.loading = "lazy"; // Lazy Load
        imageGrid.appendChild(imgElement);
    });
}

window.onload = () => {
    loadImages(); 
};
