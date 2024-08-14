db.sales.aggregate([
    {
      $unwind: "$items"
    },
    {
      $group: {
        _id: {
          store: "$store",
          month: { $dateToString: { format: "%Y-%m", date: "$date" } }
        },
        totalRevenue: { $sum: { $multiply: ["$items.quantity", "$items.price"] } },
        averagePrice: { $avg: "$items.price" }
      }
    },
    {
      $sort: { _id: 1 }
    },
    {
      $project: {
        _id: 0,
        store: "$_id.store",
        month: "$_id.month",
        totalRevenue: 1,
        averagePrice: 1
      }
    }
  ])