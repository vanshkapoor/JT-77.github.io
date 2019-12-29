app.config(function($routeProvider,$locationProvider){
	$locationProvider.hashPrefix('');
    $routeProvider.when("/",{
        templateUrl:"dashboard.html",
//        controller:"homeCtrl"
    }).when("/dashboard",{
        templateUrl:"dashboard.html",
//        controller:"homeCtrl"
    }).when("/dams",{
        templateUrl:"dams.html",
//        controller:"damctrl"
    }).when("/notifications",{
        templateUrl:"notification.html",
//        controller:"loginCtrl"
    }).when("/directories",{
        templateUrl:"directories.html",
//        controller:"loginCtrl"
    }).when("/alerts",{
        templateUrl:"alerts.html",
    }).when("/help",{
        template:'<div ng-controller="help"><div id="map" ng-init="getLocation()"></div></div>'
    }).when("/settings",{
        templateUrl:"settings.html"
    }).otherwise({template:"Error Page , No Match Found"
        ,redirectTo:"/dashboard"});
});