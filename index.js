var path = require('path');
var fs = require('fs');

//*****************************************************************************************************
//non-blocking recursive list of files, with file extension matching - node.js
//
function getFilesRecursiveAsync(folder,callback,filetypes,progress){
  var files = [];
  function recurseFolders(thisfolder,thiscallback){
    fs.readdir(thisfolder,function(err,fold){
      var arr = [];
      if (!err && fold.length>0){
        iterateFiles();
      } else if (err){
        thiscallback(err)
      } else {
        thiscallback(null,files)
      }
      function iterateFiles(){
        var path = path.resolve(thisfolder + "\\" + fold.shift());
        fs.lstat(path,function(err,stats){
          if (!err){
            if (stats.isDirectory()){
              recurseFolders(path,endIterate)
            } else {
              if (!filetypes || (filetypes && filetypes.length > 0 && fileMatch(path)) ){
                arr.push(path);
              }
              endIterate(null);
            }
          } else {
            endIterate(err);
          }

          function endIterate(err){
            if (err){
              thiscallback(err);
              return
            }
            if (fold.length>0){
              iterateFiles()
            } else {
              files = files.concat(arr);
              if (progress){progress(files.length)}
              thiscallback(null,files)
            }
          }
        })
      }
    });
  }
  recurseFolders(folder,callback);

  function fileMatch(file){
    var ext = file.split(".").pop().toLowerCase()
    for (var i=0;i<filetypes.length;i++){
      if (filetypes[i] == ext){
        return true
      }
    }
    return false
  }

}

module.exports = getFilesRecursiveAsync;

