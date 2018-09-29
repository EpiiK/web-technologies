const express = require('express');
const router = express.Router();
const Incident = require('../models/alerts');
const config = require('../config/database');
const googleMapsClient = require('@google/maps').createClient({
  key: process.env.GOOGLE_API_KEY,
  Promise: Promise
});

//Geocode an address
router.get('/geocode/:address', (req, res, next) => {
  googleMapsClient.geocode({ address: req.params.address })
  .asPromise()
  .then((response) => {
    res.json(response.json.results[0].geometry.location);
  })
  .catch((err) => {
    res.json(err);
  });
});

router.post('/lodge', (req, res, next) => {
  let newIncident = new Incident({
    alertType: req.body.type,
    location: { type: 'Point', coordinates: [req.body.longitude, req.body.latitude] },
    reportedBy: req.body.reportedBy,
    description: req.body.description
  });

  Incident.addAlert(newIncident, (err) => {
    if (err) {
      res.json({ success: false, message: "Failed to register event."});
    } else {
      res.json({ success: true, message: "Event successfully registered."})
    }
  });
});

router.get('/locations/:latitude/:longitude/:radius', (req, res, next) => {
  Incident.getAlertsByLocation(req.params.latitude, req.params.longitude, req.params.radius, (err, locations) => {
    if (err) {
      res.json({ success: false, message: "Failed to find incidents."});
    } else {
      res.json({ success: true, message: "Event successfully registered.", markers: locations});
    }
  });
});

module.exports = router;
