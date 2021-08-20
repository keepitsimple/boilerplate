FROM node:14.17-alpine

EXPOSE 3000


# Update OS
RUN apk update && \
    apk upgrade && \
    apk --no-cache add ca-certificates build-base libtool autoconf automake libpng-dev zlib-dev nasm && \
    update-ca-certificates && \
    rm -fR /var/cache/apk/*

# Create a cache folder for yarn and set it
RUN mkdir -p /opt/yarn-cache && yarn config set cache-folder /opt/yarn-cache

# Create the working dir
RUN mkdir -p /opt/app
# Set the working dir
WORKDIR /opt/app
# Copy files into the working dir
COPY . .

# Install module dependencies
RUN yarn

RUN yarn build
