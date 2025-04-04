[<u>back</u>](./README.md)

# Docker
Docker è una piattaforma software che permette la creazione, il test e il deployment di applicazioni all'interno di contenitori software. Questi contenitori permettono agli sviluppatori di impacchettare un'applicazione con tutte le parti necessarie, come librerie e dipendenze, e distribuirla come un unico pacchetto. Questo approccio assicura che l'applicazione funzioni su qualsiasi sistema Linux, indipendentemente dalle configurazioni personalizzate che potrebbero differire da un sistema all'altro.

Il cuore della capacità di isolamento di Docker è basato sull'utilizzo di due funzionalità fondamentali del kernel Linux: i **cgroup** (control groups) e i **namespaces**. Queste tecnologie sono cruciali per gestire l'isolamento e la distribuzione delle risorse tra i contenitori.

Alcune caratteristiche chiave di Docker includono:

1. **Portabilità**: I container Docker possono essere eseguiti su qualsiasi sistema operativo che supporta Docker, che può essere una macchina locale, un server di produzione, o anche un cloud.
2. **Isolamento**: Ogni container Docker è isolato dagli altri e dal sistema ospite. Un container ha il suo ambiente e set di risorse, che gli permette di operare indipendentemente.
3. **Leggerezza**: I container Docker condividono il kernel del sistema operativo ospitante ma possono essere limitati a usare una certa quantità di risorse come CPU e memoria. Questo li rende molto più leggeri rispetto alle macchine virtuali tradizionali.
4. **Scalabilità e gestibilità**: Docker facilita la scalabilità delle applicazioni. È possibile utilizzare strumenti di orchestrazione come Kubernetes per gestire, scalare e distribuire automaticamente i container Docker.

Docker è ampiamente utilizzato per lo sviluppo di applicazioni, il testing, e la produzione, offrendo un modo consistente e affidabile per eseguire il software.

## Caratteristiche del krnel linux alla base del funzionamento di docker

`cgroup` (Control Groups) e `namespaces` sono due tecnologie fondamentali utilizzate in Docker per isolare e gestire le risorse dei container. Ecco come vengono usati:

### Namespaces
I `namespaces` forniscono un livello di isolamento nei container Docker. Ogni container esegue in un proprio namespace, il che significa che ha la propria vista isolata delle risorse del sistema, come interfacce di rete, alberi di processi e volumi montati. Questo impedisce ai container di vedere i processi in esecuzione in altri container o sul sistema host. Docker utilizza vari tipi di namespaces, tra cui:

- **PID namespace**: Isola l'elenco dei processi, cioè ogni container può vedere solo i suoi processi.
- **Network namespace**: Isola le interfacce di rete, permettendo a ciascun container di avere la propria interfaccia di rete virtuale.
- **Mount namespace**: Isola i punti di montaggio, così ogni container può avere il proprio filesystem.
- **IPC namespace**: Isola i meccanismi di comunicazione inter-processo.
- **UTS namespace**: Isola i nomi host e i nomi di dominio, permettendo a ogni container di avere il proprio nome host.
- **User namespace**: Isola gli ID utente e gruppo, permettendo ai processi di container di avere un set di ID utente e gruppo diverso da quello del sistema host.

### cgroups
`cgroups` permette a Docker di allocare risorse — come CPU, memoria, I/O di disco, e rete — ai container. Con cgroups, Docker può limitare e monitorare le risorse usate da ogni container per assicurare che ogni uno riceva la quantità di risorse assegnata e che un singolo container non possa consumare risorse eccessive che potrebbero degradare le performance degli altri container o dell'intero sistema. Ecco come funziona:

- **Limitazione delle risorse**: Docker può impostare limiti specifici su quante risorse un container può utilizzare. Ad esempio, si può limitare l'uso della CPU o la quantità di memoria RAM che un container può usare.
- **Monitoraggio delle risorse**: Docker può monitorare continuamente l'uso delle risorse di ciascun container, facilitando la gestione delle performance e la risoluzione dei problemi.
- **Ponderazione delle risorse**: Oltre a limitare le risorse, cgroups permette di specificare la ponderazione delle risorse. Questo significa che, quando le risorse sono contese, Docker può decidere quali container hanno priorità nell'accesso alle risorse disponibili.

In sintesi, `namespaces` e `cgroups` lavorano insieme per isolare e gestire i container in un ambiente Docker, fornendo sicurezza, efficienza e una migliore gestione delle risorse.

## Guida ai Comandi Principali di Docker

### 1. `docker run`

**Descrizione:** Esegue un comando in un nuovo container.

**Sintassi:**

```bash
docker run [opzioni] immagine [comando] [argomenti]
```

**Esempio:**

```bash
docker run hello-world
```

---

