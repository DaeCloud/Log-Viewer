// express server serving public folder at root
const express = require("express");
const app = express();
app.use(express.static("public"));

app.get("/logs", (req, res) => {
    // get list of files inside the log folder
    const fs = require("fs");
    fs.readdir("log", (err, files) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error reading directory");
        } else {
            res.json(files);
        }
    });
});

app.get("/logs/:filename", (req, res) => {
    const filename = req.params.filename;
    const fs = require("fs");
    fs.readFile(`log/${filename}`, "utf8", (err, data) => {
        if (err) {
            console.error(err);
            res.status(500).send("Error reading file");
        } else {
            res.send(data);
        }
    });
});
    
    // const fs = require("fs");
    // fs.readFile("/log/dnsmasq.log", "utf8", (err, data) => {
    //     if (err) {
    //         console.error(err);
    //         res.status(500).send("Error reading file");
    //     } else {
    //         res.send(data);
    //     }
    // });

app.listen(3000, () => {
    console.log("Listening on port 3000");
});