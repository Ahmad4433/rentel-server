const calculateOffervalidity = (product) => {
  const offerStartDate = product.start_date;
  const offerEndDate = product.end_date;
  const currentTime = new Date().getTime();

  const isOfferValid =
    offerEndDate > currentTime && offerStartDate <= currentTime;
  if (isOfferValid) {
    const offerPercentage = parseFloat(product.percentage);
    const salePrice = parseFloat(product.sale_price);
    const discountAmount = parseFloat(salePrice * offerPercentage) / 100;
    const offerPrice = parseFloat(salePrice - discountAmount).toFixed(2);
    return { offerPrice, discountAmount, isOfferValid, offerEndDate };
  } else {
    return { isOfferValid };
  }
};

module.exports = calculateOffervalidity;
