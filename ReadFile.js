/* Click Code
function getDept(name){
 return ApplicationEntity.getResultSet("Company").query("name = '"+name+"'").elements().item(1);  
}
function getPerson(userid){
 return ApplicationEntity.getResultSet("Person").query("userID = '"+userid+"'").elements().item(1);  
}
var d='MCT';
var readerArr = [];
var editorArr =['CH','C'];
function setEditorsReaders(dept,readerArr,editorArr){
 var deptEntity = getDept(dept);
 var readers = deptEntity.customAttributes.readers;
 var editors = deptEntity.customAttributes.editors; 
 //add readerset
  if(readerArr!=null){
  for(var i=0; i<readerArr.length;i++){
    var reader = getPerson(readerArr[i]);
    readers.addElement(reader);  
  }
 }

 //add editorset

 if(editorArr!=null){
  for(var j=0; j<editorArr.length;j++){
    var editor = getPerson(editorArr[j]);
    editors.addElement(editor);
  }  
 }
}
setEditorsReaders(d,readerArr,editorArr);
*/

//compressed click code above - this one works
/*
function getDept(name){return ApplicationEntity.getResultSet(\"Company\").query(\"name = '\"+name+\"'\").elements().item(1);}function getPerson(userid){return ApplicationEntity.getResultSet(\"Person\").query(\"userID = '\"+userid+\"\'\").elements().item(1);}var d='\MCT\';var readerArr = [];var editorArr =['C','CH'];function setEditorsReaders(dept,readerArr,editorArr){var deptEntity = getDept(dept);var readers = deptEntity.customAttributes.readers;var editors = deptEntity.customAttributes.editors;var tempReaders = Person.createEntitySet();var tempEditors = Person.createEntitySet();if(readerArr!=null){for(var i=0;i\<\rreaderArr.length;i++){var reader =getPerson(readerArr[i]);readers.addElement(reader);}}if(editorArr!=null){for(var j=0;j\<\reditorArr.length;j++){var editor=getPerson(editorArr[j]);editors.addElement(editor);}}}setEditorsReaders(d,readerArr,editorArr);*/
//Click code(Editors and Readers
/*function getDept(name){return ApplicationEntity.getResultSet(\"Company\").query(\"name = '\"+name+\"'\").elements().item(1);}function getPerson(userid){return ApplicationEntity.getResultSet(\"Person\").query(\"userID = '\"+userid+\"\'\").elements().item(1);}var d=%DEPT%;var readerArr = [%READER%];var editorArr =[%EDITOR%];function setEditorsReaders(dept,readerArr,editorArr){var deptEntity = getDept(dept);var readers = deptEntity.customAttributes.readers;var editors = deptEntity.customAttributes.editors;var tempReaders = Person.createEntitySet();var tempEditors = Person.createEntitySet();if(readerArr!=null){for(var i=0;i\<\rreaderArr.length;i++){var reader =getPerson(readerArr[i]);readers.addElement(reader);}}if(editorArr!=null){for(var j=0;j\<\reditorArr.length;j++){var editor=getPerson(editorArr[j]);editors.addElement(editor);}}}setEditorsReaders(d,readerArr,editorArr);*/

(function(){           
$.ajax({
  url: 'EditorsReaders.csv',
  dataType: 'text',
}).done(successFunction);            

            
function successFunction(data) {
 
  var csv = data.replace(/\n|\r/g, "\n");
  var result = csvJSON(csv);
  console.log(csvJSON(csv));
  var length = result.length;
  console.log("length is " + length);   
  var myCode = "function getProgramCodeEntity(codeString){return wom.getEntityFromString(codeString);}function getStudy(studyID){return ApplicationEntity.getResultset(\'_ClinicalTrial\').query(\"customAttributes.stubResearchProject.id = \'\"+studyID+\"\'\");}function getCodeEntity(codeString){return ApplicationEntity.getResultset(\'_CTProgramCode\').query(\"customAttributes.code = \'\"+codeString+\"\'\").elements().item(1);}var codeEntity = getCodeEntity(%variable_2%);var crms = getStudy(%variable_1%);var count = crms.count();for (var a=1; a\<=\count;a++){var crm = crms.elements().item(a);var b = crm.getQualifiedAttribute(\"customAttributes.oncologyProperties\");if(b){var programCode = b.customAttributes.programCode;b.setQualifiedAttribute(\"customAttributes.programCode\",codeEntity);}}";   
  var myString = myCode.toString();
    //have to replace the variables            
  
  for(var i=0;i<result.length;i++){ 
    var variable_1;
    var variable_2;
    //var reader;
    if(result[i].variable_1){ variable_1 = "'"+result[i].variable_1+"'"; }  
    if(result[i].variable_2){ variable_2 = "'"+result[i].variable_2+"'"; }
    var txt = replaceString(myString,variable_1,variable_2);  
    WriteToPage(txt);
  }
}
    
function csvJSON(csv){

  var lines=csv.split("\n");
  var result = [];
  var headers=lines[0].split(",");
  for(var i=1;i<lines.length;i++){
      if(lines[i].length !== 0){
	  var obj = {};
	  var currentline=lines[i].split(",");
	  for(var j=0;j<headers.length;j++){
      obj[headers[j]] = currentline[j];
      
	  }//end (var j=0;j<headers.length;j++)
    result.push(obj);
    }
  }
  return result; 
}

function replaceString(temp, variable_1,variable_2){
  temp = temp.replace("%variable_1%",variable_1);
  temp = temp.replace("%variable_2%",variable_2);
  return temp;
 }
    
function WriteToPage(temp){
  document.getElementById("output").innerHTML += temp;
 }

})();



