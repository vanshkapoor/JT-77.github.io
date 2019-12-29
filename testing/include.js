$j = jQuery.noConflict();



function video()
{
document.getElementById('id01').style.display='block';
}
function video1()
{
document.getElementById('id00').style.display='block';
}

function form()
{
document.getElementById('id02').style.display='block';
}
function form1()
{
document.getElementById('id03').style.display='block';
}

function social() {

    var x = document.getElementById("Demo");
    if (x.className.indexOf("w3-show") == -1) {
        x.className += " w3-show";
    } else {
        x.className = x.className.replace(" w3-show", "");
    }
}





var user="";



var skills="Android";

var nview="";
var device=navigator.userAgent;
if(device.match(/Android|iPhone|iPad|iPod/))
{
nview=".w3-mobile";
console.log("mobile");
$j('body').append("<div class='w3-blue' style='width:100%;position:fixed;z-index:1'>"
+"<table cellpadding='3' ><tr><td><img src='fellowapp.jpg' style='height:40px' class='w3-circle' alt='Image Not Available'></td><td><h4><font color='white'>FellowApp</font><br><font size='2px' color='white' id='status'>online</font></h4></td><td style='width:100%'>"
+"<div class='w3-dropdown-click w3-blue' style='float:right'>"
+"<img src='3dots.png' id='dots' onclick='social()' align='right' hspace='5' style='height:40px;width:40px'><br><br></div><img src='reg1.png' onclick='form1()' align='right' hspace='5' style='height:40px;width:40px'>"
+"<img src='vid2.png' align='right' onclick='video()' hspace='5' style='height:40px;width:40px'>"

+"<br><br>"
+"<div id='Demo' class='w3-light-grey w3-dropdown-content w3-animate-zoom w3-round-large' style='width:60px'>"
+"<ul style='list-style-type:none'>"
+"<li><a href='https://facebook.com/FellowApp ' target='_blank' style='text-decoration:none'>Facebook</a></li>"
+"<br>"
+"<li><a href='https://twitter.Com/FellowAppCo' target='_blank' style='text-decoration:none'>Twitter</a></li>"
+"<br>"
+"<li><a href='' style='text-decoration:none'>LinkedIn</a></li>"
+"<br>"
+"</ul>"
+"</div></td></tr></table>"
+"</div><br><br><br>"
+"<div class='w3-row'>"
+"<div class='w3-mobile'></div>"
+"</div>");
var i=0;
var interval=setInterval(function(){first()},1000);
}
else
{
nview=".w3-half";
console.log("laptop or pc");
$j('body').append("<div class='w3-row'>"
+"<div class='w3-container w3-quarter' style='visibility:hidden'></div>"
+"<div class='w3-container w3-half'><div class='w3-blue' style='width:50%;position:fixed;z-index:1'>"
+"<table cellpadding='3' ><tr><td><img src='fellowapp.jpg' style='height:40px' class='w3-circle' alt='Image Not Available'></td><td><h4><font color='white'>FellowApp</font><br><font size='2px' color='white' id='status'>online</font></h4></td><td style='width:100%'><div class='w3-dropdown-click w3-blue' style='float:right'><img src='3dots.png' id='dots' onclick='social()' align='right' hspace='20' style='height:40px;width:40px'><br><br><div id='Demo' class='w3-light-grey w3-dropdown-content w3-animate-zoom w3-round-large' style='width:60px'>"
+"<ul style='list-style-type:none'>"
+"<li><a href='https://facebook.com/FellowApp ' target='_blank' style='text-decoration:none'>Facebook</a></li>"
+"<br>"
+"<li><a href='https://twitter.Com/FellowAppCo' target='_blank' style='text-decoration:none'>Twitter</a></li>"
+"<br>"
+"<li><a href='' style='text-decoration:none'>LinkedIn</a></li>"
+"<br>"
+"</ul>"
+"</div></div><img src='reg1.png' onclick='form()' align='right' hspace='20' style='height:40px;width:40px'>    <img src='vid2.png' align='right' onclick='video1()' hspace='20' style='height:40px;width:40px'></td></tr></table>"
+"</div><br><br><br></div>"
+"<div class='w3-container w3-quarter' style='visibility:hidden'></div>"
+"</div>");
var i=0;
var interval=setInterval(function(){first()},1000);
}
















$j('.forms.w3-button').click(function(e){

$j(this).addClass('w3-light-grey');
$j(this).removeClass('w3-blue');
$j('.forms.w3-button').not( this ).removeClass( "w3-light-grey");
$j('.forms.w3-button').not( this ).addClass( "w3-blue");

});

$j(document).click(function(e){

if(e.target.id!="dots")
{
 var x = document.getElementById("Demo");
    if (x.className.indexOf("w3-show") != -1) {
        x.className = x.className.replace(" w3-show", "");
    }
	}
})

function openForm1(vName) {
    var i;
    var x = document.getElementsByClassName("web");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
	}
    document.getElementById(vName).style.display = "block";

	}

function openForm(vName) {
    var i;
    var x = document.getElementsByClassName("mob");
    for (i = 0; i < x.length; i++) {
       x[i].style.display = "none";
	}
    document.getElementById(vName).style.display = "block";

	}


function shared(){
  document.getElementById('ShareButton').style.display='none';
    $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6><b>Successfully Shared on LinkedIn.</b></h6></span><br><br>");
    setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>That was just amazing "+userName+", thanks for that favor. I'll make sure I'd give it back to you with some amazing opportunities once I go live.</h6></span><br><br>")},2500);
    setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Was nice talking to you, have a great day "+userName+". :)</h6></span><br><br>")},3500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";},4500);
   var c=[];
   c.push(chat);
   profile.chats=c;
   console.log(profile);
   $j(function() {
   $j.ajax({
     url: "http://52.172.44.219:4040/addRecordOfChatBotWeb.php",

     type: "POST",

     data: {
     profile: profile,
     chat: chat
     }
   })
   .done(function(data){
   //var r=JSON.parse(data);
   console.log(data);
   });
   });
}

  function cont(){
    document.getElementById('LinkedInButton').style.display='none';
    console.log("yoyooyoy---"+user);
    chat.type=user;

    if(user.indexOf("Explorer")!=-1){
      $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6><b>Successfully Logged In.</b></h6></span><br><br>");
    //s$j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+text+"</h6></span><br><br>");
       setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Amazing, you seem to be working at "+company+" as "+position+". Glad to know you "+userName+" </h6></span><br><br>")},500);
     setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So "+userName+", what's that you hate the most in your current job hunt scene?</h6></span><br><br>")},1500);
    setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>No POC</button> <button class='w3-button w3-green w3-hover-green'>No Response</button> <button class='w3-button w3-green w3-hover-green'>Others</button></div></center>")},2500);
}
  else if (user.indexOf("Recruiter")!=-1) {
    $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6><b>Successfully Logged In.</b></h6></span><br><br>");
  //  $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hoollaa, I’m talking to "+userName+". BTW nice name ;)</h6></span><br><br>")},500);
    setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So "+userName+", currently I’m in an Alpha testing phase and will be available on an invite only mode in next 30-45Days. I will keep you posted once I go live.</h6></span><br><br>")},1500);
    setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Meanwhile can I know a little more about you? Are you a Sourcer or Non Sourcer?</h6>(Sourcer: Someone who does sourcing)</span><br><br>")},2500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Sourcer</button> <button class='w3-button w3-green w3-hover-green'>Non Sourcer</button> </div></center>")},3500);


  }

  }
