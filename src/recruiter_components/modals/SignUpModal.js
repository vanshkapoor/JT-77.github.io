import React, { Component } from 'react';
import CloseBtn from './Closebutton';
import URL from './../utils/apis';
import swal from 'sweetalert';
const $ =window.$;
class App extends Component {

    constructor(props){
        super(props);
        this.state={
            obj:{
            name: "",
            ph: "",
            comp:"",
            ema: "",
            cou:"",
            timestamp:new Date().toDateString()
            }
        };
    }

  render() {
      let obj=this.state.obj;
  return (
    <div id="sign-up">
        
        <CloseBtn id="sign-up"/> 
                
        <div className="modal-content">
        <div className="container">
            <div className="col-xs-12 no-padd">
              <div className="row" style={{paddingTop:25}}>
                <div className="col-xs-4 hidden-xs circle-cont">
                  <div className="circle" style={{fontSize:20}}>Register now<br/> for early access:</div>
                  <h4 className="text-center">Launching shortly !!</h4>
                </div>
                <div className="visible-xs-block hidden-sm">
                <h3 className="text-center">Register now for early access:</h3>
                </div>
                <div className="col-xs-12 col-sm-8 no-padd">
                  <div className="thumbnail card">
                  <form className="form-horizontal" onSubmit={(e)=>{
                      e.preventDefault();
                      this.signIn()}}>
                     
                      <div className="form-group">
                                <label htmlFor="name1" className="col-xs-3 col-sm-2 control-label">Name</label>
              
                                <div className="col-xs-8 col-sm-9 no-padd-right">
                                  <input type="text" 
                                  name="name" 
                                  id="name1"
                                  className="form-control"
                                  value={obj.name} 
                                  onChange={(e)=>this.onChangeKey('name',e.target.value)} 
                                  placeholder="Name"
                                  required 
                                  />
                                </div>
                      </div>

                      
                      <div className="form-group">
                                <label htmlFor="email" className="col-xs-3 col-sm-2 control-label">Email Id</label>
              
                                <div className="col-xs-8 col-sm-9 no-padd-right">
                                  <input type="email" 
                                  name="email" 
                                  id="email"
                                  className="form-control"
                                  value={obj.ema} 
                                  onChange={(e)=>this.onChangeKey('ema',e.target.value)} 
                                  placeholder="Email Id"
                                  required 
                                  />
                                </div>
                      </div>
                      
                      <div className="form-group">
                                <label htmlFor="phone" className="col-xs-3 col-sm-2 control-label">Phone No</label>
              
                                <div className="col-xs-8 col-sm-9 no-padd-right">
                                  <input type="tel" 
                                  name="phone" 
                                  id="phone"
                                  className="form-control"
                                  value={obj.ph} 
                                  onChange={(e)=>this.onChangeKey('ph',e.target.value)} 
                                  placeholder="Phone Number"
                                  required 
                                  />
                                </div>
                      </div>
                      
                      <div className="form-group">
                                <label htmlFor="company" className="col-xs-3 col-sm-2 control-label">Company</label>
              
                                <div className="col-xs-8 col-sm-9 no-padd-right">
                                  <input type="text" 
                                  name="company" 
                                  id="company"
                                  className="form-control"
                                  value={obj.comp} 
                                  onChange={(e)=>this.onChangeKey('comp',e.target.value)} 
                                  placeholder="Company Name"
                                  required 
                                  />
                                </div>
                      </div>
                      
                      <div className="form-group">
                                <label htmlFor="counrty" className="col-xs-3 col-sm-2 control-label">Country</label>
              
                                <div className="col-xs-8 col-sm-9 no-padd-right">
                                  <input type="text" 
                                  name="country" 
                                  id="counrty"
                                  className="form-control"
                                  value={obj.cou} 
                                  onChange={(e)=>this.onChangeKey('cou',e.target.value)} 
                                  placeholder="Country"
                                  required 
                                  />
                                </div>
                      </div>  


                      <div className="text-center"> 
                        <input type="submit" className="btn btn-blue btn-lg" value="Sign Up"/>
                      </div> 
                    </form>

                    <hr/>
                    <h4 className="text-center" style={{margin:"15px 0px"}}> -- Or --</h4>
                    <div className="row">
                        <div className="col-xs-12">
                            <div className="col-xs-12 col-sm-12 text-center">
                                 <a className="" onClick={()=>this.linkedinLogin()}>
                                 <img src="assets/image/linkediniconjpg.jpg" className="img-responsive" style={{height:60}} alt="LinkedIn Login"/>    
                                </a>
                            </div>
                            {/* <div className="col-xs-6 col-sm-6 text-center">
                                <a className="" onClick={()=>this.facebookLogin()}>
                                  <img src="assets/image/fbicon.jpg" className="img-responsive" alt="Facebook Login"/>
                                </a>
                            </div> */}
                        </div>   
                    </div>
                  </div>
                </div>
          </div>
         </div>
        </div>
      </div>
    </div>);
  }

  signIn(obj=this.state.obj){
    console.log(obj);
    $.ajax({
        url:URL.SIGN_IN,
        type:"POST",
        data:JSON.stringify({data:obj})
    }).then((data)=>{
        console.log(data);
        if(typeof data == "String")
        data=JSON.parse(data);
        console.log(data);
        // if(data["ok"]){
        swal(`Welcome ${obj.name||obj.formattedName||"User"} !`,"Thanks for signing up. We will be live in Nov for India Market.","success");
        this.props.setUserObj(obj);
        // }
        $('.close-sign-up').click();
    }).fail((err,x,xhr)=>{
        swal("Sign Up unsuccessful","Please try again using other methods","error");
        console.log(xhr);
    });
  }

 linkedinLogin(){
    if(!window.IN.User)
    { return;}

    window.IN.Event.on(window.IN, "auth", getProfileData);
    
    function getProfileData() {
     window.IN.API.Profile("me").fields("id", "first-name", "last-name","maiden-name","formatted-name","industry","current-share","num-connections","num-connections-capped", "headline", "location","summary","specialties","positions", "picture-url", "public-profile-url", "email-address").result(displayProfileData).error(onError);
    }

   let that=this;
  // Handle the successful return from the API call
     const displayProfileData=(data)=>{
         var user = data.values[0],name=user.formattedName;
          console.log(user);
         that.props.setUserObj(user);
         this.signIn(user);
         let label=`Wooaaahh, amazing. Now I know that Im talking to ${name}`;
         $(".close-sign-up").click();
        //  swal("Thanks for signing up. We will be live in Nov for India Market.","success");
     }
     function onError(error) {
         console.log(error);
         swal("Error","Please Sign up using Other Methods","error");
        //  window.location.reload();
     }

    window.IN.User.authorize((...args)=>{
    })

   }



  onChangeKey(key,val){
      let obj=JSON.parse(JSON.stringify(this.state.obj));
      obj[key]=val;
      this.setState({obj});
  }

  componentDidMount(){
      $("#modal-signup").animatedModal({
        modalTarget:"sign-up",  
        animatedIn:'zoomIn',
        animatedOut: 'bounceOut',
        color:'#fff'
    });
  }
}

export default App;
