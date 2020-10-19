const mongoose = require('mongoose')
const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
      },
      body: {
        type: String,
        required: true
      },
      // photo: {
      //   type: String,
      //   default: "no photo",
      //   required:true
      // },
      postedby:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
      }
})
module.exports=mongoose.model('posts' , PostSchema)