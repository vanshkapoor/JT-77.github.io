/**
 * Copyright 2015 Google Inc. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
'use strict';


// Initializes FriendlyChat.
function FriendlyChat() {
  this.checkSetup();

  // Shortcuts to DOM Elements.
  this.messageForm = document.getElementById('message-form');
  this.messageInput = document.getElementById('message');
  this.submitButton = document.getElementById('submit');
  this.submitImageButton = document.getElementById('submitImage');
  this.imageForm = document.getElementById('image-form');
  this.mediaCapture = document.getElementById('mediaCapture');
  this.userPic = document.getElementById('user-pic');
  this.userName = document.getElementById('user-name');
  this.signInButton = document.getElementById('sign-in');
  this.signOutButton = document.getElementById('sign-out');
  this.signInSnackbar = document.getElementById('must-signin-snackbar');
  this.Name="";

  // Saves message on form submit.
  this.messageForm.addEventListener('submit', this.saveMessage.bind(this));
  this.signOutButton.addEventListener('click', this.signOut.bind(this));
  this.signInButton.addEventListener('click', this.signIn.bind(this));

  // Toggle for the button.
  var buttonTogglingHandler = this.toggleButton.bind(this);
  this.messageInput.addEventListener('keyup', buttonTogglingHandler);
  this.messageInput.addEventListener('change', buttonTogglingHandler);

  // Events for image upload.
  this.submitImageButton.addEventListener('click', function(e) {
    e.preventDefault();
    this.mediaCapture.click();
  }.bind(this));
  this.mediaCapture.addEventListener('change', this.saveImageMessage.bind(this));


  this.initFirebase();
}

// Sets up shortcuts to Firebase features and initiate firebase auth.
FriendlyChat.prototype.initFirebase = function() {
  // TODO(DEVELOPER): Initialize Firebase.
  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  // Initiates Firebase auth and listen to auth state changes.
  this.auth.onAuthStateChanged(this.onAuthStateChanged.bind(this));
};

// Loads chat messages history and listens for upcoming ones.
FriendlyChat.prototype.getUser= function(num){


}

FriendlyChat.prototype.loadMessages = function(key) {
  // TODO(DEVELOPER): Load and listens for new messages.


  this.auth = firebase.auth();
  this.database = firebase.database();
  this.storage = firebase.storage();
  this.chatRef = this.database.ref('chats').child(key);
  // Make sure we remove all previous listeners.
  this.chatRef.off();

  // Loads the last 12 messages and listen for new ones.
  var setMessage = function(data) {
    var val = data.val();
alert("i00");


    this.displayMessage(data.key, "", val.message, "", val.imageUrl);
  }.bind(this);
  this.chatRef.limitToLast(12).on('child_added', setMessage);
  this.chatRef.limitToLast(12).on('child_changed', setMessage);
};








// Saves a new message on the Firebase DB.
FriendlyChat.prototype.saveMessage = function(e) {
  e.preventDefault();
  // Check that the user entered a message and is signed in.

    // TODO(DEVELOPER): push new message to Firebase.
    if (this.messageInput.value && this.checkSignedInWithMessage()) {
   var currentUser = this.auth.currentUser;

   //if candidate has been accessed for the second time

   this.saveChatRef=this.database.ref('chats').child(id).push();
   this.save.push({
     name: currentUser.displayName,
     message: this.messageInput.value,
     userID: currentUser.uid,
     Timestamp: new Date().getTime()

   });
/*
//add last chat to user
    $(function() {
      $.ajax({
           url: "http://13.71.116.40:4040/addChatToUser.php",

           type: "POST",

           data:{
             id:"",
             chatID : this.recruiterRef.key(),
             email : currentUser.email,
             userID: currentUser.uid,
             userName :currentUser.displayName,
             lastChatMessage: {
               id: chatId,
               message:this.messageInput.value,
               timeStamp: new Date().getTime(),
               userID:""
             }
           }
   })
   .done(function(data){


   });
 });
//add last chat to candidate
 $(function() {
   $.ajax({
        url: "http://13.71.116.40:4040/addChatToCandidate.php",

        type: "POST",

        data: {
          chatID : this.recruiterRef.key(),
          email : "",
          userName :"",
          lastChatMessage: {
            id: chatId,
            message:this.messageInput.value,
            timeStamp: new Date().getTime(),
            userID:""
          }
        }
})
.done(function(data){


});
});



*/

   // Add a new message entry to the Firebase Database.
   this.saveChatRef.push({


   }).then(function() {
     // Clear message text field and SEND button state.
     FriendlyChat.resetMaterialTextfield(this.messageInput);
     this.toggleButton();
   }.bind(this)).catch(function(error) {
     console.error('Error writing new message to Firebase Database', error);
   });
 }
};

