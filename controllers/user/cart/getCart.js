const User = require("../../../models/User");
const Cart = require("../../../models/Cart");
const Product = require("../../../models/Product");
const checkOfferValidity = require("../../../utils/calculateOfferValidity");
const getCart = async (req, res, next) => {
  const userId = req.query.userId;

  try {
    const findedUser = await User.findById(userId);
    if (!findedUser) {
      const error = new Error("no user found");
      error.statusCode = 400;
      throw error;
    }
    const findedCart = await Cart.find({ user: userId }).populate([
      {
        path: "product",
        populate: [
          {
            path: "image",
            select: "image",
          },
        ],
      },
    ]);

    const list = findedCart
      .map((item) => {
        return item.product
          .map((pro) => {
            const { isOfferValid, discountAmount, offerEndDate, offerPrice } =
              checkOfferValidity(pro.data);

            return {
              id: pro._id,
              image: pro.image[0].image[0],
              name: pro.data.name,
              category: pro.data.category,
              brand: pro.data.brand,
              quantity: item.quantity,
              price: isOfferValid ? offerPrice : pro.data.sale_price,
              total: isOfferValid
                ? parseFloat(offerPrice * item.quantity)
                : parseFloat(pro.data.sale_price * item.quantity),
              discount: discountAmount,
            };
          })
          .flat();
      })
      .flat();
    const grandTotal = list.reduce((accu, cur) => {
      return (accu += parseFloat(cur.total));
    }, 0);

    res.status(200).json({
      message: "success",
      status: true,
      list,
      grandTotal,
    });
  } catch (error) {}
};
module.exports = getCart;
