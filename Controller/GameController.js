$(function () {

    var container = $('#container');
    var jet = $('#jet');
    var pole = $('.pole');
    var pole1 = $('#pole1');
    var pole2 = $('#pole2');
    var score = $('#score');
    var speed_span = $('#speed');
    var restartBtn = $('#restartBtn');

    var container_width = parseInt(container.width());
    var container_height = parseInt(container.height());
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var jet_left = parseInt(jet.css('left'));
    var jet_height = parseInt(jet.height());
    var speed = 15;

    var go_up = false;
    var score_updated = false;
    var game_over = false;


    var the_game = setInterval(function () {

        if (conflict(jet, pole1) || conflict(jet, pole2) || parseInt(jet.css('top')) <= 0 || parseInt(jet.css('top')) > container_height - jet_height) {

            stop_game();

        } else {

            var pole_current_position = parseInt(pole.css('right'));

            if (pole_current_position > container_width - jet_left) {
                if (score_updated === false) {
                    score.text(parseInt(score.text()) + 10);
                    score_updated = true;
                }
            }

            if (pole_current_position > container_width) {
                var new_height = parseInt(Math.random() * 100);

                pole1.css('height', pole_initial_height + new_height);
                pole2.css('height', pole_initial_height - new_height);

                speed = speed + 1;
                speed_span.text(speed+"Kmh");

                score_updated = false;

                pole_current_position = pole_initial_position;
            }

            pole.css('right', pole_current_position + speed);

            if (go_up === false) {
                go_down();
            }
        }

    }, 40);

    function conflict($div1, $div2) {
        var x1 = $div1.offset().left;
        var y1 = $div1.offset().top;
        var h1 = $div1.outerHeight(true);
        var w1 = $div1.outerWidth(true);
        var a1 = y1 + h1;
        var b1 = x1 + w1;

        var x2 = $div2.offset().left;
        var y2 = $div2.offset().top;
        var h2 = $div2.outerHeight(true);
        var w2 = $div2.outerWidth(true);
        var a2 = y2 + h2;
        var b2 = x2 + w2;

        if (a1 < y2 || y1 > a2 || b1 < x2 || x1 > b2) return false;
        return true;
    }

    $(document).on('keydown', function (e) {
        var key = e.keyCode;
        if (key === 32 && go_up === false && game_over === false) {
            go_up = setInterval(up, 50);
        }
    });

    $(document).on('keyup', function (e) {
        var key = e.keyCode;
        if (key === 32) {
            clearInterval(go_up);
            go_up = false;
        }
    });

    restartBtn.click(function () {
        location.reload();
    });

    function go_down() {
        jet.css('top', parseInt(jet.css('top')) + 5);
    }

    function up() {
        jet.css('top', parseInt(jet.css('top')) - 10);
    }

    function stop_game() {
        clearInterval(the_game);
        game_over = true;
        restartBtn.slideDown();
    }




});
