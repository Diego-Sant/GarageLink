# Iniciar sua imagem com uma imagem base de Node - Start your image with a Node base image
FROM node:18-alpine

# O diretório /app deve agir como a aplicação principal - The /app directory should act as the main application
WORKDIR /app

# Copie o arquivo package.json e package-lock.json da aplicação - Copy the package.json and package-lock.json file
COPY package*.json ./

# Instalar os pacotes do Node - Install Node packages
RUN npm install

# Copia o resto dos arquivos da aplicação - Copy the rest of the application files
COPY ./src ./src
COPY ./public ./public
COPY ./tailwind.config.js ./tailwind.config.js

# Construir o Tailwind CSS e enviar para o diretório público - Build Tailwind CSS and output to the public directory
RUN npx tailwindcss -o ./public/index.css

# Expor a porta do servidor de desenvolvimento - Expose the development server port
EXPOSE 3001

# Iniciar o aplicativo em modo de desenvolvimento - Start the app in development mode
CMD ["npm", "start"]