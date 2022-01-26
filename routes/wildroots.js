const express = require('express');
const ejs = require('ejs');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('home', {title: "Wildroots Kitchen & Bar"});
});

router.get('/sustainability', (req, res) => {
    res.render('sustainability');
});

router.get('/download', (req, res) => {
    res.render('download')
});

router.get('/contact', (req, res) => {
    res.render('contact')
});

router.post('/contact/send', (req, res) => {
    let transporter = nodemailer.createTransport(smtpTransport ({
        //domain host where website is held
        service: "gmail",
        // host: 'stmp.mail.yahoo.com', //smtp.
        // port: 465,
        // secure: true,
        // auth:  {
        //     user: 'lauramwar88@gmail.com',
        //     pass: 'fha0ehj3uqd1VXW-efj'
        // }
    })
    );

    var fname = req.body.fname
    var lname= req.body.lname
    var phone = req.body.phone
    var email = req.body.email
    var subject = req.body.subject
    var event = req.body.event
    var message =req.body.message

    let mailOptions = {
        from: 'lauramwar88@gmail.com',
        to: email,
        subject: `Message from ${req.body.fname}: ${req.body.lname}: ${req.body.phone}`,
        text:req.body.message
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("there was an error", error)
        }
            console.log('Message %s sent: %s', info.messageId, info.response);
            
        // return res.status(200).json({message: "message sent"})
    });
    // }
        //redirects here 
        res.writeHead(301, { Location: '/' });
        res.end();
        
    });

module.exports = router;