FriendlyChat.prototype.checkFirstChat= function(){
  console.log("hi");


};

// Sets the URL of the given img element with the URL of the image stored in Cloud Storage.
FriendlyChat.prototype.setImageUrl = function(imageUri, imgElement) {
  imgElement.src = imageUri;

  // TODO(DEVELOPER): If image is on Cloud Storage, fetch image URL and set img element's src.
};

// Saves a new message containing an image URI in Firebase.
// This first saves the image in Firebase storage.
FriendlyChat.prototype.saveImageMessage = function(event) {
  event.preventDefault();
  var file = event.target.files[0];

  // Clear the selection in the file picker input.
  this.imageForm.reset();

  // Check if the file is an image.
  if (!file.type.match('image.*')) {
    var data = {
      message: 'You can only share images',
      timeout: 2000
    };
    this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
    return;
  }
  // Check if the user is signed-in
  if (this.checkSignedInWithMessage()) {

    // TODO(DEVELOPER): Upload image to Firebase storage and add message.

  }
};

// Signs-in Friendly Chat.
FriendlyChat.prototype.signIn = function() {
  // TODO(DEVELOPER): Sign in Firebase with credential from the Google user.
  var provider = new firebase.auth.GoogleAuthProvider();
 this.auth.signInWithPopup(provider);
};

// Signs-out of Friendly Chat.
FriendlyChat.prototype.signOut = function() {
  // TODO(DEVELOPER): Sign out of Firebase.
   this.auth.signOut();
};

FriendlyChat.prototype.mapFirebaseId= function(uid){
  var script = document.createElement("SCRIPT");
     script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
     script.type = 'text/javascript';
     script.onload = function() {
       $ = jQuery.noConflict();
  $(function() {
    $.ajax({
         url: "http://13.71.116.40:4040/mapFirebaseId.php",
         type: "POST",

   data:{
     id: uid,
     number: "8860302093"
   }
 })
 .done(function(data){
   data=JSON.parse(data);
   console.log(data);

 });
});
};
document.getElementsByTagName("head")[0].appendChild(script);

};

