# Geriatric Care Assessment Form

A frontend-only geriatric care assessment form built with React 19, TypeScript, Mantine, and Zod 4.

## Links

- **Live application:** TODO — add your deployment URL
- **GitHub repository:** https://github.com/tiwariharshitraj14/geriatric-assessment-form

## Features

- Ten fields for patient and assessment details.
- Zod schema-based validation with field-level error messages.
- Validation on blur and form submission.
- A **Load sample patient** button using fictional test data.
- Simulated save flow with a loading state and a success alert.
- Displays the validated, parsed assessment data after a successful submission.
- Vitest tests for the age-60 boundary and sample-patient submission.

## Tech stack

- React 19
- TypeScript
- Mantine
- Zod 4
- Vite
- Vitest and React Testing Library

## Requirements

- Node.js `22.23.3` (see `.node-version`)
- Yarn 4 (Corepack is included with supported Node.js installations)

## Run locally

Clone the repository:

```bash
git clone https://github.com/tiwariharshitraj14/geriatric-assessment-form.git
cd geriatric-assessment-form
```

Enable Corepack if Yarn is not available, install dependencies, and start the development server:

```bash
corepack enable
yarn install
yarn dev
```

Open the local URL printed in the terminal by Vite.

## Run checks and tests

Run the complete project check pipeline:

```bash
yarn test
```

The script runs project checks (formatting, lint, and type checks), Stylelint, Vitest, and a production build.

To run the tests directly:

```bash
yarn vitest
```

## Production build

```bash
yarn build
```

The production output is written to `dist/`.

## Scope and implementation notes

This is a frontend-only assignment. There is no backend, authentication, routing, or persistent storage. The save action is simulated in the browser; successful submission displays the data parsed by the validation schema.

The sample patient is fictional test data provided for exercising the form. No real patient information should be added to this repository.

## Unfinished work

- **Deployment:** Replace the live application placeholder at the top with the deployed URL once deployment is complete.
- **Schema resolver:** Before final submission, verify that the form uses Mantine's schema resolver integration as required by the assignment, without duplicating validation rules in the component.
- **Validation coverage:** Confirm that the empty form produces exactly nine field errors and verify all accepted and rejected cases listed in the assignment.

Update this section to reflect the actual state before submitting. If an item remains unfinished, state why rather than claiming it is complete.

## Time spent

TODO — replace this with your honest approximate total time spent on the assignment.
