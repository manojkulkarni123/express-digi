import express from 'express'
import 'dotenv/config'

const app = express()
const port = process.env.PORT || 3000
app.use(express.json())

let dosadata=[]
let dosaid = 1

//add a new dosa
app.post('/dosae',(req,res)=>{
    const {name,price}=req.body
    const newDosa = {id:dosaid++,name,price}
    dosadata.push(newDosa)
    res.status(201).send(newDosa)
})

// get all dosas
app.get('/dosas',(req,res)=>{
    res.status(200).send(dosadata)
})

//get dosa by id 
app.get('/dosas/:id',(req,res)=>{
    const dosa = dosadata.find(d => d.id === parseInt(req.params.id))
    if(!dosa){
        return res.status(404).send("Dosae not found")
    }
    res.status(200).send(dosa)
})

//update tea

app.put("/dosas/:id",(req,res)=>{

    const dosa = dosadata.find(d => d.id === parseInt(req.params.id))
    if(!dosa){
        return res.status(404).send("Dosae not found")
    }
    const {name,price} = req.body
    
    dosa.name = name
    dosa.price = price

    res.status(200).send(dosa)

})

app.delete("/dosas/:id",(req,res)=>{
   const index =  dosadata.findIndex(d =>d.id === parseInt(req.params.id))
   if(index === -1)
   {
    return res.status(404).send("dosa not found")
   }
   dosadata.splice(index,1)
   return res.status(204).send("deleted")

})


app.listen(port,()=>{

    console.log(`Server is running at port:${port}`)
})