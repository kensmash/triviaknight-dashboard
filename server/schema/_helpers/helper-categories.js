const mongoose = require("mongoose");
const Category = require("../../models/Category");
const util = require("util");

const catPageReponse = async (input) => {
  console.log("input", input);
  const queryBuilder = (input) => {
    const query = {};
    if (input.name && input.name !== "") {
      query.$text = { $search: input.name };
    }
    if (input.type) {
      query.type = mongoose.Types.ObjectId(input.type);
    }
    /*if (input.genres.length) {
      query.expr = {
        "$eq": [
          {"$size": {}},
          0
        ]
      }
    }*/
    if (input.genres && input.genres.length) {
      query.genres = {
        "$in": input.genres.map((genre) => mongoose.Types.ObjectId(genre))
      }
    }
    if (input.partycategory && input.partycategory !== null) {
      query.partycategory = input.partycategory;
    }
    if (input.showasnew) {
      query.showasnew = true;
    }
    if (input.showasupdated) {
      query.showasupdated = true;
    }

    return query;
  };

  const match = queryBuilder(input);
  console.log("match", match);
  //const match = { "partycategory": false };

  try {
    const catPage = await Category.aggregate([
      //inspiration from https://dev.to/max_vynohradov/the-right-way-to-make-advanced-and-efficient-mongodb-pagination-16oa
      //and https://stackoverflow.com/questions/48305624/how-to-use-mongodb-aggregation-for-pagination
      { $match: match },
      { $sort: { _id: -1 } },
      {
        $lookup: {
          from: "categorytypes",
          localField: "type",
          foreignField: "_id",
          as: "type",
        },
      },
      {
        $lookup: {
          from: "categorygenres",
          localField: "genres",
          foreignField: "_id",
          as: "genres",
        },
      },
      {
        $lookup: {
          from: "questions",
          localField: "_id",
          foreignField: "category",
          as: "questions",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "categories",
          as: "followers",
        },
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          updatedAt: 1,
          name: 1,
          published: 1,
          partycategory: 1,
          showasnew: 1,
          showasupdated: 1,
          showaspopular: 1,
          joustexclusive: 1,
          questactive: 1,
          nextquestactive: 1,
          followers: "$followers",
          type: "$type[0]",
          questions: "$questions",
          genres: "$genres"
        },
      },
      {
        $facet: {
          total: [
            {
              $count: "createdAt",
            },
          ],
          data: [
            {
              $addFields: {
                _id: "$_id",
              },
            },
          ],
        },
      },
      {
        $unwind: "$total",
      },
      {
        $project: {
          categories: {
            $slice: [
              "$data",
              input.offset,
              {
                $ifNull: [input.limit, "$total.createdAt"],
              },
            ],
          },
          pages: {
            $ceil: {
              $divide: ["$total.createdAt", input.limit],
            },
          },
          page: {
            $literal: input.offset / input.limit + 1,
          },
          totalrecords: "$total.createdAt",
        },
      },
    ]);

    console.log(catPage[0]);
    //console.log(util.inspect(catPage[0].categories, {showHidden: false, depth: null}))

    return catPage[0];
  } catch (error) {
    console.error(error);
  }
};

module.exports = {
  catPageReponse,
};
