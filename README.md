# Boilerplate: mono repository for api, frontend, redis & DB (PostgreSQL or MongoDB) in separate docker containers 

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

If you want to use docker containers in your new Javascript project this is a good start point.

> Use your preferred IDE or editor for development. Your code changes initiate hot-reload in the appropriate api and/or frontend containers
> 

For the development teams this project allows to have the same dev environment across all developers (on MacOS, Linux & Windows). 
Also, it allows to prepare the local dev environment in terms of minutes instead of hours or days.



This boilerplate provides an integrated technology stack that consists of
* [Node.js ver 14.x (LTS)](https://nodejs.org/en/) for the backend.
* [React.js](https://reactjs.org/) for the frontend
* [Docker](https://www.docker.com) for containers.
* [Docker Compose](https://docs.docker.com/compose) to run containers locally
  and during the build.
* [Redis](https://redis.io/)
* [PostgreSQL](https://www.postgresql.org/) or [MongoDB](https://www.mongodb.com/) on your choice
  
  
Contains a huge amount of best practices already implemented for you
* Preconfigured for ES2020
* Integrated [JavaScript Standard Style](https://standardjs.com/)
* Provides fast and powerful local application development in docker containers. Including:
  hot-reloading, local utilities, dev tools (linters, git hooks),
  etc.
* You can debug JS code inside container from your IDE
* 🛠 Implements a solid workflow for building, testing and deploying applications

Some of the best practices include:

* Caching dependencies for fast local builds
* Properly storage of secrets outside the code
* Linters and code style checker
* [DEBUG library](https://github.com/visionmedia/debug#readme) for easy and efficient debug messages
* Healthcheck implementations
* Source code architecture that scales
* [Create React Application](https://github.com/facebook/create-react-app) with [CRACO](https://github.com/gsoft-inc/craco) (Create React App Configuration Override)


# Table of contents

_generated with [DocToc](https://github.com/thlorenz/doctoc)_

<!-- START doctoc generated TOC please keep comment here to allow auto update -->

<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

* [Local Development](#local-development)
  * [Local development tools](#local-development-tools)
  * [Installation](#installation)
  * [Setting up the environment](#setting-up-the-environment)
  * [Running the application](#running-the-application)
  * [Customizing Style](#customizing-style)
  * [Tests](#tests)
    * [Running the tests](#running-the-tests)
    * [Creating new tests](#creating-new-tests)
  * [Connecting to the database](#connecting-to-the-database)
  * [Under the hood](#under-the-hood)
* [Application Health Check](#application-health-check)
  * [Quick health check](#quick-health-check)
  * [Long health check](#long-health-check)
* [Directory structure](#directory-structure)
  * [Troubleshooting and useful Docker commands](#troubleshooting-and-useful-docker-commands)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Local Development

### Local development tools

First, run `yarn install` in the root directory. This will install local
development tools such as `eslint` and git pre-commits to keep the code formatted
and without obvious errors.

### Installation

Local prerequisites are minimal, please follow the
[installation instructions](docs/INSTALL.md) carefully. We support Linux and MacOS;
Windows users can use Docker for Windows with several workarounds or use a Linux VM.
Review your Docker Advanced settings and consider to assign more CPUs and more memory
to the Docker process to boost performance.

### Setting up the environment

Application configuration is done by using environment variables. For local
development, inside `api` & `frontend` directories there are `.env.example` file.
Simply copy `.env.example` to `.env` and fill in your credentials as needed. The
`.env` file can be used to store sensitive / personal credentials without the
risk of checking it into source control.

### Running the application

```
$ docker/run
```

That's it! Your application is available at http://local.cleverbuild.biz:8080
(api) and http://local.cleverbuild.biz:3000 (React frontend). Both api and
frontend support hot reloading.

> On first execution, Docker must download the base container images, which
> might take a while. Subsequent executions will be faster, taking advantage of
> Docker caching and Yarn caching. See [here](docs/CACHING.md) for details about the
> caching mechanisms.

`docker/run` is the local development start script. This allows for changes made
locally to restart the node application in the most efficient and cross-platform
way. To configure the app restart, edit `nodemon.json`. `docker/run` uses
`docker-compose` to start the application and is probably how you will want to
do most of your development.

**NOTE:** Any change to `package.json` will require a full restart of the
container: you should use `CTRL+C` to stop the running Docker instance and
restart it to see your changes. To avoid that when doing simple changes (like
adding a package), you can do something like:

```bash
docker-compose run api yarn add $YOUR_PACKAGE$
```

or you can run `yarn add $YOUR_PACKAGE$` inside the container.

### Tests

#### Running the tests

```
$ docker/test
```

#### Creating new tests

**Unit tests**

Just write regular tests using `jest`. Use `describe()` and `it()` to write new
tests and test suites.

**End 2 end tests**

End to end tests are implemented using
[TestCafe](https://devexpress.github.io/testcafe/). You can find an example in
`e2e`. These tests need to be run having the containers up.

```
yarn run e2e
```

### Connecting to the database

You'll find the password in the `docker-compose.yml` file.

_From the command line_

With the containers started just do:

```
yarn run db-client
```

_Using Adminer_

Just go to `http://127.0.0.1:8081/` and fill the connection information based on
what you'll find in `docker-compose.yml`.

### Under the hood

[How it works](docker/README.md).

## Application Health Check

Each application should expose two health checks.

### Quick health check

The quick health checks is called by Kubernetes to assess the
[Liveness and Readiness](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/)
of an application; it is called approximately every 10-30 seconds, so it can not
involve any computation or resource access (database, cache, etc.) to not stress
the infrastructure. For a web application, an endpoint returning HTTP 200 is
usually the right choice.

URL: `/healthz`

### Long health check

The long health checks is called by an external service to assess the status of
the entire application stack. It is called approximately every 1 minute, so it
can involve computation and light access to external resources. The long health
check should verify the liveness of every dependent service and:

* Return HTTP 200 if everything is good.
* Return HTTP 500 and a human-readable error message if something is wrong.

Examples of controlled services:

* Simple query to assess database liveness and connectivity (`SELECT 1;`)
* Simple query to assess Redis connectivity
* Simple API call to assess external REST API liveness and connectivity

A module should also check for a consistent internal state. For example: a
email-sending worker should check for the sending queue to be less than a
certain thresholds; a workerd consuming events in a queue should check for queue
size, etc.

The long health check should be authenticated to avoid a potential DoS attack.
The secret for the long health check is passed as an environment variable to the
process (`HEALTH_CHECK_SECRET`).

URL: `/healthz/long/${process.env.HEALTH_CHECK_SECRET}`

## Directory structure

This project is setup to have multiple services in the same repository, as such
the structure of this is quite important. Each directory of this project is
intended to be for a different service and as such, those child folders should
contain all necessary components to build that service entirely.

It is important that each new service has a `Dockerfile`.

```
project
├─ docker-compose.yml
├─ package.json
├─ README.md
├─ api
│  ├─ Dockerfile
|  ├─ package.json
│  └─ src
│     ├─ file1.js
│     └─ file2.js
├─ docs
│  ├─ CACHING.md
│  ├─ INSTALL.md
│  └─ TROUBLESHOOTING.md
└─ frontend
   ├─ Dockerfile
   ├─ package.json
   └─ src
      ├─ file1.js
      └─ file2.js
```

### Troubleshooting and useful Docker commands

[Common issues](docs/TROUBLESHOOTING.md) that developers may encounter when executing
this project and useful Docker commands.