//$j(nview).append("<br><br><center><textarea  class='w3-light-grey w3-input w3-border  boolean' placeholder='Start Typing your Boolean and Press Enter'></textarea></center>");

console.log($j(window).scrollTop());
document.addEventListener("DOMNodeInserted", function(event){
     window.scrollBy(0,$j(document).height() - $j('body').offset().top);
	});

// setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<br><center><textarea  class='w3-light-grey w3-input w3-border  boolean' placeholder='Start Typing your Boolean and Press Enter'></textarea></center>")},500);

$j(document).on('change', '.w3-select.w3-border.skillset', function(){
	skills=$j(this).val();
	console.log(skills);
	});



$j(document).on('click', '.w3-button.w3-green.w3-hover-green', function(){




   var name=$j(this).text();
   $j('.w3-section').remove();
   $j('.w3-button.w3-green.w3-hover-green').remove();
   if(name.indexOf("Haha Sure, shoot out")!=-1)
   {
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");

   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Great. So basically I’m trained to handle recruiters & candidates for now.</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>But my intelligence says, this app is not just for the Job world, but something beyond to help you connect better.</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hang on, this is not another Facebook :P </h6></span><br><br>")},2500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Do you have more info?</button></div></center>")},3500);

 }
 else if(name.indexOf("Very Much")!=-1 || name.indexOf("Not Really, I can try")!=-1)
   {
     chat.comfortable_with_boolean=name;
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Great !!</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>How about having a quick Booleanathon right away, what say?</h6></span><br><br>")},1500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>I’m up for the challenge</button></div></center>")},2500);

 }
 else if(name.indexOf("I’m up for the challenge")!=-1)
   {
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");

   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Amazing, before we dive into the challenge, do you know the Boolean stats?</h6></span><br><br>")},500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>No idea, can you tell me?</button></div></center>")},1500);

 }
  else if(name.indexOf("No idea, can you tell me?")!=-1)
   {
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");

   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Here you go, these numbers are in context to the Indian Recruiters</h6></span><br><br><img class='w3-image' src='boolean.png' style='align:left;height:200px;width:350px'><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Let’s get back with our Booleanathon</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Choose the search engine which you’re comfortable.</h6></span><br><br>")},2500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section '><button class='w3-button w3-green w3-hover-green w3-medium'>Naukri</button>   <button class='w3-button w3-green w3-hover-green w3-medium'>LinkedIn</button></div></center>")},3500);

 }
  else if(name.indexOf("Naukri")!=-1 || name.indexOf("LinkedIn")!=-1)
   {
     chat.search_engine=name;
   localStorage.setItem("search",name);
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");

   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Write the best Boolean which will yield high number of resumes without compromising on the quality</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Choose one skill of your choice</h6></span><br><br>")},1500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<br><center><select  class='w3-select w3-border w3-light-grey  w3-half skillset'><option>Android</option><option>Nodejs + Nosql</option><option>UI Dev + Any JS</option></select><button class='w3-button w3-green w3-hover-green'>Go</button></center>")},2500);

 }
  if(name.indexOf("Go")!=-1 )
  {
   //else if(name.indexOf("Android")!=-1 || name.indexOf("Nodejs + Nosql")!=-1 || name.indexOf("UI Dev + Any JS")!=-1)

   localStorage.setItem("skill",skills);
   chat.skill=skills;
   $j('.w3-select.w3-border.skillset').remove();
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+skills+"</h6></span><br><br>");

   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Amazing !!</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Look this is for a developer skill & you gotta write that one perfect Boolean which would get you both Quantitative & Qualitative profiles. Now the ball is at your court ;)</h6></span><br><br>")},1500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<br><center><textarea  class='w3-light-grey w3-input w3-border  boolean' placeholder='Start Typing your Boolean and Press Enter'></textarea></center>")},2500);

 }
  else if(name.indexOf("Let me write again")!=-1)
   {

   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){$j(nview).append("<br><center><textarea  class='w3-light-grey w3-input w3-border  boolean' placeholder='Start Typing your Boolean and Press Enter'></textarea></center>")},500);
  }
  else if(name.indexOf("Kindly Guide")!=-1)
   {

   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Cool, in next few minutes I will help you with some Boolean fundamentals</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Let me chill you first, what would you like to have?<ul><li>Any soft drink would do</li><li>Maybe Sweet lime or Pineapple</li><li>Chocolate shake/Banana Shake</li></ul></h6></span><br><br>")},1500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Option1</button>    <button class='w3-button w3-green w3-hover-green'>Option2</button>    <button class='w3-button w3-green w3-hover-green'>Option3</button></div></center>")},2500);

 }

 else if(name.indexOf("Option1")!=-1)
   {

   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Sorry, I'am not integrated with Zomato currently to place an order for you ;).Wish I could do so</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Let me teach you Boolean with your order</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So the Boolean for the order you have placed goes like this: <br><br> (Coke OR Pepsi OR Fanta) </h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I'm sure this wont suffice you, I believe you must be a foodie. Let's order something more <ul><li>Chicken Burger</li><li>Pizza</li><li>French Fries</li></ul></h6></span><br><br>")},2500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Chicken Burger</button>   <button class='w3-button w3-green w3-hover-green'>Pizza</button>     <button class='w3-button w3-green w3-hover-green'>French Fries</button></div></center>")},3500);

 }

  else if(name.indexOf("Chicken Burger")!=-1)
   {

   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Yuummmm.. That's like wanting me to order one. Talking about food was a bad example I believe ;) </h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hocus pocus, let's get back to the Boolean</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So the Boolean goes like this for the orders you have placed so far : <br><br> (Coke OR Pepsi OR Fanta)AND 'Chicken Burger' </h6></span><br><br>")},2500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6> How does this work? <ul><li>Add OR logic to your options & make sure you add a bracket on using OR logic</li><li>Add double quotes if you're using two terms which denote one word</li><li>The more you order, keep adding it to the Boolean with a AND logic.</li></ul></h6></span><br><br>")},3500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I have something little more complicated, want to give it a look?</h6></span><br><br>")},4500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Sure, why not?</button>   <button class='w3-button w3-green w3-hover-green'>Sorry I gotta go</button></div></center>")},5500);

 }

   else if(name.indexOf("Pizza")!=-1)
   {

   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Yuummmm.. That's like wanting me to order one. Talking about food was a bad example I believe ;) </h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hocus pocus, let's get back to the Boolean</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So the Boolean goes like this for the orders you have placed so far : <br><br> (Coke OR Pepsi OR Fanta) AND 'veg Pizza' </h6></span><br><br>")},2500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6> How does this work? <ul><li>Add OR logic to your options & make sure you add a bracket on using OR logic</li><li>Add double quotes if you're using two terms which denote one word</li><li>The more you order, keep adding it to the Boolean with a AND logic.</li></ul></h6></span><br><br>")},3500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I have something little more complicated, want to give it a look?</h6></span><br><br>")},4500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Sure, why not?</button>   <button class='w3-button w3-green w3-hover-green'>Sorry I gotta go</button></div></center>")},5500);

 }

  else if(name.indexOf("French Fries")!=-1)
   {

   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Yuummmm.. That's like wanting me to order one. Talking about food was a bad example I believe ;) </h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hocus pocus, let's get back to the Boolean</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So the Boolean goes like this for the orders you have placed so far : <br><br> (Coke OR Pepsi OR Fanta)AND 'French Fries' </h6></span><br><br>")},2500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6> How does this work? <ul><li>Add OR logic to your options & make sure you add a bracket on using OR logic</li><li>Add double quotes if you're using two terms which denote one word</li><li>The more you order, keep adding it to the Boolean with a AND logic.</li></ul></h6></span><br><br>")},3500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I have something little more complicated, want to give it a look?</h6></span><br><br>")},4500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Sure, why not?</button>   <button class='w3-button w3-green w3-hover-green'>Sorry I gotta go</button></div></center>")},5500);

 }

   else if(name.indexOf("Sure, why not?")!=-1)
   {

   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>That's amazing, guess you're pretty keen in learning stuff :) </h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6> What if you had to place a combo? <ul><li>Chicken Burger along with Coke or</li><li>Pizza along with Pepsi</li></ul></h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So the Boolean for your combo order is : <br><br> (('Chicken burger' AND Coke)OR (Pizza AND Pepsi)) </h6></span><br><br>")},2500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I know by now your tummy would be cursing you, I will let you go and grab some pizza or burger ;) Before that, I have couple of sites which I believe will help you in Boolean. Would you like to know? </h6></span><br><br>")},3500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Yeah, I wanna</button> </div></center>")},4500);

 }


 else if(name.indexOf("Option2")!=-1)
   {

   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Sorry, I'am not integrated with Zomato currently to place an order for you ;).Wish I could do so</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Let me teach you Boolean with your order</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So the Boolean for the order you have placed goes like this: <br><br> ('Sweet Lime' OR Pineapple) </h6></span><br><br>")},2500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I'm sure this wont suffice you, I believe you must be a foodie. Let's order something more <ul><li>Burger</li><li>Veg Pizza</li><li>Chips</li></ul></h6></span><br><br>")},3500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Burger</button>   <button class='w3-button w3-green w3-hover-green'>Veg Pizza</button>     <button class='w3-button w3-green w3-hover-green'>Chips</button></div></center>")},3500);

 }

  else if(name.indexOf("Burger")!=-1)
   {

   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Yuummmm.. That's like wanting me to order one. Talking about food was a bad example I believe ;) </h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hocus pocus, let's get back to the Boolean</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So the Boolean goes like this for the orders you have placed so far : <br><br> ('Sweet Lime' OR Pineapple) AND Burger </h6></span><br><br>")},2500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6> How does this work? <ul><li>Add OR logic to your options & make sure you add a bracket on using OR logic</li><li>Add double quotes if you're using two terms which denote one word</li><li>The more you order, keep adding it to the Boolean with a AND logic.</li></ul></h6></span><br><br>")},3500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I have something little more complicated, want to give it a look?</h6></span><br><br>")},4500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Sure, why not?</button>   <button class='w3-button w3-green w3-hover-green'>Sorry I gotta go</button></div></center>")},5500);

 }

  else if(name.indexOf("Veg Pizza")!=-1)
   {

   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Yuummmm.. That's like wanting me to order one. Talking about food was a bad example I believe ;) </h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hocus pocus, let's get back to the Boolean</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So the Boolean goes like this for the orders you have placed so far : <br><br> ('Sweet Lime' OR Pineapple) AND 'Veg Pizza' </h6></span><br><br>")},2500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6> How does this work? <ul><li>Add OR logic to your options & make sure you add a bracket on using OR logic</li><li>Add double quotes if you're using two terms which denote one word</li><li>The more you order, keep adding it to the Boolean with a AND logic.</li></ul></h6></span><br><br>")},3500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I have something little more complicated, want to give it a look?</h6></span><br><br>")},4500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Sure, why not?</button>   <button class='w3-button w3-green w3-hover-green'>Sorry I gotta go</button></div></center>")},5500);

 }

  else if(name.indexOf("Chips")!=-1)
   {

   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Yuummmm.. That's like wanting me to order one. Talking about food was a bad example I believe ;) </h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hocus pocus, let's get back to the Boolean</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So the Boolean goes like this for the orders you have placed so far : <br><br> ('Sweet Lime' OR Pineapple) AND Chips </h6></span><br><br>")},2500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6> How does this work? <ul><li>Add OR logic to your options & make sure you add a bracket on using OR logic</li><li>Add double quotes if you're using two terms which denote one word</li><li>The more you order, keep adding it to the Boolean with a AND logic.</li></ul></h6></span><br><br>")},3500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I have something little more complicated, want to give it a look?</h6></span><br><br>")},4500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Sure, why not?</button>   <button class='w3-button w3-green w3-hover-green'>Sorry I gotta go</button></div></center>")},5500);

 }

  else if(name.indexOf("Option3")!=-1)
   {

   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Sorry, I'am not integrated with Zomato currently to place an order for you ;).Wish I could do so</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Let me teach you Boolean with your order</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So the Boolean for the order you have placed goes like this: ('Chocolate Shake' OR 'Banana Shake') </h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I'm sure this wont suffice you, I believe you must be a foodie. Let's order something more <ul><li>Noodles</li><li>Veg Rice</li><li>Chicken Fry</li></ul></h6></span><br><br>")},2500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Noodles</button>   <button class='w3-button w3-green w3-hover-green'>Veg Rice</button>     <button class='w3-button w3-green w3-hover-green'>Chicken Fry</button></div></center>")},3500);

 }

   else if(name.indexOf("Noodles")!=-1)
   {

   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Yuummmm.. That's like wanting me to order one. Talking about food was a bad example I believe ;) </h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hocus pocus, let's get back to the Boolean</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So the Boolean goes like this for the orders you have placed so far : <br><br> ('Chocolate Shake' OR 'Banana Shake') AND Noodles </h6></span><br><br>")},2500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6> How does this work? <ul><li>Add OR logic to your options & make sure you add a bracket on using OR logic</li><li>Add double quotes if you're using two terms which denote one word</li><li>The more you order, keep adding it to the Boolean with a AND logic.</li></ul></h6></span><br><br>")},3500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I have something little more complicated, want to give it a look?</h6></span><br><br>")},4500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Sure, why not?</button>   <button class='w3-button w3-green w3-hover-green'>Sorry I gotta go</button></div></center>")},5500);

 }

  else if(name.indexOf("Veg Rice")!=-1)
   {

   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Yuummmm.. That's like wanting me to order one. Talking about food was a bad example I believe ;) </h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hocus pocus, let's get back to the Boolean</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So the Boolean goes like this for the orders you have placed so far : <br><br> ('Chocolate Shake' OR 'Banana Shake') AND 'Veg Rice' </h6></span><br><br>")},2500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6> How does this work? <ul><li>Add OR logic to your options & make sure you add a bracket on using OR logic</li><li>Add double quotes if you're using two terms which denote one word</li><li>The more you order, keep adding it to the Boolean with a AND logic.</li></ul></h6></span><br><br>")},3500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I have something little more complicated, want to give it a look?</h6></span><br><br>")},4500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Sure, why not?</button>   <button class='w3-button w3-green w3-hover-green'>Sorry I gotta go</button></div></center>")},5500);

 }
   else if(name.indexOf("Chicken Fry")!=-1)
   {

   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Yuummmm.. That's like wanting me to order one. Talking about food was a bad example I believe ;) </h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hocus pocus, let's get back to the Boolean</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So the Boolean goes like this for the orders you have placed so far : <br><br> ('Chocolate Shake' OR 'Banana Shake') AND 'Chicken Fry' </h6></span><br><br>")},2500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6> How does this work? <ul><li>Add OR logic to your options & make sure you add a bracket on using OR logic</li><li>Add double quotes if you're using two terms which denote one word</li><li>The more you order, keep adding it to the Boolean with a AND logic.</li></ul></h6></span><br><br>")},3500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I have something little more complicated, want to give it a look?</h6></span><br><br>")},4500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Sure, why not?</button>   <button class='w3-button w3-green w3-hover-green'>Sorry I gotta go</button></div></center>")},5500);

 }


 else if(name.indexOf("Yeah, I wanna")!=-1)
   {

   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Here are some quick online content which can help you<br><ul><li><a href='https://source.socialtalent.co/' target='_blank' style='text-decoration:none;'><b>socialtalent</b></center></a></li><li><a href='http://booleanblackbelt.com/2013/06/linkedin-sourcing-ninja-webinar-recording-now-on-youtube/' target='_blank' style='text-decoration:none'><b>Boolean Black Belt</b></li></ul>")},500);
//   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Here are some quick online content which can help you<br><br><div style='width:600px;overflow-x:scroll'><table><tr><td><a href='https://source.socialtalent.co/' target='_blank' style='text-decoration:none;color:white'><center><b>socialtalent</b></center></a></td><td><br><a href='http://booleanblackbelt.com/2013/06/linkedin-sourcing-ninja-webinar-recording-now-on-youtube/' target='_blank' style='text-decoration:none;color:white'><center><b>Boolean Black Belt</b></center></a></td></tr></table></div></span><br><br>")},500);

 // setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Here are some quick online content which can help you<br><br><table><tr><td><iframe class='links' src='https://source.socialtalent.co/' scrolling='no' style='width:600px'></iframe><br><br><a href='https://source.socialtalent.co/' target='_blank' style='text-decoration:none'><center><b>socialtalent</b></center></a></td><td><iframe class='links' src='http://booleanblackbelt.com/2013/06/linkedin-sourcing-ninja-webinar-recording-now-on-youtube/' scrolling='no' style='width:600px'></iframe><br><br><a href='http://booleanblackbelt.com/2013/06/linkedin-sourcing-ninja-webinar-recording-now-on-youtube/' target='_blank' style='text-decoration:none'><center><b>Boolean Black Belt</b></center></a></td></tr></table></span><br><br>")},500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<br><br><center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Hey, answer for my Boolean?</button></div></center>")},1500);
  }
  else if(name.indexOf("Hey, answer for my Boolean?")!=-1)
   {
   var bool=""
   if(localStorage.getItem("search")=="Naukri")
   {
   console.log(localStorage.getItem("search"));
   if(localStorage.getItem("skill")=="Android")
   bool="((Java AND Android AND SDK AND (‘Mobile app’ OR ‘Mobile apps’ OR ‘Android apps’ OR Playstore OR ‘Play store’ OR ‘Mobile application’ OR ‘Android application’ OR ‘Android app’ OR ‘Android Studio’))  OR ‘Android developer’ OR ‘Android engineer’ OR ‘Android app developer’ OR ‘Android Application developer’ OR ‘Android Application engineer’ OR ‘Android Application Development’ OR ‘Android app development’ OR ‘Android mobile application’)"
   else if(localStorage.getItem("skill")=="Nodejs + Nosql")
   bool="(Nodejs OR Node OR MEAN) AND (API OR Webservices OR Rest OR Restful OR SOAP OR getapi OR Postapi OR ‘Get api’ OR ‘Post API’) AND (Nosql OR Mongo OR Mongodb OR Couch OR Couchdb OR Maria OR Mariadb OR Cassandra OR Documentdb)"
   else if(localStorage.getItem("skill")=="UI Dev + Any JS")
   bool="(‘UI Developer’ OR ‘UI Engineer’ OR ‘Frontend developer’ OR ‘Front end Engineer’ OR ‘Front end developer’ OR ‘Frontend engineer’ OR ‘UX Engineer’ OR ‘UX Developer’) AND (Angular OR Angularjs OR React OR Reactjs OR angular1 OR angular2 OR Typescript) "
   }
   else if(localStorage.getItem("search")=="LinkedIn")
   {
   console.log(localStorage.getItem("search"));
   if(localStorage.getItem("skill")=="Android")
   bool="((Java AND Android AND SDK AND (‘Mobile app’ OR ‘Mobile apps’ OR ‘Android apps’ OR Playstore OR ‘Play store’ OR ‘Mobile application’ OR ‘Android application’ OR ‘Android app’ OR ‘Android Studio’))  OR ‘Android developer’ OR ‘Android engineer’ OR ‘Android app developer’ OR ‘Android Application developer’ OR ‘Android Application engineer’ OR ‘Android Application Development’’ OR ‘Android app development’ OR ‘Android mobile application’ OR 'Android Dev' OR 'Android Lead') NOT (Recruiter OR Hiring OR Talent OR ios)"
   else if(localStorage.getItem("skill")=="Nodejs + Nosql")
   bool="(Nodejs OR Node OR MEAN) AND (API OR Webservices OR Rest OR Restful OR SOAP OR getapi OR Postapi OR ‘Get api’ OR ‘Post API’) AND (Nosql OR Mongo OR Mongodb OR Couch OR Couchdb OR Maria OR Mariadb OR Cassandra OR Documentdb) NOT (Recruiter OR Hiring OR Talent)"
   else if(localStorage.getItem("skill")=="UI Dev + Any JS")
   bool="(‘UI Developer’ OR ‘UI Engineer’ OR ‘Frontend developer’ OR ‘Front end Engineer’ OR ‘Front end developer’ OR ‘Frontend engineer’ OR ‘UX Engineer’ OR ‘UX Developer’) AND (Angular OR Angularjs OR React OR Reactjs OR angular1 OR angular2 OR Typescript OR Backbone OR D3) NOT (Recruiter OR Hiring OR Talent)"
   }

  $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
  setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So you’re not gonna leave without testing me uh? ;)</h6></span><br><br>")},500);
  setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Listen, generally there are multiple ways of writing a Boolean. So worry not if you have not written just exactly the way I have written</h6></span><br><br>")},1500)
  setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Here you go, this is what I wrote</h6></span><br><br>")},2500)

setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>"+bool+"</h6></span><br><br>")},3500)


  setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Can you explain how you wrote this?</button></div></center>")},4500);
  }

  else if(name.indexOf("Can you explain how you wrote this?")!=-1)
   {
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");

   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Sure, I follow simple steps while writing a Boolean: <ul><li>Understand the search engine on which you’re searching</li><li>Know the list of synonyms</li><li>Pen down Primary and Secondary keywords</li><li>Write all possible designations which are specific only to that Job. (Note: Designations are included in the Boolean only if it can impact the search, otherwise not)</li><li>Use the power of NOT to avoid repetitive/unwanted resumes</li></ul></h6></span><br><br>")},500);
     setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I hope you found this useful</h6></span><br><br>")},1500);
setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I’m thinking of having a weekly Q&A with recruiters, try to answer their queries by one of our fellows or by Industry experts, would you like to join the loop?</h6></span><br><br>")},2500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Sure, but how can I put my Qs?</button></div></center>")},3500);
  }
  else if(name.indexOf("Sure, but how can I put my Qs?")!=-1)
   {
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");

   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>It’s pretty simple, everything via a mail</h6></span><br><br>")},500);
     setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I will mail you with further details on this & also knock your mail box once I go live.</h6></span><br><br>")},1500);
setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>If you have any other queries you can reach out to our CEO directly at ashfaq@fellowapp.co or connect him on LinkedIn-</h6><a href='https://www.linkedin.com/in/ashfaqahmedhr/'> Ashfaq Ahmed</a></h6></span><br><br>")},2500);
setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Will get back to you shortly, meanwhile do you mind doing a favor? Small one though ;)</h6></span><br><br>")},3500);
setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Love to</button> <button class='w3-button w3-green w3-hover-green'>Sure</button> <button class='w3-button w3-green w3-hover-green'>What's that?</button></div></center>")},4500);
  }
 else if(name.indexOf("Ciao, it was great talking to you")!=-1)
   {
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");

   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Same here !!</h6></span><br><br>")},500);
     setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Take care  </h6></span><br><br>")},1500);
     var c=[];
     c.push(chat);
     profile.chats=c;
     console.log(profile);

     $j(function() {
    $j.ajax({
      url: "http://52.172.44.219:4040/addRecordOfChatBotWeb.php",

      type: "POST",

      data: {
      profile: profile,
      chat: chat
      }
   })
   .done(function(data){
    //var r=JSON.parse(data);
    console.log(data);
   });
   });
 }
  else if(name.indexOf("No Thanks")!=-1)
   {
     chat.like_me_as_assistant=name;
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
  setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Ouchh !! That was sad :( </h6></span><br><br>")},500);
    setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I’m little curious to know more about you, can I buy some more time of yours?</h6></span><br><br>")},1500);
	setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Naukri</button>   <button class='w3-button w3-green w3-hover-green'>Sorry I gotta go</button></div></center>")},2500);
  }
   else if(name.indexOf("Sorry I gotta go")!=-1)
   {
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");

   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I understand you’re running short of time</h6></span><br><br>")},500);
     setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>You can write to me or my team directly at admin@fellowapp.co or you can also say hello to our CEO at ashfaq@fellowapp.co or connect him on LinkedIn-</h6><a href='https://www.linkedin.com/in/ashfaqahmedhr/'> Ashfaq Ahmed</a></h6></span><br><br>")},1500);
}
 else if(name.indexOf("No POC")!=-1 || name.indexOf("No Response")!=-1)
   {
     chat.hate_in_job_hunt=name;
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
  setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>True, I totally get it. Basically FellowApp was created as a Fellow to candidates & solve their hiccups & connect them to live people than <b>Dead job ads</b>.</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Not just that, you can rate Recruiters/Hiring Managers for them being good/bad to you in the entire hiring cycle & yeah even if they don't respond to you.</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Don't you think this will instill a sense of responsibility which is currently missing in the hiring cycle?</h6></span><br><br>")},2500);
  setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Obviously</button> <button class='w3-button w3-green w3-hover-green'>Not Really</button> </div></center>")},3500);

 }
 else if(name.indexOf("Others")!=-1)
   {
     chat.hate_in_job_hunt=name;
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
  setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<br><center><textarea  class='w3-light-grey w3-input w3-border  explorer2' placeholder='Start Typing and Press Enter'></textarea></center><br><br>")},500);

 }
 else if(name.indexOf("Obviously")!=-1 || name.indexOf("Not Really")!=-1){
   chat.this_will_instill_a_sense_of_responsibility =name;
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
  setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Yes, we want the hiring to be more Candidate centric.</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>We are currently in alpha, expect us to go live in 30days from now.</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>If you like this concept you can drop in a word to our CEO - ashfaq@fellowapp.co or connect him on LinkedIn-</h6><a href='https://www.linkedin.com/in/ashfaqahmedhr/'> Ashfaq Ahmed</a></span><br><br>")},2500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Will get back to you shortly, meanwhile do you mind doing a favor? Small one though ;)</h6></span><br><br>")},3500);
  setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Love to</button> <button class='w3-button w3-green w3-hover-green'>Sure</button> <button class='w3-button w3-green w3-hover-green'>What's that?</button></div></center>")},4500);


 }
 else if(name.indexOf("Love to")!=-1 || name.indexOf("Sure")!=-1 || name.indexOf("What's that?")!=-1){
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
  setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Haha, just spread a word. Click this link & help me help others in your LinkedIn network. </h6></span><br><br>")},500);
  setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<div id='ShareButton'><center><img src='share.png' onClick='shareContent()'style='height:40px;width:250px' ><br><br><br></center></div>")},1500);

 }
 else if(name.indexOf("Contextual Interaction")!=-1)
   {
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
  setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Cool, let me give you a small brief about me.</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Now it’s your turn to lend me your ears</h6></span><br><br>")},1500);
  setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Haha Sure, shoot out</button></div></center>")},2500);

 }


  else if(name.indexOf("Sure you Can")!=-1)
   {
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");

   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Cool, tell me more about you, what kind of recruiter are you?</h6></span><br><br>")},500);
    setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Sourcer</button>   <button class='w3-button w3-green w3-hover-green'>Non Sourcer</button></div></center>")},1500);
   }

   else  if(name.indexOf("So how can you help me")!=-1)
   {
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Here you go, this is what I can do for you<ul><li>I can screen candidates on your behalf with basic questions</li><li>After my interaction, I handover the candidates to you for further chat</li><li>Remind you about your Interviews</li><li>Serve you with analytical insights</li></ul></h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>By the way, what's your thoughts on AI/Bot taking over recruitment, do you agree?</h6></span><br><br>")},1500);
	setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Yes I Agree</button>   <button class='w3-button w3-green w3-hover-green'>I Disagree</button> <button class='w3-button w3-green w3-hover-green'>Maybe</button></div></center>")},2500);
   }
    else  if(name.indexOf("Yes I Agree") !=-1 || name.indexOf("Maybe")!=-1)
   {
     chat.bot_taking_over_recruitment=name;
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>aahh not at all, being a bot myself I strongly disagree with this notion of AI taking over recruitment completely</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Rather, AI/Bot can make a recruiter's world better, be a Fellow to help them.</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So how about having me as your Fellow (assistant)? Trust me, I'am not taking away your Job ;) </h6></span><br><br>")},2500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Yes Ofcourse</button>   <button class='w3-button w3-green w3-hover-green'>No Thanks</button></div></center>")},3500);
   }
   else  if(name.indexOf("I Disagree")!=-1)
   {
     chat.bot_taking_over_recruitment=name;
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Cool, you're bang on buddy ;) </h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>AI/Bots are here to make a recruiter's world better, be a Fellow to help them.</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So smarty, Would you like to have me as your assistant?</h6></span><br><br>")},2500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Yes Ofcourse</button>   <button class='w3-button w3-green w3-hover-green'>No Thanks</button></div></center>")},3500);
   }

  else  if(name.indexOf("Yes Ofcourse")!=-1)
   {
     chat.like_me_as_assistant=name;
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");

   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hurray, that means a lot to me. I’m all excited to be your assistant.</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large 'style='text-align:left'><h6>Hey, can I have little more heads-up about you before we go on with our conversation. There’s much more to be discussed & I’m all thrilled :D</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>You’re just a click away from an amazing conversation.</h6></span><br><br>")},2500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<div id='LinkedInButton'><center><img src='lbutt.png' onClick='liAuth()' style='height:40px;width:250px'><br><br><br></center></div>")},4500);

 }
