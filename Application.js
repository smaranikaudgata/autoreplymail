const { google } = require('googleapis');
const nodemailer = require('nodemailer');
const { OAuth2Client } = require('google-auth-library');

const CLIENT_ID = '37469637137-3elrvol2cvjdjed0mitha32pp9l3o995.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04R1nV1-8S9_pCgYIARAAGAQSNwF-L9IruIp6zq-WB7zwOXMHH71r1SF522xTy0Yn1oLEJmk0-ZqKzJIjBh1OsoHUtybivxjWkSo';
const GMAIL_USER = 'testopeninapp@gmail.com';

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    type: 'OAuth2',
    user: GMAIL_USER,
    clientId: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    refreshToken: REFRESH_TOKEN,
    accessToken: oAuth2Client.getAccessToken(),
    scope: 'https://www.googleapis.com/auth/gmail.modify',
  },
});

const gmail = google.gmail({
  version: 'v1',
  auth: oAuth2Client,
});

async function watchGmail() {
  try {
    const res = await gmail.users.watch({
      userId: 'me',
      requestBody: {
        topicName: 'projects/ornate-grin-406515/topics/autoreplymail',
      },
    });

    console.log('Watch response:', res.data);

    // Handle watch response as needed

  } catch (error) {
    console.error('Error setting up Gmail watch:', error.message);
  }
}

async function handleIncomingEmail(message) {
  console.log('New email received:', message.subject);

  // Respond to the sender
  const mailOptions = {
    from: 'TESTOPENINAPP<testopeninapp@gmail.com>',
    to: message.from,
    subject: 'Re: ' + message.subject,
    text: 'Thank you for your email. I am currently away and will respond as soon as possible.',
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending response email:', error);
    } else {
      console.log('Response email sent:', info);
    }
  });
}

async function start() {
  // Start watching Gmail for new messages
  await watchGmail();
}

start();
