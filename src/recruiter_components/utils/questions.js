export const a = {
    "_id": "5a26914fc4101cab46ef44ca"
    , "updatedAt": "2017-12-05T12:34:13.239Z"
    , "createdAt": "2017-12-05T12:30:07.178Z"
    , "userId": "5a2690f3c4101cab46ef44c6"
    , "__v": 0
    , "published": true
    , "questions": [
        {
        "id": "775F61A9-4C55-45E5-BE0E-290B7861F364"
        , "element": "Single Choice"
        , "type": "option"
        , "name": "Single Choice"
        , "required": false
        , "label": "\n<img src=\"https://s-media-cache-ak0.pinimg.com/originals/bb/d4/b6/bbd4b6347559f2834e187797b68f693b.gif\" style=\"float:none;height: auto;width: auto\"/>\nStruggling to land on a job you like?\n"
        , "options": ["Yes"]
    }, {
        "id": "A25C6E06-927D-47AF-93D0-A987E64B09E8"
        , "element": "Statement"
        , "type": "statement"
        , "name": "Statement"
        , "required": false
        , "label": "Don't worry! We are here to help\n"
    }, {
        "id": "27CA5D82-4CE3-4173-9AE0-5C125EDDB074"
        , "element": "Single Choice"
        , "type": "option"
        , "name": "Single Choice"
        , "required": false
        , "label": "We have created a course that will help you gain confidence in your skills and train you in every aspect of the job interview\n"
        , "options": ["Great"]
    }, {
        "id": "EEDC6843-C77A-464B-9766-EC1ADEAC5886"
        , "element": "Single Choice"
        , "type": "option"
        , "name": "Single Choice"
        , "required": false
        , "label": "Have you previously worked anywhere?\n"
        , "options": ["Yes", "No"]
        , "skippable": false
        , "conditions": [{
            "type": "==="
            , "val": "No"
            , "next": "5BFD53D9-A29E-44DC-8546-735356067031"
        }]
    }, {
        "id": "0948F776-507D-4092-8711-F5552E623365"
        , "element": "Statement"
        , "type": "statement"
        , "name": "Statement"
        , "required": false
        , "label": "Great\n"
    }, {
        "id": "0CAA722A-881C-4C06-8610-9A0721724103"
        , "element": "Question"
        , "type": "text"
        , "name": "Question"
        , "required": true
        , "label": "How many years of experience do you have?\n"
        , "skippable": true
    }, {
        "id": "C5F826B5-4F1A-4460-8662-B6B2C8A49171"
        , "element": "Question"
        , "type": "text"
        , "name": "Question"
        , "required": false
        , "label": "And what was the job?\n"
    }, {
        "id": "979F1A33-0BB9-4969-BF5A-F841694A07A2"
        , "element": "Statement"
        , "type": "statement"
        , "name": "Statement"
        , "required": false
        , "label": "Okay\n"
        , "next": "C1F8F4D1-6CB0-4B13-A497-0CAD7EEEDAC0"
    }, {
        "id": "5BFD53D9-A29E-44DC-8546-735356067031"
        , "element": "Statement"
        , "type": "statement"
        , "name": "Statement"
        , "required": false
        , "label": "No worries!\n"
    }, 
    {
        "id": "C1F8F4D1-6CB0-4B13-A497-0CAD7EEEDAC0"
        , "element": "Multi Choice"
        , "type": "multioption"
        , "name": "Multi Choice"
        , "required": false
        , "label": "What are the areas you will need help in?\n"
        , "options": ["finding a job", "writing resume", "writing cover letter", "interview training"]
    },
     {
        "id": "07A49131-F0B2-4028-BA8B-7DC7A5CFE766"
        , "element": "Statement"
        , "type": "statement"
        , "name": "Statement"
        , "required": false
        , "label": "Oh! I almost forgot to ask..\n"
    }, {
        "id": "3C31EFF3-2BBD-4130-9B29-D723BBAF335F"
        , "element": "Question"
        , "type": "text"
        , "name": "Question"
        , "required": false
        , "label": "What's your name? 😁\n"
    }, {
        "id": "9863C7CE-141A-4477-8B58-3BA534E1297A"
        , "element": "Statement"
        , "type": "statement"
        , "name": "Statement"
        , "required": false
        , "label": "Thank you!\n"
    }, 
    {
        "id": "251300EE-28A4-43D0-92FB-271020BC034D"
        , "element": "Email"
        , "type": "text"
        , "name": "Email"
        , "validate": "email"
        , "required": false
        , "errormsg": "Please enter a valid email address"
        , "label": "What is your email address?"
    },
     {
        "id": "21CD9EE9-65EE-49B3-A10E-44D43321A975"
        , "element": "Suggest"
        , "type": "suggestion"
        , "name": "Suggest"
        , "required": false
        , "label": "Type and select your answer"
        , "tags": ["Sample option"]
    }{
        "id": "21CD9EE9-65EE-49B3-A10E-44D43321A975"
        , "element": "Suggest"
        , "type": "suggestion"
        , "name": "Suggest"
        , "required": false
        , "label": "Type and select your answer"
        , "tags": ["Sample option"]
    }, {
        "id": "C314AD1D-74A1-434E-8AB2-B8A324D3FBA0"
        , "element": "Range"
        , "type": "range"
        , "name": "Range"
        , "required": false
        , "min": 0
        , "max": 100
        , "step": 1
        , "label": "Select a range"
    }

///////////////////////////////////////////////////////////////////////////
// to be implemented
//////////////////////////////////////////////////////////////




    // {
    //     "id": "424E7153-9BAB-47AA-9FDC-55F2F79019D1"
    //     , "element": "Contact"
    //     , "type": "social"
    //     , "name": "Contact"
    //     , "required": false
    //     , "label": "Contact us at"
    //     , "links": [{
    //         "type": "messenger"
    //         , "text": "Message Us"
    //         , "value": ""
    //     }, {
    //         "type": "email"
    //         , "text": "Email Us"
    //         , "value": ""
    //     }]
    // }, {
    //     "id": "B6CC0A01-4014-4580-85C3-773ACDBF1326"
    //     , "element": "Rating"
    //     , "type": "rating"
    //     , "name": "Rating"
    //     , "required": false
    //     , "label": "How was your experience?"
    // }, {
    //     "id": "7B82AC1C-EEB4-48C3-BF0A-D29D4BDB02A3"
    //     , "element": "Date Picker"
    //     , "type": "date"
    //     , "name": "Date Picker"
    //     , "required": false
    //     , "label": "Select a date"
    // }
]
    , "config": {
        "emailDisabled": false
        , "showProgress": true
        , "avatarLauncher": true
        , "timerTrigger": 15
        , "position": "center"
        , "avatar": "https://s3.amazonaws.com/collectchat/avatars/a7.png"
        , "url": "http://foodcham.com"
        , "name": "Chat now"
        , "color": "#0069ff"
        , "whitelabel": false
        , "formName": "career guidance template"
        , "brandText": "Not using <b>Collect.chat</b> yet?"
        , "brandUrl": "https://collect.chat"
    }
    , "id": "5a26914fc4101cab46ef44ca"
    , "widget": "https://s3.amazonaws.com/collectchat/widget.js?c=5a26914fc4101cab46ef44ca"
}