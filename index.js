const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.post('/api/form',(req,res) => {
    let data = req.body;

    let smtpTransport = nodemailer.createTransport({
        service:'Gmail',
        port:465,
        auth:{
            user:'mithunprabhu8512@gmail.com',
            pass:'tagdhspkqygdwljp'
        }
    });

    let mailOptions = {
        from:data.email,
        to:"mithunprabhu8512@gmail.com",
        subject:`Message from ${data.name}`,
        html:`
        <h3>Information</h3>
        <ul>
            <li>Name: ${data.name}</li>
            <li>Email: ${data.email}</li>
            <li>Message: ${data.message}</li>
        </ul>
        `
    }

    smtpTransport.sendMail(mailOptions,(error,response) => {

        if(error){
            res.send(error);
        }else{
            res.send(response);
        }
    });

    smtpTransport.close();


});

// if(process.env.NODE_ENV === "production"){

//     app.use(express.static("client/build"));
//     const path = require("path");
//     app.get("*",(req,res) => {
//         res.sendFile(path.resolve(__dirname,'client','build','index.html'));
//     })
// }else{
//     app.get('/',(req,res) => {
//         res.send('Welcome to my form');
//     });
// }

app.get('/',(req,res) => {
    res.send('Welcome to my form');
});


const PORT = process.env.PORT || 5000;

app.listen(PORT,() => {
    console.log(
        `Hello guys server is running at port ${PORT}`
    );
})