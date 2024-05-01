const calculateOffervalidity = (product) => {
  const offerStartDate = new Date(
    product.start_date + " " + product.start_time
  ).getTime();

  const offerEndDate = new Date(
    product.end_date + " " + product.end_time
  ).getTime();
  const currentTime = new Date().getTime();

  const isOfferValid =
    offerEndDate > currentTime && offerStartDate <= currentTime;
  if (isOfferValid) {
    const offerPercentage = parseFloat(product.percentage);
    const salePrice = parseFloat(product.sale_price);
    const discountAmount = parseFloat(salePrice * offerPercentage) / 100;
    const offerPrice = parseFloat(salePrice - discountAmount);
    return { offerPrice, discountAmount, isOfferValid, offerEndDate };
  } else {
    return { isOfferValid };
  }
};

module.exports = calculateOffervalidity;
