# Corso Docker, Node.js/Express e WebSocket
### a.s. 2024/2025
### Classe 4Bi

## Introduzione alla Virtualizzazione e Containerizzazione

### Virtualizzazione e Paravirtualizzazione

- **Virtualizzazione**: creazione di macchine virtuali che si comportano come macchine fisiche.
- **Paravirtualizzazione**: tecnica che permette di utilizzare un sistema operativo ospitante con accesso diretto a risorse hardware.

### Containerizzazione
- Creazione di ambienti senza un sistema operativo completo, ma sfruttando il sistema operativo dell'host. Questo si traduce in **micro macchine virtuali** chiamate container.

### Kernel Linux: Namespaces e Cgroups

Il kernel Linux ha due caratteristiche chiave che consentono la containerizzazione:
- **Namespaces**: Isolano le risorse a disposizione del computer, permettendo che diverse macchine virtuali (container) abbiano ambienti separati.
- **Cgroups**: Gestiscono e limitano l'uso delle risorse tra i processi. Proteggono i processi da attacchi da altri container.

### Vantaggi della Containerizzazione
- Ogni container è separato e sicuro. I processi all'interno di un container non interagiscono con quelli in altri container.
- Grazie a Docker, possiamo portare software da una macchina all’altra senza preoccupazioni di configurazioni diverse, sfruttando un file di testo per la configurazione.

## Docker

### Cos'è Docker?
Docker è una piattaforma software che consente di creare, testare e distribuire applicazioni tramite **contenitori** (container). Questi permettono agli sviluppatori di impacchettare le applicazioni con tutte le dipendenze necessarie, garantendo la portabilità e l'esecuzione consistente su qualsiasi sistema.

### Caratteristiche principali:
1. **Portabilità**: i container possono essere eseguiti su qualsiasi sistema che supporti Docker.
2. **Isolamento**: ogni container è isolato dagli altri e dal sistema host.
3. **Leggerezza**: i container condividono il kernel dell'host, riducendo l'overhead rispetto alle macchine virtuali tradizionali.
4. **Scalabilità**: grazie a strumenti come Kubernetes, Docker semplifica la scalabilità delle applicazioni.

### Funzionalità del Kernel Linux: cgroups e namespaces
- **Namespaces**: Forniscono isolamento per l'esecuzione di processi, come PID, rete, file system e utenti.
- **Cgroups**: Gestiscono e limitano le risorse (CPU, memoria, I/O) allocate a ciascun container.

### Comandi principali di Docker

#### 1. `docker run`
Avvia un nuovo container da un'immagine.
```bash
docker run [opzioni] immagine [comando] [argomenti]
```

Esempio:
```
docker run alpine echo "Hello World"
```

2. docker ps
Visualizza i container in esecuzione.
```
docker ps
```

3. docker ps -a
Visualizza tutti i container, inclusi quelli non in esecuzione.
```

docker ps -a
```

4. docker run -it alpine
Entra nella shell di un container in modo interattivo.
```
docker run -it alpine
```

5. docker run --name docker1 -it alpine
Crea un container con un nome specificato.
```
docker run --name docker1 -it alpine
```

6. docker inspect docker1
Mostra dettagli sul container specificato.
```
docker container inspect docker1
```

Immagini Docker
Le immagini sono strutturate in strati. Ogni strato è read-only e non modificabile direttamente. I container creano uno strato in read-write sopra questi strati.

Esempio di immagine:

MYSQL: ogni immagine ha più strati, tutti in sola lettura tranne quello che il container modifica.
Portabilità e Scalabilità
I container possono essere eseguiti su qualsiasi macchina che abbia Docker installato, senza bisogno di modificare configurazioni. Inoltre, è facile scalare le applicazioni utilizzando Docker con orchestratori come Kubernetes.

Docker e la rete
Docker permette di gestire reti e volumi per una gestione sicura e stabile dei container.

Gestione dei Volumi in Docker
Un volume è un'area di memorizzazione persistente per i dati. I volumi possono essere montati su un container per mantenere i dati anche dopo che il container è stato eliminato.

Variabili di Ambiente in Docker
Le variabili di ambiente possono essere impostate quando si esegue un container usando l'opzione -e.

Esempio:
```
docker run -e "MY_ENV_VAR=value" alpine
```

```
docker remove -f(force) per forzare la chiusura di un programma
```


