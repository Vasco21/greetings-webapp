const assert = require('assert');
const helpre = require('../helper/helper');

const { Pool } = require("pg");

var dbcon = process.env.DATABASE_URL || 'postgresql:postgres:vasco21@localhost:5432/greetings_testing'
const pool = new Pool({
        connectionString: dbcon,
        ssl:{
          rejectUnauthorized: false,
    },
});
const connection = helpre(pool);

describe ("Greeting App database Tests",async()=>{
    describe ("Should be able to get names greeted from the database.", ()=>{
        
        it('Should return Vasco.',async()=>{
            connection.langCompler('Vasco', 'english');
            assert.equal('Vasco', await connection.allValues().name);
        })

        it('Should return Eddie.', async()=>{
            connection.langCompler('Eddie', 'english');
            assert.equal('Eddie', await connection.allValues().name);   
        })

        it('Should return Eti.', async()=>{
            connection.langCompler('Eti', 'english');
            assert.equal('Eti', await connection.allValues().name);   
            await connection.resetBtn()
        })
    })
})

    describe ("Should be able to return language greeted", async ()=>{
        // const connection = helpre();
        it('Should return a greeted in English.', async ()=>{
            assert.equal("Hello, ",await connection.allValues().englishLang);
            await connection.resetBtn()
        })
    
    })

    describe ("Should be able to greet a name with language", async()=>{
        // const connection = helpre();
        it('Should greet Vasco in sesotho.', async()=>{
            await connection.langCompler('Vasco', 'sesotho')
            assert.equal("Dumela, Vasco", connection.allValues().Array1);
            await connection.resetBtn()
     
        })
        it('Should greet Vasco English.', async()=>{
            await connection.langCompler('Vasco', 'english')
            assert.equal("Hello, Vasco", connection.allValues().Array1);
            await connection.resetBtn()
     
        })
        it('Should greet Vasco Isixhosa.', async()=>{
            await connection.langCompler('Vasco', 'isixhosa')
            assert.equal("Molo, Vasco", connection.allValues().Array1);
            await connection.resetBtn()
     
        })

    describe ("Should be able to increment counter.", async()=>{
        // const connection = helpre();
        
        it('Should not increment count.', async()=>{
            connection.langCompler("", 'english')
            assert.equal(0, await connection.CounterDB());
            await connection.resetBtn()
        })

        it('Should increment count when greeting different names.', async()=>{
            await connection.langCompler("Tebogo", "sesotho");
            await connection.langCompler("mxabo", "sesotho");
            await connection.langCompler("Aya", "sesotho");
            await connection.langCompler("Cara", "sesotho");

            assert.equal(4, await connection.CounterDB());
            await connection.resetBtn()
        })

        it('Should not increment count when you greet the same names.', async()=>{
            await connection.langCompler("Mali", "isixhosa");
            await connection.langCompler("Thabo", "isixhosa");
            await connection.langCompler("Vanessa", "isixhosa");
           
           

            assert.equal(3, await connection.CounterDB());
            await connection.resetBtn()
        })
    })



    describe ("reset the counter", async()=>{
        // const connection = helpre();
        it('Should be able to reset counter to 0.', async()=>{

           await connection.langCompler("Eddie", "sesotho");
           await connection.langCompler("Eddie", "sesotho");
           await connection.langCompler("Eddie", "sesotho");

           await connection.resetBtn()


            assert.equal(0,await connection.CounterDB());
        })
    }) 
})

describe ("Should be able to return error messages.", async()=>{
    // const connection = helpre();
    it('Should be able to return a error message when no name has been entered.', async()=>{
        connection.langCompler("","sesotho");
        assert.equal('error! Please enter your name correctly,', await connection.allValues().Array2);
    })  
})