import React, { useState, useEffect } from 'react';
import './App.css'

function Index() {
  const URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

  const [drinksdata, setDrinksdata] = useState([]);
  const [searchterm, setSearchterm] = useState(''); 
  const fetchdrink = async (apiURL) => {
    const response = await fetch(apiURL);
    const { drinks } = await response.json();
    setDrinksdata(drinks || []); 
  };

  useEffect(() => {
    const correctURL = `${URL}${searchterm}`; 
    fetchdrink(correctURL);
  }, [searchterm]);

  return (
    <div>
      <form>
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search for a drink..."
          value={searchterm}
          onChange={(e) => setSearchterm(e.target.value)}
        />
      </form>
      <hr />
      <ul className="cocktail-data">
        {drinksdata && drinksdata.length > 0 ? (
          drinksdata.map((eachdrink) => {
            const { idDrink, strDrink, strDrinkThumb } = eachdrink;
            return (
              <li key={idDrink}>
                <div>
                  <img src={strDrinkThumb} alt={strDrink} />
                </div>
                <div>
                  <h3>{strDrink}</h3>
                </div>
              </li>
            );
          })
        ) : (
          <p>No drinks found</p>
        )}
      </ul>
    </div>
  );
}

export default Index;
