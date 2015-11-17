define(function () {
    return {
        // inherit properties
        // if last argument is flag - use it to overwrite first argument
        extend: function() {
            var args = Array.prototype.slice.call(arguments),
                mergeTo = {};

            if (typeof args[args.length-1] === 'boolean') {
                mergeTo = args[0];
                args = args.slice(1, args.length-1);
            }

            return args.reduce(function(mergeTo, argObj) {
                for (var key in argObj) {
                    if (argObj.hasOwnProperty(key)) {
                        mergeTo[key] = argObj[key];
                    }
                }

                return mergeTo;
            }, mergeTo);
        },
        whichTransitionEvent: function () {
            // to detect which transition will be on running platform
            // need to create element and check its properties
            var el = document.createElement('fakeelement');
            var transitions = {
                'WebkitTransition' : 'webkitTransitionEnd',
                'MozTransition'    : 'transitionend',
                'OTransition'      : 'oTransitionEnd otransitionend',
                'transition'       : 'transitionend'
            };

            for(var t in transitions){
                if( el.style[t] !== undefined ){
                    return transitions[t];
                }
            }
        }
    };
});
