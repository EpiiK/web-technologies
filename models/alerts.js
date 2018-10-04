const mongoose = require('mongoose');
const config = require('../config/database');

const locationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Point'],
    required: true
  },
  coordinates: {
    type: [Number],
    required: true
  }
});

const alertSchema = new mongoose.Schema({
  alertType: {
    type: String,
    required: true
  },
  location: {
    type: locationSchema,
    required: true
  },
  reportedBy: {
    type: String,
    required: true
  },
  timeReported: {
    type: Date,
    default: Date.now
  },
  description: {
    type: String
  },
  inProgress: {
    type: Boolean,
    default: true
  }
});

alertSchema.index({ location: '2dsphere' });

const Alert = module.exports = mongoose.model('Alert', alertSchema);

module.exports.getAlertsByLocation = function(latitude, longitude, radius, callback) {
  const locations = [];
  Alert.find({
    location: {
      $near: {
        $maxDistance: radius,
        $geometry: {
          type: 'Point',
          coordinates: [longitude, latitude]
        }
      }
    }, inProgress: true
  }, (err, results) => {
    if (err) {
      callback(null, err);
    } else {
      callback(null, results);
    }
  });
}

module.exports.addAlert = function(newAlert, callback) {
  newAlert.save(callback);
}

module.exports.updateAlertStatus = function(alertID, callback) {
  const query = { _id: alertID }
  Alert.findOne(query, (err, alert) => {
    if (alert) {
      alert.inProgress = false;
      alert.save(callback);
    } else {
      console.log(err);
    }
  });
}
