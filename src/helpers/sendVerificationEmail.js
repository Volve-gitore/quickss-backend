import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
dotenv.config();

export const sendVerificationEmail = (email, code) => {
  try {
    const msg = {
      to: email,
      from: { email: 'testingnadine@gmail.com', name: 'QuickSS App' },
      subject: 'Reset password!',
      html: `A request to change the password for your QuickSS App account has been received,<br> Please copy and paste the code carefully <b>${code}</b> to verify your email account!`,
    };
    const sent = sgMail.send(msg);
    return sent;
  } catch (error) {
    return 'error occured';
  }
};

export const sendSMS = (phoneNo, code) => {
  client.messages
    .create({
      body: `Welcome to QuickSS App your code is ${code}`,
      from: process.env.SENDING_NUMBER,
      to: phoneNo,
    })
    .then(message => {
      return message.sid;
    })
    .catch(err => {
      return 'error';
    });
};
