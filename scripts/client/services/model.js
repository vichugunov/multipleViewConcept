define(['./module'], function(services) {
    function ModelService($resource, $http) {
        /*return $resource('/contacts', {}, {
            getCollection: { method: 'GET', responseType: 'json'},
            addContact: { method: 'POST', data: {}, responseType: 'json'},
            modifyContact: { method: 'PUT', data: {}, responseType: 'json'},
            deleteContact: { method: 'PUT', data: {}, responseType: 'json'}
        });*/

        var url = '/contacts';

        return {
            getCollection: function(callback) {
                callback = callback || function(){};
                $http.get(url).success(function(data) {
                    // console.log('getCollection', data);
                    callback(null, data);
                })
            },
            addContact: function(contact, callback) {
                callback = callback || function(){};
                $http({
                    url: url,
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: contact
                }).success(function(response) {
                    console.log('addContact', response);
                    callback(null, response);
                }).error(function(error) {
                    console.log('error on addContact', error);
                    callback(error);
                })
            },
            modifyContact: function(contact) {
                callback = callback || function(){};
                $http({
                    url: url,
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: contact
                }).success(function(response) {
                    callback(null, response);
                }).error(function(error) {
                    console.log('error', error);
                    callback(error);
                })
            },
            deleteContact: function(contact, callback) {
                $http({
                    url: url,
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    data: contact
                }).success(function(response) {
                    callback(null, response);
                }).error(function(error) {
                    console.log('error', error);
                    callback(error);
                })
            },
            extractContactsArray: function(data) {
                var resultArr = [];
                for (var groupId in data) {
                    for (var contactId in data[groupId]) {
                        resultArr.push(data[groupId][contactId]);
                    }
                }

                return resultArr;
            }
        };
    }

    return services.factory('Model', ['$resource', '$http', ModelService]);
});
