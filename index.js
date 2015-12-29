var path = require('path');
var fs = require('fs');

//*****************************************************************************************************
//non-blocking recursive list of files, with file extension matching - node.js
//
function getFilesRecursiveAsync(folder,callback,filetypes,progress){
  var files = [];

  var filetype_regexp = [];
  for (var i=0;i<filetypes.length;i++){
    filetype_regexp.push(new RegExp(filetypes[i]+'$','i'))
  }

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
        var this_path = path.resolve(thisfolder + "\\" + fold.shift());
        fs.lstat(this_path,function(err,stats){
          if (!err){
            if (stats.isDirectory()){
              recurseFolders(this_path,endIterate)
            } else {
              if (!filetypes || (filetypes && filetypes.length > 0 && fileMatch(this_path)) ){
                arr.push(this_path);
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
    //var ext = file.split(".").pop().toLowerCase()
    for (var i=0;i<filetype_regexp.length;i++){
      if (file.match(filetype_regexp[i]) !== null) {
        return true
      }
    }
    return false
  }

}

module.exports = getFilesRecursiveAsync;

