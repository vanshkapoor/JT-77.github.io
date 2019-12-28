export function getNewChatId(isForBot){
    let text = "";
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz123459845aakdmdskjksj";
    for (var i = 0; i < 16; i++){
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    } 
    return isForBot?'Bot'+text:'Chat'+text;
  }

  export function objectToArray(obj){
    let keys=Object.keys(),arr=[];
    for(let x in keys){
      arr.push(obj[keys[x]]);
    }
    console.log(arr);
    return arr;
  }

  export function emailValidationCheker(email){
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  export function phoneNumberValidationCheck(phnno){
    return (phnno.match(/\d/g).length==10)&&(parseInt(phnno)!="NaN");
  }

  export function generateJobId(){
    let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ-abcdefghijklmnopqrstuvwxyz0123456789";
    let sb = [];
    for (let i = 0; i < 30; i++) {
        let c = chars[Math.floor(Math.random()*30)];
        sb.push(c);
    }
    let random= sb.join("");
    console.log(random);
    return random;
  }