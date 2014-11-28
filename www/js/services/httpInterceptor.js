angular.module('starter').factory('sessionInjector', function() {
    var sessionInjector = {
        response: function(config) {
            return config;
        }
    };
    return sessionInjector;
});