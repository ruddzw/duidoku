# Duidoku

Two-player sudoku on the web! An 2018 version of the 2008 original, now written with Vue and ES2015+. Play it at [duidoku.com](http://www.duidoku.com)

## Development Prerequisites

### macOS

Use [Homebrew](https://brew.sh/) to install Node and Yarn.

1. `brew install node`
2. `brew install yarn`

### Ubuntu

Install recent versions of Node and Yarn. You may wish to refer to the [Node](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) site and [Yarn](https://yarnpkg.com/lang/en/docs/install/#linux-tab) site for more up-to-date installation instructions.

1. `curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -`
2. `curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | sudo apt-key add -`
3. `echo "deb https://dl.yarnpkg.com/debian/ stable main" | sudo tee /etc/apt/sources.list.d/yarn.list`
4. `sudo apt update && sudo apt install nodejs yarn`

## Setup

1. `yarn install`
2. Done!

## Local Development

1. `yarn start` (or `yarn start --open` to automatically open it in your browser)
2. Go to `http://localhost:8080` in your browser!

## Deployment

1. `yarn build`
2. Deploy the contents of the `dist` folder.
