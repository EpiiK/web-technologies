const mongoose = require('mongoose');

const alertSchema = new mongoose.Schema({
  alertType: {
    type: String,
    required: true
  },
  lattitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  reportedBy: {
    type: String,
    required: true
  },
  timeReported: {
    type: Date,
    default: Date.now
  }
});

const Alert = module.exports = mongoose.model('Alert', alertSchema);

module.exports.getAlertsByLocation = function(lattitude, longitude, callback) {
  Alert.find({lattitude: lattitude, longitude: longitude}, callback);
}

moudle.exports.addAlert = function(newAlert, callback) {
  newAlert.save(callback);
}
