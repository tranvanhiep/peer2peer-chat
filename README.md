# Peer2Peer chat app

## Features

- Send text message
- Send attachment (all kind of file)

## Warning

- No security. You should use it locally or on the intranet only
- The app do not store any information except the name for identification between users, so once refreshed, everything is gone (except the name)
- There seems to be incompability between **vite** and **socket.io**, so it will not work in development mode
  - vite: 3.1.0
  - socket.io: 4.5.3
  - node: 16.16.0

## Usage

### Development mode

- Run app:

```shell
npm run dev
```

- Run API:

```shell
npm run dev:server
```

- Run API with VS Code debugging:

  1. Select `nodemon` debugger in list of config
  2. Press `F5`

  More information about VS Code debugging [here](https://code.visualstudio.com/docs/editor/debugging)

### Production Mode

- Run both app and API:

```shell
npm run start
```

- Access the link in the terminal log which has pattern `<IP>:<port>` then starting using the app. For example: `192.168.1.1:8080`

## Inspiration

- The UI is inspired by [Messages by Google](https://messages.google.com/web/)
