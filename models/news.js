var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleScrape = new Schema({
    headline: {
        type: String
    },
    summary: {
        type: String
    },
    link: {
        type: String
    },
    saved: {
        type: Boolean,
        default: false
    },
    notes: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

var NewsArticles = mongoose.model("Articles", ArticleScrape);

module.exports = NewsArticles;