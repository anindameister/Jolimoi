
import React, { Fragment, useEffect, useState } from "react";




const ListRomanValues = () => {
  const [romanValues, setRomanValues] = useState([]);


  // await fetch(`http://localhost:5000/birthdayReminder/${id}`, {
  //   method: "DELETE"
  // });
 


  const getRomanValue = async () => {
    try {
      const response = await fetch("http://localhost:5000/jolimoi");
      // const response = await fetch(`http://localhost:5000/birthdayReminder/${romanValues.roman_decimal}`, {
        
      // });
      const jsonData = await response.json();

      setRomanValues(jsonData);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    getRomanValue();
  }, []);



  return (
    <Fragment>
      {" "}
      <table className="table mt-5 text-center">
        <thead>
          <tr>
            {/* <th>id</th> */}
            <th>Decimal Number between 0 to 999</th>
            <th>Roman Letters</th>
            
            
            
            
          </tr>
        </thead>
        <tbody>
          {romanValues.map(romanValue => (
            <tr key={romanValue.id}>
               
              <td>{romanValue.roman_decimal}</td>
              <td>{romanValue.my_id}</td>
              

            </tr>
              
              
            
           
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListRomanValues;