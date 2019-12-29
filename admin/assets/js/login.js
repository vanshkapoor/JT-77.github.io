var signupmode=false,nameG="";
$(document).ready(function(){
  
      $(".input" ).focusin(function() {
          $( this ).find("span").animate({"opacity":"0"}, 200);
        });
        
        $(".input").focusout(function() {
          $( this ).find( "span" ).animate({"opacity":"1"}, 300);
        });
        
  
      var config = {
        apiKey: "AIzaSyD2OMabK-UdmrY5tExuWF8YNgeKnYddnZQ",
        authDomain: "hirecall-5bbea.firebaseapp.com",
        databaseURL: "https://hirecall-5bbea.firebaseio.com",
        projectId: "hirecall-5bbea",
        storageBucket: "hirecall-5bbea.appspot.com",
        messagingSenderId: "44473246990"
      };
        firebase.initializeApp(config);
        var uid="";
        firebase.auth().onAuthStateChanged(function(user) {
          if (user){
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            uid = user.uid;
            var providerData = user.providerData;
            // console.log(uid);
              var obj={};
              obj[uid]={
                            "name":nameG||displayName||email.split("@")[0],
                            "domain":email.substring(email.indexOf("@")+1,email.lastIndexOf(".")),
                            "email":email
                };
              console.log(obj,signupmode);
            if(emailVerified||true){  
            localStorage.setItem("id",uid);
            localStorage.setItem("name",displayName||nameG||email.split("@")[0]);
            if(localStorage.getItem("token")!=null)  
            location.href="index.html";    
            }
           else {
               if(signupmode){
                    $.ajax({
                        url:"http://52.230.124.2/addUserWeb.php",
                        type:"post",
                        data:obj
                    });
                }
               else{
                $("#loginform input[name=email]").val(email);  
               alert("Your account is not verified . \n Please check your registereted mail box and verify your account to log in .")
             }
            }
          }
        });
        
  
        $("#loginform").submit(function(){
            var email=$("#loginform input[name=email]").val();
            var pass=$("#loginform input[name=password]").val();
            var valid=checkEmailValid(email);
            if(!valid){
                $(".emailerror").show();
                return ;
            }
            $(".emailerror").hide();
            var auth=firebase.auth();
            $("#login").css("color","white");
            var promise=auth.signInWithEmailAndPassword(email,pass);
            promise.then(function(data)
            {
//                console.log(data);
               $("#login i").removeAttr('class').addClass("fa fa-check").css({"color":"#fff"});
                  $(".submit").css({"background":"#2ecc71", "border-color":"#2ecc71"});
                  $(".feedback").show().animate({"opacity":"1", "bottom":"-80px"}, 400);
                  $("input").css({"border-color":"#2ecc71"});
                  $("legend,.feedback").removeClass("orange").addClass("green");
                  if(window.localStorage){
                      localStorage.setItem("token",btoa(email+":"+pass));
                      $(".feedback").html("Login Successful <br/> Redirecting..."); 
                  }
                  else{
                      alert("Your Browser doesnt support localStorage, Contact FelloApp team !")
                  }
            },function(error){
              $(".submit").css({"background":"orangered", "border-color":"orangered"});
              $(".feedback").show().animate({"opacity":"1","bottom":"-80px"}, 400);
              $("input").css({"border-color":"orangered"});
              $("legend,.feedback").addClass("orange");
              $(".feedback").html("Wrong Email and Password <br>Try Again !")
            });
        });
        
        $("#signupform").submit(function(){
            var name=$("#signupform inut[type=text]").val();
            var email=$("#signupform input[name=email]").val();
            var pass=$("#signupform input[name=password]").val();
            var passconf=$("#signupform input[name=confpassword]").val();
            nameG=name;
            var valid=checkEmailValid(email);
            if(!valid){
                $(".emailerror").show();
                return ;
            }
            if(pass!=passconf){
                $(".confpasserror").hide();    
                return ;    
            }
            $(".confpasserror").hide();    
            $(".emailerror").hide();
            var auth=firebase.auth();
            $("#signup").css("color","white");
            var promise=auth.createUserWithEmailAndPassword(email,pass);
            promise.then(function(data)
            {  
//                console.log(data);
                signupmode=true;
               $("#signup i").removeAttr('class').addClass("fa fa-check").css({"color":"#fff"});
                  $(".submit").css({"background":"#2ecc71", "border-color":"#2ecc71"});
                  $(".feedback").show().animate({"opacity":"1", "bottom":"-80px"}, 400);
                  $("input").css({"border-color":"#2ecc71"});
                  $("legend,.feedback").removeClass("orange").addClass("green");
                  if(window.localStorage){
                      localStorage.setItem("token",btoa(email+":"+pass));
                      $(".feedback").html("Signup Successful <br/> Please verify your account with the registered email id to log in.");
                      setTimeout(function(){
                          $("#loginform").show();
                          $("#signupform").hide();
                          reset();
                      },2000);
                      location.href=""
                  }
                  else{
                      alert("Your Browser doesnt support localStorage, Contact FelloApp team !")
                  }
            },function(error){
                var errorCode = error.code;
                var errorMessage = error.message;
//                alert(errorMessage);
                console.log(errorCode,error);
              $(".submit").css({"background":"orangered", "border-color":"orangered"});
              $(".feedback").show().animate({"opacity":"1", "bottom":"-80px"}, 400);
              $("input").css({"border-color":"orangered"});
              $("legend,.feedback").addClass("orange");
              $(".feedback").html(errorMessage);
            });
        });
            
  });

function reset(){
    $("input").val("");
    $(".emailerror,.confpasserror").hide();
    $("legend,.feedback").removeClass("orange").removeClass("green");
    $(".feedback").hide();  
    $(".submit").css({"background":"#EDEDED", "border-color":"#2196F3"});
    $("input").css({"border-color":"#EDEDED"});
                  
}

function checkEmailValid(email){
    var domain=email.substring(email.indexOf("@")+1,email.lastIndexOf("."));
//    alert(domain);
//    if(domain.toLowerCase()=="gmail"||domain.toLowerCase()=="yahoo"||domain.toLowerCase()=="rediff"||domain.toLowerCase()=="outlook")
//    return false;
//    else 
        return true;
}