// API
const API_URL           = 'https://api.adviceslip.com/advice';

// DOM Queries
const adviceNumberId    = document.getElementById('advice-id');
const adviceText        = document.getElementById('advice-text');
const adviceBtn         = document.getElementById('generate-advice-btn');

function fetchAdvice() {
    return new Promise(function(resolve, reject) {
        const xhr = new XMLHttpRequest();

        xhr.open('GET', API_URL + '?timestamp=' + new Date().getTime() + Math.random(), true);
        xhr.responseType = 'json';

        xhr.onload = function() {
            if(xhr.status === 200) {
                resolve(xhr.response);
            } else {
                reject(new Error(`Request failed! Status code: ${xhr.status} - ${xhr.statusText}`));
            }
        }

        xhr.onerror = function() {
            reject(new Error(`Network error - request could not be sent or received!`));
        }

        xhr.send();
    });
}

async function handleAdvice() {
    adviceBtn.disabled = true;

    try {
        const data = await fetchAdvice();
        console.log(data);

        adviceNumberId.textContent = '#' + data.slip.id;
        adviceText.innerHTML       = '&#8220;' + data.slip.advice + '&#8221;';

    } catch(err) {
        console.error(err.message);
    } finally {
        adviceBtn.disabled = false;
    }
}

adviceBtn.addEventListener('click', handleAdvice);