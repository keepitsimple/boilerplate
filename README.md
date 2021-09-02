# Calculator challenge 
[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## Goals:
- Implement REST API as a calculator

## Solution
- API implemented as a microservice in Docker container based on Alpine linux; it allows to deploy this small container into any cloud 
- container uses Node 14 Long Term Support version 
- integrated lite, and, highly likely, the fastest Node.js logging library - PINO; it writes logs in JSON format which can be easy fed into container monitoring tools like fluentd or logstash 
- logger support different LOG levels; the LOG level can be easy controlled by container ENV variable value
- Health check ( url: `/healthCheck`) is implemented for control the web service status; the healthCheck request is _excluded_ from default logging



The microservice implements POST request with format `/api/v1/calculator`.

```bash
curl -X POST --location "http://localhost:3000/api/v1/calculator" \
    -H "Content-Type: application/json" \
    -d "{ 
          \"operator\": \"+\",
          \"operands\": {
            \"a\": 1,
            \"b\": 10
          }
        }"
```

Service returns JSON object like

```json
{ "result": 11 }
```


#### Other notes
* Preconfigured for ES2020
* Integrated [JavaScript Standard Style](https://standardjs.com/) via ESLint and pre-commit hooks
* Provides fast and powerful local application development in docker containers. Including:
  hot-reloading, local utilities, dev tools (linters, git hooks),
  etc.
* You can debug node.js code inside the container from your IDE (for example MS VS Code, Jetbrains Webstorm)
* Caching dependencies (docker & yarn cache) for fast local development



### Description


## How to do local development

> Use your preferred IDE or editor for development. Your code changes initiate hot-reload in the `api` or `frontend` container. 


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
development, inside `api` & `frontend` directories there are `.env.example` file.
Simply copy `.env.example` to `.env` and fill in your credentials as needed. The
`.env` file can be used to store sensitive / personal credentials without the
risk of checking it into source control.

### Running the application

```
$ docker/run
```

That's it! Your application is available at http://local.cleverbuild.biz:3000
(api) and http://local.cleverbuild.biz:8080 (React frontend). Both api and
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
docker-compose run api yarn add YOUR_PACKAGE
```

or you can run `yarn add $YOUR_PACKAGE$` inside the `api` container. Use this command for start interactive shell inside the container

```bash
docker-compose exec -it api sh
```

### Tests

#### Running the unit tests

Please go to the `api` folder and run

```bash
# run unit tests 1 time
yarn test:unit 

# if you want to use jest in the watch mode
yarn test:unit --watch
```

#### Creating new tests

**Unit tests**

Just write regular tests using `jest`. Use `describe()` and `it()` to write new
tests and test suites.


### Troubleshooting and useful Docker commands

[Common issues](docs/TROUBLESHOOTING.md) that developers may encounter when executing
this project and useful Docker commands.


