/**
 * Gets a random sentence.
 *
 * For all you meaningless stuff that
 * seems meaningful
 *
 * Written By: Jay Harris
 * Date Written: 21/07/2015
 */
var require_install = require('require-install'),
  request = require_install('request');

exports.match = function(text) {
    return text.startsWith(this.platform.commandPrefix + 'profound');
};

exports.help = function() {
    return this.platform.commandPrefix + 'profound : Calculates the meaning of life. You probably wouldn\'t understand';
};

exports.fetch = function(callback) {
    request.post('http://watchout4snakes.com/wo4snakes/Random/NewRandomSentence', function(error, response) {
        if (error || response.statusCode !== 200) {
            callback("Something went horribly, terribly wrong. It's probably your fault.");
            return;
        }

        callback(response.body);
    });
};

exports.run = function(api, event) {
    exports.fetch(function (sentence) {
        api.sendMessage(sentence, event.thread_id);
    });
};