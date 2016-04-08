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
            wordgap: 0,
            pitch: 35,
            speed: 155,
            variant: 'f4'
        };

        meSpeak.loadConfig("components/meSpeak/mespeak_config.json");
        meSpeak.loadVoice("components/meSpeak/voices/en/en.json");
        //meSpeak.speak("Welcome to NFRiaCowboy's Playground.", voice);

        var nfriacowboyBoot = new ElizaBot();


        $scope.conversation = "";
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
                $scope.conversation += '<p>You:   ' + $scope.humanText + '</p>';

                nfriacowboyOutput =nfriacowboyBoot.transform($scope.humanText);
            }
            else if ($scope.conversation == '') {
                nfriacowboyOutput = nfriacowboyBoot.getInitial();
            }
            meSpeak.speak(nfriacowboyOutput, voice);
            $scope.conversation += '<p>Carmen: ' + nfriacowboyOutput + '</p>';
            $scope.humanText = '';

        };

        $scope.handleNewInput();
    }]);