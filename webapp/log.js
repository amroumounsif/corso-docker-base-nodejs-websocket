// Scrive nella console data e ora della richiesta e indirizzo ip del client
// Parametri:
// request: richiesta del client
// response: risposta da mandare al client
// next: funzione che rappresenta il modulo middleware successivo a cui passare l'elaborazione
function log(request, response, next) {
    const dataora = new Date();
    console.log(dataora.toLocaleString() + ': Indirizzo IP: ' + request.ip);
    // In questo modo si passa l'elaborazione al middleware successivo
    next();
}

// Esporto l'oggetto config per poi usarlo in altri file js del mio progetto
module.exports = log;