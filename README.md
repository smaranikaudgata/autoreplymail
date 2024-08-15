# Gmail Autoresponder

This Node.js script uses the Gmail API and Nodemailer to automatically respond to new emails with a predefined message.

## Prerequisites

Before running the script, make sure you have the following:

- Node.js installed on your machine.
- Required npm packages installed by running:

```bash
npm install googleapis nodemailer
```

## Setup

1. Obtain API credentials:
   - Create a project in the [Google Cloud Console](https://console.cloud.google.com/).
   - Enable the Gmail API for your project.
   - Create OAuth 2.0 credentials and download the client ID and client secret.
   - Set up the OAuth consent screen.

2. Get the refresh token:
   - Use the [OAuth 2.0 Playground](https://developers.google.com/oauthplayground) to obtain a refresh token.
   - Set the `REDIRECT_URI` to `https://developers.google.com/oauthplayground`.

3. Update script variables:
   - Replace `CLIENT_ID`, `CLIENT_SECRET`, `REDIRECT_URI`, `REFRESH_TOKEN`, and `GMAIL_USER` with your credentials.

## Usage

1. Run the script:

```bash
node your-script-name.js
```

2. The script will initiate the Gmail watch, and it will automatically respond to new emails with a predefined message.

## Important Note

- Ensure that the Gmail account associated with `GMAIL_USER` has the necessary permissions for the Gmail API and the specified topic for notifications.

## Disclaimer

This script is a basic example and may require additional enhancements for production use. Handle sensitive information securely and consider using environment variables for credentials.

