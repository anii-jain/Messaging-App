const socket = io('http://localhost:8050');

const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    // console.log(messageElement);
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const message = messageInput.value;
    append(`You: ${message}`,'right')
    socket.emit('send', message);
    messageInput.value=""
})

const nameu = prompt("Enter your name to join");
socket.emit('new-user-joined', nameu);

socket.on('user-joined', name =>{
    // console.log(name);
    append(`${name} joined the chat`,'right')
})

socket.on('receive', data =>{
    // console.log(data.name);
    append(`${data.name}: ${data.message}`,'left')
})

socket.on('left', name =>{
    append(`${name} left the chat`,'left')
})