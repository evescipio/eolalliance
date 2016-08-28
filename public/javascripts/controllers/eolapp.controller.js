var app = angular.module('EOLApp', ['angular-countdown']);

app.controller('CountController', ['$scope', function($scope) {
    var launch = '2016-09-18 23:59:59 GMT';

    function getTimeRemaining(endtime) {
        var t = Date.parse(endtime) - Date.parse(new Date());
        var seconds = Math.floor((t/1000) % 60);
        var minutes = Math.floor((t/1000/60) % 60);
        var hours = Math.floor((t/(1000*60*60)) % 24);
        var days = Math.floor(t/(1000*60*60*24));
        return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
        };
    }

    function initialiseClock(id, endtime) {
        var clock = document.getElementById(id);
        var timeinterval = setInterval(function() {
        var t = getTimeRemaining(endtime);
        clock.innerHTML = t.days + ' days ' +
                            t.hours + ' hours ' +
                            t.minutes + ' min ' +
                            t.seconds + ' sec';
        if(t.total <= 0) {
            clearInterval(timeinterval);
        }
        }, 1000);
    }

    initialiseClock('clockdiv', launch);
}]);

app.controller('FreightController', ['$scope', function($scope) {

    var maxSize = 300000;
    var maxCollateral = 3000000000;
    var m3Rate = 150;
    var collateralRate = 0.005;
    
    $scope.recommendations = [{text:'None'}];
    $scope.reward = '0 ISK';

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    function calculate(size, collateral) {
        console.log(size + ', ' + collateral)
        if(size == undefined || size == null) {
            $scope.reward == '0 ISK';
            $scope.recommendations = [{ text: 'You don\'t need to pay to move nothing. Missing size?' }];
            return;
        }
        else if(size > maxSize) {
            $scope.reward = 'Too big to move.';
            $scope.recommendations = [{text: 'Maybe try something a bit smaller.'}];
            return;
        }
        else if(collateral == undefined || collateral == null) {
            collateral = 0;
        }
        else if(collateral > maxCollateral) {
            $scope.reward = 'Setting up a gank contract?';
            $scope.recommendations = [{ text: 'Break the package into smaller sizes, or'},
                                      { text: 'Reduce the amount of collateral.'}];
            return;
        }
        var reward = (size * m3Rate) + (collateral * collateralRate);
        $scope.reward = numberWithCommas(reward) + ' ISK';
        $scope.recommendations = [{ text: 'None. Looks good to go.'}];
        if(reward > 1000000000) {
            $scope.recommendations = [{ text: 'That\'s very expensive. Maybe break it up or move less.' }]
        }
        console.log(size + ', ' + collateral)
    }

    $scope.calculate = calculate;

}]);