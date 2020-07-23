// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';

const loopback = require('loopback');
const boot = require('loopback-boot');

const app = module.exports = loopback();

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    const baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      const explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});

console.log(Object.keys(app.models));

// app.models.user.find((err,  res) => {
//   if (res.length === 0 ){
//     const user = {
//       username: "Xander",
//       email: "test@test.com",
//       password: "test"
//     }
//     app.models.user.create(user, (err, result) => {
//       console.log('tried to create a user: ', result, err);
//     });
//   }
// });

app.models.user.afterRemote("create", (ctx, user, next) => {
  console.log("the new user is: ", user);
  app.models.Profile.create({
    user_name: user.first_name,
    first_name: user.first_name,
    created_at: new Date(),
    userId: user.id,
    last_name: user.last_name,
    birth_date: user.dateOfBirth,
    age: user.age
  }, (err, result) => {
    if(!err && result){
      console.log("Created new profile!: ", result);
    }else {
      console.log("There is an error: ", err);
    }
    next();
  });
});

app.models.Role.find({where: {name: "admin"}}, (err, role) => {
  if (!err && role){
    console.log("No error, Role is: ", role);
    if (role.length === 0){
      app.models.Role.create({
        name: "admin",
      }, (error, result) => {
        if(!error && result){
          app.models.user.findOne((userErr, user) => {
            if(!userErr && user){
              result.principals.create({
                principalType: app.models.RoleMapping.USER,
                principalId: user.id,
              }, (principalErr, principal) => {
                console.log("created principal", principalErr, principal)
              });
            }
          });
        }
      });
    }
  }
});