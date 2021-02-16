const Work = require("../models/Work")

const createWork = async(req,res) => {
    const {events,details} = req.body;
    let work = new Work(req.body)
    work.events = events,
    work.details = details
    await work.save();

    res.json("แจ้งเหตุเรียบร้อย")

}

const showWork = async(req,res) =>{
      const {id} = req.params;
      const work = await Work.findById(id);
      if(!work){
        throw new Error('Not Find Work')
      }
      res.json({
        data : work
      })
      }



const updateDetail = async(req,res) =>{
  
}


const Delete = async(req,res) =>{
  const {id} = req.params;
  

}








module.exports = {
    createWork,
    showWork,
    updateDetail,
    Delete
  };