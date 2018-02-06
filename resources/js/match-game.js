var MatchGame = {};

/*
  Sets up a new game after HTML document has loaded.
  Renders a 4x4 board of cards.
*/

$(document).ready(function() {
  var $game = $('#game');
  var values = MatchGame.generateCardValues();
  MatchGame.renderCards(values, $game);
  $game.data('textsequence', 0);
  $game.data('timer',0);
  var audio = new Audio('resources/media/card-flip.wav'); 
  //MatchGame.SimulateWin();
  $('.card').click(function() {
    audio.play();
    MatchGame.flipCard($(this), $game);
  }); 
});

/*
  Generates and returns an array of matching card values.
 */

MatchGame.generateCardValues = function () {
  var sequentialValues = [];

  for (var value = 1; value <= 8; value++) {
    sequentialValues.push(value);
    sequentialValues.push(value);
  }

  var cardValues = [];

  while (sequentialValues.length > 0) {
    var randomIndex = Math.floor(Math.random() * sequentialValues.length);
    var randomValue = sequentialValues.splice(randomIndex, 1)[0];
    cardValues.push(randomValue);
  }

  return cardValues;
};

/*
  Converts card values to jQuery card objects and adds them to the supplied game
  object.
*/

MatchGame.renderCards = function(cardValues, $game) {
  var colors = [
    'hsl(25, 85%, 65%)',
    'hsl(55, 85%, 65%)',
    'hsl(90, 85%, 65%)',
    'hsl(160, 85%, 65%)',
    'hsl(220, 85%, 65%)',
    'hsl(265, 85%, 65%)',
    'hsl(310, 85%, 65%)',
    'hsl(360, 85%, 65%)'];
  /*$game.empty();*/
  $game.data('flippedCards', []);
  $game.data('matchcount', 0 );

  for (var valueIndex = 0; valueIndex < cardValues.length; valueIndex++) {
    var value = cardValues[valueIndex];
    var color = colors[value - 1];
    var img = 'url(resources/images/maui27-compress/'+(valueIndex+1)+'.png';
    var data = {
      value: value,
      color: color,
      isFlipped: false,
      img: img
    };

    var $cardElement = $('<div class="col-xs-3 card"></div>');
    $cardElement.data(data);

    $game.append($cardElement);
  }
};

/*
  Flips over a given card and checks to see if two cards are flipped over.
  Updates styles on flipped cards depending whether they are a match or not.
 */

MatchGame.flipCard = function($card, $game) {
  var audio2 = new Audio('resources/media/ding-dong.wav');
  if ($card.data('isFlipped')) {
    return;
  }

  $card.css('background-color', $card.data('color'))
      .css('background-image', $card.data('img'))
      .text($card.data('value'))
      .data('isFlipped', true);


  var flippedCards = $game.data('flippedCards');
  flippedCards.push($card);

  if (flippedCards.length === 2) {
    if (flippedCards[0].data('value') === flippedCards[1].data('value')) {
      var matchCss = {
        backgroundColor: 'rgb(153, 153, 153)',
        color: 'rgb(204, 204, 204)'
      };
      audio2.play();
      flippedCards[0].css(matchCss);
      flippedCards[1].css(matchCss);
      console.log('test: matchcount addition before.......');
      $game.data('matchcount', $game.data('matchcount')+1);
      console.log('test: matchcount addition after.......');
      console.log('test: matchcount:' + $game.data('matchcount'));

    } else {
      var card1 = flippedCards[0];
      var card2 = flippedCards[1];
      
      window.setTimeout(function() {
        card1.css('background-color', 'rgb(32, 64, 86)')
            .css('background-image', 'none')
            .text('')
            .data('isFlipped', false);
        card2.css('background-color', 'rgb(32, 64, 86)')
            .css('background-image', 'none')
            .text('')
            .data('isFlipped', false);
      }, 200);
    }
    $game.data('flippedCards', []);
  }

  if ($game.data('matchcount') == 8) {
    console.log('YOU WIN');
    var music = new Audio('resources/media/Christina Perri - A Thousand Years.mp3'); 
    music.play();
    MatchGame.Boom1();
  }
};

