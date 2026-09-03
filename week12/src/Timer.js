import { useState, useEffect } from "react";

export default function Timer() {
  console.log("Timer rendered!");
  const [count, setCount] = useState(0);

  useEffect(() => {
    let timer = setTimeout(() => {
      setCount((count) => count + 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, []); // <- add the count variable here

  return <h1>{count} times!</h1>;
}
