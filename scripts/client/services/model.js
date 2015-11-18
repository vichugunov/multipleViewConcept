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
                $http.post(url, contact).success(function(response) {
                    console.log('addContact', response);
                    callback(null, response);
                });
            },
            modifyContact: function(contact) {
                callback = callback || function(){};
                $http.put(url, contact, responseType).success(function(response) {
                    console.log('modifyContact', response);
                    callback(null, response);
                });
            },
            deleteContact: function(contact) {
                $http.delete(contact).success(function(response) {
                    console.log('deleteContact', response);
                    callback(null, response);
                });
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
