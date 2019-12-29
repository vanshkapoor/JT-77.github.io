app.controller("directories",function($scope,directoriesfactory){

    $scope.loadDirectories=function(){
        var promise=directoryfactory.getDirectoriesList();
        promise.then(function(data){
            $scope.directoryList=data.data.data;
            $scope.directory=$scope.directoryList[0];
        },function(er){
            $scope.error=er;
        });
    };
    
    
    
    $scope.addDirectories=function(dto_obj){
        console.log(dto_obj);
        var promise=directoryfactory.addDirectories(dto_obj);
        promise.then(function(data){
            $scope.directoryList.push($scope.directory);
            console.log($scope.directory);
        },function(er){
            $scope.error=er;
        });
    };
    
    $scope.updateDirectories=function(dto_obj,index){
        console.log(dto_obj);
        var promise=directoryfactory.updateDirectories(dto_obj);
        promise.then(function(data){
            $scope.directoryList[index]=dto_obj;
            console.log(data);
        },function(er){
            $scope.error=er;
        });
    };
    $scope.deleteDirectories=function(index){
    	var dto_obj=$scope.directoryList[index];
        var promise=directoryfactory.deleteDirectories(dto_obj);
        
            console.log("Calling delete directory");
        promise.then(function(data){
          $scope.directoryList.splice(index,1);
         console.log($scope.directoryList);
        },function(er){
            $scope.error=er;
        });
    };
    
    $scope.resetFeilds=function(){   
     $scope.doDisable=false;  
    $scope.directory={};
    for(x in $scope.directory){
            	$scope.directory[x]="";
    }
    $scope.addMode=false; 
        
    };
    
    $scope.onAddMode=function(){
        $scope.addMode=true;
        $scope.directory=JSON.parse(JSON.stringify($scope.directory));
            for(var x in $scope.directory){
            	$scope.directory[x]="";
            }
    };
    
    $scope.manageAddorUpdateDirectories=function(){
        var dto_obj=$scope.directory;
        if($scope.doDisable===false&&$scope.addMode===true){
           $scope.addDirectories(dto_obj);
            console.log("calling add directory")
        }
        else if($scope.doDisable===false&&$scope.addMode===false){
            $scope.updateDirectories(dto_obj);
            console.log("Calling update directory");
        }
//         $scope.resetFeilds();
    }

});



var session_token=localStorage.getItem("session_token")
app.factory("directories",function($q,$http){
 var object={
     
     getDirectoriesList:function(page){
         page=page||0;
         var pr=$q.defer();
         $http({
            url:origin+"user_home/directorys?page"+page+"&session_token="+session_token,
        	method:"post"
//        	params:{method:"getuserlist"}
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
     
     addDirectories:function(course){
    	 var pr=$q.defer();
         $http({
        	 method:"post",
        	 url:origin+"IMS-WEB__backend/course",
        	 params:{method:'add',
        		     dto_obj:course
        	 }              
         }
         ).then(function(data){
         
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
     updateDirectories:function(course){
    	 var pr=$q.defer();
         console.log(course);
    	 $http({
        	 method:"post",
        	 url:origin+"IMS-WEB__backend/course",
        	 params:{method:'update',
        		     dto_obj:course
        	         } 
         }).then(function(data){
             pr.resolve(data);
         },function(er){
             pr.reject(er);
         });
         return pr.promise;
     },
     deleteDirectories:function(course){
    	 var pr=$q.defer();
    	 $http({
        	 method:"post",
        	 url:origin+"IMS-WEB__backend/course",
        	 params:{method:'delete',
        		     dto_obj:course
        	         } 
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