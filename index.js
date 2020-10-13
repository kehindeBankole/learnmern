const express= require('express')
const app = express()
const authRoute = require('./routes/auth')
app.get('/' , (req , res)=>{
    res.send("helllo wold")
})
app.use('/auth' , authRoute)
app.listen(8080 , ()=>console.log('connected'))