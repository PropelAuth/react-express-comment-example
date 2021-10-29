const express = require("express")
const { sequelize } = require("./db")
const { createComment, listAllComments } = require("./comments")
const { requireUser } = require("./propelauth")

// Create the server w/ json middleware
const app = express()
const port = 3001
app.use(express.json())

// Routes
app.get("/comments", async (req, res) => {
    const comments = await listAllComments()
    res.json(comments)
})

app.post("/comments", requireUser, async (req, res) => {
    // Can do more validation here if we want
    if (!req.body.text) {
        res.status(400).send("Missing text")
    } else {
        await createComment(req.user.userId, req.body.text)
        res.status(200).send()
    }
})

// Database + server start
sequelize.sync().then(() => {
    console.log("Database schema up to date")

    app.listen(port, () => {
        console.log(`Example app listening at http://localhost:${port}`)
    })
})
