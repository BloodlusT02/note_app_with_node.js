const ejs = require("ejs")
const express = require("express")
const path = require("path")
const fs = require("fs");

const app = express();
const port = 3000;


// 
app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, "public")))

app.get("/", (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render("index", { files: files })
        // console.log(files);
    })
});

app.post("/create", (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(" ").join("")}.txt`, req.body.description, (err) => {
        res.redirect("/");
    })
});

app.get("/details/:filename", (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", (err, filedata) => {
        res.render("details", { filename: req.params.filename, filedata: filedata })
    })
});

app.get("/edit/:filename", (req, res) => {
    res.render("edit", { filename: req.params.filename })
});

app.post("/edit", (req, res) => {
    fs.rename(`./files/${req.body.privious}`, `./files/${req.body.new}.txt`, (err) => {
        res.redirect("/")
    })
});



app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})