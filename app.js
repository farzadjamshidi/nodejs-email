
var express = require ('express');
var path    = require ('path');
var bodyParser    = require ('body-parser');
var nodemailer    = require ('nodemailer');


var app = express ();

app.set('views', path.join(__dirname,'views'));
app.set('view engine' , 'pug');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));

app.get('/', function(req,res){

    //console.log('Hi I am farzad');
    res.render('index');
});

app.get('/contact-us', function(req,res){

    //console.log('Hi I am farzad');
    res.render('contact');
});

app.post('/contact-us/send', function(req,res){

    var transporter = nodemailer.createTransport({
        service    :   "Gmail",
        host       :   "smtp.gmail.com",
        port       :   456,
        secure     :   true,
        'auth':{
            user   :   'fjblack@gmail.com',
            pass   :   '#yourpassword'
        }

    });

    var mailOptions = {
        from       :   'GodPhather',
        to         :   'f_jblack@yahoo.com',
        subject    :   'NodeJs',
        text       :   'This opinion is from '+req.body.name+' with email: '+req.body.email+'\n the message \n'+req.body.message
    }

    transporter.sendMail(mailOptions, function(error,info){

        if (error){
            console.log(error);
            res.redirect ('/contact-us');
        }
        else{
            console.log('Sent'+info.response);
            res.redirect ('/contact-us');
        }
    });
});

app.listen(3000);