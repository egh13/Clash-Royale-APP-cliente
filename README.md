# 🎮 Clash Royale APP

Una aplicación web moderna para gestionar mazos y cartas de Clash Royale con funcionalidades avanzadas de usuario, perfil y ranking.

**Desarrolladores:** Los mejores desarrolladores de Angular bajo la instrucción del maestro Surtich

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración](#configuración)
- [Uso](#uso)
- [API Endpoints](#api-endpoints)
- [Bases de Datos](#bases-de-datos)
- [Contribuidores](#contribuidores)

---

## ✨ Características

- **Autenticación y Autorización:** Sistema de login/registro con JWT y hash de contraseñas
- **Gestión de Mazos:** Crear, editar y eliminar mazos personalizados
- **Catálogo de Cartas:** Visualizar y buscar cartas de Clash Royale
- **Perfiles de Usuario:** Gestionar información personal y preferencias
- **Ranking/Leaderboard:** Visualizar clasificación de usuarios
- **Interfaz Responsiva:** Diseño moderno con Angular Material
- **Sistema de Notificaciones:** Toasts para retroalimentación al usuario
- **Quiz Interactivo:** Pruebas sobre conocimientos de Clash Royale
- **Contacto:** Formulario de contacto integrado

---

## 🛠 Tecnologías

### Frontend
- **Angular 20.3.0** - Framework de aplicación web
- **TypeScript 5.9.2** - Lenguaje de programación
- **Angular Material 20.2.14** - Componentes UI

### Backend
- **Node.js + Express 5.1.0** - Servidor web
- **SQLite 3** - Base de datos (better-sqlite3)
- **BCrypt** - Hash seguro de contraseñas
- **JWT** - Autenticación basada en tokens
- **CORS** - Compartir recursos entre orígenes
- **Nodemon** - Recarga automática en desarrollo

---

## 📦 Requisitos Previos

- Node.js (v18 o superior)
- npm (v9 o superior)
- Angular CLI (v20 o superior)
- Git

```bash
# Verificar versiones instaladas
node --version
npm --version
ng version
```

---

## 🚀 Instalación

### 1. Clonar el Repositorio

```bash
git clone <url-repositorio>
cd Clash-Royale-APP-cliente
```

### 2. Instalar Backend

```bash
cd Backend
npm install
```

### 3. Instalar Frontend

```bash
cd ../ClashAPP
npm install
```

### 4. Configurar Variables de Entorno

Crear archivo `.env` en la carpeta `Backend`:

```env
API_KEY=tu_clave_de_clash_royale_proxy_api
JWT_SECRET=tu_clave_secreta_aqui
NODE_ENV=development
```

---

## 📁 Estructura del Proyecto

```
Clash-Royale-APP-cliente/
├── README.md
├── Backend/
│   ├── package.json
│   ├── server.js
│   ├── sqlite/
│   │   └── db.js                 # Conexión y esquema de BD
│   ├── middleware/
│   │   └── auth.middleware.js    # Validación de tokens JWT
│   ├── routes/
│   │   ├── usuarios.js           # Login, Register
│   │   ├── mazos.js              # Operaciones CRUD de mazos
│   │   └── developerApi.js       # APIs externas
│   └── node_modules/
│
└── ClashAPP/                     # Aplicación Angular
    ├── package.json
    ├── angular.json
    ├── tsconfig.json
    ├── public/
    │   ├── CartasRoyale/         # Imágenes de cartas
    │   ├── Carrousel/
    │   ├── AudiosRoyale/
    │   └── GifRoyale/
    └── src/
        ├── index.html
        ├── main.ts
        ├── styles.css
        ├── app/
        │   ├── app.config.ts
        │   ├── app.routes.ts
        │   ├── app.ts             # Componente raíz
        │   ├── components/        # Componentes reutilizables
        │   │   ├── card-catalog/
        │   │   ├── carousel/
        │   │   ├── contacto/
        │   │   ├── footer/
        │   │   ├── header/
        │   │   ├── index/
        │   │   ├── leaderboard/
        │   │   ├── login/
        │   │   ├── mazos/
        │   │   ├── mis-mazos/
        │   │   ├── profile/
        │   │   ├── quiz/
        │   │   ├── register/
        │   │   ├── sidebar/
        │   │   ├── toast/
        │   │   └── user/
        │   ├── guards/            # Guards de rutas
        │   │   └── auth-guard.ts
        │   ├── interceptors/      # Interceptores HTTP
        │   │   └── jwt.interceptor.ts
        │   ├── interfaces/        # Interfaces TypeScript
        │   │   └── mazo.interface.ts
        │   └── services/          # Servicios compartidos
        │       ├── auth-service.ts
        │       ├── card-catalog.service.ts
        │       ├── cartas.service.ts
        │       ├── leaderboard.service.ts
        │       ├── mazos.service.ts
        │       ├── profile-service.ts
        │       ├── toast-service.ts
        │       ├── user-service.ts
        │       └── global-error-handler.ts
        └── node_modules/
```

## 💻 Uso

### Iniciar la Aplicación (Desarrollo)

#### Terminal 1 - Backend
```bash
cd Backend
npm run devStart
```
El servidor estará disponible en `http://localhost:3000`

#### Terminal 2 - Frontend
```bash
cd ClashAPP
ng serve
```
La aplicación estará disponible en `http://localhost:4200`

## 🔌 API Endpoints

### Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/usuarios/register` | Registrar nuevo usuario |
| POST | `/api/usuarios/login` | Iniciar sesión |
| GET | `/api/usuarios/me` | Obtener datos del usuario actual |
| PUT | `/api/usuarios/:id` | Actualizar perfil de usuario |

### Mazos

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/mazos` | Obtener todos los mazos del usuario |
| GET | `/api/mazos/:id` | Obtener un mazo específico |
| POST | `/api/mazos` | Crear nuevo mazo |
| PUT | `/api/mazos/:id` | Actualizar un mazo |
| DELETE | `/api/mazos/:id` | Eliminar un mazo |

### Cartas

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/cartas` | Obtener catálogo de cartas |
| GET | `/api/cartas/:id` | Obtener detalles de una carta |

### Leaderboard

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| GET | `/api/leaderboard` | Obtener ranking de usuarios |
