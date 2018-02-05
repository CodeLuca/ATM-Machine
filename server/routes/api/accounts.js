const Account = require('../../models/Account');
const shortid = require('shortid');

module.exports = (app, io) => {
  app.get('/api/get-accounts', (req, res, next) => {
    Account.find()
      .exec()
      .then((account) => res.json(account))
      .catch((err) => next(err));
  });

  app.get('/api/new-account/:id/:pin/:name', (req, res, next) => {
    if(isNaN(req.params.pin)) {
      res.send({'error': 'Your PIN must be a number.'})
      return;
    }
    if(req.params.pin.toString().length != 4) {
      res.send({'error': 'Your PIN must be 4 digits.'})
      return; 
    }
    Account.findOne({'identifier': req.params.id})
      .exec()
      .then((a) => {
        if(a) {
          res.send({'error': 'Account with that identifier already exists.'});
        } else {
          const account = new Account({
            pin: req.params.pin,
            identifier: req.params.id,
            name: req.params.name
          });

          account.save()
            .then(() => {
              req.session.user = account;
              res.redirect('/');
            })
            .catch((err) => res.send({'error': err}));
        }
      });
  });

  app.get('/api/account/*', (req, res, next) => {
    if(!req.session.user) {
      res.send({'error': true});
    } else {
      Account.findById(req.session.user._id)
      .exec()
      .then((account) => {
        req.session.user = account;
        next();
      })
    }
  });

  app.get('/api/login/:id/:pin', (req, res, next) => {
    if(req.session.user) {
      res.redirect('/');
      return;
    }
    
    Account.findOne({'identifier': req.params.id})
      .exec()
      .then((account) => {
        if(account.pin != req.params.pin) {
          res.send({'error': 'Incorrect pin.'});
        } else {
          req.session.user = account;
          res.json({'error': null})
        }
      })
      .catch((err) => next(res.send({'error': 'Incorrect account number or pin.'})));
  });

  app.get('/api/delete-account/:id', (req, res, next) => {
    Account.findOneAndRemove({ _id: req.params.id })
      .exec()
      .then((result) => res.json(result))
      .catch((err) => next(err));
  })

  app.get('/api/account/withdraw/:amount', (req, res, next) => {
    if(isNaN(req.params.amount)) {
      res.send({'error': 'Amount must be a number'});
      return;
    }

    Account.findById(req.session.user.id)
      .exec()
      .then((account) => {
        if(account.balance < req.params.amount) {
          res.send({error: 'You do not have enough money in your balance to withdraw this amount'});
          return;
        }
        account.balance -= Number(req.params.amount);

        account.save()
          .then(() => res.json(account))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.get('/api/account/deposit/:id/:amount', (req, res, next) => {
    Account.findById(req.params.id)
      .exec()
      .then((account) => {
        account.balance += Number(req.params.amount);

        account.save()
          .then(() => res.json(account))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  });

  app.get('/api/account/get', (req, res, next) => {
    Account.findById(req.session.user.id)
      .exec()
      .then((account) => {
        res.json(account);
      })
      .catch((err) => next(err));
  });

  app.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/login');
  })
};
