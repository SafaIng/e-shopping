'use strict';

import express, { response } from 'express';
import formidable from 'formidable';
import nano from 'nano';
import nodemailer from 'nodemailer';
const server = express();



server.use(express.static('public', {
    extensions: ['html']
}));

server.use(express.json());
const db = nano(`your database path`).db;
const dbName = 'accounts';
server.get('/', (req, res) => {
    res.sendFile(__dirname + './public/newaccount.html')
}
);

server.post('/', (req, res) => {
    let mailToMail;
    let mailToName;
    const form = formidable();

    form.parse(req, (err, fields) => {
            if (err) console.warn(err);
            else {
                mailToName = fields.name[0];
                mailToMail = fields.email[0];
                const mailOptions = {
                    from: 'the sender-mail', // sender address
                    to: mailToMail, // list of receivers
                    subject: 'Welcome mail', // Subject line
                    text: 'Hello '+ mailToName+', welcome to safa shopping site!', // plain text body
                    //  html: output // html body
                }
                const transporter = nodemailer.createTransport({
                    host: 'smtp.office365.com',
                    port:587,
                    auth: {
                        user: 'write your email', // generated ethereal user
                        pass: 'write your password'  // generated ethereal password
                    }
                })
                //window.location.href = 'index.html';
                transporter.sendMail(mailOptions, (error, info,) => {
                    if (error) {
                        console.log(error);
                        res.json({
                            status: 'err',
                            err
                        })
                    } else {
                        console.log('Message sent : ' + info.response);
                        res.json({
                            status: 'ok',
                            data: res
                        })
                    }
                    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            
                    // res.render('contact', {msg:'Email has been sent'});
            
            
            
                })


            }
        })


    

})


    // form data 
    server.post('/save_content', (request, response) => {
        const form = formidable();

        form.parse(request, (err, fields) => {
            if (err) console.warn(err);
            else {
                const content = {
                    name: fields.name[0],
                    email: fields.email[0],
                    crDate: Date.now()
                }
                const myDB = db.use(dbName);
                myDB.insert(content).then(
                    () => loadAndSendAllContents(response)
                )

            }
        })


    }

    )


    const loadAndSendAllContents = (response) => {
        const myDB = db.use(dbName);

        myDB.list({ include_docs: true }).then(
            res => res.rows.map(row => row.doc)).then(
                res => response.json({
                    status: 'ok',
                    data: res
                })
            ).catch(
                err => {
                    console.warn(err);
                    response.json({
                        status: 'err',
                        err
                    })
                }
            )


    }




    
const doStuff = () => {
    const myDB = db.use(dbName);
    // Wenn die ID unbekannt ist, muss mit find() gesucht werden

    myDB.view('mydb', 'myview').then(
        res => res.rows.map(row => row.value)
    ).then(
       /* if (email==row.map.email)
        {
            alert('you must creat a new account');
        }*/
    ).catch(
        console.warn
    )

    /*
    Die in der DB hinterlegte map-Funktion
    doc => {
        // Es müssen zwei Wert übergeben werden
        // key-Value-Paar
        if(doc.leistungKW >= 150){
            emit(1, doc);
        }
    }
    */

}

    const init = () => {
        
        db.list().then(
            res => {
                if (!res.includes(dbName)) {
                    return db.create(dbName);
                }
            }
        ).then(
            () => {
                server.listen(80, err => console.log(err || 'Server läuft'));
            }
        ).catch(
            console.warn
        )

doStuff();
    }


    init();
