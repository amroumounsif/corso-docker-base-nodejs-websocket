const socket = io();

// Elementi DOM
const nicknameForm = document.getElementById('nickname-form');
const chatContainer = document.getElementById('chat-container');
const nicknameInput = document.getElementById('nickname');
const messagesList = document.getElementById('messages');
const usersList = document.getElementById('users');
const messageForm = document.getElementById('message-form');
const messageInput = document.getElementById('message');

// Registrazione nickname
nicknameForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const nickname = nicknameInput.value.trim();
  
  if (nickname) {
    socket.emit('register', nickname);
    nicknameForm.style.display = 'none';
    chatContainer.style.display = 'block';
  }
});

// Ricezione messaggi
socket.on('chat message', (data) => {
  addMessage(`${data.nickname}: ${data.message}`);
});

// Utente entra
socket.on('user joined', (nickname) => {
  addMessage(`👋 ${nickname} si è unito alla chat`, 'notification');
});

// Utente esce
socket.on('user left', (nickname) => {
  addMessage(`🚪 ${nickname} ha lasciato la chat`, 'notification');
});

// Aggiornamento lista utenti
socket.on('user list', (users) => {
  usersList.innerHTML = users.map(user => 
    `<li>${user}</li>`
  ).join('');
});

// Invia messaggio
messageForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const message = messageInput.value.trim();
  
  if (message) {
    socket.emit('chat message', message);
    messageInput.value = '';
  }
});

// Aggiungi messaggio alla chat
function addMessage(text, className = '') {
  const li = document.createElement('li');
  li.textContent = text;
  li.className = className;
  messagesList.appendChild(li);
  messagesList.scrollTop = messagesList.scrollHeight;
}