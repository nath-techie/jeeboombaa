const express = require('express');
const https = require('https');
const b=require("body-parser");
const request = require('request');
const app=express();

app.use(express.static("public"));
app.use(b.urlencoded({extended:true}));
app.get("/",(req,res)=>
{
res.sendFile(__dirname+"/signin.html");
//https.get(url,)
});
app.post("/",(req,res)=>
{
        console.log("submit succes");
        const fn=req.body.fn;
        const ln=req.body.ln;
        const em=req.body.em;
        console.log(fn,ln,em);
        const data=
            {
            members:[
              {
            email_address:em,
            status:"subscribed",
            merge_fields:{FNAME:fn,LNAME:ln}
              }
            ]
          }
          const jsonData=JSON.stringify(data);
        //const listid= 613d36cdb0;
      //  const apikey=146d424ca8b5774702375e7e8e78137a-us14;
        const url="https://us14.api.mailchimp.com/3.0/lists/613d36cdb0";
        const options={
                    method:"POST",
                    auth:"sabari:146d424ca8b5774702375e7e8e78137a-us14"
                  }
        const r=https.request(url,options,function(response){
          response.on("data",function(data){console.log(JSON.parse(data));})
        });
        r.write(jsonData);
        r.end();

});



app.listen('3000',console.log("server working"));
