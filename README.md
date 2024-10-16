# Node.js Version Checker with NVM

This package is a simple script to check if the currently installed version of Node.js matches a specified version. If the version does not match, the script will automatically switch to the required version using **NVM (Node Version Manager)**, and install it if necessary. 

This is especially useful when working on multiple projects with different Node.js versions. For example, you can add a **prestart** script like `prestart: nvm-node-version-checker 22.8.0` in your package.json to ensure the correct version of Node.js is used before starting the project.

## Features
- Ensures the required Node.js version is being used.
- Automatically installs the specified version via NVM if not present.
- Uses the correct Node.js version after installation.
- Adds a small delay to ensure the environment is loaded correctly.

## Prerequisites

1. **NVM (Node Version Manager)**: This script requires NVM to be installed on your system. You can install it by following the instructions at [NVM's GitHub repository](https://github.com/nvm-sh/nvm) ([Here's NVM for Windows](https://github.com/coreybutler/nvm-windows)).

## Installation

Run `npm i -D nvm-node-version-checker`

## Usage

Run by passing the desired Node.js version as an argument:

```bash
nvm-node-version-checker <version>
```

For example, to ensure you're using Node.js version 14.17.0, you can run:

```bash
nvm-node-version-checker 14.17.0
```

### What the Script Does:

1. Checks if the required version of Node.js is provided.
2. Verifies the currently installed version of Node.js.
3. If the installed version does not match the required version:
    - It checks if **NVM** is installed.
    - If NVM is installed, it will install the required version of Node.js using NVM.
    - It switches to the required version via NVM.
    - A 2-second delay is introduced to ensure the correct version is loaded.
4. If the required version is already installed, the script confirms it and exits.

## Error Handling

- If **NVM** is not installed, the script will terminate and ask you to install NVM.
- If the required Node.js version is not provided as a command-line argument, the script will terminate with an error.

## Example

```bash
$ nvm-node-version-checker 14.17.0
Current Node.js version (v12.22.0) is not 14.17.0.
nvm is installed, proceeding with version change...
Installing Node.js version 14.17.0 via nvm...
Switching to Node.js version 14.17.0 via nvm...
Node.js version loaded successfully.
Process completed, ready to go!
```

## Node 22.9.0 is used to develop this package

## License

This project is licensed under the MIT License.
