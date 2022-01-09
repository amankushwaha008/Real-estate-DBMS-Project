const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
//const agentRoutes = require('./routes/agentRoutes')
const officeRoutes = require('./controllers/routes/officeroutes')
const {connection,options} = require('./mysql')
const session = require('express-session');

app.set('view engine' ,'ejs')

app.use(session({ 
    secret: 'dbms_project',
    resave: false,
    // store: sessionstore,
    saveUninitialized: true,
    cookie: {  maxAge: 30 * 24 * 60 * 60 * 1000 }
  }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname,'public')));

app.use('/office',officeRoutes);

app.get('/',(req,res)=>{
    res.render('login');
})

// app.get('/login/:id',(req,res) => {
//     const id =  req.params.id
//     console.log(id)
    
//     res.render('login');
// })

// app.post('/login',(req,res)=> {
//     const { user_name,password } = req.body;
//     console.log(user_name,password);
//     const query = `select * from accounts where username='${user_name}' and password = '${password}';   `;
//     connection.query(query,(err,result,fields) => {
//         const data = result[0];
//         console.log(result)
//     })
// })


app.listen(3000, ()=>{
    console.log('connected');
})