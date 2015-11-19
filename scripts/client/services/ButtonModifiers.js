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
                   $(viewContainer).on('click', a.tag + '[' + 'data-' + a.action + ']', getActionHandler[a.action](model, a.tag, updateCallback));
                });
            }
        };
    }

    function getModifyHandler(Model, updateCallback) {
        return (function(e) {
            var contact = $(e.target).attr('data-contact');
        });
    }

    function getDeleteHandler(Model, tag, updateCallback) {
        return (function(e){
            var node = e.target;
            if (node.tagName.toLowerCase() !== tag) {
                while (node.tagName.toLowerCase() !== tag && node.parentNode !== document) {
                    node = node.parentNode;
                }
            }
            var contact = $(node).attr('data-contact');
            Model.deleteContact(contact, function(err) {
                if (!err) {
                    updateCallback();
                }
            });
        });
    }

    return services.factory('ButtonModifiers', ButtonModifiersService);
});
