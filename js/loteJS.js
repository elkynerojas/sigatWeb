var servicioLote = "http://localhost/sigatWS/lote";
//var servicioLote = "http://192.168.1.33/sigatWS/lote";

function loteListar(filtro){
  
    $.ajax({      
      url: servicioLote+"/listar/"+filtro,
      type: "GET",
      timeout: 100000,
      dataType: "json"                            
    }).done( function( data ){
      var datos = JSON.parse( data );
            loteVerLista(datos);
      console.log(JSON.stringify(datos));
    }).fail( function( jqXHR, textStatus, errorThrown ){
      alert("Error en Listar");
    }).always( function(){

    }); 
                
}
function loteInsertar(){
  var dataJson = '{"pre_id":"'+ sessionStorage.Pre_id + '",\n\
                  "lot_descripcion":"' + document.getElementById("lot_descripcion").value + '",\n\
                  "lot_area":"' + document.getElementById("lot_area").value + '",\n\
                  "lot_fecha_reg":"Now()",\n\
                  "lot_fecha_act":"Now()",\n\
                  "lot_tec_reg":"'+sessionStorage.tec_id+'",\n\
                  "lot_tec_act":"'+sessionStorage.tec_id+'"}';
  $.ajax({
    url: servicioLote,
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
function loteBuscar(){
  $.ajax({      
    url: servicioLote+"/buscar/"+sessionStorage.Lot_id,
    type: "GET",
    timeout: 100000,
    dataType: "json"			                
  }).done( function( data ){
    var datos = JSON.parse( data );
    console.log(JSON.stringify(datos));
    loteVerBusqueda(datos);
    sessionStorage.removeItem('Lot_id');
  }).fail( function( jqXHR, textStatus, errorThrown ){
    alert("Campo de Busqueda Vacio");
  }).always( function(){

  });            
}
function loteActualizar(){
  var dataJson = '{"lot_id":"'+ document.getElementById("lot_id").value + '",\n\
                  "lot_descripcion":"' + document.getElementById("lot_descripcion").value + '",\n\
                  "lot_area":"' + document.getElementById("lot_area").value + '",\n\
                  "lot_fecha_act":"Now()",\n\
                  "lot_tec_act":"'+sessionStorage.tec_id+'",\n\
                  "lot_id_aux":"'+document.getElementById("lot_id_aux").value+'"}';
  $.ajax({
    url: servicioLote,
    type: "PUT",
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
    alert( "Error en actualizar" );
  }).always( function(){

  }); 
}

function loteVerBusqueda(datos){ 
  $('#HistorialLote div').remove();

  var str = $("<div class = ''>");
  str.append(
    "<h2>"+datos.lot_descripcion
    +"<br>"+datos.lot_id+"</h2>"
    +"<p> REGISTRADO POR : "+datos.tec_reg_nombre+" El "+datos.lot_fecha_reg+"<br>"
    +"ACTUALIZADO POR : "+datos.tec_act_nombre+" El "+datos.lot_fecha_act+"</p>"
    +"</div>"
  );
  $("#HistorialLote").append(str);
  $("#lot_id").val(datos.lot_id);
  $("#lot_id_aux").val(datos.lot_id);
  $("#lot_descripcion").val(datos.lot_descripcion);
  $("#lot_area").val(datos.lot_area);
  $("#pre_id").val(datos.pre_id);
}
function loteVerLista(datos){ 
  $("#tablaResultados tbody").remove();
  var tr;  
  $.each(datos, function(i){
    tr = $("<tr>");
    tr.append(
      "<td><input type='radio'name='lot_sel' value='"+datos[i].lot_id+"'/></td>"
      +"<td>"+datos[i].lot_id+"</td>"
      +"<td>"+datos[i].lot_descripcion+"</td>"
      +"<td>"+datos[i].pre_nombre+"</td>"
      +"<td>"+datos[i].lot_area+"</td>"
      +"<td>"+datos[i].per_nombre+" "+datos[i].per_apellido+"</td>"
      +"</tr>"
    );
    $('#tablaResultados').append(tr);
  });
}
function LoteId(ruta){
  var valido = validarRadio();
  if(valido){
    sessionStorage.Lot_id = $('input:radio[name=lot_sel]:checked').val();
    window.location = ruta; 
  }else{
    swal({
      title:'Falta un dato',
      text: 'Seleccione un Predio' ,
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
            
          } 
      }
    );
  }   
}
function validarRadio(){
  if($('input:radio[name=lot_sel]:checked').val()){
    return true;
  }
  return false;
}
function volver(){
  window.history.back();
  $("#botonBuscar").click();
}
