const calculateOffervalidity = (product) => {
  const offerStartDate = new Date(
    product.start_date + " " + product.start_time
  ).getTime();
  const offerEndDate = new Date(
    product.end_date + " " + product.end_time
  ).getTime();
  const currentTime = new Date().getTime();
};
