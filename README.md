# vault

## Goals

-   Store and manage multiple Riot Games accounts in one place.

-   Enable quick, one-click login to the Riot Client.

-   Provide a clean, simple, and user-friendly interface.

## Tech Stack

-   **Electron**: Framework for building cross-platform desktop applications using web technologies (HTML, CSS, JavaScript). It enables "vault" to run on Windows, macOS, and Linux with a consistent desktop experience.

-   **React**: JavaScript library for building user interfaces, allowing dynamic rendering and state management. React powers the interactive front-end of "vault".

-   **Tailwind CSS**: Utility-first CSS framework for creating responsive designs quickly and efficiently.

## Running vault

### Running the packaged version of vault:

No stable version has been released yet.

### Running vault in development mode:

#### Prerequisites:

-   **Node.js**: [Download Node.js](https://nodejs.org/en/download/package-manager) (Choose the LTS version)

#### 1. Download the repository:

You can either clone the repository using Git or download the ZIP file directly.

-   **Clone the repository**:

```bash

git  clone  https://github.com/mthwdev/vault.git

```

#### 2. Install dependencies:

Navigate to the project folder and run the following commands:

```bash

npm  install

cd  src/renderer

npm  install

```

#### 3. Start the app:

First, start the development server for the renderer:

```bash

cd src/renderer

npm run dev

```

Then start the electron app from the root project folder:

```bash

(cd ../..)

npm run dev

```

Please keep in mind that this project is still in early development. Some features may not be fully implemented or stable. Feel free to try it out, but be aware that it might have bugs or missing features.

## Usage

Guidelines on how to use "vault" will be added with the first release.

## Contributing

All submissions are appreciated, just submit a Pull Request (PR) or open an issue.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

-   **Email**: cleansernld@gmail.com
