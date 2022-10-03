const express = require("express");
const cors = require("cors");
const router = express.Router();
const db = require("../models");

router.use(cors());
router.use(express.json());

router.get('/:date', (res,req) =>{
    db.calendar.findAll({
        where:{
            date:req.params.date
        }
    }).then((events) => {
        if(events.length > 0){
            res.status(201).json({events:events, message:"got events"})
        }else{
            res.status(404).json({message:'no events exist for this date'})
        }
    })
})

router.post('/add', (req,res) =>{
    console.log(req.body, 'this is working')
     res.json({message:'its working'})
  db.calendar.findAll({

     }).then((events) =>{
        console.log(events)
     })
})







module.exports = router