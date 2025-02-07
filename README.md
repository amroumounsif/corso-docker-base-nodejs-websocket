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

server web nginx

well non ports