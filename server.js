require("dotenv").config();

const express = require("express");
const app = express();
const bcrypt = require('bcrypt')
const db = require('./models')
const cors = require("cors");
const jwt = require("jsonwebtoken");
const port = process.env.PORT || 3001;


app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.post('/login', async (req,res) => {
  console.log(req.body)
   await db.user.findAll({
    where:{
      username:req.body.email
    }
  }).then((users) =>{
    if(users.length == 0 ){
      res.status(404).json({message:'User not found',loggedIn:false})
    } else{
      let user = users[0]
      if (bcrypt.compareSync(req.body.password, user.password)) {
        const accessToken = jwt.sign(
          { user },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: 60 * 60 }
        );
        res.status(200).json({
          message: "Login was successful",
          loggedIn: true,
          accessToken: accessToken,
          user:{username:user.username,id:user.id}
        });
      } else{
        res
              .status(409)
              .json({ message: "Password does not match", loggedIn: false });
      }
    }
    
  })
})

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
  });