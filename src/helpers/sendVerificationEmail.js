import dotenv from 'dotenv';
dotenv.config();
import sgMail from '@sendgrid/mail';
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    export const sendVerificationEmail=(user,code)=>{
try {
  

        const { username, email } = user;

    const msg = {
      to: email,
      from : { email : 'testingnadine@gmail.com' , name: 'QuickSS App'},
      subject: 'Reset password!',
      html: `Dear, ${username}<br><br> A request to change the password for your QuickSS App account has been received,<br> Please copy and paste the code carefully <b>${code}</b> to verify your email account!`,
     
    };
  const sent= sgMail.send(msg)
  .then(resp=>{
    return sent
  })
  .catch(err => {
      console.log(err);
    });
    
  } catch (error) {
    console.log(error);
    return 'error occured'
  }
    };
    // =========================================SMS======================
  

export const sendSMS = (user,code) => {
  const { phoneNo } = user;

	client.messages
  	.create({
	     body:`Welcome to QuickSS App your code is ${code}`,
	     from: process.env.SENDING_NUMBER,
	     to: phoneNo
   })
  .then(message => console.log(message.sid))
  .catch(err=>{
    console.log(err)
  });
};