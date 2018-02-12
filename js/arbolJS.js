var servicioLote = "http://localhost/sigatWS/arbol";


function arbolListar(filtro){
  
    $.ajax({      
      url: servicioLote+"/listar/"+filtro,
      type: "GET",
      timeout: 100000,
      dataType: "json"                            
    }).done( function( data ){
      var datos = JSON.parse( data );
            selectArbol(datos,'');
      console.log(JSON.stringify(datos));
    }).fail( function( jqXHR, textStatus, errorThrown ){
      alert("Error en Listar");
    }).always( function(){

    }); 
                
}

function selectArbol(datos,arb_id){
    var str = "";
    $("#arb_id option").remove();
    $("#arb_id_act option").remove();
    str=str+"<option value = 'null' selectted=''></option>";
    $.each(datos, function(i){
        str = str+"<option  value='";
        str=str+datos[i].arb_id;
        if(datos[i].arb_id==arb_id){
           str=str+"' selected=''>";  
       }else{
            str=str+"'>";
       }
        str=str+datos[i].arb_descripcion;
        str=str+"</option>";
    });
    
    $("#arb_id").append(str);
    $("#arb_id_act").append(str);
}
