
const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8081/api/auth/'
    : 'https://restserver-curso-fher.herokuapp.com/api/auth/google';


const miFormulario = document.querySelector('form');

miFormulario.addEventListener('submit', ev => {
    ev.preventDefault();
    const formData = {};

    for (let el of miFormulario.elements ) {
        if (el.name.length > 0) {
            formData[el.name] = el.value
        }
    }
    fetch(url + 'login', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then(res => res.json())
        .then(({msg, token}) => {
            if (msg) {
               return console.error(msg) 
            }
            console.log(token);
            localStorage.setItem('token', token);
            window.location = 'chat.html'
        })
        .catch(console.log)
        ;})

function handleCredentialResponse(response) {
    //    Google token : ID_Token
    // console.log(response.credential);

    const body = {
        id_token: response.credential
    }

    fetch(url + 'google', {
        method: 'POST',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(res => res.json())
        .then(({token}) => {
            console.log(token)
            localStorage.setItem('token', token);
            window.location = 'chat.html'
        });
}

const button = document.getElementById('google_singout');

button.onclick = () => {

    console.log(google.accounts.id);
    google.accounts.id.disableAutoSelect();

    google.accounts.id.revoke(localStorage.getItem('email'), done => {
        localStorage.clear();
        location.reload();
    })
}

