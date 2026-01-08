# Cat API - Backend con Node.js, Express & MongoDB 🐈

¡Hola! Este es el backend para una aplicación web diseñada para explorar el fascinante mundo de los gatos. Permite consultar razas, buscar imágenes y gestionar usuarios, todo a través de una API RESTful bien estructurada.

El proyecto está construido con **TypeScript** y sigue principios de **Arquitectura Limpia (Clean Architecture)** y **SOLID**, lo que lo hace escalable, mantenible y fácil de testear.

## 🚀 Levantando el Proyecto

Para poner en marcha el servidor en tu máquina local, solo sigue estos pasos.

### Prerrequisitos

Asegúrate de tener instalado lo siguiente:
* [Node.js](https://nodejs.org/) (versión 18 o superior)
* [npm](https://www.npmjs.com/) (usualmente viene con Node.js)
* Una instancia de [MongoDB](https://www.mongodb.com/try/download/community) corriendo (local o en la nube como MongoDB Atlas).

### Pasos de Instalación

1.  **Clona este repositorio:**
    ```bash
    git clone <URL_DEL_REPOSITORIO>
    cd cat-api-backend
    ```

2.  **Instala las dependencias:**
    Este comando leerá el `package.json` e instalará todo lo necesario.
    ```bash
    npm install
    ```

3.  **Configura las variables de entorno:**
    Crea un archivo llamado `.env` en la raíz del proyecto. Puedes copiar el contenido de `.env.example` como base.
    ```bash
    # En Windows (PowerShell)
    copy .env.example .env

    # En Linux / macOS
    cp .env.example .env
    ```
    Luego, abre el archivo `.env` y edita las variables con tus propias claves.

4.  **¡Arranca el servidor!**
    Este comando inicia el servidor en modo de desarrollo, que se reiniciará automáticamente cada vez que hagas un cambio en el código.
    ```bash
    npm run dev
    ```

¡Y listo! Si todo ha ido bien, verás un mensaje en la consola indicando que el servidor está corriendo en `http://localhost:3000`.

## 🔑 Variables de Entorno (`.env`)

El archivo `.env` es fundamental para la configuración y la seguridad. **Nunca lo subas a un repositorio de Git.**

Aquí tienes el contenido que debe tener:
```
# URI de conexión a tu base de datos MongoDB
MONGO_URI=mongodb://localhost:27017/catApp

# Tu API Key de TheCatAPI (puedes usar esta o generar una nueva)
THE_CAT_API_KEY=live_JBT0Ah0Nt12iyl2IpjQVLDWjcLk0GQwf4zI9wBMfmfejKmcC31mOJp4yJz5TsOUP

# Una clave secreta para firmar los JSON Web Tokens (JWT) de autenticación
# ¡Cámbiala por algo largo y aleatorio!
JWT_SECRET=esteEsUnSecretoSuperDificilDeAdivinar
```

## Endpoints de la API

La API está organizada por módulos. Aquí tienes un resumen de las rutas disponibles.

*(La URL base para todas las rutas es `http://localhost:3000/api`)*

### Módulo de Gatos (`/breeds`)

| Método | Ruta                 | Descripción                                   |
| :----- | :------------------- | :-------------------------------------------- |
| `GET`    | `/breeds`            | Devuelve una lista de todas las razas de gatos. |
| `GET`    | `/breeds/:breed_id`  | Devuelve los detalles de una raza específica.   |
| `GET`    | `/breeds/search?q=`  | Busca razas que coincidan con un término.     |

### Módulo de Imágenes (`/images`)

| Método | Ruta                   | Descripción                                  |
| :----- | :--------------------- | :------------------------------------------- |
| `GET`    | `/images/by-breed?breed_id=` | Devuelve 10 imágenes de una raza específica. |

### Módulo de Usuarios (`/users`)

| Método | Ruta                 | Descripción                                       |
| :----- | :------------------- | :------------------------------------------------ |
| `POST`   | `/users/register`    | Registra un nuevo usuario en la base de datos.    |
| `POST`   | `/users/login`       | Autentica a un usuario y devuelve un token JWT.   |

**Ejemplo de Body para `/users/register`:**
```json
{
    "name": "Gato con Botas",
    "email": "gato.con.botas@example.com",
    "password_raw": "espadaSecreta123"
}
```

**Ejemplo de Body para `/users/login`:**
```json
{
    "email": "gato.con.botas@example.com",
    "password_raw": "espadaSecreta123"
}
```

## 🏗️ Arquitectura y Estructura

El proyecto no está hecho a la ligera 😉. Sigue una **Arquitectura Limpia** para separar responsabilidades. La idea principal es que el núcleo del negocio no dependa de detalles externos como la base de datos o el framework web.

* **`src/domain`**: Contiene la lógica y las reglas de negocio más puras. Aquí viven las entidades (`User`, `CatBreed`) y las interfaces de los repositorios. No sabe nada de Express o MongoDB.
* **`src/application`**: Orquesta los casos de uso (los "Servicios"). Actúa como un puente entre el dominio y la infraestructura.
* **`src/infrastructure`**: Contiene todo lo que cambia y depende de herramientas externas: los controladores de Express, la conexión a MongoDB, el cliente para TheCatAPI, etc.

## 🧪 Pruebas

Para asegurarte de que todo funciona como se espera, puedes correr la suite de pruebas unitarias.

```bash
npm test
```

## 🔧 Scripts Disponibles

En el `package.json` encontrarás los siguientes scripts:

* `npm run dev`: Inicia el servidor en modo desarrollo con `ts-node-dev`.
* `npm run build`: Compila el código de TypeScript a JavaScript en la carpeta `/dist`.
* `npm start`: Ejecuta el código compilado de la carpeta `/dist` (para producción).
* `npm test`: Ejecuta las pruebas con Jest.