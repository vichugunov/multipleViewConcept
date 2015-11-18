define(['utils/lorem'], function(loremIpsum) {
    var fs = require('fs'),
        dumpPath = 'scripts/server/data.json', // for saving generatedData
        unsortedGroupId = '_unsorted'; // need for quick search

    var _exports = {
        generateData: getGeneratedData,
        save: saveData,
        addContact: addContact,
        deleteContact: deleteContact,
        isKeyExists: isKeyExists
    };

    /*
        returns generated structure of cntContacts, grouped by cntGroups
        ( and plus one for items without group)

        outputData:
        {
            <groupId>: {
                <contactId>: {
                    groupId: <groupId>,
                    phoneNumber: +71111111111', // template phone number
                    name: <randomName>, // Lorem|Ipsum etc.
                }
            },
            '_unsorted': {
                ids: {
                    <contactId>: <contact>
                },
                // contacts: [<contactId>]
            }
        }
    */
    function generate(cntContacts, cntGroups) {
        cntContacts = cntContacts || 0;
        cntGroups = cntGroups || 0;
        var ungroupedGroupId = 'ungrouped';

        // nothing to do with no data
        if (cntContacts == cntGroups && cntGroups == 0) return;

        var outputData = {},
            loremIpsumArr = loremIpsum.split(/\s+[,\.]*\s*[,\.]*/), // get words from lorem Ipsum text
            loremIpsumLength = loremIpsumArr.length,
            groups = [],
            i;

        // fill groups with random names
        for (i = 0; i < cntGroups; i+= 1) {
            var groupId = getRandomName();
            groups.push(groupId);
            outputData[groupId] = {};
        }

        // add special group 'ungrouped'
        groups.push(ungroupedGroupId);
        outputData[ungroupedGroupId] = {};

        // add special group '_unsorted' for quick search
        outputData[unsortedGroupId] = {};
        outputData[unsortedGroupId].ids = {};
        outputData[unsortedGroupId].contacts = [];

        for (i = 0; i < cntContacts; i+= 1) {
            (function (i) {
                var groupId = getRandomGroup(),
                    contactId = 'id' + i,
                    contact = {
                        contactId: contactId,
                        groupId: groupId,
                        phoneNumber: getRandomPhone(),
                        name: getRandomName()
                    };

                quietSaveContact(contact, outputData);
            })(i);
        }

        return outputData;


        // helpers
        function getRandomName() {
            return loremIpsumArr[Math.floor(Math.random() * loremIpsumLength)];
        }

        function getRandomGroup() {
            return groups[Math.floor(Math.random() * (cntGroups + 1))]; // do not forget 'ungrouped' items
        }

        function getRandomPhone() {
            var minPhoneNum = 1000000000,
                maxPhoneNum = 9999999999;

            return '+7' + Math.round(Math.random() * (maxPhoneNum - minPhoneNum) + minPhoneNum);
        }
    }

    function getGeneratedData(callback) {
        // generate data or get from file
        var cntContacts = 300,
            cntGroups = 4;

        fs.exists(dumpPath, function(exists) {
            if (!exists) {
                var generatedData = generate(cntContacts, cntGroups);
                return saveData(generatedData, function(err) {
                    if (err) throw err;
                    callback(null, generatedData);
                });
            }

            fs.readFile(dumpPath, function(err, dump) {
                if (err) throw err;
                callback(null, JSON.parse(dump));
            });
        });

    }

    function saveData(data, callback) {
        fs.writeFile(dumpPath, JSON.stringify(data), function(err) {
            if (err) throw err;
            callback(null);
        });
    }

    function addContact(contact, collection, callback) {
        if (!collection[contact.groupId]) {
            collection[contact.groupId] = {};
        }

        if (contact.hasOwnProperty('contactId')) {
            quietSaveContact(contact, collection);
        }

        saveData(collection, callback);
    }

    function deleteContact(contact, collection, callback) {
        var groupId = contact && contact.groupId,
            contactId = contact && contact.contactId;

        // if nothing to do - call callback and return
        if (!isKeyExists(contactId, collection)) {
            return callback(null);
        }

        if (collection[groupId]) {
            delete collection[groupId][contactId];
        }
        delete collection[unsortedGroupId].ids[contactId];

        callback(null);
    }

    function quietSaveContact(contact, collection) {
        var groupId = contact && contact.groupId,
            contactId = contact && contact.contactId;

        collection[groupId][contactId] = contact;
        collection[unsortedGroupId].ids[contactId] = contact;
        // collection[unsortedGroupId].contacts.push(contact);
    }

    function isKeyExists(contactId, collection) {
        return typeof collection[unsortedGroupId].ids[contactId] === 'object';
    }

    return _exports;
});