### 2. `docker pull`

**Descrizione:** Scarica un'immagine da un repository Docker.

**Sintassi:**

```bash
docker pull [opzioni] nome_immagine[:tag]
```

**Esempio:**

```bash
docker pull ubuntu:latest
```

---

### 3. `docker images`

**Descrizione:** Elenca le immagini Docker presenti sul sistema.

**Sintassi:**

```bash
docker images [opzioni]
```

**Esempio:**

```bash
docker images
```

---

### 4. `docker ps`

**Descrizione:** Elenca i container in esecuzione.

**Sintassi:**

```bash
docker ps [opzioni]
```

**Esempio:**

```bash
docker ps -a
```

_L'opzione `-a` mostra tutti i container, inclusi quelli non in esecuzione._

---

### 5. `docker stop`

**Descrizione:** Ferma uno o più container in esecuzione.

**Sintassi:**

```bash
docker stop [opzioni] NOME_CONTAINER/ID_CONTAINER
```

**Esempio:**

```bash
docker stop mio_container
```

---

### 6. `docker start`

**Descrizione:** Avvia uno o più container fermati.

**Sintassi:**

```bash
docker start [opzioni] NOME_CONTAINER/ID_CONTAINER
```

**Esempio:**

```bash
docker start mio_container
```

---

### 7. `docker rm`

**Descrizione:** Rimuove uno o più container.

**Sintassi:**

```bash
docker rm [opzioni] NOME_CONTAINER/ID_CONTAINER
```

**Esempio:**

```bash
docker rm mio_container
```

---

### 8. `docker rmi`

**Descrizione:** Rimuove una o più immagini dal sistema.

**Sintassi:**

```bash
docker rmi [opzioni] NOME_IMMAGINE/ID_IMMAGINE
```

**Esempio:**

```bash
docker rmi ubuntu:latest
```

---

### 9. `docker build`

**Descrizione:** Costruisce un'immagine Docker da un Dockerfile.

**Sintassi:**

```bash
docker build [opzioni] percorso
```

**Esempio:**

```bash
docker build -t mio_progetto:1.0 .
```

_L'opzione `-t` assegna un tag all'immagine creata._

---

### 10. `docker exec`

**Descrizione:** Esegue un comando in un container in esecuzione.

**Sintassi:**

```bash
docker exec [opzioni] NOME_CONTAINER/ID_CONTAINER comando
```

**Esempio:**

```bash
docker exec -it mio_container /bin/bash
```

_L'opzione `-it` permette l'accesso interattivo al container._

---

### 11. `docker logs`

**Descrizione:** Recupera i log di un container.

**Sintassi:**

```bash
docker logs [opzioni] NOME_CONTAINER/ID_CONTAINER
```

**Esempio:**

```bash
docker logs mio_container
```

---

### 12. `docker inspect`

**Descrizione:** Fornisce informazioni dettagliate su container o immagini.

**Sintassi:**

```bash
docker inspect NOME_CONTAINER/ID_CONTAINER
```

**Esempio:**

```bash
docker inspect mio_container
```

---

### 13. `docker push`

**Descrizione:** Carica un'immagine in un repository Docker.

**Sintassi:**

```bash
docker push NOME_IMMAGINE[:tag]
```

**Esempio:**

```bash
docker push mio_username/mia_immagine:latest
```

---

### 14. `docker tag`

**Descrizione:** Assegna un nuovo tag a un'immagine Docker.

**Sintassi:**

```bash
docker tag ID_IMMAGINE NOME_IMMAGINE[:tag]
```

**Esempio:**

```bash
docker tag 123456789abc mio_username/mia_immagine:latest
```

---

### 15. `docker network`

**Descrizione:** Gestisce le reti Docker.

**Sintassi:**

```bash
docker network [comando] [opzioni]
```

**Esempio per creare una rete:**

```bash
docker network create mia_rete
```

---

### 16. `docker volume`

**Descrizione:** Gestisce i volumi Docker.

**Sintassi:**

```bash
docker volume [comando] [opzioni]
```

**Esempio per creare un volume:**

```bash
docker volume create mio_volume
```

---

### 17. `docker-compose`

**Descrizione:** Strumento per definire ed eseguire applicazioni multi-container con Docker.

**Esempio per avviare i servizi definiti in un file `docker-compose.yml`:**

```bash
docker-compose up
```

## Descrizione di Container e Immagini in Docker

### Immagini Docker

Un'**immagine Docker** è un modello immutabile (read-only) che contiene tutto il necessario per eseguire un'applicazione, compreso il codice, le librerie, le dipendenze, i file di configurazione e le variabili d'ambiente. Le immagini sono costruite a strati utilizzando un Dockerfile, che è uno script contenente una serie di istruzioni su come assemblare l'immagine.

