app.controller("settings",function($scope,settingsFactory){
 
    $scope.loadSettings=function(){
        var promise=settingsFactory.getNotifications();
        promise.then(function(data){
            console.log(data.data.data);
            var settingss=data.data.data;
        
        },function(er){
            $scope.error=er;
        });
    };
    
    $scope.getDate=function(date){
        return new Date(date).toLocaleDateString();
    }
    

});



var session_token=localStorage.getItem("session_token");
app.factory("settingsFactory",function($q,$http){
 var object={
     
     getSettings:function(page){
         page=page||0;
         var pr=$q.defer();
         $http({
            url:origin+"user_home/all_settingss?session_token="+session_token,
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

