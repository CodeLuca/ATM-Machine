const mongoose = require('mongoose');

const AccountSchema = new mongoose.Schema({
  balance: {
  	type: Number,
  	default: 100
  },
  transactions: {
  	type: Array,
  	default: []
  },
  cardNumber: {
		type: Number,
		default: null
  },
  pin: {
  	type: Number,
  	default: null
  },
  identifier: {
  	type: String,
  	default: ''
  },
  name: {
    type: String,
    default: 'John Doe'
  }
});

module.exports = mongoose.model('Account', AccountSchema);
