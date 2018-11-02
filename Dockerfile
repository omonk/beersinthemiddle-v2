## STAGE 1

# install node
FROM mhart/alpine-node:10 as base

# Create working dir and add everything to it
WORKDIR /app
COPY package.json package-lock.json /app/

# Get our deps
RUN npm install
COPY . .
RUN npm run build && npm install --production

## STAGE 2
FROM mhart/alpine-node:base-10
WORKDIR /app
COPY --from=base /app .
ENV NODE_ENV="production"

# Open the port
EXPOSE 4000

# Set ENV variables for Node server

CMD ["node", "./server/app.js"]
