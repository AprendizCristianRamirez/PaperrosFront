"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");
var _passport = _interopRequireDefault(require("passport"));
var _passportGoogleOauth = require("passport-google-oauth20");
var _dotenv = _interopRequireDefault(require("dotenv"));
_dotenv["default"].config();
var email = ["emmanuelgodi95@gmail.com"];
_passport["default"].use("auth-google", new _passportGoogleOauth.Strategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_LOGIN
}, function (accessToken, refreshToken, profile, cb) {
  var response = email.includes(profile.emails[0].value);
  if (response) {
    cb(null, profile);
  } else {
    //save database
    email.push(profile.emails[0].value);
    cb(null, profile);
  }
}));