var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var ArticleScrape = new Schema({
    title: {
        type: String
    },
    content: {
        type: String
    },
    link: {
        type: String
    },
    saved: {
        type: Boolean,
        default: false
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

var NewsArticles = mongoose.model("Articles", ArticleScrape);

module.exports = NewsArticles;