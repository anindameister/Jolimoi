const express= require("express")
const app= express()

app.listen(5000,()=>{
    console.log("server has started on port 5000")
})

//jolimoitable_middleware
const cors=require("cors")
app.use(cors())
app.use(express.json()) //req.body
//database part
const pool=require("./db")

//Routes

//take user input and between 0 to 1000
/**
 * @api {post} /jolimoi
 * CREATE TABLE decimal2roman(

  my_id INTEGER UNIQUE,
  roman_decimal REAL CHECK(roman_decimal<1000)

);
 */



app.post("/jolimoi",async(req,res)=>{
    try {
        
        const {roman_decimal}=req.body //req.body is an object which is created by express.json() to parse the body of the request received from the client
        //put the request gotten from the user into the function
        const my_id=romanNumerals(roman_decimal) //convert decimal to roman and store in my_id, this is done to make each request unique
        //duplicate key value violates unique constraint "decimal2roman_my_id_key"
        const result=await pool.query("INSERT INTO decimal2roman(my_id,roman_decimal) VALUES($1,$2) on conflict do nothing RETURNING *",[my_id,roman_decimal])
        res.send(result.rows[0])
       
      
        
        
        
        
    } catch (err) {
        console.error(err.message)
        
    }

})



//give all the results to the user

app.get("/jolimoi", async (req, res) => {
    try {
      
      const alldecimal2roman = await pool.query("SELECT * FROM decimal2roman WHERE roman_decimal IS NOT NULL");
      
     
      res.json(alldecimal2roman.rows);
    } catch (error) {
      console.error(error.message);
    }
  });


// get only the result which the user wants to see, Eg: 22 would give XXII
app.get("/jolimoi/:roman_decimal",async(req,res)=>{
    try {
        const {roman_decimal}=req.params
        const result=await pool.query("SELECT * FROM decimal2roman WHERE roman_decimal=$1",[roman_decimal])
        const my_id=romanNumerals(roman_decimal)
        res.json({my_id:my_id,roman_decimal:roman_decimal})
    } catch (error) {
        console.error(error.message)
    }
})


function romanNumerals(num) {

  var roman = ''; 
  /**
   * we take the fundamental decimal numbers which would be converted to roman numerals
   * the fundamental decimal numbers are 1,5,10,50,100,500,1000
   * Between 1 to 5 we have I,II,III,IV,V
   * moving from 1 towards 5, gives us 2 and 3
   * but 4 is a little different
   * we do 5-1 to get 4
   * similarly when we move from 5 to 10
   * with +1, we can go from 5 to 8, but for 9 we have to use 10(for this fundamental decimal number there exists roman numeral)
   * finally 4,9 have been taken into consideration though not in the fundamental decimal numbers
   * again 40 is not a fundamental decimal number, it is built by using 50 and 10, 50-10 to get 40
   * Now, 20 and 30 are XX and XXX respectively, but they are not required to be added in the array because they are being built using 10
   * Similar to 40, 90 has been built with the influence of 100 and 10
   * the rest of the numbers like 400,900 have been built using 100 and 500,1000 respectively
   */
  var decimal = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

  /**
   * corrsponding to the above decimal numbers, we get pre-define the roman numerals
   */
  var fraction = ['M', 'CM', 'D', 'CD', 'C', 'XC', 'L', 'XL', 'X', 'IX', 'V', 'IV', 'I'];

  /**
   * we take the example of 99
   * so 99 is greater than 0
   * while 99 is greater than decimal[0]=1000 which is not the case, so we move on to i=1 and later i=7
   * when i=7, we get the roman numeral for the decimal number, 90, from the array fraction.
   * We store that value in the the variable named roman. So roman=90
   * now we continue to the next step where we see num=num-decimal[i]. here num=99 initially and decimal[7]=90 so new num=9
   * Thus we found that i=7, so num=99-decimal[5]=9
   * Now, we move move out of the while loop, but make i=8 and for i=8 we wont get anything because the value of 100 exists and that cannot be used to build 9
   * we get out of the while loop altogether and start from 0
   * with i=0, we wont get anything but with i=3 we have num=decimal[3] and voila!
   * we add to the roman which was XC till now and now XCIX
  */

  var i = 0;
  while (num > 0) {
      while (num >= decimal[i]) {
          roman += fraction[i];
          num -= decimal[i];
      }
      i++;
  }
  return roman;
}



