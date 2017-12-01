var gamegrid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];

var chooserHtml = '<div class="chooser one">1</div><div class="chooser two">2</div><div class="chooser three">3</div><div class="chooser four">4</div>';

function numberImgTag(num) {
    return '<img src="images/' + num + '.png" alt="' + num + '" class="hidden number" />';
}

function isGameOver() {
    for (var i = 1; i <= 4; i++) { // for each cluster
        for (var j = 1; j <= 4; j++) { // for each box
            for (var k = 1; k <= 4; k++) { // for each possible entry
                if (isLegalMove(k, 'sq' + i + '-' + j)) { // if there that entry is a legal move in this box
                    return false; // then the game is not over
                }
            }
        }
    }
    return true;
}

function moveComputer() {
    while (true) {
        var rand1 = Math.ceil(Math.random() * 4); // entry
        var rand2 = Math.ceil(Math.random() * 4); // cluster
        var rand3 = Math.ceil(Math.random() * 4); // square
        if (isLegalMove(rand1, 'sq' + rand2 + '-' + rand3)) {
            gamegrid[rand2-1][rand3-1] = rand1;
            $('#sq' + rand2 + '-' + rand3).append(numberImgTag(rand1)).removeClass('open').addClass('comp').find('img').show('slow');
            break;
        }
    }
}

function isOneOf(thing, set) {
    for (var i = 0; i < set.length; i++) {
        if (thing==set[i]) {
            return true;
        }
    }
    return false;
}

// square is the id of the div, i.e. sq4-2
function isLegalMove(entry, square) {
    if ($('#' + square).find('img').length > 0) { return false; }
    
    if (entry==gamegrid[0][0] && isOneOf(square, ['sq1-2', 'sq1-3', 'sq1-4', 'sq2-1', 'sq2-2', 'sq3-1', 'sq3-3'])) {
        return false;
    }
    if (entry==gamegrid[0][1] && isOneOf(square, ['sq1-1', 'sq1-3', 'sq1-4', 'sq2-1', 'sq2-2', 'sq3-2', 'sq3-4'])) {
        return false;
    }
    if (entry==gamegrid[0][2] && isOneOf(square, ['sq1-1', 'sq1-2', 'sq1-4', 'sq2-3', 'sq2-4', 'sq3-1', 'sq3-3'])) {
        return false;
    }
    if (entry==gamegrid[0][3] && isOneOf(square, ['sq1-1', 'sq1-2', 'sq1-3', 'sq2-3', 'sq2-4', 'sq3-2', 'sq3-4'])) {
        return false;
    }
    if (entry==gamegrid[1][0] && isOneOf(square, ['sq2-2', 'sq2-3', 'sq2-4', 'sq1-1', 'sq1-2', 'sq4-1', 'sq4-3'])) {
        return false;
    }
    if (entry==gamegrid[1][1] && isOneOf(square, ['sq2-1', 'sq2-3', 'sq2-4', 'sq1-1', 'sq1-2', 'sq4-2', 'sq4-4'])) {
        return false;
    }
    if (entry==gamegrid[1][2] && isOneOf(square, ['sq2-1', 'sq2-2', 'sq2-4', 'sq1-3', 'sq1-4', 'sq4-1', 'sq4-3'])) {
        return false;
    }
    if (entry==gamegrid[1][3] && isOneOf(square, ['sq2-1', 'sq2-2', 'sq2-3', 'sq1-3', 'sq1-4', 'sq4-2', 'sq4-4'])) {
        return false;
    }
    if (entry==gamegrid[2][0] && isOneOf(square, ['sq3-2', 'sq3-3', 'sq3-4', 'sq4-1', 'sq4-2', 'sq1-1', 'sq1-3'])) {
        return false;
    }
    if (entry==gamegrid[2][1] && isOneOf(square, ['sq3-1', 'sq3-3', 'sq3-4', 'sq4-1', 'sq4-2', 'sq1-2', 'sq1-4'])) {
        return false;
    }
    if (entry==gamegrid[2][2] && isOneOf(square, ['sq3-1', 'sq3-2', 'sq3-4', 'sq4-3', 'sq4-4', 'sq1-1', 'sq1-3'])) {
        return false;
    }
    if (entry==gamegrid[2][3] && isOneOf(square, ['sq3-1', 'sq3-2', 'sq3-3', 'sq4-3', 'sq4-4', 'sq1-2', 'sq1-4'])) {
        return false;
    }
    if (entry==gamegrid[3][0] && isOneOf(square, ['sq4-2', 'sq4-3', 'sq4-4', 'sq3-1', 'sq3-2', 'sq2-1', 'sq2-3'])) {
        return false;
    }
    if (entry==gamegrid[3][1] && isOneOf(square, ['sq4-1', 'sq4-3', 'sq4-4', 'sq3-1', 'sq3-2', 'sq2-2', 'sq2-4'])) {
        return false;
    }
    if (entry==gamegrid[3][2] && isOneOf(square, ['sq4-1', 'sq4-2', 'sq4-4', 'sq3-3', 'sq3-4', 'sq2-1', 'sq2-3'])) {
        return false;
    }
    if (entry==gamegrid[3][3] && isOneOf(square, ['sq4-1', 'sq4-2', 'sq4-3', 'sq3-3', 'sq3-4', 'sq2-2', 'sq2-4'])) {
        return false;
    }
    
    return true;
}

function generateChooserNum(elem, num, className) {
    var child = elem.find(className);
    if (isLegalMove(num, elem.attr('id'))) {
        child.addClass('green');
        child.click(function() {
            var clusterNum = elem.attr('id').substring(2,3);
            var squareNum = elem.attr('id').substring(4,5);
            gamegrid[clusterNum-1][squareNum-1] = num;
            
            var square = $(this).parent();
            square.append(numberImgTag(num)).removeClass('open').addClass('my').find('.chooser').remove();
            square.find('img').show();
            if (isGameOver()) {
                win();
            } else {
                moveComputer();
                if (isGameOver()) {
                    lose();
                }
            }
        });
    } else {
        child.addClass('red');
    }
}

function resetGame() {
    gamegrid = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    $('.square').hide('slow', function() {
        $(this).empty().removeClass('my').removeClass('comp').removeClass('open').addClass('open').show('slow');
        $('#endgame').hide('slow');
    });
}

function win() {
    $('#endgame').addClass('win').html('<a href="#">You win! Click to play again!</a>').show('slow').click(function() {
        $(this).empty().removeClass('win');
        resetGame();
    });
}

function lose() {
    $('#endgame').addClass('lose').html('<a href="#">You lose. Click to play again!</a>').show('slow').click(function() {
        $(this).empty().removeClass('lose');
        resetGame();
    });
}

$(document).ready(function() {
    $('#endgame').empty().hide();
    
    $('.square').hover(function() {
        if ($(this).html()) { return; }
        
        $(this).html(chooserHtml);
        
        generateChooserNum($(this), 1, '.one');
        generateChooserNum($(this), 2, '.two');
        generateChooserNum($(this), 3, '.three');
        generateChooserNum($(this), 4, '.four');
    }, function() {
        $(this).find('.chooser').remove();
    });
});