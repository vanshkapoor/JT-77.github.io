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
            , "label": "Amazing. So I would not want to eat up your time, I will be to the point and give you the required details ASAP."
        }
        ,{
            "id": "v5PJbssdTbjAY5ODgyVD"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "But before that I want to know a bit about you. Do you have an updated LinkedIn profile with current company/Role?"
            , "options": ["Yes, I do","I don’t have one","Not Updated"
            ],
            actions:[{
                val:"Yes, I do",
                action:"JobDisplay",
                param:1,
            },{
                val:"I don’t have one",
                action:"JobDisplay",
                param:2,
            },{
                val:"Not Updated",
                action:"JobDisplay",
                param:3,
            }]
        }
        ,{
            "id": "0CAA722A-881C-4C06-8610-9A0721724103"
            , "element": "Question"
            , "type": "text"
            , "name": "Question"
            , "required": true
            , "label": "Can you mention the tech skills which you’ve been using in your recent projects? Like Java, Spring,others? Kindly separate them with commas.\n"
            ,actions:"skillsMatching",
            placeholder:"Enter your complete set of skills (seperated by comma's)"
        },
        {
            "id": "VkFWBF4Ck534CJ2C4GhI"
            , "type": "statement"
            , "name": "Statement"
            , "element": "Statement"
            , "required": false
            , "label": "I’d like to know one small secret from you 😉"
        }, 
        {
            "id": "jikZukjOX3afwJTVOz4j"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "Are you holding any offer? Trust me, I will keep this secret 😉"
            , "options": ["Yes","No"],
            conditions:[{
             val:"Yes", 
             next:"UCaGOaxNrsdGsdalwnaJ"
            },
            {val:"No",
            next:"qfHwwwIt43aje3J1OsDtp"}
            ]    
        }, 
            //response for yes
            {
            "id": "UCaGOaxNrsdGsdalwnaJ"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Wooaahh that’s nice. Happy for you 😄"
        }, {
            "id": "ek4bfGsIkdGb4m4nskLI"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "I will try my best to help you with a better one 😉"
        }
        ,{
            "id": "3cdER82YYvkZXZWjx1mN"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "May I know what’s the value of the offer you’re holding? Maybe an approx figure." 
        }, {
            "id": "qfHwmIt43ajVOJ1OsDtp"
            , "element": "Number"
            , "required": false
            , "label": "This will help me match you with an opportunity accordingly.",
            placeholder:"Enter digits in lakhs",
            actions:"saveAdditionalDetails,CURRENT_CTC"
        }, {
            "id": "vsPrsi4OjKxaiMmSTjkj"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "So Are you serving your notice period by any chance ?"
            , "options": ["Yes","No"]
        },
        {
            "id": "UCaGOaxNrsdGsdalw2wJ"
            , "element": "Number"
            , "required": false
            , "label": "Cool, so what’s your notice period as of today ?",
            placeholder:"Enter days in digits",
            actions:"saveAdditionalDetails,NP",
            // next:"qfHwmIt43aje3J1OsDtp"
        },
        {
            "id": "UCaGOaxNrsdGsdalw2wJ"
            , "element": "Number"
            , "required": false
            , "label": "By the way what’s your current compensation (CTC) ?",
            placeholder:"Enter ctc in lakhs",
            actions:"saveAdditionalDetails,CURRENT_CTC",
            next:"qfHwmIt43aje3J1OsDtp"
        },
        // reponse for no
        {
            "id": "qfHwwwIt43aje3J1OsDtp"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Aaah k, but no worries I will help you get one ASAP.",
            next:"vsPrsi4OjKxaiMmSTjkj"
        }
        ,{
            "id": "qfHwmIt43aje3J1OsDtp"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "By the way, where do you reside (area)?"
        }, {
            "id": "QNk4oyvjjhHNv5k5jkvH"
            , "element": "Location"
            , "label": "This will help me tell you approximately how many Kms you’ve got to travel every day.",
            placeholder:"Type your area",
            actions:"checkForAreaRange"
        }
        ,{
            "id": "hOo3FkqyacSMTBD4LOd9"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "That’s great.😃\n",
            actions:"checkForEligibility"
        }, 
        
        //notInterested
            
        {
            "id": "ek4bfGsIkdGb4m4ns2LI"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Aaah ok. May I know the reason? This will help me understand better on your preferences."
        }, {
            "id": "3cdER82YYvkZXZedx1mN"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "Choose one option from the below, if unavailable then write your own.",
            actions:"notInterestedReason",
            options:["Demo reason"]
        },
        // reason B - ending part
        {
            "id": "222ER82YYvkZXZedx1mN"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Aaah ok, I understand."
        },
        {
            "id": "222wwww2YYvkZXZedx1mN"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Well, I think there are couple of opportunities round the corner which matches your expectations."
        },{
            "id": "2s2s55s2s5s5s2bvkz12hwcE"
            , "element": "Single Choice"
            , "type": "option"
            , "name": "Single Choice"
            , "required": false
            , "label": "It was nice talking to you.Can I reach out to you once I receive them? What say?"
            , "options": ["Sure","No, thanks."],
            actions:"setUpNotifications"
        }, 
        // {
        //     "id": "SL8878R82YYvkZXZedx1mN"
        //     , "element": "Statement"
        //     , "type": "statement"
        //     , "name": "Statement"
        //     , "required": false
        //     , "label": "It was nice talking to you."
        // },
        {
            "id": "222wwE4e4YvkZXZedx1mN"
            , "element": "Statement"
            , "type": "statement"
            , "name": "Statement"
            , "required": false
            , "label": "Hope to see you soon."
        },
        {
            "id": "SStSgggggggggs8s2czedx1mN"
            , "element": "Statement"
            , "label": 'Take care 😃',
            next:"end"
        }       
    ]
    , "config": {
    }
    , "id": "5a26914fc4101cab46ef44ca"
    , "widget": ""
}