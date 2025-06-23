# NolaTech Monorepo

Este proyecto es un **monorepo** que contiene tanto el **frontend** como el **backend** de la aplicación de NolaTech.

---

## 🗂 Estructura del proyecto

nolatech-monorepo/
├── apps/
│ ├── frontend/ # React + Vite + Tailwind + Zustand + shadcn + Socket.IO Client
│ └── backend/ # Express + Socket.IO Server
├── package.json # Monorepo con configuración de workspaces

---

## 🚀 Tecnologías principales

### Frontend:

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Zustand](https://github.com/pmndrs/zustand)
- [Socket.IO Client](https://socket.io/)

### Backend:

- [Express](https://expressjs.com/)
- [Socket.IO Server](https://socket.io/)

---

## 📦 Requisitos

- [Node.js](https://nodejs.org/) >= 18
- [npm](https://www.npmjs.com/) >= 9

---

## 📥 Instalación

1. Clona el repositorio:

   ```bash
   git clone https://github.com/japineda16/nolatech.git
   cd nolatech-monorepo
   ```

2. Instala las dependencias del monorepo:

   ```bash
    npm install
   ```

## 🧪 Desarrollo local

Para correr el entorno de desarrollo en tu máquina local:

### Iniciar solo el Frontend

```bash
npm run dev
```

### Iniciar solo el Backend

```bash
npm run dev:backend
```
