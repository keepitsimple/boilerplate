## MacOS

- Install the new [Docker for MAC](http://www.docker.com/products/docker#/mac).
- To test if your configuration is correct, run `docker ps`. You should see something like:

    ```
    $ docker ps
    CONTAINER ID        IMAGE
    ```

- You can adjust Docker resource usage clicking on the Docker icon -> Preferences -> Advanced.

If you have troubles, please contact DevOps.

## Linux

- [Install](https://docs.docker.com/engine/installation/) Docker. You don't need `Docker Machine` on Linux.
- [Allow](https://docs.docker.com/v1.4/installation/ubuntulinux/#giving-non-root-access) your non-root user to control `docker`.
- [Install](https://docs.docker.com/compose/install/) Docker Compose.

To test if your configuration is correct, run `docker ps`. You should see something like:

```bash
$ docker ps
CONTAINER ID        IMAGE
```


## Windows

While it's suboptimal,  it's possible to run this Docker stack in Windows.

