# Good Game Solution Challenge

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Goals:
- Implement task requested in the provided document
- Downtime is the enemy. Once deployed, code updates are strongly discouraged. We want this to be deployed-and-forget while still being future-proof.
- O(1) solution is preferred 

## Solution
Due to the deploy-and-forget requirement the following approaches were implemented in the project
- project is implemented as a microservice in Docker container based on Alpine linux; it allows to deploy this small container into any cloud 
- container uses Node 14 Long Term Support version 
- integrated lite, and, highly likely, the fastest Node.js logging library - PINO; it writes logs in JSON format which can be easy fed into container monitoring tools like fluentd or logstash 
- logger support different LOG levels; the LOG level can be easy controlled by container ENV variable value
- Health check ( url: `/healthCheck`) is implemented for control the web service status; the healthCheck request is _excluded_ from default logging
- used minimal amount of dependencies (this project doesn't use web frameworks, but only Node.js Core); in bigger projects it will make sense to use some web framework like Express.js, Fastify.js etc
- unit types can be changed via container ENV variable; if it needs to modify the unit types it's enough to modify this ENV variable and restart container with another value
- max size of the troop can be changed via container ENV variable

#### Additional point about using Docker container in the project

For the development teams this project allows to have the same dev environment across all developers (on MacOS, Linux & Windows).
Also, it allows to prepare the local dev environment in terms of a few minutes instead of hours.

#### Other notes
* Preconfigured for ES2020
* Integrated [JavaScript Standard Style](https://standardjs.com/) via ESLint and pre-commit hooks
* Provides fast and powerful local application development in docker containers. Including:
  hot-reloading, local utilities, dev tools (linters, git hooks),
  etc.
* You can debug node.js code inside the container from your IDE (for example MS VS Code, Jetbrains Webstorm)
* Caching dependencies (docker & yarn cache) for fast local development


### Description

The microservice implements GET request with format `/[number]` like  `/123`.

```bash
curl -v http://localhost:3001/1
curl -v http://localhost:3001/15
curl -v http://localhost:3001/536
curl -v http://localhost:3001/99999
```

Service returns JSON object with list of units and amount. something like this:

```json
{" \"Swordsmen\"":455,"[\"Spearmen\"":55," \"Archers\"]":26}

```




## How to do local development

> Use your preferred IDE or editor for development. Your code changes initiate hot-reload in the api container. 


### Local development tools

First, run `yarn install` in the root directory. This will install local
development tools such as `eslint` and git pre-commits to keep the code formatted
and without obvious errors.

### Installation

Local prerequisites are minimal, please follow the
[installation instructions](docs/INSTALL.md) carefully. We support Linux and MacOS;
Windows users can use Docker for Windows with several workarounds or use a Linux VM.
Review your Docker Advanced settings and consider assigning more CPUs and more memory
to the Docker process to boost performance.

### Setting up the environment

Application configuration is done by using environment variables. For local
development, inside `api`  directory there is `.env.example` file.
Simply copy `.env.example` to `.env` and fill it with required data. The
`.env` file can be used to store sensitive / personal credentials without the
risk of checking it into source control.

### Running the application

```
$ docker/run
```

That's it! The application is available at http://localhost:3001.

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
docker-compose run api yarn add YOUR_PACKAGE
```

or you can run `yarn add $YOUR_PACKAGE$` inside the `api` container. Use this command for start interactive shell inside the container

```bash
docker-compose exec -it api sh
```

### Tests

#### Running the tests

```
$ docker/test
```

#### Creating new tests

**Unit tests**

Just write regular tests using `jest`. Use `describe()` and `it()` to write new
tests and test suites.


### Troubleshooting and useful Docker commands

[Common issues](docs/TROUBLESHOOTING.md) that developers may encounter when executing
this project and useful Docker commands.


