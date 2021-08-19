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
           name = name.charAt(0).toUpperCase() + name.slice(1);
           if (!/^[a-zA-Z]+$/.test(name)){
            Array2 = getName;
            Array1 = "";
            name = "";
           }
           else if (/^[a-zA-Z]+$/.test(name)){
               if(nameList[name] === undefined){
                   if(radioBtn === "english"){
                       counter++;
                       nameList[name] = 1;
                       Array1 = englishLang + name;
                       Array2 = "";

                       let elem = new constr(name, nameList[name]);
                       Objname.push(elem);
                       return Array1;
                   }
                   else if(radioBtn === "sesotho"){
                       counter++;
                       nameList[name] = 1;
                       Array1 = sesothoLang + name;
                       Array2 = "";

                       let elem = new constr(name, nameList[name]);
                       Objname.push(elem);
                       return Array1;
                   }
                   else if (radioBtn === "isixhosa"){
                    counter++;
                    nameList[name] = 1;
                    Array1 = isixhosaLang + name;
                    Array2 = "";

                    let elem = new constr(name, nameList[name]);
                    Objname.push(elem);
                    return Array1;

                   }
                   Array2 = "";

               }
               else if (nameList.hasOwnProperty(name)){
                   Array2 = Newname;
                   Array1 = "";
                   nameList[name]++;
                   for(let i = 0; i < objname.length; i++){
                       let str = objname[i];
                       if (str.greetedNames === name){
                           str.counter = nameList[name];
                       }
                   }
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
   var ourClient = function(value){
       for (var i = 0; i < Objname.length; i){
           let str = Objname[i];
           if(str.greetNames === value){
               return{
                   Names : str.greetNames,
                   counters : str.counter,
               }
           }
       }
   }
   var constr = function(greetNames, counter){
       this.greetNames = greetNames;
       this.counter = counter;
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