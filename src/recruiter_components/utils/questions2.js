import React, {Component} from 'react';
import TextMessage from '../TextMessage/TextMessage';
import UserInfo from '../UserInfo/UserInfo';
import MessageList from './../MessageList/MessageList';
import TechInput from './TechInput';
import FeaturesCandidate from './../modals/FeaturesCandidate';
import FeaturesRecruiter from './../modals/FeaturesRecruiter';
import AboutTeam from './../modals/Team';
import Pricing from './../modals/Price';
import ContactUs from './../modals/ContactUs';
import Price from './../modals/Price';
import BookNow from './../modals/BookNow';
import swal from 'sweetalert';
import dictionary from './../utils/UI';
const $=window.$;

export const a = {
     "__v": 0
    , "published":true
    , "questions": [
        {
            "id": "aq2jkaEra8c4mkQjrkk4"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Hey There, I'm your Fellow Monk. I have been trained by Ashfaq (www.linkedin.com/in/ashfaqahmedhr/), who happens to be a Recruitment Trainer.<br/>"
        },{
            "id": "v5PJbssdTbjAY5ODgyVD"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "Basically I have been trained to help recruiters in any of the below areas."
            , "options": ["Boolean","Technology"
            // ,"Startup"
            ],
            conditions:[{
             val:"Boolean",
             next:"sU5OhibkWwbvkzgkhwcE"
            },
            {
             val:"Technology",
             next:"VkFWBF4C3rwFCJ2C5545"
            },
            {val:"Startup",
            next:""}
            ]/*,
            actions:[{
                val:"Boolean",

                params:"Recruiter"
            },{
                val:"Technology",
                params:"Candidate"
            },{
                val:"Startup",
                action:"GreetUser",
                params:"Startup Enthusiast"
            }]*/
        }, 
            //response for recruiter
       /* {
            "id": "imjkdtOwPpTBqxxdzpOD"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false,
            label:"Before we move ahead, I would love to know a bit more about you. Pls help me by authenticating yourself via LinkedIn."
            // , "label": "Before we move ahead, I would love to know a bit more about you. Help me out by logging in via any of the below social platforms"
            , "options": ['LinkedIn'
            // ,"Facebook"
        ],
            skippable:true,
            actions:[{
                val:"LinkedIn",
                action:"Login",
            },
            {
                val:"Facebook",
                action:"Login"
            }]
        },*/
            // recruiter chats
        {
            "id": "sU5OhibkWwbvkzgkhwcE"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "Cool, I will try my best to help you frame some amazing search queries. But I have been trained only a bunch of skills for now and every week there would be new skills on which I will be trained."
            , "options": ["So how can you help me?"]
        }, 
        /*{
            "id": "VkFWBF4Ck534CJ2C4GhI"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Here you go, this is what I can do for you:-<ul><br/><li> I can screen candidates on your behalf with basic questions.</li><li> After my interaction, you can directly chat with candidates one on one</li><li>Remind you about your upcoming tasks\n Schedule Interviews</li><li>Follow up with candidates etc.</li>"
        },*/ 
        {
            "id": "jikZukjOX3afwJTVOz4j"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "Choose a skill from the below drop down for which you need a Boolean help"
            , "options": ["Java Developer","UI Developer","Android Developer","Python Developer",".Net Developer"],
            conditions:[{
             val:"Java Developer", 
             next:"UCaGOaxNrsdGsdalwnaJ"
            },
            {
             val:"UI Developer",
            next:"qfHwmIt43ajVOJ1OsDtp"
            },
            {
             val:"Android Developer",
            next:"qfHwmIt43ajVOJ1OsDtp"
            },
            {
             val:"Python Developer",
            next:"qfHwmIt43ajVOJ1OsDtp"
            },
            {val:".Net Developer",
            next:"UCaGOaxNrsdGsdalwnaJ"}
            ]    
        }, 
            //response for java/maybe
            {
            "id": "UCaGOaxNrsdGsdalwnaJ"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "aahh not at all, being a bot myself I strongly disagree with this notion of AI taking over recruitment completely\n"
        }, {
            "id": "ek4bfGsIkdGb4m4nskLI"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Rather, AI/Bot can make a recruiter's world better, be a Fellow to help them.\n"
        }, {
            "id": "3cdER82YYvkZXZWjx1mN"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "So how about having me as your Fellow (assistant)? Trust me, I'am not taking away your Job 😉\n"
            , next:"vsPrsi4OjKxaiMmSTjkj" 
        }, {
            "id": "qfHwmIt43ajVOJ1OsDtp"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Cool, you're bang on buddy 😉\n"
        },  {
            "id": "UCaGOaxNrsdG3ralwnaJ"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "AI/Bots are here to make a recruiter's world better, be a Fellow to help them.\n"
        }, {
            "id": "vsPrsi4OjKxaiMmSTjkj"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "So smarty, Would you like to have me as your assistant?"
            , "options": ["Yes Ofcourse","No Thanks"],
            conditions:[{
             val:"Yes Ofcourse",
             next:"ek4bfGsIkdGb4m4ns2LI"
            },
            {
             val:"No Thanks",
             next:"UCaGOaxNrsdGsdalw2wJ"
            }]
        },
                
            //response for no thanks
            {
            "id": "UCaGOaxNrsdGsdalw2wJ"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Ouchh !! That was sad 😔"
        }, {
            "id": "vsPrsddejKxaiMmSTjkj"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "I’m little curious to know more about you, can I buy some more time of yours?"
            , "options": ["Sure","Sorry, I gotta go"],
            conditions:[{
             val:"Sure",
             next:"vsPrsi223Kx333tSTjkj"
            },
            {
             val:"Sorry, I gotta go",
             next:"qfHwmIt43aje3J1OsDtp"
            }]
        },
          //response for "soory i gotta go"  
        {
            "id": "qfHwmIt43aje3J1OsDtp"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "That's fine I totally understand."
        }, {
            "id": "QNk4oyvjjhHNv5k5jkvH"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "You can write to me or my team directly at admin@fellowapp.com or you can also say hello to our CEO at ashfaq@fellowapp.co"
        }, {
            "id": "hOo3FkqyacSMTBD4LOd9"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Have a great day!!😃\n",
            next:"end"
        }, 
            //response for yes ofcourse
            
        {
            "id": "ek4bfGsIkdGb4m4ns2LI"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Hurray, that means a lot to me.😄 </br> I’m all excited to be your assistant."
        }, {
            "id": "3cdER82YYvkZXZedx1mN"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "But unfortunately, you got to wait for couple of weeks as I’m currently in an alpha testing mode.\n"
        },{
            "id": "sU5O22bkWwbvkz12hwcE"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "I will keep you posted once I go live & Yeah, I will make sure you get some Bonus for being an Early User. Sounds like a deal, what say?"
            , "options": ["Great"],
            conditions:[{
             val:"Great",
             next:""
            }]
        },
        //response for great    
        {
            "id": "vsPrsi4OjKx333tSTjkj"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "I'm just glued on to chatting with you that I'm curious to know a bit more about you. can I buy some more time of yours?"
            , "options": ["Sure","Sorry, I gotta go"],
            conditions:[{
             val:"Sure",
             next:""
            },
            {
             val:"Sorry, I gotta go",
             next:"qfHwmIt43aje3J1OsDtp"
            }]
        },
        {
            "id": "vsPrsi223Kx333tSTjkj"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "Cool, tell me more about you, what kind of recruiter are you?"
            , "options": ["Sourcer","Non Sourcer"],
            conditions:[{
             val:"Sourcer",
             next:"222wwww2YYvkZXZedx1mN"
            },
            {
             val:"Non Sourcer",
             next:""
            }]
        },{
            "id": "222ER82YYvkZXZedx1mN"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Ohhooo, then I believe you're on the HOT seat, the go-to person who faces the Hiring Managers / Candidates?"
        },{
            "id": "DDDO22bkWwbvkz12hwcE"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "You must be a brave lad 😉😄"
            , "options": ["Haha Yes, that's right"],
            actions:[{
                val:"Haha Yes, that's right",
                action:"NonSourcerInit"
            }]
        },
        {
            "id": "vsPrsi223KSSSAtSTjkj"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "The Booleanathon Challenge !!"
            , "options": ["Sure. let's go","Aahh No"],
            conditions:[{
             val:"Sure. let's go",
             next:"2s2s55s2s5s5222z12hwcE"
            },
            {
             val:"Aahh No",
             next:"qfHwmIt43aje3J1OsDtp"
            }]
        },
// response for sourcer
        {
            "id": "222wwww2YYvkZXZedx1mN"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Oh nice, I just lover sourcers."
        },{
            "id": "2s2s55s2s5s5s2bvkz12hwcE"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "Are you comfortable with Boolean? Can we have a quick Booleanathon right away, what say?"
            , "options": ["Very much","Not Really, I can try"]
        },
        
        // response for Sure. let's go/ Very much/ Not Really, I can try
        {
            "id": "2s2s55s2s5s5222z12hwcE"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "Amazing, before we dive into the challenge, do you know the Boolean stats?"
            , "options": ["No Idea, can you tell me"],

        },
        {
            "id": "SL8878R82YYvkZXZedx1mN"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Here you go, these numbers are in context to the Indian Recruiters.<img style='width:80vw;max-width:400px;padding-top:5px;' src='assets/image/stats.png' alt='Stats'>"
        },
        {
            "id": "222wwE4e4YvkZXZedx1mN"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Let’s get back with our Booleanathon"
        }, {
            "id": "DD$$##DD5s5s2bvkz12hwcE"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "Are you ready for the challenge?"
            , "options": ["Very much"]
        },{
            "id": "223333wE4e4YvkZXZedx1mN"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Write the best Boolean which will yield high number of resumes without compromising on the quality & make sure your logic avoids the irrelevant datas. You score more if you use more contextual / relevant synonyms."
        }, 
        // {
        //     "id": "DD$$##DD5s5s2bvkz12hwcE"
        //     , "element": "Single Choice"
        //     , "type": "option"
        //     , "name": "Single Choice"
        //     , "required": false
        //     , "label": "Choose the search engine which you’re comfortable."
        //     , "options": ["Naukri","LinkedIn"],
        //     actions:[{
        //         val:"Naukri",
        //         action:"SearchEngine",
        //         params:"Write the best Boolean which will yield high number of resumes without compromising on the quality. You score more if you use more contextual / relevant synonyms."
        //     },
        //     {
        //         val:"LinkedIn",
        //         action:"SearchEngine",
        //         params:"Write the best Boolean which will yield high number of resumes without compromising on the quality & make sure your logic avoids the irrelevant datas. You score more if you use more contextual / relevant synonyms."
        //     }]
        // },
        {
            "id": "DDSSS5s2bvkz12hwcE"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "Choose one skill of your choice"
            , "options": ["Android Developer","Nodejs + NoSQL Developer","UI + Any JS","Java Developer with Spring & Hibernate"]
            ,actions:[{
                val:"Android Developer",
                action:"BooleanInit"
            },
            {
                val:"Nodejs + NoSQL Developer",
                action:"BooleanInit"
            },{
                val:"Java Developer with Spring & Hibernate",
                action:"BooleanInit"
            },{
                val:"UI + Any JS",
                action:"BooleanInit"
            }]
        }
        ,{
                "id": "SL8878R812233XZedx1mN"
                , "element": "Statement"
                , "type": "statement"
                , "name": "Statement"
                , "required": false
                , "label": "Cool, in next few minutes I will help you with some Boolean fundamentals"
        },
        {
            "id": "DDS22333bvkz12hwcE"
            , "element": "Single Choice"
            , "type": "option"
            , "label": "Let me chill you first, what would you like to have?"
            , "options": ["Any soft drink would do 🍹","Maybe Sweet lime or Pineapple","Chocolate shake/Banana Shake"]
            ,conditions:[{
                val:"Any soft drink would do 🍹",
                next:"SL8872eee2YYv32dx1mN"
            },
            {
                val:"Maybe Sweet lime or Pineapple",
                next:"SL8ewewee2YYv32dx1mN"
            },{
                val:"Chocolate shake/Banana Shake",
                next:"SL887Ss8sjsj32dx1mN"
            }]
        },
        {
            "id": "SL8872eee2YYv32dx1mN"
            , "element": "Statement"
            , "type": "statement"
            , "label": "Sorry, I'am not integrated with Zomato currently to place an order for you 😉 .Wish I could do so"
        },
        {
            "id": "SL88dddd2YYvkZXZedx1mN"
            , "element": "Statement"
            , "type": "statement"
            , "label": "Let me teach you Boolean with your order"
        },
        {
            "id": "SL88dddd2YYvkZXZedx1mN"
            , "element": "Statement"
            , "type": "statement"
            , "label": "So the Boolean for the order you have placed goes like this:<br/><br/>(Coke OR Pepsi OR Fanta)",
            next:"DDS22333bvk11133wcE"
        },
        
        {
            "id": "SL8ewewee2YYv32dx1mN"
            , "element": "Statement"
            , "type": "statement"
            , "label": "Sorry, I'am not integrated with Zomato currently to place an order for you 😉 .Wish I could do so"
        },
        {
            "id": "SL8Z4Z4ZYYvkZXZedx1mN"
            , "element": "Statement"
            , "type": "statement"
            , "label": "Let me teach you Boolean with your order"
        },
        {
            "id": "SL8877SdddD4Dedx1mN"
            , "element": "Statement"
            , "label": "So the Boolean for the order you have placed goes like this:<br/><br/>('Sweet Lime' OR Pineapple)",
            next:"DDS22333bvk11133wcE"
        },
        
        {
            "id": "SL887Ss8sjsj32dx1mN"
            , "element": "Statement"
            , "label": "Sorry, I'am not integrated with Zomato currently to place an order for you 😉 .Wish I could do so"
        },
        {
            "id": "SL88dddkZXZedx1md2YYvN"
            , "element": "Statement"
            , "type": "statement"
            , "label": "Let me teach you Boolean with your order"
        },
        {
            "id": "SLd2aHSHHSZXZe88ddx1mN"
            , "element": "Statement"
            , "label": "So the Boolean for the order you have placed goes like this:<br/><br/>('Chocolate shake' OR 'Banana shake')"
        },
        {
            "id": "DDS22333bvk11133wcE"
            , "element": "Single Choice"
            , "label": "I'm sure this wont suffice you, I believe you must be a foodie. Let's order something more 😋"
            , "options": ["Chicken Burger","Pizza","French Fries"]
            ,actions:[{
                val:"Chicken Burger",
                action:"SelectBurger"
            },
            {
                val:"Pizza",
                action:"SelectBurger"
            },{
                val:"French Fries",
                action:"SelectBurger"
            }]
        },
        {
            "id": "SL1d4d4d42Y333Zedx1mN"
            , "element": "Statement"
            , "label": "How does this work? <ul style='padding-top:10px;'><li>Add OR logic to your options &amp; make sure you add a bracket on using OR logic</li><li>Add double quotes if you're using two terms which denote one word</li><li>The more you order, keep adding it to the Boolean with a AND logic.</li></ul>"
        },{
            "id": "2s2s55d5d5d55ds2s5D2hwcE"
            , "element": "Single Choice"
            , "label": "I have something little more complicated, want to give it a look?"
            , "options": ["Sure, why not?"],
        },
        {
            "id": "SL8878R8ZSZ5z5zedx1mN"
            , "element": "Statement"
            , "label": "That's amazing, guess you're pretty keen in learning stuff 😃"
        },
        {
            "id": "SL887823232SZ5z5zedx1mN"
            , "element": "Statement"
            , "label": "What if you had to place a combo? <ul style='padding-top:15px;'><li>Chicken Burger along with Coke or</li><li>Pizza along with Pepsi</li></ul>"
        },
        {
            "id": "SL887Swqwq5s5s5sedx1mN"
            , "element": "Statement"
            , "label": "So the Boolean for your combo order is : <br><br> (('Chicken burger' AND Coke) OR (Pizza AND Pepsi))"
        },{
            "id": "DE4e5e5ek11133wcE"
            , "element": "Single Choice"
            , "label": "I know by now your tummy would be cursing you, I will let you go and grab some pizza or burger 😉 Before that, I have couple of sites which I believe will help you in Boolean. Would you like to know?"
            , "options": ["Yeah, I wanna"]
        },
        {
            "id": "SltcmqwqwqzL8878Rredx1mN" ,
             "element": "Single Choice"
            , "label": 'Here are some quick online content which can help you<br><ul><li><a href="https://source.socialtalent.co/" target="_blank" style="text-decoration:none;"><b>socialtalent</b></a></li><li><a href="http://booleanblackbelt.com/2013/06/linkedin-sourcing-ninja-webinar-recording-now-on-youtube/" target="_blank" style="text-decoration:none"><b>Boolean Black Belt</b></a></li></ul>'
            ,options:["Hey, answer for my Boolean?"],
            actions:[{
                val:"Hey, answer for my Boolean?",
                action:"BooleanAnswer"
            }]
        },
        {
            "id": "SStSSSc666mkk5zedx1mN"
            , "element": "Statement"
            , "label": 'Sure, I follow simple steps while writing a Boolean: <ul style="padding-top:15px;"><li>Understand the search engine on which you’re searching</li><li>Know the list of synonyms</li><li>Pen down Primary and Secondary keywords</li><li>Write all possible designations which are specific only to that Job. (Note: Designations are included in the Boolean only if it can impact the search, otherwise not)</li><li>Use the power of NOT to avoid repetitive/unwanted resumes</li></ul>'
        },
        {
            "id": "SStSSSc66654545451mN"
            , "element": "Statement"
            , "label": 'I hope you found this useful'
        },
        {
            "id": "SltcmqwqwqzL888e88e8edx1mN" ,
             "element": "Single Choice"
            , "required": false
            , "label": 'I’m thinking of having a weekly Q&A with recruiters, try to answer their queries by one of our fellows or by Industry experts, would you like to join the loop?'
            ,options:["Sure, but how can I put my Qs?"]
        },
        {
            "id": "SSts5s6s6sk5zedx1mN"
            , "element": "Statement"
            , "label": 'It’s pretty simple, everything via a mail'
        },
        {
            "id": "SStSz2a5e2f2czedx1mN"
            , "element": "Statement"
            , "label": 'I will mail you with further details on this & also knock your mail box once I go live.'
        },
        {
            "id": "SStS2czez2a5e2fdx1mN"
            , "element": "Statement"
            , "label": 'If you have any other queries you can reach out to our CEO directly at ashfaq@fellowapp.com'
        },
        {
            "id": "Slwkfmncjkck878Rredx1mN" ,
             "element": "Single Choice"
            , "required": false
            , "label": 'It was a pleasure talking to you, have a great day. Looking forward to join you as your assistant very soon. 😉'
            ,options:["Ciao, it was great talking to you"]
        },
        {
            "id": "SStSz2a5e2f5ss8s2czedx1mN"
            , "element": "Statement"
            , "label": 'Same here !!'
        },
        {
            "id": "SStSz2a5e2f5ss8s2czedx1mN"
            , "element": "Statement"
            , "label": 'Take care 😃',
            next:"end"
        },
        
        //********************************** Candidate ******************************************************
       /* {
            "id": "VkFWBF4C3rwFCJ2C4GhI"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false,
            label:"Before we move ahead, I would love to know a bit more about you. Pls help me by authenticating yourself via LinkedIn."
            // , "label": "Before we move ahead, I would love to know a bit more about you. Help me out by logging in via any of the below social platforms"
            , "options": ["LinkedIn"
            // ,"Facebook"
        ],
            skippable:true,
            actions:[{
                val:"LinkedIn",
                action:"Login",
            },
            {
                val:"Facebook",
                action:"Login"
            }]
        },*/
        {
            "id": "VkFWBF4C3rwFCJ2C5545"
            , "required": false
            , "label": "Basically I'm trained with close to 1000 tech Jargons around UI, backend, devops, BigData (i.e) primarily around the digital tech stack.<br/>Just type the word which you're looking forward to"
            ,


        },

          {
            "id": "VkFWBF4C3rwFCJ232Gde"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label":"Hahah that's nice. Probably you've had a bad time with recruiters. I will ensure I would leave no room for complaints 😉",
            next:"sU5OhibkWwbvk4rkhwcE"
        }, 
        {
            "id": "VkFWBF4we334CJ2C44tI"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Oh nice, it's nice to see a few folks like you prefer interacting with Humans than BOT. Some sad news for me though 😜"
        },
        {
            "id": "sU5OhibkWwbvk4rkhwcE"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "So what do you think frustrates a candidate the most in his job hunt?"
            , "options": ["Not Able to search the right Job","No Response after applying","No Response after the initial discussion","Job descriptions are poorly written"]
        },
        {
            "id": "3r4thibkWwbvk4rkhwcE"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "I totally agree with you and that's what my team is working on. We strongly believe Recruitment is still stuck in stone age 😜 What say?"
            , "options": ["Lol true !!"]
        },
        {
            "id": "UCDetxNrsdGsdalwnaJ"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Yeah it is, I have been told that you folks have to deal with dead job ads so much so that you get to literally pray for a response after you apply"
        }, {
            "id": "ek4bfGsIkdGb4m4nskLI"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Unfortunately more often than not your resumes goes into a black hole & you never get to hear back"
        }, 
        {
            "id": "3r4thibkWwbvk45khwcE"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "But yeah, we are getting this addressed. I would be your personal career assistant whenever you're looking for a change. Want to know how i'd help you?"
            , "options":["Sure"]
        },
        {
            "id": "3cdER82YYvkZXZWjkgM6"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "I will traverse through your profile quickly and have a short chat to understand your preferences. "
        },
        {
            "id": "3r4thibkWwbFL45hwcE"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "Right after understanding your preferences, you know what?  I’m not going to put you onto dead job ads again. Rather, I have got something more interesting to help you with. Guess what?"
            , "options":["aahh what’s that?"]
        },
        {
            "id": "3cdER82YYvkZXZgt6Y6"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Hahah I know you hate the dead job ads."
        },
        {
            "id": "VF4R5It43ajV351OsDtp"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "But yeah, I also know you'd not be liking to talk to me much, after all I'm a BOT 😞 . Anyways that's fine, because my boss says keeping you happy is  my Job. 😄"
        },
        {
            "id": "qfDFF3t43ajV351OsDtp"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "And to make you super happy,I’m gonna put you on to a live Recruiter/Hiring Manager for a Chat. You guys can chat up anytime whenever you both are online."
        },
        {
            "id": "D33FRIt43ajV351OsDtp"
            , "element": "Question"
            , "type": "text"
            , "name": "Question"
            , "required": false
            , "label": "So what’s your thoughts about me and the features on offer in this app? All my ears turned on, would love to hear from you."
        },
        {
            "id": "KJ3F44j3ajV351OsDtp"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Hang on !! it doesnt stop there. You can even rate recruiters if they dont respond back to you or for any other hiccups."
        },
        {
            "id": "KK33443ajV351OsDtp"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": 'Now they\'d be held accountable. No more worries of "No Response"'
        },{
            "id": "jiellqkjOX3afwJTVOz4j"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "BTW, would you like to have me as your assistant?"
            , "options": ["Obviously","Ahh Noo."],
            conditions:[{
             val:"Obviously", 
             next:"UCaGOsasrsdGsdalwnaJ"
            },
            {
             val:"Ahh Noo.",
            next:"qfHwmIt43aje3J1OsDtp"
            }]    
        }, 
            {
            "id": "UCaGOsasrsdGsdalwnaJ"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "I'm obliged and this means a lot for me.😄"
        }, {
            "id": "easabfGsIkdGb4m4nskLI"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "But yeah, i’m going live in couple of weeks from now, you gotta wait a bit till then. For sure I will knock your mailbox once i go live."
        },
        // pending
        {
            "id": "jiellqkjwwwafwJTVOz4j"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "Meanwhile, do you mind doing me a small favour?"
            , "options": ["Sure"]
        },
        {
            "id": "FRRllqkjOX3afwJTVOz4j"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "Would you mind spreading some information about me through social platforms?"
            , "options": ["Go ahead","Sorry, I wont"],
            conditions:[{
             val:"Go Ahead", 
             next:"3cdER82YYLDLLDZWjx1mN"
            },
            {
             val:"Sorry, I wont",
             next:"qfHwmIt43aje3J1OsDtp"
            }],
            actions:[{
                val:"Go ahead",
                action:"postToSocialMedia",
            },{
                val:"Sorry, I wont",
                action:"end",
            }]   
        },  
        {
            "id": "3cdER82YYLDLLDZWjx1mN"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Amazing, love you for this 😍 Thank You very much." 
        },
        {
            "id": "Slwkfmnc676k878Rredx1mN" ,
             "element": "Single Choice"
            , "required": false
            , "label": 'It was a pleasure talking to you, have a great day. Looking forward to join you as your assistant very soon. 😉'
            ,options:["Ciao, it was great talking to you"]
        },
        {
            "id": "SSt2f5ss8s2czeSz2a5edx1mN"
            , "element": "Statement"
            , "label": 'Same here !!'
        },
        {
            "id": "SStSgggggggggs8s2czedx1mN"
            , "element": "Statement"
            , "label": 'Take care 😃',
            next:"end"
        },       
    ]
    , "config": {
    }
    , "id": "5a26914fc4101cab46ef44ca"
    , "widget": ""
}