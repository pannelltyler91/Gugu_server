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

router.post("/add",  async (req, res) => {
    try {
    //listing messages in users mailbox 
      await db.calendar.findAll({
          where:{
              date:req.body.date,
              time:req.body.time,
              user_id:req.body.id

          }
      }).then((event) =>{
          if(event.length === 0){
              db.calendar.create({
                date:req.body.date,
                time:req.body.time,
                user_id:req.body.id,
                event:req.body.event

              })
              res.status(201).json({message:'event added'})
          }
      })
    } catch (err) {
      res.json({error:err});
    }
  })







module.exports = router