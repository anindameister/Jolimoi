const Pool=require("pg").Pool;

const pool=new Pool({
    user: "postgres",
    password: "@Ninda17071988",
    host: "localhost",
    port:5432,
    database: "jolimoi"
})

module.exports=pool;

//insert into decimal2roman(my_id,roman_decimal) values(1,1)

//change the datatype of a column to string
//alter table decimal2roman alter column my_id type varchar(10)

//get all id from decimal2roman
//select my_id from decimal2roman
