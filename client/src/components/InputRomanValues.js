

import React, { Fragment, useState } from "react";

const InputRomanValues = () => {
    
    // const [decimalNumber, setDecimalNumber] = useState("");
    const [roman_decimal, setRoman_decimal] = useState("");



    /**
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

})*/


  const onSubmitForm = async e => {
    e.preventDefault();
    try {
      const body = { roman_decimal };
      const response = await fetch("http://localhost:5000/jolimoi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
      console.log(response)
      window.location = "/"; //comment this out in order to check the response in the console
    } catch (err) {
      console.error(err.message);
      
    }
  };


  return (
    <Fragment>
      <h1 className="text-center mt-5">Decimal To Roman Convertor</h1>
      <form className="d-flex mt-5" onSubmit={onSubmitForm}>
        <input
          type="text"
          className="form-control"
          value={roman_decimal}
          onChange={e => setRoman_decimal(e.target.value)}
        />

        <button className="btn btn-success">Convert</button>
                
      </form>
    </Fragment>
  );
};

export default InputRomanValues;