/* -------Boom Boom Boom!-------*/
MatchGame.Boom1 = function () {
  
  if($('#game').data('textsequence')== 0){
    console.log('textsequence 0: deleting game texts...........');
    $('#row1').fadeOut('slow', function(){
      $('.title').replaceWith(" ");
    });
    var i = $('#game').data('textsequence');
    $('#game').data('textsequence', i+1);
    $('#row1').fadeIn('fast', function(){MatchGame.Boom1()});
  }

  else if ($('#game').data('textsequence')== 1){
    console.log('textsequence 1: adding V texts on wrong place............');
    var text = 'Hey There..........Oh! Wrong Place...uhhhh HOLD ON!!!!!!!!!';
    
    var i = 0;
    typeWriter();

    function typeWriter(){
      var random = Math.floor(Math.random() * 400);
      var setTimer = setTimeout(typeWriter, random);
      $('#valentine').append(text[i]);

    /*console.log('output setimer:'+ setTimer);
    console.log('output text[i] value:' + text[i]);*/
      i++;
    
      if(!text[i]) {
        console.log('return timeout value.........' + setTimer);
        clearTimeout(setTimer);
        var z = $('#game').data('textsequence');
        $('#game').data('textsequence', z+1);

        $('#game').css("position","relative");
        $('#valentine-overall-overlay').fadeIn(1000, function(){
            MatchGame.Boom1();
        });
      }
    }
  }

  else if ($('#game').data('textsequence')== 2){
    console.log('textsequence 2: deleting V texts on wrong place............');
    var timeout = setTimeout(function(){$('#valentine').fadeOut(600)},1000);
    $('#game').data('timer', timeout);
    var i = $('#game').data('textsequence');
    $('#game').data('textsequence', i+1);
    setTimeout(function(){MatchGame.Boom1()}, 3000);
    /*MatchGame.typeDelete($('#valentine'), 100);*/
  }

  else if ($('#game').data('textsequence')== 3){
    var speed=2000;
    console.log('textsequence 3: adding V texts on right place............');
    $('#valentine-overall-overlay').fadeOut(speed);
    $('#valentine-top-overlay').fadeIn(speed);
    $('#valentine-top-overlay').fadeOut(speed, function(){
      $('#valentine-top2-overlay').fadeIn(speed, function(){
        $('#valentine-top2-overlay').fadeOut(speed, function(){
          $('#valentine-top3-overlay').fadeIn(speed, function(){
            $('#valentine-top3-overlay').fadeOut(speed, function(){
              $('#valentine-bottom-overlay').fadeIn(speed, function(){
                  setTimeout(function(){MatchGame.Coolstuff()}, speed);
              });
            });
          });
        });
      });
    });
    var i = $('#game').data('textsequence');
    $('#game').data('textsequence', i+1);
}
  
  else if ($('#game').data('textsequence')== 4){
    console.log('textsequence 4: adding Happy V on right place............');
  }

  else {
    conole.log('something must be wrong...textsequence: '+ $('#game').data('textsequence'));
  }

}

/*-----------Delete Text--------not completed------------------*/
MatchGame.typeDelete = function($element, speed){

  var i = $element.text().length - 1;
  typeDelete ();

  function typeDelete(){
    var setTimer = setTimeout(typeDelete, speed);
    $element.text()[i].replaceWith("");
    i--;

    if($element.text().length == 0){
      clearTimeout(setTimer);
      var z = $('#game').data('textsequence');
      $('#game').data('textsequence', z+1);
      MatchGame.Boom1();    
    }
  }
}

/**at the end of the game display something cool*/
MatchGame.Coolstuff = function (){
  showoverlay();

  function showoverlay(){
    $('#valentine-background-overlay').fadeIn(2000, function(){
      $('#valentine-background-overlay2').fadeIn(2000, function(){
        $('#valentine-top4-overlay').fadeIn(3000, function(){
          $('#valentine-top4-overlay').css('display','flex');
        });
      });
    });
  }
}




/**simulate when a user had won the game**/

MatchGame.SimulateWin = function(){
  $('.card').each(function(){
    $(this).css('background-color', 'rgb(153, 153, 153)')
    .text($(this).data('value'))
    .data('isFlipped', true);
  });
}






