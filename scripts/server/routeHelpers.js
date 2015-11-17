define(['model'], function(model) {
    var _exports = {
        addContact: addContact,
        updateContact: updateContact,
        deleteContact: deleteContact,
        getCollection: getCollection,
        answerWithError: answerWithError
    };

    var errorStatuses = {
            wrongType: 'wrong content type',
            wrongParams: function(expectedParams) {
                return 'Params expected to be only from this list' + JSON.stringify(expectedParams);
            },
            keyAlreadyExists: 'When try to add new contact it should have different id',
            keyNotFound: 'When try to update contact it should exists'
        },
        expectedContactParams = ['contactId', 'groupId', 'phoneNumber', 'name'];

    function addContact(collection, isUpdate) {
        return (function(req, res, next) {

            var obj = req.body,
                returnObj = {
                    status: 0 // ok status
                };

            checkRequestType(req, res);
            checkParams(req, res, obj);

            if (!isUpdate && model.isKeyExists(obj.contactId, collection)) {
                return answerWithError(res, 409, errorStatuses.keyAlreadyExists);
            }

            if (isUpdate && !model.isKeyExists(obj.contactId, collection)) {
                return answerWithError(res, 404, errorStatuses.keyNotFound);
            }

            // add key to collection
            // save dump and response with ok status
            model.addContact(obj, collection, function(err) {
                if (err) throw err;
                res.json(returnObj);
            });
        });
    }

    function updateContact(collection) {
        return addContact(collection, true);
    }

    function deleteContact(collection) {
        return (function(req, res, next) {
            var obj = req.body;

            checkRequestType(req, res);
            checkParams(req, res, obj);

            model.deleteContact(obj, collection, function(err) {
                if (err) throw err;
                res.json({
                    status: 0
                });
            });
        });
    }

    // get entire collection data
    function getCollection(data) {
        return (function(req, res, next) {
            return res.json(data);
        });
    }

    function checkParams(req, res, obj, expectedParams) {
        // add contact to collection
        expectedParams = expectedParams || expectedContactParams;

        var isKeysAreCorrect = Object.keys(obj).every(function(property) {
            return expectedParams.indexOf(property) !== -1;
        });

        if (!isKeysAreCorrect) {
            return answerWithError(res, 400, errorStatuses.wrongParams(expectedParams));
        }
    }

    // check content-type
    function checkRequestType(req, res, expectedContentType) {
        expectedContentType = expectedContentType || 'application/json';

        if (req.header('content-type') !== expectedContentType) {
            return answerWithError(res, 400, errorStatuses.wrongType);
        }
    }

    // answer with error
    function answerWithError(response, errorStatus, description, errorStatusCode) {
        errorStatusCode = errorStatusCode || -1;

        var returnedErrorObj = {
            status: errorStatusCode,
            error: {
                description: description
            }
        };

        response.status(errorStatus).json(returnedErrorObj);
        throw new Error(description); // to prevent later usage
    }


    return _exports;
});
