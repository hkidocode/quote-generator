const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const newQuoteBtn = document.querySelector('.new-quote');
const twitterBtn = document.getElementById('twitter');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    if(!loader.hidden) {
        loader.hidden = true;
        quoteContainer.hidden = false;
    }
}

async function getQuoteFromAPI() {
    showLoadingSpinner();
    // We need to use a Proxy Url to make our API call in order to void CORS policy problems
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

    try {
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // If Author is blank, add 'Unknown'
        if (data.quoteAuthor === "") {
            quoteAuthor.innerText = 'Unknown';
        } else {
            quoteAuthor.innerText = data.quoteAuthor;
        }
        // Reduce font size for long quotes
        if (data.quoteText.length > 120) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        // Stop Loader, Show Quote
        hideLoadingSpinner();
    } catch (error) {
        getQuoteFromAPI();
        console.log(error);
    }
}

// Tweet Quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = quoteAuthor.innerText;
    const tweetUrl = `https://twitter.com/intent/tweet?${quote} - ${author}`;
    window.open(tweetUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click',getQuoteFromAPI);
twitterBtn.addEventListener('click',tweetQuote);
