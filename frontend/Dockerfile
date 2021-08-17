# Multi-stage build for the React app
LABEL maintainer="Roman Podlinov"
FROM node:14.17-alpine as build

# Very important to specify correct environment for the build
# production | staging | sandbox (default)
ARG ENV=sandbox

# Update OS & certificates
RUN apk update && \
    apk upgrade && \
    apk --no-cache add ca-certificates  && \
    update-ca-certificates

RUN apk update && apk add curl git pkgconfig
RUN apk add --no-cache \
    build-base \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev
RUN apk add libx11-dev libxkbfile-dev libxkbfile-dev
RUN apk add --update python

RUN apk add libxi-dev libxext-dev

# Create a cache folder for yarn and set it
RUN mkdir -p /opt/yarn-cache && yarn config set cache-folder /opt/yarn-cache

# Create the working dir
RUN mkdir -p /opt/app

# Set the working dir
WORKDIR /opt/app

# Copy frontend files into container
COPY frontend/. .

# Without this flag Yarn will not install devDependencies if NODE_ENV=production
RUN yarn install --production=false

# Build image for the specified environment
RUN /opt/app/node_modules/.bin/env-cmd -f .env.$ENV yarn build

# Second step: copy artifacts from build into a new image
FROM nginx:alpine

RUN mkdir -p /var/app/public
COPY --from=build /opt/app/build /var/app/public
# COPY frontend/nginx.conf /etc/nginx/conf.d/default.conf
COPY frontend/nginx.conf /etc/nginx/nginx.conf
EXPOSE 4200
CMD ["nginx", "-g", "daemon off;"]
