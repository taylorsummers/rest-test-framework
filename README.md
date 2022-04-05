# rest-test-framework

A sample framework for how to approach testing REST APIs with typescript, JEST and Axios. The tests are currently configured to point at a 
simple web app deployed in GCP with an exposed API allowing for CRUD operations against a Firebase backend. You will need an authenticated local GCP service account to run the tests.

# Installing
To install the necessary packages run:
```
yarn install
```
# Running Tests
Tests can be ran against a number of environments. Conifugure environments in /confic/env.config.json

Running tests against "dev"
```
yarn test:api:dev
```

Running tests against "stage"
```
yarn test:api:stage
```