Esecuzione di Comandi nei Container
Per eseguire comandi in un container in esecuzione:
```
docker exec -it <nome-container> <comando>
```

Esempio:
```
docker exec -it docker1 /bin/bash
```

Orchestratori e SDN
Gli orchestratori, come Kubernetes, gestiscono i container in esecuzione e distribuiscono automaticamente le applicazioni. Inoltre, la gestione delle reti tramite SDN (Software-Defined Networking) e NFV (Network Functions Virtualization) è in crescita, e la gestione delle infrastrutture sta diventando sempre più basata su codice.

Uscire dal Container
Per uscire dal container senza fermarlo, basta usare:

CTRL + p + q

## Volumi in Docker

I **volumi** in Docker sono aree di memorizzazione persistente che permettono di mantenere i dati anche quando un container viene eliminato. Questo è utile per situazioni in cui i dati devono persistere tra i riavvii del container o tra l'esecuzione di diversi container.

### Tipi di Volumi

1. **Volumi Docker (Docker Volumes)**
   - I volumi Docker sono gestiti direttamente da Docker e sono indipendenti dal ciclo di vita dei container.
   - Sono ideali per archiviare dati persistenti come database, log e configurazioni.
   - I volumi sono memorizzati in una directory all'interno del file system dell'host e possono essere condivisi tra più container.

2. **Montaggio di Volumi (Volume Mounts)**
   - Si riferisce all'azione di "montare" una directory del sistema host come volume all'interno di un container. 
   - Questo può essere utile per condividere file tra il container e l'host, oppure per permettere a più container di accedere ai medesimi dati.

### Creazione e Uso dei Volumi

#### Creare un Volume
Per creare un volume, puoi utilizzare il comando:
```
docker volume create nome_volume
```

Esempio:
```
docker volume create my_volume
```

Montare un Volume in un Container
Per montare un volume su un container, puoi usare l'opzione -v o --mount al momento dell'esecuzione del container. La sintassi di base è:
```
docker run -v nome_volume:/percorso/container nome_immagine
```

Esempio con -v:
```
docker run -v my_volume:/data alpine
```

In questo esempio, il volume my_volume verrà montato sulla directory /data all'interno del container.

Volumi con Docker Compose
Quando utilizzi Docker Compose per gestire più container, puoi definire i volumi all'interno del file docker-compose.yml:

Ispezionare un Volume
Per vedere i dettagli di un volume, puoi utilizzare il comando:
```
docker volume inspect nome_volume
```

Rimuovere un Volume
Per rimuovere un volume quando non è più necessario, usa il comando:
```
docker volume rm nome_volume
```

Nota: I volumi non vengono eliminati automaticamente quando si rimuove un container. Se vuoi rimuovere tutti i volumi non utilizzati, puoi utilizzare:
```
docker volume prune
```

Vantaggi dell'Uso dei Volumi
Persistenza dei dati: Anche se un container viene eliminato, i dati nel volume non vengono persi.
Condivisione dei dati: I volumi possono essere facilmente condivisi tra più container, consentendo la collaborazione sui dati tra servizi diversi.
Backup e ripristino: I volumi possono essere facilmente sottoposti a backup o migrati su altre macchine.
Indipendenza dal filesystem host: I volumi sono indipendenti dal filesystem dell'host, quindi è più facile gestire i dati e mantenerli in sicurezza.
Differenza tra Volumi e Bind Mounts
I bind mounts sono simili ai volumi, ma differiscono per il fatto che si collegano direttamente a una specifica directory del sistema host, anziché a una gestione separata dei dati. I volumi, invece, sono la soluzione più portabile e sicura per la persistenza dei dati in Docker.




Nota: Per maggiori dettagli sui comandi, consulta la documentazione ufficiale di Docker: https://docs.docker.com/


docker run -it -d --name alpine1  -v app:/app -v dati:/dati alpine

Creare un file .tar:
Supponiamo di voler fare un backup di una cartella chiamata myfolder.

Comando base:
```
tar -cvf backup.tar myfolder/
```

Spiegazione delle opzioni:

-c: Crea un nuovo archivio.
-v: Modalità verbosa (opzionale). Mostra l'elenco dei file mentre vengono aggiunti all'archivio.
-f: Indica il nome del file dell'archivio. In questo caso, si chiama backup.tar.
Esempio completo:
Se vuoi fare il backup della cartella myfolder nella stessa directory, l'output sarà un file backup.tar che conterrà il contenuto di myfolder.

