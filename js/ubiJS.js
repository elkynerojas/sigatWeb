var servicioUbi = "http://localhost/sigatWS/ubi";

function ubiInsertar(){
  var dataJson = '{"tec_id":"'+ sessionStorage.tec_id + '",\n\
                  "vig_id":"' + document.getElementById("vig_id").value + '",\n\
                  "rut_id":"' + document.getElementById("rut_id").value + '",\n\
                  "cod_ruta":"' + document.getElementById("cod_ruta").value + '",\n\
                  "tra_id":"' + document.getElementById("tra_id").value + '",\n\
                  "ubi_fecha":"' + document.getElementById("ubi_fecha").value + '",\n\
                  "pre_id":"' + document.getElementById("pre_id").value + '",\n\
                  "prod_id":"' + document.getElementById("per_cc").value + '",\n\
                  "ubi_long":"' + document.getElementById("ubi_long").value + '",\n\
                  "ubi_lat":"' + document.getElementById("ubi_lat").value + '",\n\
                  "ubi_alt":"' + document.getElementById("ubi_alt").value + '",\n\
                  "ubi_ubicacion":"' + document.getElementById("ubi_ubicacion").value + '",\n\
                  "loc_id":"' + document.getElementById("loc_id").value + '",\n\
                  "arb_id":"'+document.getElementById("arb_id").value+'"}';
    //alert(dataJson);
  $.ajax({
    url: servicioUbi,
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
          volver();
        } 
      }
    );
  }).fail( function( jqXHR, textStatus, errorThrown ){
    alert( "Error en insertar" );
  }).always( function(){

  }); 
}
function ubiConsulta(){
  var dataJson = '{"rut_id":"'+ document.getElementById("rut_id").value + '",\n\
                  "ubi_fecha_ini":"' + document.getElementById("ubi_fecha_ini").value + '",\n\
                  "ubi_fecha_fin":"'+document.getElementById("ubi_fecha_fin").value+'"}';
    //alert(dataJson);
  $.ajax({
    url: servicioUbi+'/consulta',
    type: "POST",
    timeout: 100000,
    dataType: "json",
    data: dataJson                  
  }).done( function(data){
      
   var datos = JSON.parse(data);
   ubiVerLista(datos);
  }).fail( function( jqXHR, textStatus, errorThrown ){
    alert( "Error en insertar" );
  }).always( function(){

  }); 
}
function ubiListar(filtro){
  var valido = validarBuscar();
  if(valido){
    $.ajax({      
      url: servicioUbi+"/listar/"+filtro,
      type: "GET",
      timeout: 100000,
      dataType: "json"                            
    }).done( function( data ){
      var datos = JSON.parse( data );             
      ubiVerLista(datos);
    }).fail( function( jqXHR, textStatus, errorThrown ){
      alert("Error en Listar");
    }).always( function(){

    }); 
  }              
}

function ubiVerLista(datos){ 
  $("#tablaResultados tbody").remove();
  var tr;  
  $.each(datos, function(i){
    tr = $("<tr>");
    tr.append(
      "<td><input type='radio'name='ubi_sel' value= '"+"{\"ubi_fecha\":\""+datos[i].ubi_fecha+"\",\"tra_id\":\""+datos[i].tra_id+"\",\"pre_id\":\""+datos[i].pre_id+"\"}"+"'/></td>"
      +"<td>"+datos[i].vig_id+"</td>"
      +"<td>"+datos[i].reg_descripcion+"</td>"
      +"<td>"+datos[i].dep_descripcion+"</td>"
      +"<td>"+datos[i].mun_descripcion+"</td>"
       +"<td>"+datos[i].rut_id+"</td>"
      +"<td>"+datos[i].cod_ruta+"</td>"
      +"<td>"+datos[i].cod_ruta+datos[i].tra_id+"</td>"
      +"<td>"+datos[i].tit_descripcion+"</td>"
      +"<td>"+datos[i].tra_id+"</td>"
      +"<td>"+datos[i].atr_descripcion+"</td>"
      +"<td>"+datos[i].ubi_fecha+"</td>"
      +"<td>"+datos[i].ubi_long+"</td>"
      +"<td>"+datos[i].ubi_lat+"</td>"
      +"<td>"+datos[i].ubi_alt+"</td>"
      +"<td>"+datos[i].ubi_ubicacion+"</td>"
      +"<td>"+datos[i].pre_nombre+"</td>"
      +"<td>"+datos[i].per_nombre+" "+datos[i].per_apellido+"</td>"
      +"<td>"+datos[i].loc_descripcion+"</td>"
      +"<td>"+datos[i].arb_descripcion+"</td>"
      +"<td>"+datos[i].rut_nombre+"</td>"
      +"</tr>"
    );
    $('#tablaResultados').append(tr);
  });
}
function ubiListarTrampas(filtro){
  
    $.ajax({      
      url: servicioUbi+"/trampas/"+filtro,
      type: "GET",
      timeout: 100000,
      dataType: "json"                            
    }).done( function( data ){
      var datos = JSON.parse( data );             
      SelectTrampaUbi(datos,'');
    }).fail( function( jqXHR, textStatus, errorThrown ){
      alert("Error en Listar");
    }).always( function(){

    });               
}
function SelectTrampaUbi(datos,tra_id){
    var str = "";
    $("#tra_id option").remove();
    $("#tra_id_act option").remove();
    str=str+"<option value = 'null' selectted=''></option>";
    $.each(datos, function(i){
        str = str+"<option  value='";
        str=str+datos[i].tra_id;
        if(datos[i].tra_id==tra_id){
           str=str+"' selected=''>";  
       }else{
            str=str+"'>";
       }
        str=str+datos[i].tra_id;
        str=str+"</option>";
    });
    
    $("#tra_id").append(str);
    $("#tra_id_act").append(str);
}
function ubiBuscar(){
	var dataJson = $('input:radio[name=ubi_sel]:checked').val();
  $.ajax({      
    url: servicioProductor+"/buscar",
    type: "POST",
    timeout: 100000,
    dataType: "json",
    data: dataJson			                
  }).done( function( data ){
    var datos = JSON.parse( data );             
    console.log(JSON.stringify(datos));
  }).fail( function( jqXHR, textStatus, errorThrown ){
    alert("Campo de Busqueda Vacio");
  }).always( function(){

  });            
}
function validarBuscar(){
  if(document.getElementById("filtro").value){
    sessionStorage.filtro = document.getElementById("filtro").value;
    return true;
  }
  swal({
    title:'Falta un dato',
    text: 'Campo de Búsqueda Vacio' ,
    type: 'warning',
    showCancelButton:false,
    confirmButtonColor: "#ac2925",
    confirmButtonText: "Aceptar",
    cancelButtonText: "Cancelar",
    cancelButtonColor: "#ac2925",
    closeOnConfirm: true,
    closeOnCancel: false
    },function(isConfirm){
      if (isConfirm) {
        return false;
      } 
    }
  );
}

function validarRadio(){
  if($('input:radio[name=ubi_sel]:checked').val()){
    return true;
  }
  return false;
}
function reporteUbi(){
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
          filename: "trampeo.xls"
        });
      } 
    }
  );
   
}
function volver(){
  window.history.back();
  productorListar(sessionStorage.filtro);
}