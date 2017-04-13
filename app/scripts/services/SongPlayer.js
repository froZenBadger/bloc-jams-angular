(function() {
    function SongPlayer(Fixtures) {
        var SongPlayer = {};

         /**
         * @desc Active album object
         * @type {Object}
         */
         var currentAlbum = Fixtures.getAlbum();

         /**
         * @desc Buzz object audio file
         * @type {Object}
         */
        var currentBuzzObject = null;

         /**
         * @function setSong
         * @desc Stops currently playing song and loads new audio file as currentBuzzObject
         * @param {Object} song
         */
        var setSong = function(song) {
            if (currentBuzzObject) {
                currentBuzzObject.stop();
               SongPlayer.currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            SongPlayer.currentSong = song;
        };

         /**
         * @function playSong
         * @desc Plays current buzz object sound file and sets state of songPlayer to true 
         * @param {Object} song
         */
        var playSong = function(song) {
            currentBuzzObject.play();
            song.playing = true;
        };

         /**
         * @function getSongIndex
         * @desc gets index of the song in songs array 
         * @param {Object} song
         * @return {Number} index
         */
        var getSongIndex = function(song) {
            return currentAlbum.songs.indexOf(song);
        };        

         /**
         * @desc Active song object from list of songs
         * @type {Boolean}
         */
        SongPlayer.currentSong = null;

         /**
         * @function play
         * @desc Checks whether playing new or current song, if new song than calls setSong and playSong. If current song than just calls playSong.
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            song = song || SongPlayer.currentSong;
            if (SongPlayer.currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (SongPlayer.currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }        
        };

         /**
         * @function pause
         * @desc Pauses current song
         * @param {Object} song
         */
        SongPlayer.pause = function(song) {
            song = song || SongPlayer.currentSong;
            currentBuzzObject.pause();
            song.playing = false;
        };

         /**
         * @function previous
         * @desc plays the previous song in the songs array
         * @param {Object} song
         */
        SongPlayer.previous = function(song) {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex--;

            if (currentSongIndex < 0) {
                currentBuzzObject.stop();
                SongPlayer.currentSong.playing = null;
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

        return SongPlayer;
    }

    angular 
        .module('blocJams')
        .factory('SongPlayer', ['Fixtures', SongPlayer]);
})();