#### volume binding 
Vantaggi del Volume Binding:
Persistenza dei Dati: I dati sono persistenti anche se il container viene eliminato. Se monti una cartella o un file dal tuo host nel container, i dati rimarranno sul sistema host e non verranno cancellati con il container.
Condivisione dei Dati: Puoi facilmente condividere dati tra il sistema host e i container.
Gestione dei Dati: Utilizzando volumi Docker, puoi avere una gestione centralizzata dei dati e persisterli anche se i container vengono ricreati.

## port forwarding

Il port forwarding è una tecnica che permette di reindirizzare il traffico di rete da una porta di un dispositivo a un'altra porta su un altro dispositivo. Viene utilizzato per consentire l'accesso a servizi interni da una rete esterna, come accade con server web, giochi online, o applicazioni in container Docker.

Tipologie di Port Forwarding
Port Forwarding Statico

Associa una porta specifica del router a un dispositivo interno in modo permanente.
Esempio: Se vuoi accedere a un server web locale sulla porta 8080, puoi mappare la porta 80 pubblica al tuo IP locale sulla porta 8080.
Port Forwarding Dinamico

Usato in VPN e SSH per creare tunnel sicuri.
Permette di inoltrare richieste da una porta locale a destinazioni remote in modo dinamico.
Port Triggering

Simile al port forwarding statico, ma si attiva solo quando un dispositivo invia traffico su una porta specifica.
Utile per applicazioni che usano porte diverse per connessioni in entrata e in uscita.
Esempio di Port Forwarding in Docker
Nel contesto Docker, il port forwarding si usa per esporre le porte di un container sulla macchina host.
Se avvii un container con:

```
docker run -p 8080:80 nginx
```
La porta 8080 dell’host verrà reindirizzata alla porta 80 del container, permettendo di accedere a Nginx via http://localhost:8080.
Configurazione del Port Forwarding nel Router
Se vuoi rendere accessibile un server nella tua rete locale (ad esempio un server web su un Raspberry Pi) da Internet, devi:

Accedere al pannello di controllo del router.
Cercare la sezione "Port Forwarding" o "Virtual Server".
Creare una regola, specificando:
Porta esterna: La porta pubblica (es. 8080).
Indirizzo IP locale: L’IP del dispositivo interno (es. 192.168.1.10).
Porta interna: La porta del servizio interno (es. 80 per un web server).
Protocollo: TCP, UDP o entrambi.
Salvare e testare la connessione dall’esterno.
Se vuoi accedere al tuo server da Internet senza conoscere l’IP pubblico, puoi usare servizi DDNS (Dynamic DNS) come No-IP o DuckDNS.

## RETI

Tipologie di Reti in Docker
Docker fornisce diversi tipi di reti predefinite, ognuna con caratteristiche specifiche:

Bridge (predefinita)

È la rete usata di default se non ne specifichi una.
I container collegati alla stessa rete bridge possono comunicare tra loro.
Per comunicare con l’esterno, è necessario esporre porte (-p 8080:80).
Comando per creare un container in una rete bridge:

```
docker network create my_bridge
docker run --network=my_bridge my_container
```
#### Host
Il container usa la rete del sistema host, senza isolamento.
Nessuna mappatura delle porte (-p non serve).
Utile per applicazioni che devono avere massima performance di rete.
Esempio:

```
docker run --network=host nginx
```

#### None
Il container non ha accesso alla rete.
Utile per container isolati che non devono comunicare con altri.
Overlay

Serve per connettere container su host diversi in un cluster Docker Swarm.
Crea una rete distribuita tra più nodi.
Esempio:
```
docker network create --driver overlay my_overlay
```

#### Macvlan
Permette ai container di avere un indirizzo IP direttamente dalla rete fisica.
Utile per applicazioni che richiedono un’identità di rete unica.
Comandi Utili per Gestire le Reti
Visualizzare le reti disponibili
```
docker network ls
```

#### Creare una rete personalizzata
```
docker network create my_network
```

#### Collegare un container a una rete
```
docker network connect my_network my_container
```
#### Rimuovere una rete
```
docker network rm my_network
```
Le reti Docker sono fondamentali per far comunicare i container in modo sicuro e scalabile.


