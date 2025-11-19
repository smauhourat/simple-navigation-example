export async function getProducts() {
  const URL_API = "http://localhost:3001/api/productos";
  const rawData = await fetch(URL_API);
  const json = await rawData.json();
  return json;
}


export async function getOrders() {
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

export async function getProviders() {
  const URL_API = `http://localhost:3001/api/proveedores`;
  const rawData = await fetch(URL_API);
  const json = await rawData.json();
  return json;
}

//  const json = await rawData.data.json();
//  return json;


// export const getProviders = () => ([
//   { id: 'prov1', name: 'Proveedor A' },
//   { id: 'prov2', name: 'Proveedor B' },
//   { id: 'prov3', name: 'Proveedor C' },
// ]);

const productsByProvider = {
  prov1: [
    { id: 'p1', name: 'Manzana', price: 1.2 },
    { id: 'p2', name: 'Pan', price: 0.9 },
    { id: 'p7', name: 'Aceite', price: 10.2 },
    { id: 'p8', name: 'Vinagre', price: 0.9 },
    { id: 'p9', name: 'Tomate', price: 1.2 },
    { id: 'p10', name: 'Arroz', price: 0.9 },
    { id: 'p11', name: 'Fideo', price: 1.2 },
    { id: 'p12', name: 'Harina', price: 0.9 },
  ],
  prov2: [
    { id: 'p3', name: 'Leche', price: 1.5 },
    { id: 'p4', name: 'Queso', price: 3.4 },
  ],
  prov3: [
    { id: 'p5', name: 'Café', price: 5.0 },
    { id: 'p6', name: 'Azúcar', price: 2.0 },
  ],
};

// export const getProductsForProvider = (providerId) => {
//   return productsByProvider[providerId] || [];
// };

export async function getProductsForProvider(providerId) {
  const URL_API = `http://localhost:3001/api/proveedores/${providerId}/productos`;
  const rawData = await fetch(URL_API);
  const json = await rawData.json();
  return json;
}

async function getNroPedido() {
  const URL_API = "http://localhost:3001/api/pedidos/nropedido";  
  const raw = await fetch(URL_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
  });  

  if (!raw.ok) {
    const text = await raw.text();
    throw new Error(text || 'Get order number failed');
  }

  const json = await raw.json();
  return json;
}

async function transformarPedido(pedidoOrigen) {
    // Convertir la fecha de entrega al formato YYYY-MM-DD
    const {nro_pedido} = await getNroPedido();
    console.log('Nro Pedido obtenido:', nro_pedido);
    const fecha = pedidoOrigen.fechaEntrega.split('T')[0];

    return {
        fecha: fecha,
        numero_pedido: `PED-${nro_pedido}`,
        proveedor_id: pedidoOrigen.proveedorId,
        renglones: pedidoOrigen.items.map(item => ({
            producto_id: parseInt(item.id), // Convertir string a número
            nombre_producto: item.nombre,
            cantidad: item.cantidad,
            precio_unitario: item.precio
        }))
    };
}

export async function createOrder(orderPayload) {
  console.log('Creating order with payload:', orderPayload);
  const transformedPayload = await transformarPedido(orderPayload);
  console.log('Transformed payload:', transformedPayload);
  const URL_API = "http://localhost:3001/api/pedidos";
  const raw = await fetch(URL_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transformedPayload),
  });
  if (!raw.ok) {
    const text = await raw.text();
    throw new Error(text || 'Create order failed');
  }
  const json = await raw.json();
  return json;
}