else if(name.indexOf("Recruiter")!=-1)
   {
     user="Recruiter";
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");

   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Cool, you know my Inventor is also a recruiter & he designed me to help recruiters.</h6></span><br><br>")},500);
    setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>So how can you help me?</button></div></center>")},1500);
   }
  else if(name.indexOf("Do you have more info?")!=-1)
   {
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");

   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Well, not really</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>But I can ask my team reach out to you.</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Can I have your mail ID?</h6></span><br><br>")},2500);
   setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<br><center><textarea  class='w3-light-grey w3-input w3-border  mail1' placeholder='Please enter your ID and Press Enter'></textarea></center>")},3500);

 }

 else  if(name.indexOf("Let me say")!=-1)
   {
     $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Wooaah, all my ears turned on. Go ahead</h6></span><br><br>")},500);
  setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<br><center><textarea  class='w3-light-grey w3-input w3-border  letmesay' placeholder='Start Typing and Press Enter'></textarea></center>")},1500);

   }
   else if(name.indexOf("Explorer")!=-1)
   {
     user="Explorer";
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");

  setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>It's amazing to have you here Mr/Ms Explorer.</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I'm your Fellow Bot, I'm being trained to help you explore your next Job move with ease by connecting you to people, not <b>dead Job ads</b>.</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hey, can I have some basic heads-up about you before we go ahead with the conversation? All you've to do is login via LinkedIn.</h6></span><br><br>")},2500);
   var s = document.createElement("script");
   s.type = "in/Login";
   s.src = "https://platform.linkedin.com/in.js";

  //setTimeout(function(){document.getElementById('status').innerHTML="online";$j("body").append("<script type='in/Login'> alert('hi');</s"+"cript>")},4500);
  setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<div id='LinkedInButton'><center><img src='lbutt.png' onClick='liAuth()' style='height:40px;width:250px'><br><br><br></center></div>")},4500);

  }
    else if(name.indexOf("Haha Yes That's Right")!=-1)
   {
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");

  setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I know, it becomes little tedious sometimes when you have to screen, schedule so many folks over a call.</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I think, that’s where I can assist you and lessen your burden</h6></span><br><br>")},1500);
  setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Do you have anything else in mind with which I can help you?</h6></span><br><br>")},2500);
  setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<br><center><textarea  class='w3-light-grey w3-input w3-border  nonsource1' placeholder='Start Typing and Press Enter'></textarea></center>")},3500);
  }



  else if(name.indexOf("Non Sourcer")!=-1)
   {
     chat.sourcing_type=name;
   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");

  setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Oh that’s nice, I believe you must be the go-to person for candidate engagement?</h6></span><br><br>")},500);
  setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Haha Yes That's Right</button></div></center>")},1500);
  }
  else if(name.indexOf("Sourcer")!=-1)
   {
     chat.sourcing_type=name;

   $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");

   setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Oh nice, I just lover sourcers</h6></span><br><br>")},500);
     setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Are you comfortable with Boolean?</h6></span><br><br>")},1500);
    setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Very Much</button>   <button class='w3-button w3-green w3-hover-green'>Not Really, I can try</button></div></center>")},2500);
  }


  else if(name.indexOf("sure")!=-1)
   {
     $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
        setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Amazing, I will mail you with further details on this &amp; also knock your mail box once I go live.</h6></span><br><br>")},500);
        setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>If you have any other queries you can reach out to our CEO directly at ashfaq@fellowapp.co or connect him on LinkedIn-</h6><a href='https://www.linkedin.com/in/ashfaqahmedhr/'> Ashfaq Ahmed</a></h6></span><br><br>")},1500);
        setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Will get back to you shortly, meanwhile do you mind doing a favor? Small one though ;)</h6></span><br><br>")},2500);
       setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Love to</button> <button class='w3-button w3-green w3-hover-green'>Sure</button> <button class='w3-button w3-green w3-hover-green'>What's that?</button></div></center>")},3500);
  }
  else if(name.indexOf("Later")!=-1)
   {
     $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
        setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Sure. BTW If you have any other queries you can reach out to our CEO directly at ashfaq@fellowapp.co or connect him on LinkedIn-</h6><a href='https://www.linkedin.com/in/ashfaqahmedhr/'> Ashfaq Ahmed</a></h6></span><br><br>")},500);
        setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Will get back to you shortly, meanwhile do you mind doing a favor? Small one though ;)</h6></span><br><br>")},1500);
       setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Love to</button> <button class='w3-button w3-green w3-hover-green'>Sure</button> <button class='w3-button w3-green w3-hover-green'>What's that?</button></div></center>")},2500);
  }


  });