Concetti Chiave
# Middleware:
Il middleware in Express è una funzione che ha accesso all'oggetto richiesta (req), all'oggetto risposta (res) e alla prossima funzione middleware nel ciclo richiesta-risposta dell'applicazione. Il middleware può eseguire qualsiasi codice, modificare gli oggetti richiesta e risposta, terminare il ciclo richiesta-risposta o chiamare il prossimo middleware nella catena.
Esempio di middleware:
```
app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});
```

### Come Inserire Middleware nella Catena di Lavorazione:

Il middleware può essere aggiunto utilizzando ```app.use()``` o specificando il middleware in una route particolare. Il middleware viene eseguito nell'ordine in cui è stato aggiunto.

Esempio:
```
app.use(express.json()); // Middleware per il parsing del corpo JSON
app.use(express.urlencoded({ extended: true })); // Middleware per il parsing del corpo URL-encoded
```

### News e Catene di Lavorazione:

Questo concetto non è direttamente correlato a Express o Docker, ma potrebbe riferirsi a come le notizie o i dati vengono processati attraverso una serie di passaggi (catena di lavorazione) in un'applicazione. In Express, questo potrebbe essere analogo alla catena di middleware che processa una richiesta.


###  Istanze di Express:

Un'istanza di Express è un'applicazione Express creata chiamando ```express()```. Ogni istanza può avere il proprio set di middleware, route e impostazioni.

Esempio:
```
const express = require('express');
const app = express();
```

### Log:

Il logging è il processo di registrazione di eventi o messaggi durante l'esecuzione di un'applicazione. In Express, il logging può essere implementato utilizzando middleware come morgan.

Esempio:
```
const morgan = require('morgan');
app.use(morgan('combined'));
```

c express.static:

express.static è un middleware integrato in Express per servire file statici come immagini, file CSS e JavaScript.

Esempio:
```
app.use(express.static('public'));

```



PAROLI CHIAVI
middleware
come inserire nella catena di lavorazione middleware
news e catene di lavorazione
istanze di exspress
Log
exspress.static




socket.io (libreria molto veloce low overhead)
### 1. WebSocket vs Long-Polling HTTP
WebSocket è un protocollo che permette una comunicazione bidirezionale e persistente tra client e server. Una volta stabilita la connessione, il client e il server possono scambiare dati in tempo reale senza dover rinegoziare la connessione ogni volta.

Long-Polling HTTP è una tecnica più vecchia in cui il client invia una richiesta HTTP al server e mantiene la connessione aperta finché il server non ha dati da inviare. Una volta che i dati vengono inviati, il client invia immediatamente una nuova richiesta.

### 2. Fallback al Long-Polling HTTP
Se la connessione WebSocket non è possibile (ad esempio, perché il protocollo WebSocket è bloccato da un firewall o non supportato dal browser), l'applicazione può tornare al long-polling HTTP come meccanismo di fallback. Questo garantisce che la comunicazione tra client e server continui, anche se in modo meno efficiente.

Perché è utile?
Alcuni ambienti potrebbero non supportare WebSocket (ad esempio, reti con restrizioni o browser molto vecchi).

Il long-polling HTTP è un'alternativa più universale, anche se meno performante.

### 3. Riconnessione Automatica in Caso di Perdita della Connessione
Se la connessione WebSocket viene persa (ad esempio, a causa di problemi di rete o di un'interruzione del server), il client può tentare automaticamente di riconnettersi. Questo è fondamentale per mantenere un'esperienza utente fluida e senza interruzioni.

Come funziona?
Il client monitora lo stato della connessione WebSocket.

Se la connessione viene persa, il client attiva un meccanismo di riconnessione automatica dopo un breve intervallo di tempo (ad esempio, 1-5 secondi).

Questo processo continua finché la connessione non viene ristabilita.

### 4. Vantaggi di Questa Strategia
Affidabilità: L'applicazione continua a funzionare anche in ambienti che non supportano WebSocket.

Resilienza: In caso di problemi di rete, il client tenta automaticamente di riconnettersi, riducendo i tempi di inattività.

Esperienza utente migliore: L'utente non si accorge delle interruzioni perché il sistema gestisce automaticamente i problemi di connessione.

### 5. Esempio Pratico
Immagina un'applicazione di chat in tempo reale:

Se WebSocket è disponibile, i messaggi vengono inviati e ricevuti istantaneamente.

Se WebSocket non è disponibile, l'applicazione passa al long-polling HTTP, continuando a funzionare, anche se con un leggero ritardo.

Se la connessione WebSocket viene persa, il client tenta di riconnettersi automaticamente, garantendo che la chat rimanga attiva.


