# DevOpsNodeWebApp

> [!NOTE]
> **Lernjournal Woche 5: Dockerfile und eigene Docker Images erstellen - Eine minimale Node.js Express-Anwendung für Container-Virtualisierung!
> **Kontext**: Dieses Repository löst **Schritt 8** aus dem [DevOps 04 Containers Lernjournal](https://github.com/blobb3/DevOps-04-Containers.git) - "Dockerfile - Eigene Images erstellen".

---

## 📋 Inhaltsverzeichnis

- [Projektübersicht](#-projektübersicht)
- [Schnellstart](#-schnellstart)
- [Dockerfile verstehen](#-dockerfile-verstehen)
- [Lokale Entwicklung](#-lokale-entwicklung)
- [Docker Build & Run](#-docker-build--run)
- [Features & Easter Eggs](#-features--easter-eggs)
- [API-Endpoints](#-api-endpoints)

---

## 🎯 Projektübersicht

Diese **minimale Node.js Express-Anwendung** wurde als praktisches Beispiel für **Dockerfile-Erstellung und Container-Virtualisierung** entwickelt. Das Projekt ist Teil des **DevOps-Lernjournal Woche 5** und demonstriert, wie eigene Docker Images erstellt werden.

**Hauptzweck:**
- **Dockerfile-Konzepte** praktisch erlernen
- **Docker Build-Prozess** verstehen
- **Container-Deployment** hands-on erleben
- **Multi-Stage Development** (lokal vs. containerisiert)

---

## 🚀 Schnellstart

### Voraussetzungen
- **Docker** installiert und läuft
- **Node.js** (optional, für lokale Entwicklung)
- **Terminal/Command Line** Zugang

### Mit Docker (empfohlen)

**1. Repository klonen:**
```bash
git clone https://github.com/blobb3/DevOpsNodeWebApp.git
cd DevOpsNodeWebApp
```

**2. Docker Image bauen:**
```bash
docker build -t heinejan/node-web-app .
```

**3. Container starten:**
```bash
docker run -p 3001:8080 --name expressapp -d heinejan/node-web-app
```

**4. Anwendung öffnen:**
- Browser: `http://localhost:3001`
- Die Web-App sollte nun laufen! 🎉

---

## 📦 Dockerfile verstehen

Das **Herzstück** dieses Projekts ist das Dockerfile, das präzise definiert, wie der Container aufgebaut wird:

```dockerfile
FROM node:22.15.0

# Create app directory
WORKDIR /usr/src/app

# Copy app
COPY . .

# Install
RUN npm install

# Docker Run Command
EXPOSE 8080
CMD [ "node", "server.js" ]
```

### Schritt-für-Schritt Erklärung:

| **Befehl** | **Zweck** | **Details** |
|------------|-----------|-------------|
| `FROM node:22.15.0` | **Basis-Image** | Verwendet vorgefertigtes Node.js-Image als Fundament |
| `WORKDIR /usr/src/app` | **Arbeitsverzeichnis** | Legt Arbeitsordner im Container fest |
| `COPY . .` | **Dateien kopieren** | Kopiert alle Projektdateien in den Container |
| `RUN npm install` | **Dependencies installieren** | Installiert Express und andere Abhängigkeiten |
| `EXPOSE 8080` | **Port dokumentieren** | Deklariert, dass Container auf Port 8080 lauscht |
| `CMD ["node", "server.js"]` | **Startbefehl** | Definiert, was beim Container-Start ausgeführt wird |

> [!TIP]
> **Build-Kontext**: Der Punkt (`.`) am Ende von `docker build -t name .` gibt das aktuelle Verzeichnis als Build-Kontext an - dort sucht Docker nach dem Dockerfile und den zu kopierenden Dateien.

---

## 🔧 Lokale Entwicklung

**Für Entwicklung ohne Docker:**

**1. Dependencies installieren:**
```bash
npm install
```

**2. Server starten:**
```bash
npm start
# oder direkt:
node server.js
```

**3. Anwendung testen:**
- Browser: `http://localhost:8080`

### package.json Details:

```json
{
  "name": "express-web-app",
  "version": "1.0.0",
  "description": "Node.js on Docker",
  "author": "First Last <first.last@example.com>",
  "main": "server.js",
  "scripts": {
    "start": "node server.js"
  },
  "dependencies": {
    "express": "^4.18.2"
  }
}
```

---

## Docker Build & Run

### Erweiterte Docker-Befehle:

**Image Details anzeigen:**
```bash
docker images heinejan/node-web-app
```

**Container-Logs anzeigen:**
```bash
docker logs expressapp
```

**Container stoppen:**
```bash
docker stop expressapp
```

**Container entfernen:**
```bash
docker rm expressapp
```

**Image entfernen:**
```bash
docker rmi heinejan/node-web-app
```

### Port-Mapping verstehen:
```bash
docker run -p 3001:8080 --name expressapp -d heinejan/node-web-app
#         ↑         ↑
#    Host-Port  Container-Port
```

- **Host-Port 3001**: Zugriff von aussen (Browser)
- **Container-Port 8080**: Interne Anwendung (Express Server)

---

## ✨ Features & Easter Eggs

Diese Express-Anwendung wurde mit **interaktiven Elementen** erweitert:

### 🎯 Basis-Features:
- **Einfacher Web-Server** mit Express
- **HTML-Struktur** statt reiner Text-Ausgabe
- **Responsive Design** mit CSS-Styling

### 🎪 Erweiterte Features:
- **📊 Besucherzähler**: Server-seitig implementiert, zählt alle Requests
- **🎨 Reaktives Styling**: CSS-Übergänge basierend auf Besucherstatistiken
- **🥚 Easter Egg**: Aktiviert sich nach jeder **9. Anfrage**
- **🚪 Versteckter Endpunkt**: `/mellon` - nur für Kenner!

---

## 📝 API-Endpoints

| **Endpoint** | **Methode** | **Beschreibung** | **Response** |
|--------------|-------------|------------------|--------------|
| `/` | GET | Hauptseite mit Besucherzähler | HTML-Seite |
| `/mellon` | GET | Versteckter Endpunkt für Kenner | Spezielle Nachricht |

### server.js Struktur:

```javascript
'use strict';

const express = require('express');

// Constants
const PORT = 8080;
const HOST = '0.0.0.0';

// App
const app = express();

// Besucherzähler (Server-State)
let visitCount = 0;

app.get('/', (req, res) => {
  visitCount++;
  
  // Easter Egg Logic (alle 9 Requests)
  const isEasterEgg = visitCount % 9 === 0;
  
  // HTML Response mit dynamischem Content
  res.send(generateHTML(visitCount, isEasterEgg));
});

app.get('/mellon', (req, res) => {
  res.send('🚪 Welcome, friend! You found the secret door!');
});

app.listen(PORT, HOST);
console.log(`Running on http://${HOST}:${PORT}`);
```

## 🎯 Fazit

Dieses **DevOpsNodeWebApp-Projekt** demonstriert ein **Basis-Konzept der Container-Virtualisierung**:

- **Dockerfile-Erstellung** von Grund auf
- **Build- und Run-Prozesse** verstehen
- **Port-Mapping** und Container-Isolation
- **Entwicklungsworkflow** mit Docker

> [!IMPORTANT]
> **Praktische Erfahrung** mit Docker-Containerisierung ist essentiell für DevOps-Workflows. Dieses Projekt bietet eine **solide Grundlage** für komplexere Container-Szenarien.

**Was erreicht wurde:**
- ✅ Eigenes Docker Image erstellt
- ✅ Container erfolgreich deployed
- ✅ Interaktive Web-Anwendung containerisiert
- ✅ Build-Prozess dokumentiert und verstanden

**Das Projekt zeigt**: Auch einfache Anwendungen profitieren von **Containerisierung** - konsistente Deployments, Isolierung und Portabilität machen den Entwicklungsworkflow **effizienter und zuverlässiger**.

---

*Erstellt als Teil des DevOps-Lernjournal Woche 5 - Container-Virtualisierung mit Docker* 
