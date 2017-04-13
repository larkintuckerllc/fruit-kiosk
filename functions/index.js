const functions = require('firebase-functions');
const admin = require('firebase-admin');
const FormData = require('form-data');

const DOMAIN = '[OBMITTED]';
const API_KEY = '[OBMITTED]';
admin.initializeApp(functions.config().firebase);
exports.emailDetail = functions.database.ref('/emails/{emailId}')
  .onWrite(event => {
    const entry = event.data.val();
    return new Promise((resolve, reject) => {
      const form = new FormData();
      form.append('from', 'john@larkintuckerllc.com');
      form.append('to', entry.email);
      form.append('subject', 'FYI: Details');
      form.append('text', 'Details');
      form.submit({
        protocol: 'https:',
        host: 'api.mailgun.net',
        path: `/v3/${DOMAIN}/messages`,
        auth: `api:${API_KEY}`,
      }, (err, res) => {
        if (err !== null) {
          reject();
          return;
        }
        resolve();
      });
    });
  });
