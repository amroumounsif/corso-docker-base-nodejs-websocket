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

Nota: Per maggiori dettagli sui comandi, consulta la documentazione ufficiale di Docker: https://docs.docker.com/
