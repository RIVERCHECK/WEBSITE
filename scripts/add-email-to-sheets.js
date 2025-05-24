const { google } = require('googleapis');
const sheets = google.sheets('v4');
const { GOOGLE_SERVICE_ACCOUNT_JSON, SPREADSHEET_ID, EMAIL_TO_ADD } = process.env;

async function appendEmailToSheet(email) {
  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(GOOGLE_SERVICE_ACCOUNT_JSON),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();

  const currentDate = new Date().toISOString(); // Get the current date in ISO format

  await sheets.spreadsheets.values.append({
    auth: client,
    spreadsheetId: SPREADSHEET_ID,
    range: 'Sheet1!A:B', // Append to columns A and B
    valueInputOption: 'RAW',
    resource: {
      values: [[email, currentDate]], // Append email and current date
    },
  });
}

const email = EMAIL_TO_ADD;
appendEmailToSheet(email).catch(console.error);