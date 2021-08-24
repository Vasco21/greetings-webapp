module.exports = function greetNames() {
    
    //variables
    let counter = 0;
    let nameList = {};
    let Objname = [];
   //language variables
   let englishLang = "Hello, ";
   let sesothoLang = "Dumela, ";
   let isixhosaLang = "Molo, ";

   let Array1 = "";
   let Array2 = "";

   let name = "";
   let language = "";
   // error messages variables
   let getName = "error! Please enter your name correctly";
   let Newname =  "Error! Please enter a new name";
   let radioPrs = "Error Please select the language";
   let succeful;

   
   //
   var langCompler = function (nameText, radioBtn){
       succeful = "";
        name = nameText.trim();

       if(name === "" && radioBtn === undefined){
           Array2 = getName;
           return Array2
       }
       else if (radioBtn === undefined && name !== ""){
           Array2 = radioPrs;
           return Array2
       }
       else{
           name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
           if (!/^[a-zA-Z]+$/.test(name)){
            Array2 = getName;
            Array1 = "";
            name = "";
           }
           else if (/^[a-zA-Z]+$/.test(name)){
               if(nameList[name] === undefined){
                   if(radioBtn === "english"){
                       counter++;
                       
                       Array1 = englishLang + name;
                       Array2 = "";
                   }
                   else if(radioBtn === "sesotho"){
                       counter++;
                       Array1 = sesothoLang + name;
                       Array2 = "";
                   }
                   else if (radioBtn === "isixhosa"){
                    counter++;
                    Array1 = isixhosaLang + name;
                    Array2 = "";
                   }
                   Array2 = "";
                   nameList[name] = 1;
                   return Array1;
               }
               else if (nameList.hasOwnProperty(name)){
                   Array2 = Newname;
                   Array1 = "";
                   nameList[name]++;
                   return nameList;
               }
           }
       }
   }

   var resetBtn = function(){
     counter = 0;
     nameList = {};
     Objname = [];
     Array1 = "";
     Array2 = "";
     succeful = "succefully reset"

   }
   var reseting = function(){
    Array1 = "";
    Array2 = "";
    succeful = "";
   }
   var ourClient = (value) =>{
      
       return {
           Names: value,
           counters: nameList[value]
       }
   }
   var constr = function(greetNames, counter){
       this.greetNames = greetNames;
       this.counter = (ourClient(greetNames)) ?
       ourClient(greetNames).counters + 1 : counter
       
   }

   var allValues = function(){
       return{
           counter : counter,
           name : name,
           getName : getName,
           Newname: Newname,
           Array1 : Array1,
           Array2 : Array2,
           englishLang: englishLang,
           sesothoLang: sesothoLang,
           isixhosaLang: isixhosaLang,
           objname: Objname,
           language: language,
           nameList: nameList,
           succeful: succeful
       }
   }
   return{
    langCompler,
    allValues,
    ourClient,
    reseting,
    resetBtn
   }
}

