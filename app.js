const express = require("express");
const app = express();
const request = require("request");
const bodyParser = require("body-parser");
const https = require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

app.get("/",function(req,res){


res.sendFile(__dirname+"/signup.html");

});

app.post("/",function(req,res){

   const firstName = req.body.fName;
   const lastName = req.body.lName;
   const email = req.body.email;
   var data = {
        members :[
            {
                email_address :email,
                status : "subscribed",
                merge_fields :{
                    FNAME : firstName,
                    LNAME : lastName
                }
            }
        ]

    };

    const jsonData = JSON.stringify(data);
    const url = "https://us19.api.mailchimp.com/3.0/lists/2b6520c17e";

    const options = {
        method : "POST",
        auth : "mohamed:f3e6aba4d279d557de6d0f7484c39540-us19"

    };
    const request = https.request(url,options,function(response){
            if (response.statusCode===200){
                res.sendFile(__dirname+ "/success.html")
            }else {
                res.sendFile(__dirname+"/failure.html")
            }
            response.on("data",function(data){
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();
});


app.post("/failure",function(req,res){
    res.redirect("/")
});



app.listen(process.env.PORT || "3000" , function(){
    console.log("Server is running 3000")
})

//1bb6cf8d00680c686ebba09185cfe07b-us19
//2b6520c17e