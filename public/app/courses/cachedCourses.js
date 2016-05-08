app.factory('cachedCourses', function (CourseResource) {
    var courses;

    return {
        query: function () {
            if (!courses) {
                courses = CourseResource.query();
                return courses;
            }
        }
    }
});