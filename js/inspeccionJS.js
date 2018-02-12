var servicioInspeccion = "http://localhost/sigatWS/inspeccion";
var db = openDatabase("sigat", "1.0", "sigat_Local", 2 * 1024 * 1024);

function inspeccionInsertar(){
  var dataJson = '{"ins_fecha":"'+ document.getElementById("ins_fecha").value + '",\n\
                  "pre_id":"' + document.getElementById("pre_id").value + '",\n\
                  "per_cc":"' + document.getElementById("per_cc").value + '",\n\
                  "tec_id":"' + sessionStorage.tec_id + '",\n\
                  "ins_estado":"' + document.getElementById("ins_estado").value + '",\n\
                  "ins_obs":"'+document.getElementById("ins_obs").value+'"}';
  $.ajax({
    url: servicioInspeccion,
    type: "POST",
    timeout: 100000,
    dataType: "json",
    data: dataJson	                
  }).done( function(data){
      
   var datos = JSON.parse(data);
   swal({
      title:datos.titulo,
      text: datos.mensaje,
      type:datos.est,
      showCancelButton:false,
      confirmButtonColor: "#ac2925",
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      cancelButtonColor: "#ac2925",
      closeOnConfirm: false,
      closeOnCancel: false
      },function(isConfirm){
        if (isConfirm) {
          inspeccionVolver();
        } 
      }
    );
  }).fail( function( jqXHR, textStatus, errorThrown ){
    alert( "Error en insertar" );
  }).always( function(){

  }); 
}
function inspeccionListar(filtro){
  
 
    $.ajax({      
      url: servicioInspeccion+"/listar/"+filtro,
      type: "GET",
      timeout: 100000,
      dataType: "json"                            
    }).done( function( data ){
      var datos = JSON.parse( data );
      inspeccionVerLista(datos);
      //console.log(JSON.stringify(datos));
    }).fail( function( jqXHR, textStatus, errorThrown ){
      alert("Error en Listar");
    }).always( function(){

    }); 
                
}
function inspeccionVerLista(datos){ 
  $("#tablaResultados tbody").remove();
  var tr;  
  $.each(datos, function(i){
  	if(datos[i].ins_estado==true){
  		var estado = 'Satisfactorio'
  	}else{
  		var estado = 'Insatisfactorio'
  	}
    tr = $("<tr>");
    tr.append(
      "<td>"+datos[i].ins_fecha+"</td>"
      +"<td>"+datos[i].per_nombre+" "+datos[i].per_apellido+"</td>"
      +"<td>"+estado
      +"<td>"+datos[i].ins_obs
      +"</tr>"
    );
    $('#tablaResultados').append(tr);
  });
}
function reporteInspeccion(){
  swal({
    title:'Generación de Reporte',
    text: '¿Desea descargar los datos en formato xls?' ,
    type: 'warning',
    showCancelButton:true,
    confirmButtonColor: "#ac2925",
    confirmButtonText: "Descargar",
    cancelButtonText: "Cancelar",
    cancelButtonColor: "#ac2925",
    closeOnConfirm: true,
    closeOnCancel: true
    },function(isConfirm){
      if (isConfirm) {
        $("#tablaResultados").table2excel({
          filename: "Inspeccion.xls"
        });
      } 
    }
  );
   
}
function inspeccionVolver(){
	window.location = 'Gestion-Inspeccion.html'
}