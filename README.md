# pw-framework-structure

This is a framework structure based on Playwright and TypeScript that can be reused for creating E2E and API integration automated checks.

This framework includes:

- A production-ready project structure.
- Implementation of the Page Object Model (POM).
- Custom fixtures and expectations that can be easily extended.
- Easy-to-enable debugging of API calls by setting the `DEBUG=axios` environment variable in your .env file.
- Linter, VSCode, and Husky configurations that have been tested in real projects.
- An environment variables mechanism.
- A tsconfig.json file with easy-to-use import paths, e.g., `import { buildUserFromEnvVariables } from "@factories/auth-user.factory"`.
- A solution for unit testing code used in automating checks (making it much easier to use unit tests when developing helper functions, parsers, etc.).
- A BasePage class with a waitForPage method that waits for a given anchorElement; this method can be overloaded to wait for other conditions, such as API responses, on specific pages.
- Setup for creating storageStates with authentication file age checks for local executions.

# Utilized resources:

- https://qaplayground.dev/
- https://automationintesting.online/
- https://github.com/BMayhew/awesome-sites-to-test-on?tab=readme-ov-file

## Swagger links:

- [auth](https://automationintesting.online/auth/swagger-ui/index.html#/)
- [rooms](https://automationintesting.online/room/swagger-ui/index.html#/room-controller/)

## Framework Structure

- src
  - pages: Objects that abstract pages with URLs.
  - views: If a given page is complicated and different actions provide views that differ from each other, it is good to abstract/encapsulate them into View objects.
  - models: Interfaces and types used as inputs/outputs in testing, e.g., `AuthUserModel`.
  - fixtures: Logic executed before running particular tests to increase readability and avoid repetition.
  - factories: Classes and functions to create data used in testing, e.g., API JSON inputs.
  - expects: Custom expectations that extend Playwright's `expect` capabilities to avoid repetition and ease the troubleshooting process.
  - api: All API clients used for testing.
  - data: Files used for checking purposes, e.g., PDF files to verify the uploading feature.
  - components: Shared components between multiple page/view objects; it is useful to abstract and encapsulate them into component objects.
  - tests: Unit/component tests for testing framework functions.
- tests: API and GUI tests of the tested application.

## General Info

If your tests require data (such as data seeding, service fixtures, etc.) that needs to be created in the SUT (System Under Test) or any environment under test before running tests from this repository, please add the relevant link and information here.

## Execution on CI

- set all env variables from the .env-template file

## Coding Standard

Coding standard proposal:
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

## Snapshots update for CI(requires Docker)

If tests are executed locally on an OS other than Linux, it is required to update or generate new snapshots on Linux for CI execution. The official Playwright (PW) Docker image can be used for this purpose. If your tests that use snapshots have the @SNAP tag, you can follow these steps:

```
docker run --rm --network host -v $(pwd):/work/ -w /work/ -it mcr.microsoft.com/playwright:v1.46.0-jammy /bin/bash
npm install
npx playwright test --grep @SNAP --update-snapshots
```

Then commit and push the newly created files to the repository. Keep in mind to keep the PW version aligned with that used in package.json.

## Contribution

Create your branch, make your changes, commit them and push it to the remote and start a new PullRequest.

- Use VSC or `git checkout -b name_of_your_branch` or `git switch -c name_of_your_branch`
- commit your changes(you can follow this commit convention https://www.conventionalcommits.org/en/v1.0.0/)
- push your changes to remote(`git push -u origin name_of_your_branch`) and open PullRequest,
- decide with your team about review and merging policy(number of thumbs up, resolving comments, passing tests etc.),
- Remember: "Honesty in small things is not a small thing" ~Robert C. Martin ;)
