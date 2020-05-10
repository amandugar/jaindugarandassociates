//Required Directories
const express = require('express');
const bodyParser = require("body-parser");
const ejs = require("ejs");
// App 
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname +"public"));
const port = 80;
let contact_details = [];
const GoogleSpreadsheet = require('google-spreadsheet');
const {promisify} = require('util');
let contents = [
    {
      image: 'https://www.myassignmentservices.com/blog/wp-content/uploads/2018/01/corporate-accounting.jpg',
      h4: 'Accounting Services',
      content: 'Accounting System Design & Implementation, Financial Accounting, Budgeting, Financial Reporting, MIS Report'
    },
    {
      image: 'https://www.colocationamerica.com/images/it-audit.png',
      h4: 'Auditing',
      content: 'Broadly, Audit involves the following: Indepth study of existing systems, procedures and controls for proper understanding.'
    },
    {
        image: 'https://qph.fs.quoracdn.net/main-qimg-a0120c55e03f21b735be01befaddb2c0',
        h4: 'Corporate Services',
        content: 'Incorporation of company Consultancy on Company Law matters. Planning for Mergers, Acquisitions, De-mergers, and Corporate re-organizations.'
    },
    {
        image:"https://cygnusit.com/wp-content/uploads/Consultancy-and-Professional-Services.png",
        h4:"Consultancy",
        content:"Consultancy on various intricate matters pertaining to Income tax. Effective tax management, tax structuring and advisory services. Tax Planning for Corporates and others."
    }
  ]; 
 const creds = require(__dirname+"./client_secret.json");
  async function acessSpreadSheetContact(){
    const doc = new GoogleSpreadsheet('1qjgDwYLcM3DwwoF5tkzeS9DAVu8nzoCP5ARwOMqjxZY');
    await promisify(doc.useServiceAccountAuth)(creds);
    const info = await promisify(doc.getInfo)();
    const sheet = info.worksheets[0];
    const rows = await promisify(sheet.getRows)({
        offset: 1
    })
    const contactdetails={
        name: contact_details[0].name,
        email: contact_details[0].email,
        subject: contact_details[0].message,
        message: contact_details[0].message
      }
      await promisify(sheet.addRow)(contactdetails);
      contact_details.length = 0;

  }
// Setup of view engine
app.set('view engine','ejs');

app.get("/",function(req,res){

    res.render(__dirname+"home",{
        contents: contents
    });
})

app.get("/sucess",function(req,res){
    res.render(__dirname+"sucess")
    console.log("ok");
})
 app.post("/sucess",function(req,res){
    name = req.body.name;
    email = req.body.email;
    subject = req.body.subject;
    message = req.body.message;
    console.log(req.body.name);
    console.log("done");
    const details = {
        name: name,
        email: email,
        subject: subject,
        message: message
    }
    res.render(__dirname+"sucess")
    contact_details.push(details);
    acessSpreadSheetContact();
 })



app.listen(process.env.PORT||port,function(){
    console.log(`App started at port ${port}`)
})