var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'sachinbamotriya6@gmail.com',
        pass: 'bamotriya9171726367'
    }
});

var mailOptions = {
    from: 'sachinbamotriya6@gmail.com',
    to: '',
    subject: '',
    text: ''
};

var createEmailMsg = (receiver, receiverName) => {
    mailOptions.to = receiver;
    mailOptions.subject = 'Hi ' + receiverName + ' You are registered  Successfully'
    mailOptions.text = 'Thankyou for Joining us!\n our Best Team \n Apna Store '
    return mailOptions;
}

var updateEmailMsg = (receiver, receiverName) => {
    mailOptions.to = receiver;
    mailOptions.subject = 'Hi ' + receiverName + ' Your details are updated  Successfully'
    mailOptions.text = 'Thankyou for Joining us!\n our Best Team \n Apna Store '
    return mailOptions;
}



var forgetPasswordEmailMsg = (receiver, receiverName, receiverPassword) => {
    console.log(typeof(receiver)+":"+receiverName+":"+receiverPassword)
    mailOptions.to = receiver;
    mailOptions.subject = 'Hi ' + receiverName + ' You are  Password Recoverd  Successfully'
    mailOptions.text = 'Your Password : ' + receiverPassword + '\nThankyou!\n our Best Team \n Apna Store '
    return mailOptions;

}



module.exports = { transporter, mailOptions, createEmailMsg, updateEmailMsg ,forgetPasswordEmailMsg}

