# REST Playground template

This is a REST API playground template running a REST API over a [JSON database](https://www.npmjs.com/package/node-json-db).

It comes with a JSON editor which you can use to overide the database.

This project is initally intended to create and improve different datasets for differents use case scenario by mocking the behavior of an headless CMS or API protocol and preview how different frontends react to each datasets.

You can create a database using [our online demo](https://demo-rest-playground.servantcities.eu/new) to quickly test it with limited privileges or try [deploying your own instance](https://github.com/Servant-Cities/rest-api-playground-template?tab=readme-ov-file#deploying)

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

Open your browser on http://localhost:5173 (or other port used by the previous command) in order to be able to edit the content of the whole database in JSON format.

There is a default database showing the expected base structure.

![Screenshot of the JSON editor](https://github.com/Servant-Cities/rest-api-playground-template/blob/main/static/doc/editor.png?raw=true)

Resources are stored in collections (JSON array) and uniquely identified by the property "id" which you should use to GET, PUT and DELETE specific resources.

Please be aware that modifying the JSON file will not update the database until you restart the development server, but it will if you do it using the app.

The current content of the database is tutorial data you can read to understand the different features of this app, you can start reading it from the Collections view or directly in the database editor and skip this dog if want to quickly get your hands on the playground.


## REST API

![REST API in action as documented in this README](https://github.com/Servant-Cities/rest-api-playground-template/blob/main/static/doc/api.png?raw=true)

REST endpoints are exposed by http://localhost:5173/api.

There are two endpoints with 3 different methods each:

```
/api/REST/[collection-name]
GET: loads the collection array
POST: pushes a new resource in the collection array
DELETE: permanently delete the collection
```
```
/api/REST/[collection-name]/[resource-id]
GET: loads the resource if it exists
PUT: overides the resource with new data if it exists
DELETE: permanently delete the resource if it exists
```

Please be aware:
- Search params are not supported.
- PUT and POST methods expect JSON format
- It is technicaly possible to overide a resource's id, which you should normaly avoid
- Creating resources using PUT is not supported
- If authentication is activated, you need to send an Authorization header: 'Bearer your-secret'

Feel free to update the code of your playground to add more endpoints and fit your own needs.

## Direct API

We have a minimal API to update the database trough http requests. Check [/api/direct](https://github.com/Servant-Cities/rest-api-playground-template/blob/main/src/routes/api/direct/%5B...path%5D/%2Bserver.ts) to see what you can do and feel free to add more endpoints to fit your needs.

If authentication is activated, you will also need to send the Authorization header to use it.

## Preview SDK

(Unsafe for production apps) You can copy the content of [this file (typescript)](https://github.com/Servant-Cities/rest-api-playground-template/blob/main/src/lib/previewSDK.ts) in any frontend app you want to preview in order to enable your playground to override requests and let you test your data directly in an iFrame.

(Safe) Don't forget to update the authorized origin in the sdk and add any verification logic you deem necessary. Authorizing localhost origin or forwarding services such as ngrok would indeed result in a cross site scripting vulnerability.

Here is a [working example](https://github.com/Servant-Cities/protocol-api-tester/blob/main/src/routes/%2Bpage.svelte)

The other way to connect the app is trough the playground's rest API.

You can manualy update your sdk to reformat requests data to match the playground API if you need to, feel free to use the preview parameters to react to playground-specific configuration.

## Authentication

You can activate authentication by setting the require-authentication configuration to true, either directly in the database editor or in your source file (don't forget to restart the app if you do so).

Then update the secret for Master DB in the authorized-keys to set your own secret.

The frontend will now redirect you to a login screen if you are not authenticated while the REST API will respond with an authentication error

## Multitenancy

Multitenancy is activated by default with authentication, you can set it up by adding new authorized keys and changing the database name.

The database will be created the first time the corresponding secret is used.

One database can be access with different secrets but each secret only grants access to one databse.

The name of these authorized keys is logged in the console when they access the app.

We don't have a docker configuration yet, but feel free to propose one and set different volumes for each of your databases.

## Deploying

You can host the app by running the development server or by following [Sveltekit's node-adapter doc](https://svelte.dev/docs/kit/adapter-node#Deploying)

The app needs write access to the /databases/ folder overwise it won't be able to initate the Master DB or any other.

Do not delete the tutorial database, nor write secrets in it, new tenants will get a clone of this database in its state at the moment of the first connection so you should consider this data accessible to anyone you grant access to.

The tutorial database is tracked by git and might prevent pulling repository updates if you modify it without a proper rebase configuration.

## GIT

Be aware the tutorial database is not ignored in the git repository, this is intended to provide versionning of the database format and help you migrate data in the eventuality of a breaking change, but also to be cloned to create new tenants in multi tenancy mode.

## Typing

There is an exemple of how you can use [zod](https://zod.dev/) and [superforms](https://superforms.rocks/) to type your datasets in [/src/lib/schema.ts](https://github.com/Servant-Cities/rest-api-playground-template/blob/main/src/lib/schema.ts).

![Screenshot of the JSON editor with typing errors](https://github.com/Servant-Cities/rest-api-playground-template/blob/main/static/doc/typing.png?raw=true)

You will find there a practical example with the application settings schema and a generic dataset schema currently used to validate the data before overiding the database.

You can then use the supervalidate function to type the data in you endpoints.

The expected use is to call supervalidate on the request's body in POST and PUT methods, and on the data object loaded from the JSON database in the GET method.

It is eventually up to you to use any typing and validation solution you like and fully remove the existing ones.

## Features and Roadmap

The following features will be developped based on another project's needs but please let me know if you would like some more work done on this template.

- [x] Persistant dataset
- [x] REST API
- [x] Frontend preview
- [x] Multiple datasets support
- [x] Persistant preview configurations
- [x] (SDK) Connect to a production app for in context preview
- [x] Multi-tenant and authenticated access
- [ ] Localized datasets
- [ ] Embeded S3
- [ ] Docker instalation
- [ ] Dataset volumes

## License

Please respect [the project's license](https://github.com/Servant-Cities/rest-api-playground-template/blob/main/LICENSE)