const form = document.querySelector('form');
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');

form.addEventListener('submit', (e) => {
    // preventDefault(), because we don't want our site to reload after clicking submit button.
    e.preventDefault();

    // If searched again, reset the UI
    // Add appropriate class to 'p' elements.
    msg1.textContent = 'Loading...';
    msg1.className = 'msg-loading';
    msg2.textContent = '';
    msg2.className = '';

    // Get the location from UI
    let loc = document.querySelector('#location').value;
    // Fetch the data from APIs.
    fetch('/weather?address=' + loc)
        .then(res => res.json())
        .then(res => {
            if (res.error) {
                msg1.textContent = res.error
                // If error update in UI.
                msg1.className = 'msg-error';
            } else {
                // If we get data update in UI and add classes here.
                msg1.textContent = res.location;
                msg2.textContent = res.forecast;
                msg1.className = 'msg';
                msg2.className = 'msg';
            }
        })
        .catch(err => console.log(err));
})