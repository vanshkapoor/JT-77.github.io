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
    <div id="book-now">
        
        <CloseBtn id="book-now"/> 
                
        <div className="modal-content">
        <div className="container">
            <div className="col-xs-12 no-padd">
              <div className="row" style={{paddingTop:25}}>
                <div className="col-xs-4 hidden-xs circle-cont">
                  <div className="circle">Book <br/> Now </div>
                </div>
                <div className="visible-xs-block hidden-sm">
                <h2 className="text-center">Book Now</h2>
                </div>
                <div className="col-xs-12 col-sm-8 no-padd">
                  <div className="thumbnail card">
                  <form className="form-horizontal" onSubmit={(e)=>{
                      e.preventDefault();
                      this.bookNow()}}>
                     
                     <div className="form-group">
                     <label htmlFor="name1" className="col-xs-3 col-sm-3 control-label">Name</label>
   
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
                     <label htmlFor="email" className="col-xs-3 col-sm-3 control-label">Email Id</label>
   
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
                     <label htmlFor="phone" className="col-xs-3 col-sm-3 control-label">Phone No</label>
   
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
                     <label htmlFor="company" className="col-xs-3 col-sm-3 control-label">Company</label>
   
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
                     <label htmlFor="counrty" className="col-xs-3 col-sm-3 control-label">Country</label>
   
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
                    <hr/>
                    <div className="text-center"> 
                        <input type="submit" className="btn btn-blue btn-lg" value="Book Now"/>
                    </div> 
                    </form>

                  </div>
                </div>
          </div>
         </div>
        </div>
      </div>
    </div>);
  }

  bookNow(){
    console.log(this.state.obj);
    $.ajax({
        url:URL.BOOK_NOW,
        type:"POST",
        data:JSON.stringify({data:this.state.obj})
    }).then((data)=>{
        // console.log(data);
        if(typeof data == "String")
        data=JSON.parse(data);
        console.log(data);
        if(data["ok"])
        swal("Booked Demo.","Thank You for Booking Demo. Our Team will Contact you soon. :)","info");
        // this.props.setUserObj(this.state.obj);
        $('.close-book-now').click();
    }).fail((err,x,xhr)=>{
        console.log(xhr);
    });
    
  }

  onChangeKey(key,val){
      let obj=JSON.parse(JSON.stringify(this.state.obj));
      obj[key]=val;
      this.setState({obj});
  }

  componentDidMount(){
      $("#modal-booknow,#modal-booknow2").animatedModal({
        modalTarget:"book-now",  
        animatedIn:'zoomIn',
        animatedOut: 'bounceOut',
        color:'#fff',
        beforeOpen: function() {
            $(".close-price").click();
        }
    });
  }
}

export default App;
