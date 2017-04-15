(function() {
    function SongPlayer($rootScope, Fixtures) {
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
                stopSong(song);
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentBuzzObject.bind('timeupdate', function() {
                $rootScope.$apply(function() {
                    SongPlayer.currentTime = currentBuzzObject.getTime();
                });
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
         * @function stopSong
         * @desc Stops current buzz object sound file and sets state of songPlayer to null
         * @param {Object} song
         */
        var stopSong = function(song) {
            currentBuzzObject.stop();
            SongPlayer.currentSong.playing = null;
        };

         /**
         * @desc Active song object from list of songs
         * @type {Boolean}
         */
        SongPlayer.currentSong = null;
         /**
         * @desc Current playback time (in seconds) of currently playing song
         * @type {Number}
         */
         SongPlayer.currentTime = null;
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
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

         /**
         * @function next
         * @desc plays the next song in the songs array
         * @param {Object} song
         */
        SongPlayer.next = function(song) {
            var currentSongIndex = getSongIndex(SongPlayer.currentSong);
            currentSongIndex++;

            if (currentSongIndex >= currentAlbum.songs.length) {
                stopSong(song);
            } else {
                var song = currentAlbum.songs[currentSongIndex];
                setSong(song);
                playSong(song);
            }
        };

         /**
         * @function setCurrentTime
         * @desc Set current time (in seconds) of currently playing song
         * @param {Number} time
         */
        SongPlayer.setCurrentTime = function(time) {
            if (currentBuzzObject) {
                currentBuzzObject.setTime(time);
            }
        };

        return SongPlayer;
    }

    angular 
        .module('blocJams')
        .factory('SongPlayer', ['$rootScope', 'Fixtures', SongPlayer]);
})();