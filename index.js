const express = require("express"); 
const fs=require("fs"); 
const users = require("./MOCK_DATA.json");

const app = express(); 
const PORT = 8001; 

// MIDDLE WARE // 
app.use(express.urlencoded({extended:false}));

// ROUTES // 
app.get("/users", (req, res) => { 
    const html = `
    <ul> 
    ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `; 
    res.send(html);
});

// REST API // 
app.get("/api/users", (req, res) => { 
    return res.json(users); 
}); 

app.get("/api/users/:id",(req,res)=>{
    const id=Number (req.params.id); 
    const user=users.find((user)=>user.id===id);  
    return res.json(user); 
});

app.post("/api/users",(req,res)=>{ 
    const body=req.body;
    console.log("Body",body); 
    return res.json({status:"pending"});
    });

app.patch("/api/users/:id",(req,res)=>{ 
        // TODO:EDIT THE USER WITH ID // 
    return res.json({status:"pending"});
 });  

 app.delete("/api/users/:id",(req,res)=>{ 
    // TODO:delete THE USER WITH ID // 
return res.json({status:"pending"});
});  

    


app.listen(PORT, () => { 
    console.log(`server started at PORT: ${PORT}`);
});
