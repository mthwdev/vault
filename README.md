# vault

## Goals

-   Store and manage multiple Riot Games accounts in one place.

-   Enable quick, one-click login to the Riot Client.

-   Provide a clean, simple, and user-friendly interface.

## Tech Stack

-   **Electron**: Framework for building desktop applications using web technologies like HTML, CSS, and JavaScript.

-   **React**: JavaScript library for building dynamic user interfaces, enabling fast and interactive user experiences.

-   **Tailwind CSS**: Utility-first CSS framework for creating responsive designs quickly and efficiently.

## Running vault

### Running the packaged version of vault:

1. Go to the [Releases](https://github.com/mthwdev/vault/releases) page of the repository.
2. Download your desired version of vault as a `.zip` file
3. Unzip the `.zip` file.
4. Run the `vault-setup.exe` file to install the application.
5. Follow the installation instructions.
6. Once installed, open vault from your desktop or start menu.

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

## Usage

### Viewing your accounts

All added accounts are listed in the sidebar on the left.

### Adding an account

1. Click the "+" button in the sidebar to open the form for adding a new account.
2. Fill in the following fields:
    - **username**: Your Riot Games account username.
    - **password**: Your Riot Games account password.
    - **display name**: A name to identify this account in the sidebar.
    - **note**: Any additional notes about this account.
3. Click the "add" button to add the account.

### Modifying an Account

1. Select the account you wish to modify from the sidebar to open the form for modifying an account
2. Edit any fields you'd like to change.
3. Click the "save" button to save the changes.

### Logging into Riot Client

1. Select the account you want to log in with from the sidebar.
2. Ensure the Riot Client is open on your computer.
3. Click the "login" button at the bottom of the application.
4. The application will automatically enter your credentials and log you into the Riot Client.


**Note**: All account data is saved locally on your machine and is not sent to any server.

Please keep in mind that this project is still in early development. Some features may not be fully implemented or stable. Feel free to try it out, but be aware that it might have bugs or missing features.

## Contributing

All submissions are appreciated, just submit a Pull Request (PR) or open an issue.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

-   **Email**: cleansernld@gmail.com