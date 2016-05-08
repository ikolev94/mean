var mongoose = require('mongoose');

var courseSchema = mongoose.Schema({
    title: String,
    featured: Boolean,
    published: Date,
    tags: [String]
});


var Course = mongoose.model('Course', courseSchema);


module.exports.seedInitialCourses = function () {

    Course.find({}).exec(function (err, collection) {
        if (err) {
            console.log('Find Course error ' + err);
            return;
        }

        if (collection.length === 0) {
            Course.create({title: 'Java', featured: true, published: new Date('12/12/2012'), tags: ['java', 'jvm']});
            Course.create({title: 'C', featured: true, published: new Date('10/4/2001'), tags: ['c', 'c++']});
            Course.create({title: 'J2EE', featured: true, published: new Date('11/11/2004'), tags: ['java', 'code']});
            Course.create({title: 'JS', featured: true, published: new Date('8/12/2009'), tags: ['js']});
        }


    });
};
