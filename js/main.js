$(document).ready(function(){
  var alto_pantalla = screen.height;
  var ancho_pantalla = screen.width;
  var division = alto_pantalla / 5;
  var fantasma = $('#cara').offset();
  var posi_fanX = fantasma.left;
  var posi_fanY = fantasma.top;
  var posi_fanXfin = posi_fanX + 120;
  var posi_fanYfin = posi_fanY + 90;
  var intervalo;
  var menu = 0;
  var puntos;
  var muerte;
  var posiciones_altas = {};
  //estrellas
  setInterval(function(){
    for(var estre = 1; estre <= 30; estre++){
      var posi_estreX = generador_random(1,100);
      var posi_estreY = generador_random(1,100);
      $('.estrella'+estre).css({'left':posi_estreX+'vw','top':posi_estreY+'vh'});
    }
  },2000)
  //mostrar menu
  $('.menu').click(function(){
        if(menu == 0){
            $('.submenu').css({'top':'-200px','right':'-200px'});
            $('.submenu').addClass('grande');
            setTimeout(function(){
                $('.submenu').removeClass('grande');
            },1000)
            menu = 1;
        }else if(menu == 1){
            $('.submenu').addClass('grande');
            setTimeout(function(){
                $('.submenu').removeClass('grande');
                $('.submenu').removeAttr('style');
            },1000)
            menu = 0;
        }

    })
    function generador_random(min,max){
        return Math.floor(Math.random()*(max-min+1)+min);
    }
    function cambio_propi(){
        for(var pe = 1; pe <= 10;pe++){
          var posi = generador_random(500,1500);
          var tiem = generador_random(8,30);
          var retra = generador_random(5,25);
          $('#malo'+pe).css({'left':-posi,'animation-duration':tiem+'s','animation-delay':retra+'s'})
        }
    }
    function clear(){
        clearInterval(intervalo);
    }
    function altura_aleatoria(altu,enemi){
        switch(altu){
          case 0: $(enemi).css({'top':'0px'});
              break;
          case 1: $(enemi).css({'top':division+'px'});
              break;
          case 2: $(enemi).css({'top':(division * 2)+'px'});
              break;
          case 3: $(enemi).css({'top':(division * 3)+'px'});
              break;
          case 4: $(enemi).css({'top':(division * 4)+'px'});
              break;
      }
    }
    cambio_propi();
    //posicion del fantasma
    $('#jugar').click(function(){
      juego();
      $('.submenu').addClass('grande');
      setTimeout(function(){
          $('.submenu').removeClass('grande');
          $('.submenu').removeAttr('style');
      },1000)
      menu = 0;
      if(ancho_pantalla < 400){
        $('.contenedor-fantasma').css({'left':'40vw'})
      }else{
        $('.contenedor-fantasma').css({'left':'70vw'})
      }
    })
    //controles del juego
    var alturamax = screen.height - 140;
    var teclado = {};
    var posiy = parseInt($('.contenedor-fantasma').css('top'));
    $(document).keydown(function boton (e){
        fantasma = $('#cara').offset();
        posi_fanX = fantasma.left;
        posi_fanY = fantasma.top;
        posi_fanXfin = posi_fanX + 120;
        posi_fanYfin = posi_fanY + 90;
        teclado[e.keyCode] = true;
        if(teclado[38]){
            if(posiy > 5){
                posiy -= 50;
                $('.contenedor-fantasma').css({'top':posiy});
            }else if(posiy <= 5){
                //console.log('te pasastes putito');
            }
        }else if(teclado[40]){
            if(posiy < alturamax){
                posiy += 50;
                $('.contenedor-fantasma').css({'top':posiy});
            }else if(posiy > alturamax){
                //console.log('te pasastes putito');
            }
        }
    });
    $(document).keyup(function(e){
        teclado[e.keyCode] = false;
    })
    //generar posicion de los enemigos
    var anchomax = screen.width;
    var altomax = screen.height;
    function juego(){
      puntos = 0;
      muerte = 0;
      $('.puntos p').text(puntos);
      $('.vida p').removeAttr('style');
      cambio_propi();
      $('.malo').css({'animation-name':'enemigo','opacity':'1'})
      intervalo = setInterval(function(){
        for (var e = 1;e <= 10;e++){
          var posicion_enemigo = $('#malo'+e).offset();
          var posi_eneX = posicion_enemigo.left;
          var posi_eneXfin = posicion_enemigo.left + 100;
          var posi_eneY = posicion_enemigo.top;
          var posi_eneYfin = posicion_enemigo.top + 120;
          if(posi_eneX < -400 && posi_eneX > -410){
            var altura_ene = generador_random(0,4);
            altura_aleatoria(altura_ene,'#malo'+e);
          }else if(posi_eneXfin >= posi_fanX && posi_eneX <= posi_fanXfin){
            if(posi_eneY > posi_fanYfin || posi_eneYfin < posi_fanY){
                if(posi_eneX > 1000){
                  puntos += 2;
                  $('.puntos p').text(puntos);
                }
            }else{
                muerte++;
                $('.vida p').css({'width':muerte})
                if(muerte == 401){
                  clear();
                  $('.malo').removeAttr('style');
                  $('.contenedor-fantasma').removeAttr('style');

                }
            }
          }
        }
      },10)
    }
})
