app.controller("notification",function($scope,notificationFactory){
 $scope.noAlert=false;
  $scope.noNotification=false;  
    $scope.loadNotifications=function(){
        var promise=notificationFactory.getNotifications();
        promise.then(function(data){
            console.log(data.data.data);
            var notifications=data.data.data;
            $scope.alerts=notifications.filter(function(obj){
                return obj.notification_type==2;
            });
            if($scope.alerts.length==0)
                $scope.noAlert=true;
            $scope.notificationList=notifications.filter(function(obj){
                return obj.notification_type==1;
            });
            
            if($scope.notificationList.length==0)
                $scope.noNotification=true;
        },function(er){
            $scope.error=er;
        });
    };
    
    $scope.getDate=function(date){
        return new Date(date).toLocaleDateString();
    }
    
    function showDestination(){
        
        var indianapolis = {lat: 39.79, lng: -86.14};

        var map = new google.maps.Map(document.getElementById('map'), {
          center: chicago,
          zoom: 7
        });

        var directionsDisplay = new google.maps.DirectionsRenderer({
          map: map
        });

        // Set destination, origin and travel mode.
        var request = {
          destination: indianapolis,
          origin: chicago,
          travelMode: 'DRIVING'
        };

        // Pass the directions request to the directions service.
        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function(response, status) {
          if (status == 'OK') {
            // Display the route on the map.
            directionsDisplay.setDirections(response);
          }
        });
    }

});



var session_token=localStorage.getItem("session_token");
app.factory("notificationFactory",function($q,$http){
 var object={
     
     getNotifications:function(page){
         page=page||0;
         var pr=$q.defer();
         $http({
            url:origin+"user_home/all_notifications?session_token="+session_token,
        	method:"POST"
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     }
 };
     
    console.log("server call");
    return object;
});