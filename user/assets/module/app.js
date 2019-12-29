const app=angular.module("dms",['ngRoute']);
app.filter('capitalize', function() {
    return function(input) {
      return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1).toLowerCase() : '';
    }
});
var origin="http://159.89.162.231:3000/";