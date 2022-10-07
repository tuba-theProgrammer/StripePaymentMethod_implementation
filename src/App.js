import StripeContainer from "./Components/StripeContainer";
import images from './Assests/images.jpeg'
import { useState } from "react";

function App() {
  const [showItem,setShowItem] = useState(false)
  return (
  <>
  <div className="App">
    <h1> The book store</h1>
    {
      showItem? <StripeContainer/> : <>
      <h3>
        10$
      </h3>
      <img src={images} alt="book image" srcSet=""/>
      <button onClick={()=>{
        setShowItem(true)
      }}>
      purchase
      </button>
      </>
    }
  </div>
  </>
  );
}

export default App;
