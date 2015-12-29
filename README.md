# get-files-recursive-async


Usage:

var getFilesRecursiveAsync = require('getFilesRecursiveAsync');

var folder = "~/";

var filetypes = ".js";

getFilesRecursiveAsync(folder,callback,filetypes,progress);

function callback(err,data){
  console.log(err,data)
}

function progress(data){
  console.log("progress = ",data)
}
