# get-files-recursive-async


Usage:

var getFilesRecursiveAsync = require('get-files-recursive-async');

var folder = "~/";

var filetypes = ["js","css"];

getFilesRecursiveAsync(folder,callback,filetypes,progress);

function callback(err,data){
  console.log(err,data)
}

function progress(data){
  console.log("progress = ",data)
}

![alt tag](http://dmtmix.com/dnetapi/getImage/color/00000000/get-files-recursive-async.webp)
