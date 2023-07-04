const express=require('express');
const app=express();
const hbs=require('hbs');
const port=process.env.PORT || 3000;
const path=require('path')
const template_path=path.join(__dirname,"../templates/views");
const partial_path=path.join(__dirname,"../templates/partials");
app.set('view engine','hbs');
app.set('views',template_path);
app.use(express.static(path.join(__dirname,"../Public")));
hbs.registerPartials(partial_path);

app.get("/",(req,res)=>{
    res.render("index");
})

app.get("/about",(req,res)=>{
    res.render("about");
})

app.get("/weather",(req,res)=>{
    res.render("weather");
})

app.get("*",(req,res)=>{
    res.render("404error",{
        errormsg:"Oops, page not found"
    });
})

app.listen(port,()=>{
    console.log(`Listening to the port ${port}`);
})