$j('body').on( "keypress", ".w3-input.w3-border.explorer", function( event ) {
    if(event.which==13)
	{
	var text=$j( this ).val()
	if(text.match(/[A-Z]+/gi))
	{
	console.log(text.length);
  $j('.w3-input.w3-border').remove();
	$j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+text+"</h6></span><br><br>");
     setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Cool, glad to know your name "+userName+". </h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So "+userName+", what's that you hate the most in your current job hunt scene?</h6></span><br><br>")},1500);
  setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>No POC</button> <button class='w3-button w3-green w3-hover-green'>No Response</button> <button class='w3-button w3-green w3-hover-green'>Others</button></div></center>")},2500);
}

	}
});

$j('body').on( "keypress", ".w3-input.w3-border.explorer2", function( event ) {
    if(event.which==13)
	{
	var text=$j( this ).val()
	if(text.match(/[A-Z]+/gi))
	{
	console.log(text.length);
	$j('.w3-input.w3-border').remove();
  $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+text+"</h6></span><br><br>");
 setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>True, I totally get it. Basically FellowApp was created as a Fellow to candidates & solve their hiccups & connect them to live people than <b>Dead job ads</b>.</h6></span><br><br>")},500);
  setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Not just that, you can rate Recruiters/Hiring Managers for them being good/bad to you in the entire hiring cycle & yeah even if they don't respond to you.</h6></span><br><br>")},1500);
  setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Don't you think this will instill a sense of responsibility which is currently missing in the hiring cycle?</h6></span><br><br>")},2500);
 setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Obviously</button> <button class='w3-button w3-green w3-hover-green'>Not Really</button> </div></center>")},3500);
}

	}
});

