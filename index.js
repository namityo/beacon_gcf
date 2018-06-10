exports.beaconPublish = require("./lib/pubsub/beaconlog").publish
exports.beaconSubscribe = require("./functions/pubsub")
exports.beaconHttpTrigger = require("./functions/http/beaconlogs")
exports.detectorHttpTrigger = require("./functions/http/detectors")