export async function getProducts() {
  const URL_API = "http://localhost:3001/api/productos";
  const rawData = await fetch(URL_API);
  const json = await rawData.json();
  return json;
}


export async function geOrders() {
  const URL_API = "http://localhost:3001/api/pedidos";
  const rawData = await fetch(URL_API);
  const json = await rawData.json();
  return json;
}

export async function getOrderById(orderId) {
  const URL_API = `http://localhost:3001/api/pedidos/${orderId}`;
  const rawData = await fetch(URL_API);
  const json = await rawData.json();
  return json;
}
