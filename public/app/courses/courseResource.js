app.factory('CourseResource',function ($resource) {
    var courseResource = $resource('/api/courses/:id', {id: '@id'}, {update: {method: 'PUT', isArray: false}});


    return courseResource;
})