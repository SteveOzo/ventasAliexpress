(function(){

  var cantidadElementos = document.getElementsByName("precioali");;

  var elid;


  $('#imagen0').click(function(e){
    elid=0;
  });

  var image = document.getElementById("imagen0");
  image.addEventListener("paste", processEvent);

  var setId = function() {
    elid=$(this).attr('id').slice(-1);
    //alert(elid);
  }

  function processEvent(e) {

      for (var i = 0; i < e.clipboardData.items.length; i++) {
          // get the clipboard item
          // obtengo el clipboard item
          var clipboardItem = e.clipboardData.items[0];
          var type = clipboardItem.type;

          // verifico si es una imagen
          if (type.indexOf("image") != -1) {
              // obtengo el contenido de la imagen BLOB
              var blob = clipboardItem.getAsFile();
              //console.log("blob", blob);
              // creo un la URL del objeto
              var blobUrl = URL.createObjectURL(blob);
              //console.log("blobUrl", blobUrl);
              // agrego la captura a mi imagen
              document.getElementById("imeg"+elid).setAttribute("src", blobUrl);
          } else {
              console.log("No soportado " + type);
          }

          var reader = new window.FileReader();
            reader.readAsDataURL(clipboardItem.getAsFile());

            reader.onload = function() {
              var cod64 = reader.result.replace('data:image/png;base64,', '').toString();
              var imagenreal = reader.result.toString();
              document.getElementById("imeg"+elid).setAttribute("src", imagenreal);
              document.getElementById("cod64"+elid).setAttribute("value", cod64);
            }
      }
  }


var contador = 0;

var calculo = function() {

    var tasa = document.getElementById("tasa");
    tasa = (tasa.value/100)+1;
    var txtAli = document.getElementById("txtAli");
    var txtPagar = document.getElementById("txtPagar");
    var txtCantidad = document.getElementById("txtCantidad");
    for (var i = 0; i < cantidadElementos.length; i++)
    {
      valor = cantidadElementos[i].id.slice(-1);
      var finalprice = Math.ceil(document.getElementById("precioali"+[valor]).value*tasa);
      var final = document.getElementById("preciofinal"+[valor]);
      final.setAttribute("value", finalprice);
    }

    var totalAli = 0,
        totalPagar = 0;

    for (var i = 0; i < cantidadElementos.length; i++)
    {
       valor = cantidadElementos[i].id.slice(-1);
       totalAli = parseFloat(totalAli) + parseFloat(document.getElementById("precioali"+[valor]).value);
       totalPagar = parseFloat(totalPagar) + parseFloat(document.getElementById("preciofinal"+[valor]).value);
    }
    document.getElementById("txtAli").innerHTML = totalAli;
    document.getElementById("txtPagar").innerHTML = totalPagar;
}

var prec = document.getElementById("precioali"+contador);
prec.addEventListener("keyup", calculo);

$("#remover0").click(function() {
  $("#elemento0").remove();

  var totalAli = 0,
      totalPagar = 0;

  for (var i = 0; i < cantidadElementos.length; i++)
  {
     valor = cantidadElementos[i].id.slice(-1);
     totalAli = parseInt(totalAli) + parseInt(document.getElementById("precioali"+[valor]).value);
     totalPagar = parseInt(totalPagar) + parseInt(document.getElementById("preciofinal"+[valor]).value);
  }
  document.getElementById("txtAli").innerHTML = totalAli;
  document.getElementById("txtPagar").innerHTML = totalPagar;
  document.getElementById("txtCantidad").innerHTML = cantidadElementos.length;

});


 var quitar = function() {
   numeroelemen=$(this).attr('id').slice(-1);
   $("#elemento"+numeroelemen).remove();

   var totalAli = 0,
       totalPagar = 0;

   for (var i = 0; i < cantidadElementos.length; i++)
   {
      valor = cantidadElementos[i].id.slice(-1);
      totalAli = parseInt(totalAli) + parseInt(document.getElementById("precioali"+[valor]).value);
      totalPagar = parseInt(totalPagar) + parseInt(document.getElementById("preciofinal"+[valor]).value);
   }
   document.getElementById("txtAli").innerHTML = totalAli;
   document.getElementById("txtPagar").innerHTML = totalPagar;
   document.getElementById("txtCantidad").innerHTML = cantidadElementos.length;
 }

$(document).ready(function(){

  $("#tasa").on('change', calculo);

  $("#anadir").click(function() {

    contador = contador + 1;
    $("#contenedorproductos").append("<div class=\"row\" id=\"elemento"+contador+"\"><div class=\"container-fluid\"><div class=\"row\"><div class=\"col-xs-8 col-sm-8 col-lg-8\"><legend class=\"hidden-xs\"><h4>Producto</h4></legend><div class=\"container-fluid\"><label class=\"col-xs-2 col-sm-2 col-lg-2\"><h4>Descripcion</h4></label><div class=\"col-xs-10 col-sm-10 col-lg-10\"><input type=\"text\" id=\"descripcion"+contador+"\" name=\"descripcion\" class=\"form-control Input\" requiered = \"true\" ></div></div><div class=\"container-fluid\"><label class=\"col-xs-2 col-sm-2 col-lg-2\"><h4>Enlace</h4></label><div class=\"col-xs-10 col-sm-10 col-lg-10\"><input type=\"text\" id=\"enlace"+contador+"\" name=\"enlace\" class=\"form-control Input\" requiered = \"true\"></div></div><div class=\"container-fluid\"><label class=\"col-xs-2 col-sm-2 col-lg-2\"><h4>Tags</h4></label><div class=\"col-xs-10 col-sm-10 col-lg-10\"><input type=\"text\" id=\"tag"+contador+"\" name=\"tags\" class=\"form-control Input\" requiered = \"true\"></div></div><div class=\"container-fluid\"><label class=\"col-xs-2 col-sm-2 col-lg-2\"><h4>Precio Aliexpress</h4></label><div class=\"col-xs-10 col-sm-10 col-lg-10\"><input type=\"text\" id=\"precioali"+contador+"\" name=\"precioali\" class=\"form-control Input\" requiered = \"true\" value=\"0\" onkeypress=\"return valida(event)\"></div></div><div class=\"container-fluid\"><label class=\"col-xs-2 col-sm-2 col-lg-2\"><h4>Precio Final</h4></label><div class=\"col-xs-10 col-sm-10 col-lg-10\"><input type=\"text\" id=\"preciofinal"+contador+"\" name=\"preciofinal\" class=\"form-control Input\" readonly=\"true\" requiered = \"true\" value=\"0\"></div></div></div><div id=\"imagen"+contador+"\" name=\"imagen\" class=\"col-xs-4 col-sm-4 col-lg-4\"><legend class=\"hidden-xs\"><h4>Imagen</h4></legend><section><img id=\"imeg"+contador+"\"> <input id=\"cod64"+contador+"\" name=\"cod64\" type=\"hidden\" value=\"\">  </section></div></div></div>  <button type=\"button\" id=\"remover"+contador+"\" name=\"remover\" class=\"btn btn-danger center-block\"> Eliminar </button></div>");

    cantidadElementos = document.getElementsByName("precioali");

    for (var i = 0; i < cantidadElementos.length; i++) {
      //alert(cantidadElementos[i].id);

      valor = cantidadElementos[i].id.slice(-1);

      var precio = document.getElementById("precioali"+valor);
      precio.addEventListener("keyup", calculo);

      var imag = document.getElementById("imagen"+valor);
      imag.addEventListener("click", setId);

      var borrar = document.getElementById("remover"+valor);
      borrar.addEventListener("click", quitar);

      document.getElementById("imagen"+valor).addEventListener("paste", processEvent);
    }
        document.getElementById("txtCantidad").innerHTML = cantidadElementos.length;
/*
    for (i=1;i<=contador;i++)
    {
      var precio = document.getElementById("precioali"+i);
      precio.addEventListener("keyup", calculo);

      var imag = document.getElementById("imagen"+i);
      imag.addEventListener("click", setId);

      var borrar = document.getElementById("remover"+i);
      borrar.addEventListener("click", quitar);

      document.getElementById("imagen"+i).addEventListener("paste", processEvent);
    }
    i=0;*/
});
  //$("#precioali"+i).remove();

});

}())
