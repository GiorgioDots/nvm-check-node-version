#! /usr/bin/env node
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const semver_1 = __importDefault(require("semver"));
// Get the required version from command line argument
const requiredVersion = process.argv[2];
// Check if the version argument was provided
if (!requiredVersion) {
    console.error('Error: No Node.js version specified. Usage: node check-node-version.ts <version>');
    process.exit(1);
}
// Function to execute shell commands synchronously
function runCommand(command) {
    try {
        (0, child_process_1.execSync)(command, { stdio: 'inherit' });
    }
    catch (error) {
        console.error(`Error executing command: ${command}`);
        process.exit(1);
    }
}
// Function that introduces a delay (e.g., 2 seconds)
function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
// Check the installed version of Node.js
const installedVersion = process.version;
// Main function to handle the version switching
function checkAndSetNodeVersion() {
    return __awaiter(this, void 0, void 0, function* () {
        if (!semver_1.default.satisfies(installedVersion, requiredVersion)) {
            console.log(`Current Node.js version (${installedVersion}) is not ${requiredVersion}.`);
            // Check if nvm is installed
            try {
                (0, child_process_1.execSync)('nvm --version', { stdio: 'ignore' });
                console.log('nvm is installed, proceeding with version change...');
            }
            catch (error) {
                console.error('nvm is not installed. Please install nvm before continuing.');
                process.exit(1);
            }
            // Install the correct Node.js version if not already installed
            console.log(`Installing Node.js version ${requiredVersion} via nvm...`);
            runCommand(`nvm install ${requiredVersion}`);
            // Use the requested Node.js version
            console.log(`Switching to Node.js version ${requiredVersion} via nvm...`);
            runCommand(`nvm use ${requiredVersion}`);
            // Add a 2-second delay to ensure that nvm correctly loads the Node.js version
            yield delay(2000);
            console.log('Node.js version loaded successfully.');
        }
        else {
            console.log(`Correct Node.js version (${installedVersion}) is already in use!`);
        }
    });
}
// Run the version check and set process
checkAndSetNodeVersion()
    .then(() => {
    console.log('Process completed, ready to go!');
})
    .catch((error) => {
    console.error('Error during Node.js version check:', error);
    process.exit(1);
});
//# sourceMappingURL=index.js.map