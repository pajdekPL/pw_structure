# pw-framework-structure

It's a structure for the framework based on PlayWright and TypeScript that can be reused for creating E2E and API integration automated checks.

This framework includes:

- the production ready project structure,
- solution for unit testing of code that is used to automate checks(for example it's much easier to use UTs when developing some parsing mechanism),
- debugging of API tests that is easy to turn on by env flag,
- POM(Page Object Model),
- Custom fixtures and expects that can be easily extended,
- BasePage with waitForPage that waits for the given anchorElement, it can be overloaded, for example if in some pages it's required to wait for some API response etc.,
- Linter, VSCode, Husky configuration that was tested in real projects,
- Env variables mechanism,
- tsconfig.json with easy to use imports paths - `import { buildUserFromEnvVariables } from "@factories/auth-user.factory"`
- Creating storageStates in setup with checking the file age for local executions :)

# Utilized resources:

- https://qaplayground.dev/
- https://automationintesting.online/
- https://github.com/BMayhew/awesome-sites-to-test-on?tab=readme-ov-file

## Swagger links:

- [auth](https://automationintesting.online/auth/swagger-ui/index.html#/)
- [rooms](https://automationintesting.online/room/swagger-ui/index.html#/room-controller/)

## Framework Structurs

- src
  - pages - objects that abstract pages with URLs
  - views - if the given page is complicated and different actions provide to views that differ from each other it is good to abstract/encapsulate them to the View objects
  - models - interfaces and types that are used as inputs/outputs in testing for example `AuthUserModel`,
  - fixtures - logic that is executed before running particular tests to increase readability and to avoid repetition,
  - factories - classes and function to create data that is used in testing, for example API Json inputs,
  - expects - custom expects that exceeds PW expect capabilities to avoid repetition and to ease troubleshooting process,
  - api - all api clients that are used for testing
  - data - files that are used for checking purposes, for example pdf file to verify uploading feature,
  - components - are shared between multiple page/view objects and is is handful to abstract and encapsulate them to the component objects,
  - tests - unit/component tests for testing framework functions,
- tests - API and GUI tests of the tested application

## General Info

- If your tests requires some data(data seeding, services fixtures etc.) that has to be created in the SUT(system under test, or some environment under test) before running tests from this repository add link and information here.

## Execution on CI

- set all env variables from .env-template

## Coding Standard

[Coding Standard](CODING-STANDARDS.md)

## Local recommended tools:

- VSCode with recommended extensions(please check `.vscode/extensions.json`)
- Git
- Node.js
- Husky

## Getting started

- clone repository
- change directory to the cloned repo
- install dependencies: `npm install`
- setup Playwright with: `npx playwright install --with-deps chromium`
- create your own `.env` file: `cp env.template .env` and fill it
- setup husky with: `npx husky install`
- to run unit tests: `npm run ut`

## Running tests

Run all tests:

```
npx playwright test
```

Run all tests with tag "@SMOKE":

```
npx playwright test --grep "@SMOKE"
```

Run tests without tag "@SMOKE":

```
npx playwright test --grep-invert "@SMOKE"
```

## Updating API definitions from Swagger

Generated API Clients are under this path: `src/api/api-generated-clients/`

- download the newest API definition from Swagger for the chosen service
- `npx swagger-typescript-api --disable-throw-on-error --axios --single-http-client --extract-request-params --path {PATH_TO_JSON_FILE_WITH_API_DEFINITION} --api-class-name AppNameGeneratedApiClient --name appName-generated-api-client`
- update the proper generated-api-client file `src/api/api-generated-clients/{APP}-api-client.ts` with the newly created one
- verify if tests or the classes that uses the generated client doesn't require any updates

## Contribution

Create your branch, make your changes, commit them and push it to the remote and start a new PullRequest.

- Use VSC or `git checkout -b name_of_your_branch` or `git switch -c name_of_your_branch`
- commit your changes(use this commit convention https://www.conventionalcommits.org/en/v1.0.0/)
- push your changes to remote(`git push -u origin name_of_your_branch`) and open PullRequest,
- decide with your team about review and merging policy(number of thumbs up, resolving comments, passing tests etc.),
- Remember: "Honesty in small things is not a small thing" ~Robert C. Martin ;)
