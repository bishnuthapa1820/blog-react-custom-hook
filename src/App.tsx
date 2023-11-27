import useFetch from "./hooks/useFetch";

type Products = {
  id: number;
  title: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

// Function to get data from the Fake API
async function getData() {
  try {
    const response: Response = await fetch("https://fakestoreapi.com/products");

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData?.message || "Something went wrong, try again later."
      );
    }

    const data: Products[] = await response.json();
    return data;
  } catch (e: any) {
    // Handle the error
    console.error("Error fetching data:", e);
    throw new Error(e?.message || "Something went wrong, try again later.");
  }
}

export default function App() {
  const { response, isLoading, isError, error, refetch } = useFetch<
    Products[] | undefined
  >({
    func: () => getData(),
    popupErrorMsg: true, // If any error occurs, display error message using alert.
  });

  return (
    <main className="root-layout">
      <h2>React custom hook (useFetch)</h2>
      <h3>Loading: {isLoading ? "true" : "false"}</h3>
      <h3>Is Error : {isError ? "true" : "false"}</h3>
      <h2>Error: {error || "No error"}</h2>

      <div style={{ marginTop: "16px" }}>
        <button onClick={refetch}>Refetch data</button>
      </div>

      {isLoading ? (
        <div>
          <h4>Loading...</h4>
        </div>
      ) : (
        <div>
          {response?.map((data, i) => (
            <div style={{ marginTop: "12px" }} key={i}>
              <h3>{data.title}</h3>
              <p>{data.description}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
