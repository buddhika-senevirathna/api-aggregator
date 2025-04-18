FROM node:22

WORKDIR /usr/src/

COPY package*.json ./

RUN npm install

COPY prisma ./prisma
RUN npx prisma generate

COPY . .

EXPOSE 4000

CMD ["npm", "run","dev"]
