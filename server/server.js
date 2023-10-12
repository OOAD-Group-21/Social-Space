const express = require('express')
const app = express()

app.get("/api", (req, res) => {
    res.json({"devs":["Akshat","Aryan","Atish","Parth"]})
})

app.listen(5000, () => {console.log("Server started.")})