$j('body').on( "keypress", ".w3-input.w3-border.recruiter", function( event ) {
    if(event.which==13)
	{
	var text=$j( this ).val()
	if(text.match(/[A-Z]+/gi))
	{
	console.log(text.length);
	$j('.w3-input.w3-border').remove();
  $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+name+"</h6></span><br><br>");
 setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hoollaa, I’m talking to "+userName+". BTW nice name ;)</h6></span><br><br>")},500);
  setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So "+userName+", currently I’m in an Alpha testing phase and will be available on an invite only mode in next 30-45Days. I will keep you posted once I go live.</h6></span><br><br>")},1500);
  setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Meanwhile can I know a little more about you? Are you a Sourcer or Non Sourcer?</h6>(Sourcer: Someone who does sourcing)</span><br><br>")},2500);
 setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Sourcer</button> <button class='w3-button w3-green w3-hover-green'>Non Sourcer</button> </div></center>")},3500);
}
	}
});

$j('body').on( "keypress", ".w3-input.w3-border.nonsource1", function( event ) {
    if(event.which==13)
	{
	var text=$j( this ).val()
	if(text.match(/[A-Z]+/gi))
	{
    chat.query1=text;
	$j('.w3-input.w3-border').remove();
	$j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+text+"</h6></span><br><br>");
     setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Uhmm, I’m not sure on this</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>But I can ask my team reach out to you.</h6></span><br><br>")},1500);
  setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Can I have your mail ID?</h6></span><br><br>")},2500);
  setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<br><center><textarea  class='w3-light-grey w3-input w3-border  nonsource2' placeholder='Please enter your ID and Press Enter'></textarea></center>")},3500);
	}
	}

});


