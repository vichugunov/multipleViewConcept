define(['./module'], function(services) {
    function ModelService() {
        var data = [
            {id:0, title:'Doh', detail:"A dear. A female dear."},
            {id:1, title:'Re', detail:"A drop of golden sun."},
            {id:2, title:'Me', detail:"A name I call myself."},
            {id:3, title:'Fa', detail:"A long, long way to run."},
            {id:4, title:'So', detail:"A needle pulling thread."},
            {id:5, title:'La', detail:"A note to follow So."},
            {id:6, title:'Tee', detail:"A drink with jam and bread."}
        ];
        return {
            notes: function () {
                return data;
            },
            get: function(id){
                return data[id];
            },
            add: function (note) {
                var currentIndex = data.length;
                data.push({
                    id:currentIndex, title:note.title, detail:note.detail
                });
            },
            delete: function (id) {
                var oldNotes = data;
                data = [];
                angular.forEach(oldNotes, function (note) {
                    if (note.id !== id) data.push(note);
                });
            }
        };
    }

    return services.factory('Model', ModelService);
});
