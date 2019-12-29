app.controller("help",function($scope,helpFactory){
    
    $scope.loadMap=function(lat,long){
      var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat:lat, lng: long},
          zoom:17
        });  
         var marker = new google.maps.Marker({
          map:map,
          position:{lat:lat, lng: long}
        });
         var contentString ='<div><h4>My Position !</h4><p>Nearby people have been informed . <br>Someone will try to help you , in the meantime please move to the safe zone.</p></div>';

        var infowindow = new google.maps.InfoWindow({
          content: contentString
        });
        
        marker.addListener('click', function() {
          infowindow.open(map,marker);
          toggleBounce();
        });
        
          infowindow.open(map,marker);
          toggleBounce();
        
        
        function toggleBounce() {
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(google.maps.Animation.BOUNCE);
        }
        }

    };
    
    $scope.getLocation=function(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(requestHelp);
     } else {
        document.getElementById("map").innerHTML = "<h2>Geolocation is not supported by this browser.</h2>";
     }
    }
    function requestHelp(position){
        var promise=helpFactory.requestHelp( position.coords.latitude,position.coords.longitude);
        promise.then(function(data){
            $scope.loadMap(position.coords.latitude,position.coords.longitude);
        },function(er){
            $scope.error=er;
        });
    }

});



var session_token=localStorage.getItem("session_token");
app.factory("helpFactory",function($q,$http){
 var object={
     requestHelp:function(lat,long){
//         debugger;
         var pr=$q.defer();
         $http({
            url:origin+"user_home/help_me?latitude="+lat+"&longitude="+long+"&session_token="+session_token,
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

