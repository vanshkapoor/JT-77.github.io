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
          if (user) {
            // User is signed in.
            var displayName = user.displayName;
            var email = user.email;
            var emailVerified = user.emailVerified;
            var photoURL = user.photoURL;
            var isAnonymous = user.isAnonymous;
            uid = user.uid;
            var providerData = user.providerData;
            // console.log(uid);
            localStorage.setItem("id",uid);
            // if(localStorage.getItem("name")==null)
            // localStorage.setItem("name",prompt("Enter Client Name"));
            // console.log(localStorage.getItem("token"))
            if(localStorage.getItem("token")!=null)  
            location.href="index.html";
          } else {
          }
        });
        
  
        $("form").submit(function(){
            var email=$("input[name=email]").val();
            var pass=$("input[name=password]").val();
            var auth=firebase.auth();
            $("#login").css("color","white");
            var promise=auth.signInWithEmailAndPassword(email,pass);
            promise.then(function(data)
            {
                console.log(data);
               $("#login i").removeAttr('class').addClass("fa fa-check").css({"color":"#fff"});
                  $(".submit").css({"background":"#2ecc71", "border-color":"#2ecc71"});
                  $(".feedback").show().animate({"opacity":"1", "bottom":"-80px"}, 400);
                  $("input").css({"border-color":"#2ecc71"});
                  $("legend,.feedback").addClass("green");
                  if(window.localStorage){
                      localStorage.setItem("token",btoa(email+":"+pass));
                      $(".feedback").html("Login Successful <br/> Redirecting..."); 
                  }
                  else{
                      alert("Your Browser doesnt support localStorage, Contact FelloApp team !")
                  }
            },function(error){
              $(".submit").css({"background":"orangered", "border-color":"orangered"});
              $(".feedback").show().animate({"opacity":"1", "bottom":"-80px"}, 400);
              $("input").css({"border-color":"orangered"});
              $("legend,.feedback").addClass("orange");
              $(".feedback").html("Wrong Email and Password <br>Try Again !")
            });
        });
  
        
  
  
  });