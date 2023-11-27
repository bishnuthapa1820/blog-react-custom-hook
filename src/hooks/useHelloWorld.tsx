import { useEffect } from "react";

function useHelloWorld() {
  useEffect(() => {
    console.log("Hello World!!!");
  }, []);
}

export default useHelloWorld;
