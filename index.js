require("dotenv").config()
const express = require("express")
const Razorpay = require("razorpay")
const app = express()


app.use(express.json())
app.use(express.static("./public"));

// app.get("/", (req, res)=>{
//   res.send("hi")
// })

app.post("/order", async (req, res) =>{

  const amount = req.body.amount

  var instance = new Razorpay({ key_id: 'rzp_test_oHGdt7jTMr6TWe', key_secret:  process.env.SECRET_KEY })

const myOrder = await instance.orders.create({
  amount: amount*100,
  currency: "INR",
  receipt: "receipt#1",
  // notes: {
  //   key1: "value3",
  //   key2: "value2"
  // }
})

res.status(200).json({
  success: true,
  amount,
  order: myOrder
})

})

app.listen(4000, ()=> console.log("Server is running at port 4000"))


