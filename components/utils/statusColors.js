export const colorByStatus = (status) => {
  switch ((status || '').toLowerCase()) {
    case 'pendiente':
      return '#FBD051';
    case 'enviado':
      return '#75abfc';
    case 'recibido':
      return '#8ab9a3';
    case 'cancelado':
      return '#e98993';
    default:
      return '#a8aaac';
  }
};

export default colorByStatus;