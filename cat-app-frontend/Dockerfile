# --- ETAPA 1: Construcción (Builder) ---
# Usamos una imagen oficial de Node.js como base. Alpine es una versión ligera.
FROM node:20-alpine AS builder

# Establecemos el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiamos package.json y package-lock.json primero para aprovechar el caché de Docker
COPY package*.json ./

# Instalamos las dependencias del proyecto
RUN npm install

# Copiamos el resto del código fuente de la aplicación
COPY . .

# Construimos la aplicación para producción. La salida estará en /app/dist/cat-app-frontend
RUN npm run build

# --- ETAPA 2: Producción (Server) ---
# Usamos una imagen oficial de Nginx, súper ligera y optimizada para servir contenido estático.
FROM nginx:stable-alpine

# Copiamos los archivos construidos de la etapa 'builder' al directorio web raíz de Nginx
# Asegúrate de que "cat-app-frontend" coincida con el nombre de tu proyecto en angular.json
COPY --from=builder /app/dist/cat-app-frontend /usr/share/nginx/html

# Copiamos nuestro archivo de configuración personalizado de Nginx
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80, que es el puerto por defecto de Nginx
EXPOSE 80

# El comando para iniciar Nginx ya viene incluido en la imagen base, no necesitamos un CMD.