
const express =require('express');
const path=require('path');  //not require to install path, it is inbuilt function   used to set path (like in .set(views)

const port=8000;

const db= require('./config/mongoose');
const Contact = require('./models/contacts');
const app=express();                       // use app as naming convention to get all functionalites of express as function 

var contactList = [
    {
        name : "Aman",
        phone : "1234567890"
    },
    {
        name : "Abhi",
        phone : "0987654321"
    }
] ;

app.set('view engine','ejs');      //app has many property we set view engine name-> as ejs   ..
app.set('views',path.join(__dirname,'views'));  // now set (views) folder and two path one is directory name (commom path) which is path of this file and views folder path
                                                // __dirname use in place of users/aman...../contact_list      this path can be diff. for every coder working on same project so it is helpful 
                                                // it make it dynamic
                                                // it will look out folder nam views in this path 
                                                // use of this -> in get we rendered file -> dirname + file toget complete location of file home.ejs 
                                                  
app.use(express.urlencoded()); // middle ware see video for more info 30:9
                                  // sometime we have to done preprocessing on data that done by it ...
                                // this is only for form data that we submited ,not any effect on param (query)

app.use(express.static('assets'));  // it will go to this folder assets and wil get acces to all files .(this folder is at equal place in whic folder it present)

app.get('/',function(req,res){         // adding on page also with database.
//find used to find by give id also
    //Contact.find({name:"aman"},function(err,contacts){
        Contact.find({},function(err,contacts){
            if(err){
                console.log("data fetched is not recognised");
            }
            return res.render('home',{    // set value of this var globally in home.ejs file 
                title : "Contact_list",    // here we are sending value of title varibale in home.ejs file
                contact_list:contacts    // contacts taken from arg of fun.
    });
    // return res.render('home',{  // home taken from already set path nd file type 
    //     title : "Contact_list",
    //     contact_list:contactList
    });  
});
//deleting from page and database if user delete from page
app.get('/delete-contact',function(req,res){          
            let id=req.query.id;
            Contact.findByIdAndDelete(id,function(err){ //find using id and delete it.
                if(err){
                    console.log("error in deletion");
                    return; 
                }
                return res.redirect('back');  // redirect means take to that file  by default back is used to go on that page again  
        });  
    });
app.post('/create_contact',function(req,res){    // this same create_contact used as action in ejs file (in form we use action ) // here our parser take data from browser and this parser do req and store all data in it as body.
    Contact.create({                              // here we parse data from form 
        name:req.body.name,                      // to parse data we use *(app.use)* to encode data from browser   app.use(express.urlencoded()); 
        phone:req.body.phone
    },function(err,newContact){
        if(err){console.log('error');
      return;}
      console.log('*******',newContact);
      return res.redirect('back');
    })



})
// app.get('/delete-contact',function(req,res){
//     //console.log(req.query);
//      let phone=req.query.phone; //taken from params /delete-contact/?phone=<%= i.phone%>
//      let contactInd=contactList.findIndex(contact =>contact.phone == phone);
//      if(contactInd!=-1){
//         contactList.splice(contactInd,1);
//      }
//      return res.redirect('back'); 
// })
app.listen(port,function(err){                             // not require to pass data 
    if(err){
        console.log("some error is coming !",err);
        return ("ERROR!!");
    };
    console.log("server running on port:",port);
})