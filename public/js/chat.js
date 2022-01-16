
const url = (window.location.hostname.includes('localhost'))
    ? 'http://localhost:8081/api/auth/'
    : 'https://restserver-curso-fher.herokuapp.com/api/auth/google';



let usuario = null;
let socket = null;

// Referencias HTML
const txtUid = document.querySelector('#txtUid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensaje = document.querySelector('#ulMensaje');
const btnSalir = document.querySelector('#btnSalir');

// validar jwt

const validarJWT = async () => {

    const token = localStorage.getItem('token') || '';

    if (token.length <= 10) {

        window.location = 'index.html';
        throw new Error('No hay token en el server');
    }

    const resp = await fetch(url, {
        headers: { 'Authorization': token }
    }).then( res => res.json());

    const { usuario: userDB, token: tokenDB } = resp;

    localStorage.setItem('token', tokenDB);
    usuario = userDB;

    console.log(usuario, tokenDB);

    await conectarSocket();

};

const conectarSocket = async() => {

    socket = io({
        'extraHeaders': {
            'Authorization': localStorage.getItem('token')
        }
    });

    socket.on('recibir-mensaje', () => {
        
    })

    socket.on('usuarios-activos', (payload) => {
        console.log(payload)
    })

    socket.on('mensaje-privado', () => {

    })

}

const mostrarUsuario = (usuarios) => {

    let usersHTML = ''
    
    usuarios.forEach(({nombre, uid}) => {
        usersHTML +=
        `
            <li>
                <p>
                    <h5 class="text-success">${nombre}</h5>
                    <span class="fs-6 text-muted">${uid}</span>
                </p>
            </li>
        `;
    });

    ulUsuarios.innerHTML = usersHTML;
}

const main = async () => {

    await validarJWT();
}

main();


