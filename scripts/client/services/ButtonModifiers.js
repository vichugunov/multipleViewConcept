define(['./module'], function(services) {
    function ButtonModifiersService($rootScope) {
        return {
            addListeners: function(options) {
                var viewContainer = options && options.viewContainer || '.view-container',
                    actions = options && options.actions
                            || [{
                                    tag: 'button',
                                    action: 'delete'
                                }],
                    getActionHandler = {
                        'modify': getModifyHandler,
                        'delete': getDeleteHandler
                    },
                    model = options && options.model,
                    updateCallback = options && options.updateCallback || function() {};

                actions.forEach(function(a) {
                   $(viewContainer).on('click', a.tag + '[' + 'data-' + a.action + ']', getActionHandler[a.action](model, updateCallback));
                });
            }
        };
    }

    function getModifyHandler(Model, updateCallback) {
        return (function(e) {
            var contact = $(e.target).attr('data-contact');
        });
    }

    function getDeleteHandler(Model, updateCallback) {
        return (function(e){
            var contact = $(e.target).attr('data-contact');
            Model.deleteContact(contact, function(err) {
                if (!err) {
                    updateCallback();
                }
            });
        });
    }

    return services.factory('ButtonModifiers', ButtonModifiersService);
});
