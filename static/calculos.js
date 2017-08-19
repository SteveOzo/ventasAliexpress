(function(){
  var calculo = function() {
      var precio = document.getElementById("precioali");
      var finalprice = precio.value*2;
      //alert(precio.value*2);
      var final = document.getElementById("preciofinal");
      final.setAttribute("value", finalprice);
  }



  var anadirProducto = function() {
  /*  alert("gola");
    var padre = document.getElementById("contenedorproductos");
    var codigo = document.createTextNode("<div class=\"form-group\"><label class=\"col-xs-2\"><h4>Descripcion</h4></label><div class=\"col-xs-offset-2\"><input type=\"text\" id=\"descripcion\" name=\"descripcion\" class=\"form-control Input\"></div></div>");
    padre.appendChild(codigo);*/
    var padre = document.getElementById("contenedorproductos"),
        eldiv= document.createElement("div"),
        ellabel = document.createElement("label"),
        elh4 = document.createElement("h4"),
        elotrodiv = document.createElement("div"),
        elinput = document.createElement("input");

        eldiv.setAttribute("class","form-group");
        ellabel.setAttribute("class","col-xs-2");
        var contenido = document.createTextNode("Precio Aliexpress");
        elh4.appendChild(contenido);
        elotrodiv.setAttribute("class","col-xs-offset-2");
        elinput.setAttribute("type","text");
        elinput.setAttribute("id","precioali");
        elinput.setAttribute("name","precioali");
        elinput.setAttribute("class","form-control Input");

        elotrodiv.appendChild(elinput);
        ellabel.appendChild(elh4);
        eldiv.appendChild(ellabel);
        eldiv.appendChild(elotrodiv);

        padre.appendChild(eldiv);
  }

  var elementos = function(){
    var textos = document.getElementsByName("precioali");
    alert(textos[0].value);
  }

  var precio = document.getElementById("precioali");
  precio.addEventListener("keyup", calculo);

  var anadir = document.getElementById("add");
  anadir.addEventListener("click", anadirProducto);
  anadir.addEventListener("click", elementos);
}())
