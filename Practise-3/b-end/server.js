const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
app.use(express.json())
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



const {Schema} = mongoose

const productsSchema = new Schema({
      image:{
        type: String,
        require: true,
      },

      title: {
        type: String,
        require: true,
      },

      collection: {
        type: String,
        require: true
      },
      price: {
      type: Number,
      require: true
    },
    prevPrice: {
        type: Number,
        require: true,
      }
})

const Products = mongoose.model("Products", productsSchema)

app.get("/products", async (req, res) => {
  try {
    const products = await Products.find({});

    res.status(200).send(products);
  } catch (err) {
    res.status(500).json({
      message: err,
    });
  }
});

app.post("/products", async(req, res)=>{
    try{
      const {image, title, collection, price, prevPrice} = req.body;
      const products = new Products({
        image,
        title,
        collection, 
        price,
        prevPrice
      })
      await products.save()
      res.status(201).send(products)
    }catch(err){
      res.status(500).json({
        message: err
      })
    }
  })



dotenv.config()

const PORT = process.env.PORT
const DB = process.env.DB_URL

mongoose.connect(DB)
  .then(() => console.log('Connected!'))


app.listen(PORT, console.log('CORS-enabled web server listening on port 8080'))