/**
 * Created by NLFSoftware on 07/04/16.
 */

'use strict';

angular.module('NFRiaCowboy.boot', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/boot', {
            templateUrl: 'boot/boot.html',
            controller: 'BootController'
        });
    }])

    .controller('BootController', ['$scope', function ($scope) {

        var voice = {
            amplitude: 100,
            wordgap: 1,
            pitch: 105,
            speed: 160,
            variant: 'f2'
        };

        meSpeak.loadConfig("components/meSpeak/mespeak_config.json");
        meSpeak.loadVoice("components/meSpeak/voices/en/en.json");
        //meSpeak.speak("Welcome to NFRiaCowboy's Playground.", voice);

        var nfriacowboyBoot = new ElizaBot();


        $scope.conversation = [];
        $scope.humanText = "";

        $scope.elizaReset = function() {
            nfriacowboyBoot.reset();
            elizaStep();
        };

        $scope.handleNewInput = function() {
            var nfriacowboyOutput = "";
            if (nfriacowboyBoot.quit) {
                $scope.humanText = '';
                if (confirm("This session is over.\nStart over?")) elizaReset();
                return;
            }
            else if ($scope.humanText != '') {
                $scope.conversation.push({
                    id: new Date().getTime(),
                    msg: '<div class="bubble human">' + $scope.humanText + '</div>'});

                nfriacowboyOutput =nfriacowboyBoot.transform($scope.humanText);
            }
            else if ($scope.conversation.length == 0) {
                nfriacowboyOutput = nfriacowboyBoot.getInitial();
            }
            meSpeak.speak(nfriacowboyOutput, voice);
            $scope.conversation.push({
                id: new Date().getTime(),
                msg: '<div class="imgCarmen"></div><div class="bubble carmen">' + nfriacowboyOutput + '</div>'});
            $scope.humanText = '';

        };

        $scope.handleNewInput();

        $('#humanTextInput').keyup(function(e){
            var code = (e.keyCode ? e.keyCode : e.which);
            if(code == 13 && $scope.humanText != '') { //Enter keycode
                $scope.handleNewInput();
                $scope.$apply();
            }
        });
    }]);