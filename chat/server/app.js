const express = require('express');
const socketIo = require('socket.io');
const http = require('http');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);


// Configurazione file statici
app.use(express.static(path.join(__dirname, 'client')));

// Route principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'index.html'));
});
// ... (il resto del codice Socket.IO rimane uguale)

// Gestione connessioni Socket.IO
io.on('connection', (socket) => {
  console.log('Nuova connessione:', socket.id);

  // Registrazione nickname
  socket.on('register', (nickname) => {
    if (!nickname || nickname.trim() === '') return;
    
    nickname = nickname.trim();
    users.set(socket.id, { nickname });
    
    // Notifica a tutti del nuovo utente
    io.emit('user joined', nickname);
    updateUserList();
  });

  // Disconnessione
  socket.on('disconnect', () => {
    if (users.has(socket.id)) {
      const { nickname } = users.get(socket.id);
      users.delete(socket.id);
      
      // Notifica a tutti dell'uscita
      io.emit('user left', nickname);
      updateUserList();
    }
  });

  // Aggiorna lista utenti per tutti i client
  function updateUserList() {
    const userList = Array.from(users.values()).map(user => user.nickname);
    io.emit('user list', userList);
  }
});

// Avvia server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server in ascolto sulla porta ${PORT}`);
});