FriendlyChat.prototype.loadChatHistory= function(num,callback){



    var script = document.createElement("SCRIPT");
    script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
    script.type = 'text/javascript';
    script.onload = function() {
      $ = jQuery.noConflict();
      var recruiter="";
      var userId=sessionStorage.getItem("userId");
      console.log(userId);

      $(function() {
        $.ajax({
             url: "http://13.71.116.40:4040/getUserDetails.php",

             type: "POST",

       data:{
         id:userId

       }
     })
     .done(function(data){
       data=JSON.parse(data);
       console.log(data);
       recruiter=data;

     });
   });

      $(function() {
        $.ajax({
             url: "http://13.71.116.40:4040/checkFirstChat.php",

             type: "POST",

       data: {
         number:num,
         email:recruiter.email//recruiter's id fetched from canres.html
       }
     })
     .done(function(data){
  //If candidate comes for the first time
      console.log(data);


      switch (data.response) {
        //if response=1, new chat
        //response=0 doesn't exits

        case 1:{

          this.auth=firebase.auth();
          var currentUser=this.auth.currentUser;
          this.database=firebase.database();
          this.recruiterRef=this.database.ref('chats');
          this.ashfaqRef=this.database.ref('chats');
          this.save=this.recruiterRef.push();
          var chatId=this.save.key;
          this.save1=this.ashfaqRef.push();
          var chatId1=this.save1.key;
   //add both the chats in chat table
          this.savechat=this.save.push({
            name: recruiter.name,
            message: "Hello, How may I help you?",
            userID:recruiter.userID,
            Timestamp: new Date().getTime()
          });
          var chatID=this.savechat.key;

          this.savechat1=this.save1.push({
            name: "Ashfaq",
            message: "Hello, How may I help you?",
            userID:"M0ntN8WLBEXIgSKJXq1Mm5rbySu2" ,
            Timestamp: new Date().getTime()
          });
          var chatID1=this.savechat1.key;

   //map firebase ID on candidate table




   //add new recruiter's chat to user
           $(function() {
             $.ajax({
                  url: "http://13.71.116.40:4040/addChatToUser.php",

                  type: "POST",

            data:{
              id:recruiter.userID,
              chat:{
                chatID : chatId,
                email : currentUser.email,
                userID: currentUser.uid,
                userName :currentUser.displayName,
                lastChatMessage: {
                  id: chatID,
                  message:"Hello, How may I help you?",
                  timeStamp: new Date().getTime(),
                  userID:recruiter.userID
                }
              }
            }
          })
          .done(function(data){
            data=JSON.parse(data);
            console.log("addChatToUser="+adata);

          });
        });
   //add new recruiter's chat to candidate
        $(function() {
          $.ajax({
               url: "http://13.71.116.40:4040/addChatToCandidate.php",

               type: "POST",

               data:{
                 number: num,
                 chat:{
                   chatID : chatId,
                   email : recruiter.email,
                   userID: recruiter.userID,
                   userName : recruiter.name,
                   lastChatMessage: {
                     id: chatID,
                     message:"Hello, How may I help you?",
                     timeStamp: new Date().getTime(),
                     userID: recruiter.userID
                   }
                 }
               }
       })
       .done(function(data){
         data=JSON.parse(data);
         console.log("addChatToCandidate"+data);

       });
     });
   //add ashfaq chat to ashfaq
             $(function() {
               $.ajax({
                    url: "http://13.71.116.40:4040/addChatToUser.php",

                    type: "POST",

                    data:{
                      id:"M0ntN8WLBEXIgSKJXq1Mm5rbySu2",
                      chat:{
                        chatID : chatId1,
                        email : currentUser.email,
                        userID: currentUser.uid,
                        userName :currentUser.displayName,
                        lastChatMessage: {
                          id: chatID1,
                          message:"Hello, How may I help you?",
                          timeStamp: new Date().getTime(),
                          userID:"M0ntN8WLBEXIgSKJXq1Mm5rbySu2"
                        }
                      }
                    }
            })
            .done(function(data){
              data=JSON.parse(data);
              console.log("addChatToAshfaq="+data);

            });
          });
   //add ashfaq chat to candidate
          $(function() {
            $.ajax({
                 url: "http://13.71.116.40:4040/addChatToCandidate.php",

                 type: "POST",

                 data:{
                   number: num,
                   chat:{
                     chatID :chatId1,
                     email : "ashfaq@essoss.in",
                     userID: "M0ntN8WLBEXIgSKJXq1Mm5rbySu2",
                     userName : "Ashfaq",
                     lastChatMessage: {
                       id: chatID1,
                       message:"Hello, How may I help you?",
                       timeStamp: new Date().getTime(),
                       userID: "M0ntN8WLBEXIgSKJXq1Mm5rbySu2"
                     }
                   }
                 }
         })
         .done(function(data){
           data=JSON.parse(data);
           console.log("addAshfaqChatToCandidate="+data);

         });
       });





          break;
        }

        //if response=50, ashfaq's chat already exits, but the recruiter is new
        case 50:{
          this.auth=firebase.auth();
          var currentUser=this.auth.currentUser;
          this.database=firebase.database();
          this.recruiterRef=this.database.ref('chats');
          this.save=this.recruiterRef.push();
          var chatId=this.save.key;

          this.savechat=this.save.push({
            name: recruiter.name,
            message: "Hello, How may I help you?",
            userID:recruiter.userID,
            Timestamp: new Date().getTime()
          });
          var chatID=this.savechat.key;

          //add new recruiter's chat to user
                  $(function() {
                    $.ajax({
                         url: "http://13.71.116.40:4040/addChatToUser.php",

                         type: "POST",

                   data:{
                     id:recruiter.userID,
                     chat:{
                       chatID : chatId,
                       email : currentUser.email,
                       userID: currentUser.uid,
                       userName :currentUser.displayName,
                       lastChatMessage: {
                         id: chatID,
                         message:"Hello, How may I help you?",
                         timeStamp: new Date().getTime(),
                         userID:recruiter.userID
                       }
                     }
                   }
                 })
                 .done(function(data){
                   data=JSON.parse(data);
                   console.log("addChatToUser="+data);

                 });
               });
          //add new recruiter's chat to candidate
               $(function() {
                 $.ajax({
                      url: "http://13.71.116.40:4040/addChatToCandidate.php",

                      type: "POST",

                      data:{
                        number: num,
                        chat:{
                          chatID : chatId,
                          email : recruiter.email,
                          userID: recruiter.userID,
                          userName : recruiter.name,
                          lastChatMessage: {
                            id: chatID,
                            message:"Hello, How may I help you?",
                            timeStamp: new Date().getTime(),
                            userID: recruiter.userID
                          }
                        }
                      }
              })
              .done(function(data){
                data=JSON.parse(data);
                console.log("addChatToCandidate="+data);

              });
            });


          break;
        }
        case 100:{

          //if response=100, the recruiter already exists

          break;
        }
      }

       //load previous chats
              $(function() {
                $.ajax({
                     url: "http://13.71.116.40:4040/getCandidateChatId.php",

                     type: "POST",

               data: {
                 number:num
               }

                 })
              .done(function(data){
                var i=0;
                var r=JSON.parse(data);
                alert(chatId);
                for(i=0;i<r.length;i++){
                  callback(r[i].chatID,r[i].name);
                  console.log(r[i].chatID);
                }
                console.log(data);

              });
              });

     });
   });

   };
   document.getElementsByTagName("head")[0].appendChild(script);


};

