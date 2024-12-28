// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require('mongoose');
const slugify = require('slugify');
//const validators = require('validators');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: [true, 'Tour must have a name'],
      trim: true,
      maxlength: [40, 'A tour can have a maximum of 40 characters'],
      minlength: [10, 'A tour can have a minimum of 10 characters'],
    },
    duration: {
      type: Number,
      required: [true, 'Tour must have a duration'],
    },
    difficulty: {
      type: String,
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty can only be easy, medium or hard',
      },
      required: [true, 'Tour must have a difficulty'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'Tour must have a maximum Group Size'],
    },
    slug: {
      type: String,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    secretTour: {
      type: Boolean,
      default: false,
    },

    rating: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must have a minimum of 1.0'],
      max: [5, 'Rating can at max be 5.0'],
    },

    price: {
      type: Number,
      required: [true, 'Tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price;
        },
        message: 'Price Discount ({VALUE}) cannot be more than Price itself',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'Tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, 'Tour must have a image cover'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    startDates: [Date],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

//VIRTUAL ELEMENT
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//DOCUMENT MIDDLEWARE
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

//QUERY MIDDLEWARE
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

//AGGREGATE MIDDLEWARE
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({
    $match: { secretTour: { $ne: true } },
  });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
module.exports = Tour;
