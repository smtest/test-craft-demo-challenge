var frisby = require('frisby');
// var OAuth  = require('oauth-1.0a');
// var crypto  = require('crypto');
var oauthSignature = require('oauth-signature');

var url = 'https://api.twitter.com/1.1/search/tweets.json?q=%234smarkov';

var oauth_token = '<>';
var oauth_consumer_key = '<>';
var oauth_signature = '<>';
var consumerSecret = '<>';
var tokenSecret = '<>';
var oauth_timestamp = Math.floor(Date.now() / 1000);
var oauth_signature_method = 'HMAC-SHA1';
var oauth_version = '1.0';

var randomString = function(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

var parameters = {
    oauth_consumer_key : oauth_consumer_key,
    oauth_token : oauth_token,
    oauth_nonce : randomString(6),
    oauth_timestamp : oauth_timestamp,
    oauth_signature_method : oauth_signature_method,
    oauth_version : oauth_version
}

var oath_signature = oauthSignature.generate('GET', 'https://api.twitter.com/1.1/search/tweets.json', parameters, consumerSecret, tokenSecret);

var signature = 'OAuth oauth_consumer_key=\"' + oauth_consumer_key
    + '\",oauth_token="' + oauth_token
    + '\",oauth_signature_method=\"' + oauth_signature_method
    + '\",oauth_timestamp=\"' + oauth_timestamp
    + '\",oauth_nonce=\"' + randomString(6)
    + '\",oauth_version=\"' + oauth_version
    + '\",oauth_signature=\"' + oauth_signature

frisby.create('Get My Twitter feed')
    .addHeader('Authorization', signature)
    .get('https://api.twitter.com/1.1/search/tweets.json?q=%234smarkov&sign='+ signature)
    .expectStatus(200)
    .toss();