- **Stratificazione:** Ogni istruzione nel Dockerfile crea un nuovo strato nell'immagine. Questo approccio consente di riutilizzare gli strati comuni tra diverse immagini, ottimizzando lo spazio su disco e accelerando i tempi di build.
- **Portabilità:** Le immagini possono essere condivise attraverso registri pubblici o privati, come Docker Hub, permettendo una distribuzione semplice e consistente delle applicazioni.

### Container Docker

Un **container Docker** è un'istanza eseguibile di un'immagine Docker. I container sono ambienti isolati che eseguono un'applicazione e le sue dipendenze, utilizzando le risorse del sistema operativo host ma mantenendo un isolamento rispetto ad altri container e processi.

- **Isolamento:** I container utilizzano funzionalità del kernel come namespace e cgroups per isolare i processi, garantendo che le applicazioni non interferiscano tra loro.
- **Leggerezza:** A differenza delle macchine virtuali, i container condividono il kernel del sistema operativo host, rendendoli molto più leggeri e veloci da avviare.
- **Efficienza:** Permettono di eseguire più istanze di un'applicazione sullo stesso host senza la necessità di overhead aggiuntivo.

### Relazione tra Immagini e Container

- **Creazione di Container:** Un container viene creato a partire da un'immagine. Quando esegui `docker run`, Docker prende l'immagine specificata e la utilizza per creare e avviare un nuovo container.
- **Immutabilità vs. Mutabilità:** Le immagini sono immutabili; non cambiano una volta create. I container, invece, possono avere uno stato mutabile, ad esempio dati generati o modifiche durante l'esecuzione.
- **Persistenza dei Dati:** Se desideri che i dati generati all'interno di un container persistano oltre il ciclo di vita del container stesso, è comune utilizzare volumi o bind mounts.

## Docker run
Il comando `docker run` è uno dei comandi più fondamentali nell'uso di Docker, utilizzato per avviare nuovi container. Quando si esegue `docker run`, Docker crea un nuovo container basato su un'immagine specificata. Questo comando può essere configurato con diverse opzioni per controllare il comportamento del container. Qui di seguito, spiego alcune delle opzioni più comuni e utili che possono essere utilizzate con `docker run`.

### Formato del Comando
```bash
docker run [OPTIONS] IMAGE [COMMAND] [ARG...]
```

- **IMAGE**: L'immagine da cui il container verrà creato.
- **COMMAND**: Il comando da eseguire nel container.
- **ARG**: Argomenti supplementari per il comando.

### Opzioni Comuni

- **`-d, --detach`**: Esegue il container in background (detached mode). Questo permette di continuare a usare la shell senza essere attaccati all'output del container.

- **`--name`**: Assegna un nome al container, che altrimenti riceverebbe un nome generato automaticamente da Docker.

- **`-p, --publish`**: Pubblica le porte del container verso l'host. Il formato è `[hostPort:]containerPort`. Questo permette di accedere ai servizi che girano nel container dall'esterno della macchina Docker.

- **`--rm`**: Rimuove automaticamente il container quando esso esce. Questo è utile per mantenere pulito il sistema, rimuovendo i container non più necessari.

- **`-v, --volume`**: Monta un volume o una directory dell'host all'interno del container. Il formato è `[hostSrc:]containerDest`. Questo è utile per la persistenza dei dati o per condividere file tra host e container.

- **`-e, --env`**: Imposta una variabile di ambiente all'interno del container. È possibile definire più variabili di ambiente utilizzando più flag `-e`.

- **`--env-file`**: Legge le variabili di ambiente da un file. Questo è utile per configurare il container con un set predefinito di variabili d'ambiente senza doverle inserire manualmente ogni volta.

- **`--network`**: Connette il container a una rete specificata. Utile per configurare le comunicazioni tra container o per isolare il traffico di rete.

- **`--restart`**: Configura la politica di riavvio del container. Le opzioni comuni includono `no`, `on-failure`, `unless-stopped`, e `always`.

### Esempio Pratico
Ecco un esempio di comando `docker run` che utilizza alcune delle opzioni sopra descritte:

```bash
docker run -d --name my-webapp -p 8080:80 --rm -v /host/data:/container/data -e MY_ENV_VAR=value my-image
```

Questo comando:

1. Avvia un container in modalità background.
2. Assegna il nome `my-webapp` al container.
3. Pubblica la porta 80 del container alla porta 8080 dell'host.
4. Rimuove il container automaticamente quando esso termina.
5. Monta la directory `/host/data` dell'host in `/container/data` nel container.
6. Imposta la variabile di ambiente `MY_ENV_VAR` con il valore `value`.
7. Crea il container dall'immagine `my-image`.

[<u>back</u>](./README.md)