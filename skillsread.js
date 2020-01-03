const http = require("http");
const fs = require("fs");
const path = require("path");
// const uuid=require("uuid/v1");
let arr = ["Teck Skill Mapping - UI.csv"];
// let arr = ["Teck Skill Mapping - Backend.csv","Teck Skill Mapping - UI.csv",
// "Teck Skill Mapping - Cloud.csv","Teck Skill Mapping - Databases.csv",
// "Teck Skill Mapping - Others.csv"];
var o = {};
// "Teck Skill Mapping - Basic.csv"
let converToJson = () => {
        fs.readFile(path.join(__dirname,"Teck Skill Mapping - DataScience%2FAnalytics.csv"), (err, data) => {
            if (err) console.log(err);
            else {
                var array = data.toString().split("\n");
                for (let i in array) {
                    let obj = array[i].split(",");
                    let temp = {
                        "skillName": obj[0],
                        "explanation": obj[1],
                        "primaryFamily": obj[2],
                        "secondaryFamily": obj[3].split("$"),
                        "synonyms": obj[4].trim().length?obj[4].split("$"):[],
                        "versions":obj[5].trim().length?obj[5].split("$"):[],
                        "similarTech":obj[6].trim().length? obj[6].split("$"):[],
                        type: obj[7],
                        "booleanSynonyms":obj[8].trim().length&&obj[8]!="\r"? obj[8].split("$"):[]
                    };
                    o[obj[0].toLowerCase()] = temp;
                    for (let x in temp.synonyms){
                        temp.synonyms[x]=temp.synonyms[x].trim();
                        o[temp.synonyms[x].toLowerCase()] = temp;
                    }
                    for (let y in temp.versions){
                        temp.versions[y]=temp.versions[y].trim();
                        o[temp.versions[y].toLowerCase()] = temp;
                    }
    // o = JSON.stringify(o);
    // '" ' with '"'
    // '
    // '""'
                }
    fs.appendFile(path.join(__dirname, "data.js"), JSON.stringify(o), (err, data) => {
        console.log("file created");
    });
}});
};

converToJson();
