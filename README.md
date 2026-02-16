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
- **RxJS 7.8.0** - Programación reactiva
- **JWT Decode** - Decodificación de tokens

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

---

## ⚙️ Configuración

### Variable de Entorno (Backend)

Crear `.env` en `Backend/`:

```env
JWT_SECRET=tu_clave_super_secreta_123
PORT=3000
NODE_ENV=development
```

### Base de Datos

La base de datos SQLite se crea automáticamente en:
- `Backend/sqlite/clashRoyale.db`

No se versionan archivos `.db` en Git (configurado en `.gitignore`).

---

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
npm start
```
La aplicación estará disponible en `http://localhost:4200`

### Compilar para Producción

```bash
# Frontend
cd ClashAPP
npm run build
# Los archivos compilados estarán en ClashAPP/dist/

# Backend
# El backend ya está listo para producción
node server.js
```

---

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

---

## 🗄️ Bases de Datos

### Esquema SQLite

#### Tabla `users`
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT UNIQUE NOT NULL,
  password TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  birth_date TEXT,
  user_type TEXT,
  newsletter INTEGER DEFAULT 0,
  role TEXT NOT NULL CHECK(role IN ('usuario', 'admin')),
  clashRoyaleId TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

#### Tabla `mazos`
```sql
CREATE TABLE mazos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre VARCHAR(100) NOT NULL,
  modo_juego VARCHAR(50) NOT NULL,
  usuario_id INTEGER NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES users(id) ON DELETE CASCADE
);
```

#### Tabla `cartas_mazo`
```sql
CREATE TABLE cartas_mazo (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mazo_id INTEGER NOT NULL,
  carta_data TEXT NOT NULL,
  posicion INTEGER NOT NULL,
  FOREIGN KEY (mazo_id) REFERENCES mazos(id) ON DELETE CASCADE
);
```

---

## 🔐 Seguridad

- Las contraseñas se hashean con **BCrypt** (salt rounds: 4)
- Autenticación mediante **JWT** con expiración de 1 hora
- Tokens se almacenan en `localStorage`
- Todas las rutas protegidas requieren middleware de autenticación
- CORS configurado para desarrollo local

---

## 🧪 Testing

```bash
# Frontend
cd ClashAPP
npm test

# Backend
# Configurar y ejecutar según necesidad
```

---

## 📝 Notas Importantes

- El archivo `clashRoyale.db` no se versionará en Git
- Las credenciales y secrets deben guardarse en `.env` nunca en el código
- La API está configurada para CORS local (puerto 3000 y 4200)
- El JWT expira cada 1 hora, requiere renovación para sesiones prolongadas

---

## 🤝 Contribuidores

| Rol | Nombre |
|-----|--------|
| Instrucción | Maestro Surtich |
| Desarrollo | Los mejores desarrolladores de Angular |

---

## 📞 Soporte

Para problemas o sugerencias, contacta a través del formulario de contacto en la aplicación o crea un issue en el repositorio.

---

**Versión:** 1.0.0  
**Última actualización:** Febrero 2026  
**Licencia:** ISC
    Crear el archivo .env con API_KEY={api_key}
    `npm install`
    `npm run devStart`
 
