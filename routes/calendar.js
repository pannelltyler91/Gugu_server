const express = require("express");
const cors = require("cors");
const router = express.Router();
const db = require("../models");

router.use(cors());
router.use(express.json());

router.get("/:date/:id", async(req,res) =>{
    try{
        await db.calendar.findAll({
            where:{
                date:req.params.date,
                user_id:req.params.id
            }
        }).then((events) =>{
            if(events.length > 0){
                res.status(201).json({events:events,message:'got events'})
            }
        })

    }catch(err){
        res.json({error:err})
    }
})




router.post("/add/:id",  async (req, res) => {
    try {
        console.log(req.body,req.params.id)
    //listing messages in users mailbox 
      await db.calendar.findAll({
          where:{
              date:req.body.date,
              time:req.body.time,
              user_id:req.params.id

          }
      }).then((event) =>{
          if(event.length === 0){
              db.calendar.create({
                date:req.body.date,
                time:req.body.time,
                user_id:req.params.id,
                event:req.body.event

              })
              res.status(201).json({message:'event added'})
          }
      })
    } catch (err) {
      res.json({error:err});
    }
  })


router.delete('/:id/:eventID', async (req,res) =>{
    try{
        db.calendar.destroy({
            where:{
                id:req.params.eventID,
                user_id:req.params.id
            }
        }).then(() =>{
            res.status(201).json({message:'removed from calendar succesfully',eventID:req.params.id})
        })

    }catch(err){
        res.json({error:err})
    }
})




module.exports = router