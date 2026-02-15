# Módulo Mis Mazos - Clash Royale APP

## Archivos Creados/Actualizados

### Backend
- **`Backend/BACKEND_ENDPOINTS_MAZOS.js`**: Endpoints para la gestión de mazos
- **`Backend/schema_mazos.sql`**: Esquema de base de datos para mazos y cartas

### Frontend  
- **`ClashAPP/src/app/components/mis-mazos/`**: Componente actualizado con sintaxis moderna @if()

## Base de Datos

Para configurar la base de datos, ejecuta el script SQL:

```bash
cd Backend
sqlite3 tu_base_de_datos.db < schema_mazos.sql
```

### Tablas creadas:
1. **`mazos`**: Información de los mazos del usuario
2. **`cartas`**: Catálogo de cartas disponibles  
3. **`cartas_mazo`**: Relación entre mazos y cartas (8 cartas por mazo)

## Endpoints Backend

### Autenticación requerida
Todos los endpoints requieren JWT token en header:
```
Authorization: Bearer <tu_jwt_token>
```

### Endpoints disponibles:

#### 1. `GET /api/mazos`
Obtiene todos los mazos del usuario autenticado

**Respuesta:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "nombre": "Mazo Hog 2.6", 
      "modoJuego": "Escalera",
      "cartas": [
        {"id": "knight", "nombre": "Caballero", "coste": 3, ...},
        // ... 7 cartas más
      ],
      "createdAt": "2024-01-01T10:00:00Z",
      "updatedAt": "2024-01-01T10:00:00Z"
    }
  ]
}
```

#### 2. `POST /api/mazos` 
Crea un nuevo mazo

**Body:**
```json
{
  "nombre": "Mi Mazo",
  "modoJuego": "Escalera", 
  "cartas": [
    {"id": "knight"}, 
    {"id": "archers"},
    // ... exactamente 8 cartas
  ]
}
```

#### 3. `PUT /api/mazos/:id`
Actualiza un mazo existente

**Body:** Igual que POST (campos opcionales)

#### 4. `DELETE /api/mazos/:id`
Elimina un mazo del usuario

## Integración en el Backend Principal

Para integrar los endpoints en tu `server.js` principal:

```javascript
const express = require('express');
const app = express();

// Importa el middleware de autenticación JWT
const authMiddleware = require('./middleware/auth');

// Configura la base de datos (SQLite en este ejemplo)
const Database = require('better-sqlite3');
const db = new Database('clash_royale.db');

// Importa y usa las rutas de mazos
const mazosRoutes = require('./BACKEND_ENDPOINTS_MAZOS');
app.use('/api', mazosRoutes);

// ... resto de tu configuración
```

## Frontend - Cambios Realizados

### Sintaxis Moderna Angular (@if)
Se actualizó el componente `mis-mazos` para usar la nueva sintaxis de control de flujo:

**Antes (Angular <17):**
```html
<div *ngIf="loading">Cargando...</div>
```

**Después (Angular 17+):**
```html
@if (loading) {
  <div>Cargando...</div>
}
```

### Beneficios de @if():
- ✅ Mejor rendimiento
- ✅ Sintaxis más limpia  
- ✅ Mejor tree-shaking
- ✅ TypeScript más estricto

## Dependencias Requeridas

### Backend:
```json
{
  "better-sqlite3": "^8.0.0",
  "jsonwebtoken": "^9.0.0", 
  "express": "^4.18.0"
}
```

### Frontend:
- Angular 17+ (para sintaxis @if)
- Reactive Forms
- HTTP Client

## Estructura de Archivos

```
Backend/
├── BACKEND_ENDPOINTS_MAZOS.js   # Endpoints API
├── schema_mazos.sql             # Esquema BD
└── middleware/
    └── auth.js                  # Middleware JWT (crear)

ClashAPP/src/app/components/
└── mis-mazos/
    ├── mis-mazos.component.ts    # Lógica del componente
    ├── mis-mazos.component.html  # Template (actualizado @if)
    └── mis-mazos.component.css   # Estilos
```

## Próximos Pasos

1. **Configurar JWT**: Implementar middleware de autenticación
2. **Datos iniciales**: Poblar tabla `cartas` con cartas reales de Clash Royale
3. **Imágenes**: Añadir imágenes de cartas en `/images/cartas/`
4. **Testing**: Crear tests para endpoints y componente
5. **Validaciones**: Añadir validaciones de negocio (coste total elixir, etc.)

## Notas Técnicas

- **Transacciones**: Se usan transacciones SQLite para mantener consistencia
- **Validación**: Se valida que cada mazo tenga exactamente 8 cartas
- **Seguridad**: Cada usuario solo puede ver/modificar sus propios mazos
- **Rendimiento**: Índices añadidos para consultas frecuentes