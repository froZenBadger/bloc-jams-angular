(function() {
    function SongPlayer() {
        var SongPlayer = {};

         /**
         * @desc Tracks state of SongPlayer
         * @type {Boolean}
         */
        var currentSong = null;
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
                currentSong.playing = null;
            }

            currentBuzzObject = new buzz.sound(song.audioUrl, {
                formats: ['mp3'],
                preload: true
            });

            currentSong = song;
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
         * @function SongPlayer.play
         * @desc Checks whether playing new or current song, if new song than calls setSong and playSong. If current song than just calls playSong.
         * @param {Object} song
         */
        SongPlayer.play = function(song) {
            if (currentSong !== song) {
                setSong(song);
                playSong(song);
            } else if (currentSong === song) {
                if (currentBuzzObject.isPaused()) {
                    playSong(song);
                }
            }        
        };

         /**
         * @function SongPlayer.pause
         * @desc Pauses current buzz obj sound file and sets state of SongPlayer to false
         * @param {Object} song
         */
        SongPlayer.pause = function(song) {
            currentBuzzObject.pause();
            song.playing = false;
        };

        return SongPlayer;
    }

    angular 
        .module('blocJams')
        .factory('SongPlayer', SongPlayer);
})();