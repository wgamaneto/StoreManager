const sales = [
  { id: 1, date: '2022-11-11 21:00:58' },
  { id: 1, date: '2022-11-12 19:13:50' },
];

const salesProducts = [
  [
    {
      "sales_id": 1,
      "product_id": 1,
      "quantity": 5,
    },
    {
      "sales_id": 1,
      "product_id": 2,
      "quantity": 10,
    },
    {
      "sales_id": 2,
      "product_id": 3,
      "quantity": 15,
    },
  ]
];

const salesProductsById1 = [
  {
    "date": '2022-11-11 21:00:58',
    "product_id": 1,
    "quantity": 5,
  },
  {
    "date": '2022-11-11 21:00:58',
    "product_id": 2,
    "quantity": 10,
  },
];

const salesProductsResult = [
  {
    "date": '2022-11-11 21:00:58',
    "productId": 1,
    "quantity": 5,
  },
  {
    "date": '2022-11-11 21:00:58',
    "productId": 2,
    "quantity": 10,
  },
];

module.exports = {
  sales,
  salesProducts,
  salesProductsById1,
  salesProductsResult,
}