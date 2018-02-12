var servicioRuta = "http://localhost/sigatWS/ruta";
//var servicioRuta = "http://localhost/sigatWS/ruta";

function rutaBuscar(mun_id){
  $.ajax({      
    url: servicioRuta+"/buscar/"+mun_id,
    type: "GET",
    timeout: 100000,
    dataType: "json"			                
  }).done( function( data ){
    var datos = JSON.parse( data );
    //alert(JSON.stringify(datos));             
    rutaVerBusqueda(datos);
  }).fail( function( jqXHR, textStatus, errorThrown ){
    alert("Error en rutaBuscar");
  }).always( function(){

  });            
}

function rutaListar(){
  
    $.ajax({      
      url: servicioRuta+"/listar/"+sessionStorage.cac_id,
      type: "GET",
      timeout: 100000,
      dataType: "json"                            
    }).done( function( data ){
      var datos = JSON.parse( data );
      selectRuta(datos);
      //console.log(JSON.stringify(datos));
    }).fail( function( jqXHR, textStatus, errorThrown ){
      alert("Error en Listar");
    }).always( function(){

    });                
}

function rutaVerBusqueda (datos){
	alert(JSON.stringify(datos));
	$("#rut_id").val(datos.rut_id);
	$("#cod_ruta").val(document.getElementById("mun_id").value +'0'+datos.rut_id);
}

function selectRuta(datos){
    var str = "";
    $("#rut_id option").remove();
   
    str=str+"<option value = 'null' selectted=''></option>";
    $.each(datos, function(i){
        str = str+"<option  value='";
        str=str+datos[i].rut_id;
        
        str=str+"'>";
       
        str=str+datos[i].rut_id+' '+datos[i].rut_nombre;
        str=str+"</option>";
    });
    
    $("#rut_id").append(str);
}