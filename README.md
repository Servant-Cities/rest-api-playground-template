# REST Playground template

This is a REST API playground template running a REST API over a [JSON database](https://www.npmjs.com/package/node-json-db).

It comes with a JSON editor which you can use to overide the database.

This project is initally intended to create and improve different datasets for differents use case scenario by mocking the behavior of an headless CMS or API protocol and preview how different frontends react to each datasets.

See Roadmap

## Use locally

Install the dependencies and run locally.
```
cd playground
yarn
yarn dev
```

It will run a Sveltekit app on port 5173 by default. 
NB: If you have another app running on this port, it will jump to the next port available.

## Interface

Open your browser on http://localhost:5173 (or other port) in order to be able to edit the content of the whole database in JSON format.

There is a default database showing the expected base structure.

![Screenshot of the JSON editor](https://github.com/Servant-Cities/rest-api-playground-template/blob/main/static/doc/editor.png?raw=true)

Resources are stored in collections (JSON array) and uniquely identified by the property "id" which you should use to GET, PUT and DELETE specific resources.

You can create new collections using the browser graphical interface only, creating new collections trough REST API is not possible using the template.


## REST API

![REST API in action as documented in this README](https://github.com/Servant-Cities/rest-api-playground-template/blob/main/static/doc/api.png?raw=true)

REST endpoints are exposed by http://localhost:5173/api.

There are two endpoints with 3 different methods each:

```
/api/[collection-name]
GET: loads the collection array
POST: pushes a new resource in the collection array
DELETE: permanently delete the collection
```
```
/api/[collection-name]/[resource-id]
GET: loads the resource if it exists
PUT: overides the resource with new data if it exists
DELETE: permanently delete the resource if it exists
```

Please be aware:
- Search params are not supported.
- PUT and POST methods expect JSON format
- It is technicaly possible to overide a resource's id, which you should normaly avoid
- creating resources using PUT is not supported

Feel free to update the code of your playground to add more endpoints and fit your own needs.

## GIT

Be aware the database is not ignored in the git repository, this is intended since the playgound repo is designed to evolve with different supported collections.

While this template is very agnostic, the expected adaptation of the template is to create a version tracking of different datasets for different use cases, as well as the APIs and typing the come with them.

## Typing

There is an exemple of how you can use zod and superforms to type your collections.

The JSON validator for "body" can be extended to actually parse the body add validators for each collections.

You can then use the supervalidate function to type the data in you endpoints.

The expected use is to call supervalidate on the request's body in POST and PUT methods, and on the data object loaded from the JSON database in the GET method.

It is eventually up to you to use any typing and validation solution you like an fully remove the existing ones.

## Features and Roadmap

The following features will be developped based on another project's needs but please let me know if you would like some more work done on this template.

- [x] Persistant dataset
- [x] REST API
- [ ] Frontend preview
- [ ] Multiple datasets support
- [ ] Multiple frontends support
- [ ] Connect to a production app for in context preview
- [ ] Localized datasets
- [ ] Embeded S3
- [ ] Docker instalation
- [ ] Dataset volumes

## License

Please respect [the project's license](https://github.com/Servant-Cities/rest-api-playground-template/blob/main/LICENSE)