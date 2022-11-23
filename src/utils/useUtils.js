export async function useFetchData(url, setData) {
  const response = await fetch(url);
  const responseData = await response.json();
  if (response.ok) {
    setData(responseData);
  }
}
