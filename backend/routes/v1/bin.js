"use strict"
const express = require("express");
const fs = require("fs");
const {createBin, getBin, getAll, updateBin, deleteBin} = require("../../utils");

const bin = express();

//get all
bin.get("/", (request, response) => {
    const allJsons = getAll(); 
    console.log(`sending: ${allJsons}`);
    response.send(allJsons);
});

//get
bin.get("/:id", (request, response) => {
    const id = request.params.id;
    try {
    const bin = getBin(id);
    console.log(`sending bin ${id}.json`);
    console.log(bin);
    response.status(200).send({
        "record": bin,
        "metadata": {
          "id": id,
          "private": false
        }
    });
    } catch(error) {
        console.log("error: " + error);
        response.status(404).send({
            "message": "Bin not found"
        });
    }
});

//create
bin.post("/", (request, response) => {
    console.log("post received");
    const id = createBin(request.body);
    console.log(`bin ${id}.json created`);
    response.send(`new bin ${id} created`);
});

//update
bin.put("/:id", (request, response) => {
    const id = request.params.id;
    try {
        updateBin(id, request.body);
        response.send(`bin ${id} updated`);
    } catch (error) {
        response.send("" + error);

    }
});

//delete
bin.delete("/:id", (request, response) => {
    const id = request.params.id;
    try {
        deleteBin(id);
        response.send(`bin ${id} deleted`);
    } catch(error) {
        response.send(`bin ${id} not found`);
    }
});



module.exports = bin;