// Triggers when `the auth state change for instance when the user signs-in or signs-out.
FriendlyChat.prototype.onAuthStateChanged = function(user) {
  if (user) { // User is signed in!
    // Get profile pic and user's name from the Firebase user object.
    var profilePicUrl = user.photoURL; // Only change these two lines!
     var userName = user.displayName;   // Only change these two lines!

    // Set the user's profile pic and name.
    this.userPic.style.backgroundImage = 'url(' + profilePicUrl + ')';
    this.userName.textContent = userName;

    // Show user's profile and sign-out button.
    this.userName.removeAttribute('hidden');
    this.userPic.removeAttribute('hidden');
    this.signOutButton.removeAttribute('hidden');

    // Hide sign-in button.
    this.signInButton.setAttribute('hidden', 'true');

    // We load currently existing chant messages.
    this.mapFirebaseId(user.uid);
    var number= sessionStorage.getItem("number");
    this.loadChatHistory(number,this.store);
  //  this.getUser("9702319013");


/*    var script = document.createElement("SCRIPT");
   script.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js';
   script.type = 'text/javascript';
   script.onload = function() {
     $ = jQuery.noConflict();
     $(function() {
       $.ajax({
            url: "http://13.71.116.40:4040/addChatToUser.php",

            type: "POST",

			data: {
        chatID:"hidf",
        userName:user.displayName,
        lastChatMessage:{
          id: user.uid
        },
        Timestamp: new Date().getTime()
      }

        })
		.done(function(data){

		console.log(data);
		});
 });
   };
   document.getElementsByTagName("head")[0].appendChild(script);
*/



  //  this.getUser(user.uid);
    //this.loadPreviousChats(user.uid);
  //  this.loadMessages(user);

    // We save the Firebase Messaging Device token and enable notifications.
    this.saveMessagingDeviceToken();
  } else { // User is signed out!
    // Hide user's profile and sign-out button.
    this.userName.setAttribute('hidden', 'true');
    this.userPic.setAttribute('hidden', 'true');
    this.signOutButton.setAttribute('hidden', 'true');

    // Show sign-in button.
    this.signInButton.removeAttribute('hidden');
  }
};

// Returns true if user is signed-in. Otherwise false and displays a message.
FriendlyChat.prototype.checkSignedInWithMessage = function() {
  /* TODO(DEVELOPER): Check if user is signed-in Firebase. */
  if (this.auth.currentUser) {
     return true;
   }
  // Display a message to the user using a Toast.
  var data = {
    message: 'You must sign-in first',
    timeout: 2000
  };
  this.signInSnackbar.MaterialSnackbar.showSnackbar(data);
  return false;
};

