const express = require('express');
const mongoose = require('mongoose');
const contactSchema = new mongoose.Schema({
  primarycontactnumber: {type: String, index: {unique: true}},
  firstname: String,
  lastname: String,
  title: String,
  company: String,
  jobtitle: String,
  othercontactnumbers: [String],
  Heprimaryemailaddress: String,
  emailaddresses: [String],
  groups: [String],
});


const Contact = mongoose.model('Contact', contactSchema);

const john_douglas = new Contact({
  firstname: 'John',
  lastname: 'Douglas',
  title: 'Mr.',
  company: 'Dev Inc.',
  jobtitle: 'Developer',
  primarycontactnumber: '+359777223345',
  othercontactnumbers: [],
  primaryemailaddress: 'john.douglas@xyz.com',
  emailaddresses: ['j.douglas@xyz.com'],
  groups: ['Test'],
});


const jianfang_bladen = new Contact({
  firstname: 'Jianfang',
  lastname: 'Bladen-Hovell',
  title: 'Mrs.',
  company: 'BBC.',
  jobtitle: 'Developer',
  primarycontactnumber: '+447599966688',
  othercontactnumbers: [],
  primaryemailaddress: 'jianfang@xyz.com',
  emailaddresses: ['jbh@xyz.com'],
  groups: ['Dev'],
});

const mark = new Contact({
  firstname: 'mark',
  lastname: 'Bladen-Hovell',
  title: 'Mr.',
  company: 'ABC Co.',
  jobtitle: 'Developer',
  primarycontactnumber: '1234567',
  othercontactnumbers: [],
  primaryemailaddress: 'mark@xyz.com',
  emailaddresses: ['mark@xyz.com'],
  groups: ['Test'],
});

const db = mongoose.connection;
mongoose.connect('mongodb://localhost/contacts');


const router = express.Router();

router.put('/init', function(req, res, next) {
  mark.save(function(error) {
    if (error) {
      console.log('Error while saving contact for Mr. John Douglas');
      console.log(error);
    } else {
      mark.save();
      console.log('Contact for Mr. John Douglas has been successfully stored');
    }
  });
  john_douglas.save(function(error) {
    if (error) {
      console.log('Error while saving contact for Mr. John Douglas');
      console.log(error);
    } else {
      john_douglas.save();
      console.log('Contact for Mr. John Douglas has been successfully stored');
    }
  });
  jianfang_bladen.save(function(error) {
    if (error) {
      console.log('Error while saving contact for Mr. John Douglas');
      console.log(error);
    } else {
      jianfang_bladen.save();
      console.log('Contact for Mr. John Douglas has been successfully stored');
    }
  });
});

router.get('/', function(req, res, next) {
  Contact.find({}, function(error, result) {
    if (error) {
      console.error(error);
      return null;
    }
    if (res != null) {
      res.setHeader('content-type', 'application/json');
      res.end(JSON.stringify(result));
    }
    return JSON.stringify(result);
  });
});


router.get('/number/:number', function(req, res, next) {
  Contact.findOne({primarycontactnumber: req.params.number},
      function(error, result) {
        if (error) {
          console.error(error);
          res.writeHead(500,
              {'Content-Type': 'text/plain'});
          res.end('Internal server error');
          return;
        } else {
          if (!result) {
            if (res != null) {
              res.writeHead(404, {'Content-Type': 'text/plain'});
              res.end('Not Found');
            }
            return;
          }
          if (res != null) {
            res.setHeader('Content-Type', 'application/json');
            res.send(result);
          }
          console.log(result);
        }
      });
});


router.delete('/number/:number', function(req, res, next) {
  Contact.findOne({primarycontactnumber: req.params.number},
      function(error, result) {
        if (error) {
          console.error(error);
          res.writeHead(500,
              {'Content-Type': 'text/plain'});
          res.end('Internal server error');
          return;
        } else {
          result.remove(function(error) {
            if (!error) {
              result.remove();
            } else {
              console.log(error);
            }
            if (res != null) {
              res.send('Deleted');
            }
            return;
          });
        }
      });
});

module.exports = router;
