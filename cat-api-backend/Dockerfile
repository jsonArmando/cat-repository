# --- ETAPA 1: Construcción (Builder) ---
# Usamos una imagen de Node.js para instalar dependencias y compilar el TypeScript.
FROM node:20-alpine AS builder

# Establecemos el directorio de trabajo
WORKDIR /app

# Copiamos los archivos de definición del proyecto
COPY package*.json ./

# Instalamos TODAS las dependencias, incluyendo las de desarrollo (como typescript)
RUN npm install

# Copiamos todo el código fuente del proyecto
COPY . .

# Ejecutamos el script de build (que compila de TypeScript a JavaScript en la carpeta /dist)
RUN npm run build

# --- ETAPA 2: Producción (Production) ---
# Empezamos desde una imagen fresca de Node.js para no arrastrar archivos innecesarios.
FROM node:20-alpine

WORKDIR /app

# Copiamos los package.json de la etapa anterior
COPY --from=builder /app/package*.json ./

# Instalamos SOLAMENTE las dependencias de producción, omitiendo las de desarrollo.
# Esto hace que la imagen final sea mucho más ligera.
RUN npm install --production

# Copiamos el código JavaScript ya compilado desde la etapa 'builder'
COPY --from=builder /app/dist ./dist

# Exponemos el puerto en el que corre nuestra API (usualmente 3000)
EXPOSE 3000

# El comando para iniciar la aplicación en producción.
# Ejecuta directamente el archivo de entrada compilado con Node.
CMD [ "node", "dist/main.js" ]