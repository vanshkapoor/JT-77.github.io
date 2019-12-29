app.controller("dams",function($scope,damsFactory){
    
    $scope.loadDams=function(){
        var promise=damsFactory.getDams();
        promise.then(function(data){
            console.log(data.data.data);
            $scope.dams=data.data.data;
        },function(er){
            $scope.error=er;
        });
    };
    
    $scope.getDate=function(date){
        return new Date(date).toLocaleDateString();
    }

});



var session_token=localStorage.getItem("session_token");
app.factory("damsFactory",function($q,$http){
 var object={
     
     getDams:function(page){
         page=page||0;
         var pr=$q.defer();
         $http({
            url:origin+"/user_home/dams",
        	method:"GET"
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

