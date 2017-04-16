(function() {
     function CollectionCtrl(Fixtures) {
        this.albums = Fixtures.getCollection(12);

        var currentAlbum = Fixtures.getAlbum();

        var albumTime = function(albumObj) {
            var total = 0;
            for (let i = 0; i < albumObj.songs.length; i++) {
                total += albumObj.songs[i].duration;
            }
            return total;
        };
            
        this.getTime = function() {
            return (albumTime(currentAlbum));
        }; 

     }
 
     angular
         .module('blocJams')
         .controller('CollectionCtrl', ['Fixtures', CollectionCtrl]);
 })();
