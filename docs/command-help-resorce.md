# Project Commands & Resource Guide

Welcome to the command cheatsheet for your portfolio project! This document logs everyday commands you'll need when working with this React application, explaining what they do, when to use them, and where they are used.

---

## 1. Running the Application Locally

### `npm start`
- **What it does**: Starts the local development server with hot-reloading enabled. Any code edits you save in `src/` will immediately update in your browser.
- **How to use**:
  ```bash
  npm start
  ```
  *(Note for Windows PowerShell if script execution is restricted: `cmd.exe /c npm start`)*
- **Where we use it**: Whenever you want to preview and interact with the website on your machine (`http://localhost:3000`).

---

## 2. Testing the Application

### `npm test`
- **What it does**: Runs the test runner (Jest) in interactive watch mode.
- **How to use**:
  ```bash
  npm test
  ```

### `npm test -- --watchAll=false`
- **What it does**: Runs all test suites once from start to finish without remaining open in watch mode.
- **How to use**:
  ```bash
  npm test -- --watchAll=false
  ```
- **Where we used it**: To run our unit tests (`App.test.js`, `HeroSection.test.js`) and property-based tests (`hooks.test.js`) to guarantee all animations, interactions, and components work correctly.

### Run a specific test file
- **How to use**:
  ```bash
  npm test -- src/components/HeroSection/__tests__/HeroSection.test.js --watchAll=false
  ```

---

## 3. Building for Production

### `npm run build`
- **What it does**: Compiles, bundles, minifies, and optimizes all JavaScript, CSS, and asset files into the `build/` folder for production.
- **How to use**:
  ```bash
  npm run build
  ```
- **Where we use it**: Before deploying to check for any compilation errors or warnings, and to prepare the production bundle for GitHub Pages.

---

## 4. Deploying to GitHub Pages

### `npm run deploy`
- **What it does**: Automatically runs `npm run build` (via `predeploy`) and then pushes the contents of the `build/` directory to the `gh-pages` branch on GitHub using the `gh-pages` package.
- **How to use**:
  ```bash
  npm run deploy
  ```
- **Where we use it**: Whenever you want to publish your latest changes live to `https://shivanshgaur6096.github.io`.

---

## 5. Installing & Managing Dependencies

### `npm install`
- **What it does**: Reads `package.json` and downloads all necessary packages into the `node_modules/` folder.
- **How to use**:
  ```bash
  npm install
  ```
- **Where to use it**: When you clone the repository on a new computer or after cleaning dependencies.

### `npm install --save-dev <package-name>`
- **What it does**: Installs a tool or library required only during development/testing (e.g., testing libraries).
- **How to use**:
  ```bash
  npm install --save-dev fast-check
  ```
- **Where we used it**: We installed `fast-check` for property-based testing and `@testing-library/react` for component testing.

### `npm install <package-name>`
- **What it does**: Installs a library used in the live app bundle (e.g., `framer-motion`, `react-intersection-observer`).
- **How to use**:
  ```bash
  npm install framer-motion
  ```

---

## 6. Cleaning Up Cache & Fixing Issues

### Clean Reinstall (`node_modules` reset)
If you ever encounter weird dependency issues or broken packages:
1. Delete `node_modules` folder:
   - **Windows CMD**:
     ```cmd
     rmdir /s /q node_modules
     ```
   - **PowerShell**:
     ```powershell
     Remove-Item -Recurse -Force node_modules
     ```
2. Reinstall cleanly:
   ```bash
   npm install
   ```

### Clear NPM Cache
```bash
npm cache clean --force
```

---

## 7. Windows Execution Policy Tip

On some Windows systems, PowerShell may block running `.ps1` scripts with an `UnauthorizedAccess` error. If that happens, you can either:
1. Prefix your command with `cmd.exe /c` (e.g., `cmd.exe /c npm start`).
2. Or allow scripts for your current user in PowerShell:
   ```powershell
   Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
   ```
