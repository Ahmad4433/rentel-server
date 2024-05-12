const joi = require("joi");

const validateProductEntry = async (req, res, next) => {
  const { data } = req.body;



  // const formattedData = JSON.parse(data);
  const validationSchema = joi.object({
    name: joi.string().min(1).required(),
    sale_price: joi.number().min(1).required(),
    purchase_price: joi.number().min(1).required(),
    category: joi.string().required(),
    brand: joi.string().required(),
    short_detail: joi.string().required(),
    description: joi.string().required(),
    has_offer: joi.boolean().required(),
    service_type: joi.string().required(),
    fileCode: joi.array().allow(),
    year: joi.number().required(),
    model: joi.string().required(),
    stock: joi.when("service_type", {
      is: "sell",
      then: joi.number().required(),
    }),
    reservedDates: joi.array().allow(),
    questions: joi
      .array()
      .items(
        joi.object({
          question: joi.string().required(),
          answer: joi.string().required(),
        })
      )
      .required(),
    start_date: joi.when("has_offer", {
      is: true,
      then: joi.number().required(),
    }),
    end_date: joi.when("has_offer", {
      is: true,
      then: joi.number().required(),
    }),

    percentage: joi.when("has_offer", {
      is: true,
      then: joi.number().required(),
    }),
    isOfferUpadted: joi.boolean().allow(),
  });

  const { error: validationError } = validationSchema.validate(data);
  if (validationError) {
    const error = new Error(validationError.message);
    error.statusCode = 400;
    return next(error);
  }

  // const startdate =
  //   new Date(
  //     formattedData.start_date + " " + formattedData.start_time
  //   ).getTime() +
  //   1 * 60 * 1000;
  // const endDate = new Date(
  //   formattedData.end_date + " " + formattedData.end_time
  // ).getTime();
  // const todate = new Date().getTime(); // today
  // const isOfferUpadted = formattedData.isOfferUpadted;
  // if (isOfferUpadted) {
  //   if (startdate < todate || endDate < startdate || endDate < todate) {
  //     const error = new Error("invalid offer date format");
  //     error.statusCode = 400;
  //     return next(error);
  //   }
  // }
  next();
};

module.exports = validateProductEntry;
