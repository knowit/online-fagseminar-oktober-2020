[![Build Status](https://travis-ci.org/knowit/sundvolden.knowit.no.svg?branch=master)](https://travis-ci.org/knowit/sundvolden.knowit.no)

# Knowit Sundvolden

Created with [Gatsby](https://www.gatsbyjs.org/).

## Before commit

Run prettier to pretify the code.

```sh
yarn prettier
```

## Configure secrets
The project uses airtable.com as backend. The following environment-variable should be set to build:
* AIRTABLE_API_KEY

## Install gatsby

```sh
npm install --global gatsby-cli
```

and install dependencies inside this folder:

```sh
yarn
```

And run from your CLI:

```sh
yarn start
```

To build, run:

```sh
yarn build
```

When pushing to master, the application is automatically deployed.

**Important libraries used:**

- React (https://reactjs.org/)
- Gatsby (https://www.gatsbyjs.org/)
- Emotion (https://emotion.sh/)