$j('body').on( "keypress", ".w3-input.w3-border.nonsource2", function( event ) {
    if(event.which==13)
	{
	var text=$j( this ).val()
	if(text.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi))
	{
	$j('.w3-input.w3-border').remove();
	$j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+text+"</h6></span><br><br>");
     setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>That’s great</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hey, I’m thinking of having a weekly Q&A with recruiters</h6></span><br><br>")},1500);
  setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Try to answer their queries by one of our fellows or by Industry experts, would you like to join the loop?</h6></span><br><br>")},2500);
 setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Sure, but how can I put my Qs?</button></div></center>")},3500);

	}
	else
	{
	$j('.w3-input.w3-border').remove();
	$j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+text+"</h6></span><br><br>");
     setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hey, I guess you miss typed your ID, can you shoot it again?</h6></span><br><br>")},500);
	setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<br><center><textarea  class='w3-light-grey w3-input w3-border  nonsource2' placeholder='Please enter your ID and Press Enter'></textarea></center>")},1500);

	}

	}

});













$j('body').on( "keypress", ".w3-input.w3-border.letmesay", function( event ) {
    if(event.which==13)
	{
	var text=$j( this ).val()
	if(text.match(/[A-Z]+/gi))
	{
	$j('.w3-input.w3-border').remove();
	$j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+text+"</h6></span><br><br>");
     setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Cool, let me give you a small brief about me.</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Now it’s your turn to lend me your ears</h6></span><br><br>")},1500);
  setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Haha Sure, shoot out</button></div></center>")},2500);
	}
	}
});

$j('body').on( "keypress", ".w3-input.w3-border.mail1", function( event ) {
    if(event.which==13)
	{
	var text=$j( this ).val()
	if(text.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi))
	{
	$j('.w3-input.w3-border').remove();
	$j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+text+"</h6></span><br><br>");
     setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>That’s great</h6></span><br><br>")},500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>By the way, you can reach out to my CEO directly at ashfaq@fellowapp.co or connect him on LinkedIn-</h6><a href='https://www.linkedin.com/in/ashfaqahmedhr/'> Ashfaq Ahmed</a> <h6>I believe, he would love to connect with you.</h6></span><br><br>")},1500);
   setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Will get back to you shortly, meanwhile do you mind doing a favor? Small one though ;)</h6></span><br><br>")},2500);
  setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Love to</button> <button class='w3-button w3-green w3-hover-green'>Sure</button> <button class='w3-button w3-green w3-hover-green'>What's that?</button></div></center>")},3500);
	}
	else
	{
	$j('.w3-input.w3-border').remove();
	$j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+text+"</h6></span><br><br>");
     setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hey, I guess you miss typed your ID, can you shoot it again?</h6></span><br><br>")},500);
	setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<br><center><textarea  class='w3-light-grey w3-input w3-border  mail1' placeholder='Please enter your ID and Press Enter'></textarea></center>")},1500);
	}
	}

});

$j('body').on( "keypress", ".w3-input.w3-border.mail2", function( event ) {
    if(event.which==13)
	{
	var text=$j( this ).val()
	if(text.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/gi))
	{
	$j('.w3-input.w3-border').remove();
	$j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+text+"</h6></span><br><br>");
    setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6> Woahh !! </h6></span><br><br>")},500);
    setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I’m just curious to know more about you, can I buy some more time of yours?</h6></span><br><br>")},1500);
	setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Sure you Can</button>   <button class='w3-button w3-green w3-hover-green'>Sorry I gotta go</button></div></center>")},2500);
	}
	else
	{
	$j('.w3-input.w3-border').remove();
	$j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+text+"</h6></span><br><br>");
     setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Hey, I guess you miss typed your ID, can you shoot it again?</h6></span><br><br>")},500);
	setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<br><center><textarea  class='w3-light-grey w3-input w3-border  mail2' placeholder='Please enter your ID and Press Enter'></textarea></center>")},1500);
	}


	}

});


