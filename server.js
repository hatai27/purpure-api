const express = require("express")
const app = express()

app.use(express.json())

let scripts = {}

app.post("/", (req,res)=>{
    const id = Object.keys(req.body)[0]
    scripts[id] = req.body[id]
    res.send("saved")
})

app.get("/:id",(req,res)=>{
    const id = req.params.id
    if(!scripts[id]) return res.status(404).send("not found")
    res.send(scripts[id].Script)
})

app.post("/:id",(req,res)=>{
    const id = req.params.id

    if(!scripts[id]) return res.status(404).send("not found")

    if(scripts[id].Key !== req.body.key)
        return res.status(403).send("wrong key")

    scripts[id].Script = req.body.script

    res.send("updated")
})

app.listen(3000,()=>console.log("running"))
