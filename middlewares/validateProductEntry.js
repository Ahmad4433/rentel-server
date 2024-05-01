const joi = require("joi");

const validateProductEntry = async (req, res, next) => {
  const { data } = req.body;
  const formattedData = JSON.parse(data);
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
      then: joi.string().required(),
    }),
    end_date: joi.when("has_offer", {
      is: true,
      then: joi.string().required(),
    }),
    start_time: joi.when("has_offer", {
      is: true,
      then: joi.string().required(),
    }),
    end_time: joi.when("has_offer", {
      is: true,
      then: joi.string().required(),
    }),
    percentage: joi.when("has_offer", {
      is: true,
      then: joi.number().required(),
    }),
  });

  const { error: validationError } = validationSchema.validate(formattedData);
  if (validationError) {
    const error = new Error(validationError.message);
    error.statusCode = 400;
    return next(error);
  }

  const startdate = new Date(
    formattedData.start_date + " " + formattedData.start_time
  ).getTime();
  const endDate = new Date(
    formattedData.end_date + " " + formattedData.end_time
  ).getTime();
  const todate = new Date().getTime(); // today

  if (startdate < todate || endDate < startdate || endDate < todate) {
    const error = new Error("invalid offer date format");
    error.statusCode = 400;
    return next(error);
  }

  next();

};

module.exports = validateProductEntry;
