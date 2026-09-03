import { useState, useEffect } from "react";

export default function CountEffect() {
  console.log("CountEffect rendered !");
  const [count, setCount] = useState(0);
  const [calculation, setCalculation] = useState(0);

  useEffect(() => {
    console.log("Call setCalculation !");
    setCalculation(() => count * 2);
  }, [count]); // <- add the count variable here

  return (
    <>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>+</button>

      <p>Calculation: {calculation}</p>
    </>
  );
}
