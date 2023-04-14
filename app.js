
const express=require('express');
const bodyParser=require("body-parser");
const oracleDB=require('oracledb');
// const mySql=require("mysql");
// const ejs=require("ejs");

const app=express();
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/"));
// app.set("views",__dirname+"/views");

// ------------------------------------------------- SQL --------------------------------------------- //
// let connectionPool;
// async function run() {
//     try{
//         connectionPool = await oracleDB.createPool( {
//             user          : "SYSTEM",
//             password      : 'UKiran123',
//             connectString : "localhost:1521",
//             poolMin       : 1,
//             poolMax       : 1
//         });
//     }catch(err){
//         console.error(err.message);
//     }
// }

// run();


// ------------------------------------------------- GET REQUESTS --------------------------------------------- //


app.get("/",(req,res)=>{
    res.redirect("/login");
});

app.get("/admin",(req,res)=>{

    handleAdmin()
    .then(data=>{
        console.log("res= \n",data)
        res.render(__dirname+"/views/admin.ejs", data);
    });

});

app.get("/login",(req,res)=>{
    res.render(__dirname+"/views/login.ejs");
});

app.get("/register",(req,res)=>{
    res.render(__dirname+"/views/register.ejs");
});

app.get("/home",(req,res)=>{
    res.render(__dirname+"/views/home.ejs");
});

app.get("/home/:getGroup",(req,res)=>{
    const group=req.params.getGroup;
    const options={options:[], group:group};
    var valid = false;
    console.log(group);
    if(group==="nso"){
        options.options=nso;
        valid= true;
    }else if(group==="ncc"){
        options.options=ncc;
        valid= true;
    }else if(group==="ssg"){
        options.options=ssg;
        valid= true;
    }
    console.log(options);
    res.render(__dirname+"/views/"+ (valid===true ? "form":"home") +".ejs",options);
});

// ------------------------------------------------- POST REQUESTS --------------------------------------------- //

app.post("/login",(req,res)=>{

    const loginUser={
        username: req.body.username,
        password: req.body.password
    };

    users.forEach((object)=>{
        (object.username === loginUser.username   &&   object.password === loginUser.password) ? res.redirect("/home"): null;
    }); 

    res.redirect("/");
});

app.post("/register",(req,res)=>{

    const newUser={
        username: req.body.username,
        password: req.body.password,
        registered: false
    };
    users.push(newUser);

    res.redirect("/home");
});

app.post("/home/:getGroup",(req,res)=>{
    const group=req.params.getGroup;
    console.log(req.body, req.params);
    
    handleFormSubmission(req.body.name)
    // switch(group){
    //     case "nso": 
    //         break;
    //     case "ncc":
    //         break;
    //     case "ssg":
    //         break;
    // }
    // res.render(__dirname+"/home.ejs");
    res.redirect("/home");
});




// ------------------------------------------------- LISTEN --------------------------------------------- //
const port=8000;
app.listen(port, ()=>{
    console.log("Server started on "+port);
});


// ------------------------------------------------- HANDLE REQUESTS FUNCTIONS --------------------------------------------- //

// async function handleFormSubmission(name){
//     let connection;
//     try{
//         connection= await connectionPool.getConnection();
//         const results= connection.execute('insert into dbms(name) values( :name)', [name] ,{autoCommit:true});
//         console.log(results);
//     }catch(err){
//         console.error(err.message);
//     }finally{
//         if(connection){
//             await connection.close();
//         }
//     }
//     connectionPool.close();
// }

// async function handleAdmin(){
//     let connection;
//     let fullTableData=[];
//     try{
//         connection= await connectionPool.getConnection();
//         fullTableData= await connection.execute('select * from dbms',[]);
//         console.log("Admin : ",fullTableData);
//     }catch(err){
//         console.log("Error in handleAdmin:\n",err);
//     }finally{
//         if(connection){
//             await connection.close();
//         }
//     }
//     connectionPool.close();
//     return fullTableData;
// };



// --------------------------------------- //

const users=[];
const admin={ username: "boobguy", password: "assguy" };
const nso=["Cricket","Football"];
const ncc=["ncc","Nothing"];
const ssg=["ssg","Football"];


// (DESCRIPTION=(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA =(SID = ORCL)))

// (DESCRIPTION =(ADDRESS = (PROTOCOL = TCP)(HOST = localhost)(PORT = 1521))(CONNECT_DATA = (SID = ORCL)))


// let result = await connection.execute("select * from dbms", [] ,{autoCommit:true});
// console.log(result);