// Saves the messaging device token to the datastore.
FriendlyChat.prototype.saveMessagingDeviceToken = function() {
  // TODO(DEVELOPER): Save the device token in the realtime datastore
};

// Requests permissions to show notifications.
FriendlyChat.prototype.requestNotificationsPermissions = function() {
  // TODO(DEVELOPER): Request permissions to send notifications.
};

// Resets the given MaterialTextField.
FriendlyChat.resetMaterialTextfield = function(element) {
  element.value = '';
  element.parentNode.MaterialTextfield.boundUpdateClassesHandler();
};

// Template for messages.
FriendlyChat.MESSAGE_TEMPLATE =
    '<div class="message-container"  id="container">' +
      '<div class="spacing"><div class="pic"></div></div>' +
      '<div class="message" id="message"></div>' +
      '<div class="name" ></div>' +
    '</div>';

    FriendlyChat.MESSAGE_TEMPLATE1 =
        '<div class="message-container"  id="container">' +
          '<div class="spacing"><div class="pic"></div></div>' +
          '<div class="message"style="cursor:pointer" id="message"></div>' +
          '<div class="name" ></div>' +
        '</div>';
// A loading image URL.
FriendlyChat.LOADING_IMAGE_URL = 'https://www.google.com/images/spin-32.gif';


FriendlyChat.prototype.store= function(key,name){

  var div = document.getElementById(key);
  var messageList1 =document.getElementById('messages1');

  // If an element for that message does not exists yet we create it.
  if (!div) {
    var container = document.createElement('div');
    container.innerHTML = FriendlyChat.MESSAGE_TEMPLATE1;
    div = container.firstChild;
    div.setAttribute('id', key);
    messageList1.appendChild(div);
    document.getElementById('message').onclick = function() {
      FriendlyChat.prototype.loadMessages(key);
    };

  }

//  div.addEventListener("click",function(){
//    this.loadMessages(key);
//  },false);
  div.querySelector('.message').textContent = name;
  // Show the card fading-in.
  setTimeout(function() {div.classList.add('visible')}, 1);
  messageList1.scrollTop = messageList1.scrollHeight;


//pass recruiter's id when clicked

//FriendlyChat.prototype.loadMessages("-Kjbm8pRHe4Axa8ABotX");

};

// Displays a Message in the UI.
FriendlyChat.prototype.displayMessage = function(key, name, text, picUrl, imageUri) {
  var div = document.getElementById(key);
  var messageList = document.getElementById('messages');

  // If an element for that message does not exists yet we create it.
  if (!div) {
    var container = document.createElement('div');
    container.innerHTML = FriendlyChat.MESSAGE_TEMPLATE;
    div = container.firstChild;
    div.setAttribute('id', key);
    messageList.appendChild(div);

  }
  if (picUrl) {
    div.querySelector('.pic').style.backgroundImage = 'url(' + picUrl + ')';
  }
  div.querySelector('.name').textContent = name;
  var messageElement = div.querySelector('.message');
  if (text) { // If the message is text.
    messageElement.textContent = text;
    // Replace all line breaks by <br>.
    messageElement.innerHTML = messageElement.innerHTML.replace(/\n/g, '<br>');
  } else if (imageUri) { // If the message is an image.
    var image = document.createElement('img');
    image.addEventListener('load', function() {
      messageList.scrollTop = messageList.scrollHeight;
    }.bind(this));
    this.setImageUrl(imageUri, image);
    messageElement.innerHTML = '';
    messageElement.appendChild(image);
  }
  // Show the card fading-in.
  setTimeout(function() {div.classList.add('visible')}, 1);
  messageList.scrollTop = messageList.scrollHeight;
  //this.messageInput.focus();
};

// Enables or disables the submit button depending on the values of the input
// fields.
FriendlyChat.prototype.toggleButton = function() {
  if (this.messageInput.value) {
    this.submitButton.removeAttribute('disabled');
  } else {
    this.submitButton.setAttribute('disabled', 'true');
  }
};

// Checks that the Firebase SDK has been correctly setup and configured.
FriendlyChat.prototype.checkSetup = function() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
        'Make sure you go through the codelab setup instructions and make ' +
        'sure you are running the codelab using `firebase serve`');
  }
};

window.onload = function() {
  window.friendlyChat = new FriendlyChat();
};
