const { object } = require("joi");
const Order = require("../../../models/Order");
const salesReport = async (req, res, next) => {
  try {
    const period = new Date();
    period.setDate(period.getDate() - 7);
    const findedReport = await Order.find({
      createdAt: { $gte: new Date(period) },
    });

    let days = [];

    for (let i = 0; i < findedReport.length; i++) {
      const currentReport = findedReport[i];
      const currentCreatedAt = new Date(currentReport.createdAt).getDate();
      let found = false;

      for (let j = 0; j < days.length; j++) {
        const existingCreatedAt = new Date(days[j].createdAt).getDate();
        if (currentCreatedAt === existingCreatedAt) {
          // If the dates match, add the grandTotal to existing day
          days[j].amount += currentReport.grandTotal;
          found = true;
          break;
        }
      }

      if (!found) {
        // If date not found, add a new object for that date
        days.push({
          createdAt: new Date(currentReport.createdAt).toLocaleDateString(),
          amount: currentReport.grandTotal,
        });
      }
    }

    const sales = findedReport.reduce((acc, cur) => {
      return (acc += cur.grandTotal);
    }, 0);

    res.status(200).json({ message: "success", status: true, days });
  } catch (error) {
    next(error);
  }
};

module.exports = salesReport;
