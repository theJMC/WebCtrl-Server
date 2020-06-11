# WebCtrl-Server

## Functionality

The `server.js` API serves two functions listed below:

### Config JSON Serving

The API serves up the equivalent JSON files in the config folder.
The current `JSON -> GET` config endpoints are:

Endpoint        | Config File
:--------------:|:----------------------------------------------:
`[GET] /api`    | [`/config/devices.json`](configs/devices.md)
`[GET] /quick`  | [`/config/actions.json`](configs/actions.md)
`[GET] /scenes` | [`/config/scenes.json`](configs/scenes.md)

### Smart Home Controllers

The Smart Home Controller Endpoints are:

Endpoint                    | Function
----------------------------|----------
[`[POST] /device`](#device)| Takes a JSON formatted body, and triggers the correct [controller file](#controllers) regarding the ID passed by the `POST` body
[`[POST] /action`](#action)| Takes a JSON formatted body, and loops through all keys, and triggers the correct [controller file](#controllers) by

## Controllers

### `/Device`

- To Be Added

### `/Action`

- To Be Added