$j('body').on( "keypress", ".w3-input.w3-border.boolean", function( event ) {
    if(event.which==13)
	{
	var text=$j( this ).val()
  chat.boolean_written=text;

	var words=text.split(/\(|\)|OR|AND/gi);
	var words1=new Array();
	for(var i=0;i<words.length;i++)
	{
	console.log(words[i]);
	words[i]=words[i].trim();
	if(words[i]=="" || words[i]==" " || words[i].length==0)
	{
	console.log("empty");
	//words.splice(i,1);
	}
	else
	{
	words1.push(words[i]);
	}
	}
	console.log(words1);
	//if(!text.match(/[A-Z]+/gi))
	//{
var android=false;
var ui=false;
var node=false;
	//}
  if(text.toUpperCase().indexOf("Android")!=-1 && (text.match(/AND/g)).length>1 && (text.match(/OR/g)).length>1)
  android=true;
  if((text.toUpperCase().indexOf("UI")!=-1 || text.toUpperCase().indexOf("user Interface")!=-1) && (text.match(/AND/g)).length>0 && (text.match(/OR/g)).length>1)
  ui=true;
  if((text.toUpperCase().indexOf("node")!=-1 || text.toUpperCase().indexOf("nodeJS")!=-1) && (text.match(/AND/g)).length>0 && (text.match(/OR/g)).length>1)
  node=true;
  if(words1.length>=5 && ( android ||  ui || node))
  {
	var bool="";
   if(localStorage.getItem("search")=="Naukri")
   {
   console.log(localStorage.getItem("search"));
   if(localStorage.getItem("skill")=="Android")
   bool="((Java AND Android AND SDK AND (‘Mobile app’ OR ‘Mobile apps’ OR ‘Android apps’ OR Playstore OR ‘Play store’ OR ‘Mobile application’ OR ‘Android application’ OR ‘Android app’ OR ‘Android Studio’))  OR ‘Android developer’ OR ‘Android engineer’ OR ‘Android app developer’ OR ‘Android Application developer’ OR ‘Android Application engineer’ OR ‘Android Application Development’ OR ‘Android app development’ OR ‘Android mobile application’)"
   else if(localStorage.getItem("skill")=="Nodejs + Nosql")
   bool="(Nodejs OR Node OR MEAN) AND (API OR Webservice OR Rest OR Restful OR SOAP OR 'Web service') AND (Nosql OR Mongo OR Mongodb OR Couch OR Couchdb OR Maria OR Mariadb OR Cassandra OR Documentdb)"
   else if(localStorage.getItem("skill")=="UI Dev + Any JS")
   bool="(‘UI Developer’ OR ‘UI Engineer’ OR ‘Frontend developer’ OR ‘Front end Engineer’ OR ‘Front end developer’ OR ‘Frontend engineer’ OR ‘UX Engineer’ OR ‘UX Developer’ OR 'Javascript Engineer' OR 'Javascript Developer') AND (Angular OR Angularjs OR React OR Reactjs OR angular1 OR angular2 OR Typescript) "
   }
   else if(localStorage.getItem("search")=="LinkedIn")
   {
   console.log(localStorage.getItem("search"));
   if(localStorage.getItem("skill")=="Android")
   bool="((Java AND Android AND SDK AND (‘Mobile app’ OR ‘Mobile apps’ OR ‘Android apps’ OR Playstore OR ‘Play store’ OR ‘Mobile application’ OR ‘Android application’ OR ‘Android app’ OR ‘Android Studio’))  OR ‘Android developer’ OR ‘Android engineer’ OR ‘Android app developer’ OR ‘Android Application developer’ OR ‘Android Application engineer’ OR ‘Android Application Development’’ OR ‘Android app development’ OR ‘Android mobile application’) NOT (Recruiter OR Hiring OR Talent OR ios)"
   else if(localStorage.getItem("skill")=="Nodejs + Nosql")
   bool="(Nodejs OR Node OR MEAN) AND (API OR Webservices OR Rest OR Restful OR SOAP OR getapi OR Postapi OR ‘Get api’ OR ‘Post API’) AND (Nosql OR Mongo OR Mongodb OR Couch OR Couchdb OR Maria OR Mariadb OR Cassandra OR Documentdb) NOT (Recruiter OR Hiring OR Talent)"
   else if(localStorage.getItem("skill")=="UI Dev + Any JS")
   bool="(‘UI Developer’ OR ‘UI Engineer’ OR ‘Frontend developer’ OR ‘Front end Engineer’ OR ‘Front end developer’ OR ‘Frontend engineer’ OR ‘UX Engineer’ OR ‘UX Developer’  OR 'Javascript Engineer' OR 'Javascript Developer') AND (Angular OR Angularjs OR React OR Reactjs OR angular1 OR angular2 OR Typescript) NOT (Recruiter OR Hiring OR Talent)"
   }
  $j('.w3-input.w3-border').remove();
  $j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+text+"</h6></span><br><br>");
  setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>So you’re not gonna leave without testing me uh? ;)</h6></span><br><br>")},500);
  setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Listen, generally there are multiple ways of writing a Boolean. So worry not if you have not written just exactly the way I have written</h6></span><br><br>")},1500)
  setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Here you go, this is what I wrote</h6></span><br><br>")},2500)

setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>"+bool+"</h6></span><br><br>")},3500)


  setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Can you explain how you wrote this?</button></div></center>")},4500);
	}
	else
    {
	$j('.w3-input.w3-border').remove();
	$j(nview).append("<br><span class='w3-tag w3-blue w3-round-large ' style='float:right;text-align:right'><h6>"+text+"</h6></span><br><br>");
    setTimeout(function(){document.getElementById('status').innerHTML="typing...";$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>Are you sure that was a Boolean? </h6></span><br><br>")},500);
    setTimeout(function(){$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>I will guide you to write some amazing Boolean.</h6></span><br><br>")},1500);
	setTimeout(function(){document.getElementById('status').innerHTML="online";$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>Kindly Guide</button>   <button class='w3-button w3-green w3-hover-green'>Let me write again</button></div></center>")},2500);
	}
	}

});

function first()
{
var beginning=["Hey There!!","I am your Fellow, just wondering how I can help you","May I know who you are?"];
if(i<=2)
{
document.getElementById('status').innerHTML="typing...";
$j(nview).append("<span class='w3-tag w3-light-grey w3-round-large ' style='text-align:left'><h6>"+beginning[i]+"</h6></span><br><br>");
i++;
}
else
{
document.getElementById('status').innerHTML="online";
console.log("stopping")
clearInterval(interval);
$j(nview).append("<center><div class='w3-section w3-medium '><button class='w3-button w3-green w3-hover-green'>I am a Recruiter</button>     <button class='w3-button w3-green w3-hover-green'>I am an Explorer</button></div></center>");
}
}
