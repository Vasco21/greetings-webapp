module.exports = (database) => {
    
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
   let getName = "error! Please enter your name correctly,";
   let Newname =  "Error! Please enter a new name";
   let radioPrs = "Please select the language";
   let succeful;
   

   
   //
   var langCompler = async function (nameText, radioBtn){
       succeful = "";
        name = nameText.trim();

       if(name === "" && radioBtn === undefined){
           Array2 = getName + " " + radioPrs;
           return Array2
       }  else if (radioBtn === undefined && name !== ""){
           Array2 = radioPrs;
           return Array2
       } else if(name === ""){
        Array2 = getName;
        return Array2;
       }  else {
           name = name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
           if (!/^[a-zA-Z]+$/.test(name)){
            Array2 = getName;
            Array1 = "";
            name = "";
           } else if (/^[a-zA-Z]+$/.test(name)){
               var nameFromDatabase= await  database.query("select * from people where names=$1",[name])
               if(nameFromDatabase.rows.length == 0){
                   if(radioBtn === "english"){
                       await database.query("insert into people(names, conter, english, sesotho, isixhosa) values($1, $2, $3, $4, $5)", [name, 1, 1, 0, 0]);
                       counter++;
                       
                       Array1 = englishLang + name;
                       Array2 = "";
                   } else if(radioBtn === "sesotho"){
                       await database.query("insert into people(names, conter, english, sesotho, isixhosa) values($1, $2, $3, $4, $5)", [name, 1, 0, 1, 0]);
                       counter++;
                       Array1 = sesothoLang + name;
                       Array2 = "";
                   } else if (radioBtn === "isixhosa"){
                    await database.query("insert into people(names, conter, english, sesotho, isixhosa) values($1, $2, $3, $4, $5)", [name, 1, 0, 0, 1]);
                    counter++;
                    Array1 = isixhosaLang + name;
                    Array2 = "";
                   }
                   Array2 = "";
                   nameList[name] = 1;
                   return Array1;
               }   else if (nameList.hasOwnProperty(name)){
                    await database.query("UPDATE people SET sesotho=sesotho+1, conter=conter+1 WHERE names = $1", [name]);
                    await database.query("UPDATE people SET isixhosa=isixhosa+1, conter=conter+1 WHERE names = $1", [name]);
                    await database.query("UPDATE people SET english=english+1, conter=conter+1 WHERE names = $1", [name]);
                   Array2 = Newname;
                   Array1 = "";
                   nameList[name]++;
                   return null;
               }
           }
       }
   }
 
   function setNamePool(names) {
    nameFromDatabase = names;
  }

   var resetBtn = async function(){
     counter = 0;
     const succeful = await database.query("DELETE FROM people");
    return succeful;
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

   async function CounterDB(){
        var nameFromDatabase= await  database.query("select * from people")
        return nameFromDatabase.rows.length
   }

   var getCounter = function() {
    return counter;
   }
   return{
    langCompler,
    allValues,
    ourClient,
    reseting,
    resetBtn,
    getCounter,
    setNamePool,
    CounterDB
   }
}