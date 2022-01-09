const { connection } = require('../mysql');

exports.getLogin = (req,res) => {
    res.render('office/login')
}

exports.postLogin = (req,res) => {
    //get permission
    const username = req.body.username;
    const password = req.body.password;
    console.log(username,password);

    connection.query(
        ` select * from office where username = '${username}' and password = '${password}'; `,
     (err,rows,fields) => {
     if(!err)
     {
       if(rows.length > 0)
       {
      console.log(rows[0].a_id);
      req.session.user = username;
      req.session.officeId = rows[0].a_id;
      console.log(req.session);
      res.redirect("/office");
        } else
        {
      console.log("wrong username or password");
      res.redirect("/office/login");
        }

     } else {
            console.log("wrong username or password");
           }
     }
     );
};

exports.getOfficeHome = (req,res) =>{
    let agents;
    let availableProperty;
    let propertySold;
    let propertyRented;
    let viewOwner;
    let addAgent;
    console.log('home')
    console.log("session",req.session);
  

    connection.query(`select * from agent;
 select p.address , r.price ,r.size,r.bedrooms from property p,r_house r where p.p_id = r.p_id and p.a_id ='r.a_id' and p.status like '%For%';
 select p.address , s.price ,s.size,s.bedrooms from property p,s_house s where p.p_id = s.p_id and p.a_id ='r.a_id' and p.status like '%For%';
 select s.price,p.s_date,a.a_name,a.a_id,p.address,b.b_name,s.b_id from property p,s_house s,agent a,buyer b where p.p_id = s.p_id and s.a_id = a.a_id and s.b_id = b.b_id;
select r.price,p.s_date,a.a_name,a.a_id,p.address,b.b_name,r.b_id from property p,r_house r,agent a,buyer b where p.p_id = r.p_id and r.a_id = a.a_id and r.b_id = b.b_id;
select o.o_name,o.o_id,p.address,p.status from property p,owner o where o.o_id = p.o_id and p.b_id is NULL;
`,(err,rows,fields) => {
    console.log(rows);
    agents = rows[0];
    console.log(agents[0]);
    availableProperty = rows[1];
    console.log(availableProperty);
    propertySold = rows[2];
    console.log(propertySold);
    propertyRented = rows[3];
    console.log(propertyRented);
    viewOwner = rows[4];
    console.log(viewOwner);
    addAgent = rows[5];
    console.log(addAgent);

    res.render("home",{
        agentdetails : agents,
        avaiProp : availableProperty,
        sold : propertySold,
        rented :propertyRented,
        owners :viewOwner,
        addingAgent:addAgent
    });
   }

    );
};

// exports.getAgentsProfile = (req,res) => {
//     if(!req.session.officeId){
//         res.redirect('office/login');
//         return;
//     }

//     const agentId = req.params.a_id;
//     const query = `select * from agent where a_id = '${a_id}';`
//     console.log(agentId);
//     if(!req.session.officeId){
//         res.redirect('/office/login');
//         return;
//     }

//     connection.query(query,(err,rows,fields) => {
//         if(!err){
//         const agentName = rows[0];
//         const agentId = rows[1];
//         const agentEmail = rows[2];
//         const agentNumber = rows[3];
//         const agentAddress = rows[4];

//     console.log(rows)
//     res.render('office/officeHome/Agents/Profile',{
//         name : agentName,
//         Id : agentId,
//         mail : agentEmail,
//         number : agentNumber,
//         Address : agentAddress
//     });
//     }else{
//         console.log(err);
//     }
// })
// }

exports.getAgent = (req,res) =>{
    let soldByAgent;
    let rentedByAgent;
   

    // const agentId = req.params.a_id;
    // const query = ` (select address, s_date, price from property p,r_house r where p.p_id = r.p_id and status ="Rented" and p.a_id ='${agentId}')union
    // (select address, s_date, price from property p,s_house s where p.p_id = s.p_id and status ="sold" and p.a_id ='${agentId}');`
    const query = `select * from agent;`
    // console.log(agentId);
    // if(!req.session.officeId){
    //     res.redirect('/office/login');
    //     return;
    // }

    connection.query(query,(err,rows,fields) => {
        if(!err){
            const agents = rows;
        console.log(rows)
        res.render('officeViewAgent',{
          agents : agents
        })
        }else{
            console.log(err);
        }
    
})
}

exports.getavailableProperty = (req,res) =>{


  const query = `(select p.address , r.price ,r.size,r.bedrooms from property p,r_house r where p.p_id = r.p_id and p.a_id =r.a_id and p.status like "%For%") union 
 ( select p.address , s.price ,s.size,s.bedrooms from property p,s_house s where p.p_id = s.p_id and p.a_id =s.a_id and p.status like "%For%");`
    connection.query(query,(err,rows,fields) => {
        if(!err){
            
            const availableProperty = rows;
            console.log('property',availableProperty)
        console.log(rows)
        res.render('officeAvailableProperty',{
          availableProperty : availableProperty
        })
        }else{
            console.log(err);
        }
    
})

}

exports.getPropertySold = (req,res) =>{

    const query = `select s.price,p.s_date,a.a_name,a.a_id,p.address,b.b_name,s.b_id from property p,s_house s,agent a,buyer b where
     p.p_id = s.p_id and s.a_id = a.a_id and s.b_id = b.b_id;`
    connection.query(query,(err,rows,fields) => {
        if(!err){
            const propertySold = rows;
        console.log(rows)
        res.render('officeSoldProperty',{
          propertySold : propertySold
        })
        }else{
            console.log(err);
        }
    
})

}


exports.getPropertyRented = (req,res) =>{

    const query = `select r.price,p.s_date,a.a_name,a.a_id,p.address,b.b_name,r.b_id from property p,r_house r,agent a,buyer b where p.p_id = r.p_id and r.a_id = a.a_id and r.b_id = b.b_id;`
    connection.query(query,(err,rows,fields) => {
        if(!err){
            const propertyRented = rows;
        console.log(rows)
        res.render('officeRentedProperty',{
          propertyRented: propertyRented
        })
        }else{
            console.log(err);
        }
    
})

}


exports.getViewOwner = (req,res) =>{

    const query = `select o.o_name,o.o_id,p.address,p.status from property p,owner o where o.o_id = p.o_id and p.b_id is NULL;`
    connection.query(query,(err,rows,fields) => {
        if(!err){
            const viewOwner = rows;
        console.log(rows)
        res.render('officeOwner',{
          viewOwner : viewOwner
        })
        }else{
            console.log(err);
        }
    
})

}


exports.getaddAgent = (req,res) =>{

    res.render('officeaddAgent')

}


exports.postaddAgent = (req,res) =>{
    const { agentId,name,email,ph,address,username,password } = req.body;
    const query =` insert into agent(a_id, a_name, a_email, a_ph_no, a_add) values
    (${agentId}, '${name}', '${email}', ${ph}, '${address}');  INSERT INTO Accounts(userName, password, a_id) VALUES
    ('${username}', '${password}', ${agentId}); `

    connection.query(query,(err,rows,fieds) => {
        if(!err){
            res.redirect('/office/agents');
        }else{
            console.log(err);
        }
    })
    // post

}

