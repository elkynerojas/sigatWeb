var servicioTecnico = "http://localhost/sigatWS/tecnico";
//var servicioTecnico = "http://192.168.1.33/sigatWS/productor";
function tecnicoInsertar(){
  var val = confContrasena();
  if (val){


    var dataJson = '{"per_cc":"'+ document.getElementById("per_cc").value + '",\n\
                    "per_nombre":"' + document.getElementById("per_nombre").value + '",\n\
                    "per_apellido":"' + document.getElementById("per_apellido").value + '",\n\
                    "gen_id":"' + document.getElementById("gen_id").value + '",\n\
                    "per_direccion":"' + document.getElementById("per_direccion").value + '",\n\
                    "per_correo":"' + document.getElementById("per_correo").value + '",\n\
                    "per_telefono":"' + document.getElementById("per_telefono").value + '",\n\
                    "cac_id":"' + sessionStorage.cac_id + '",\n\
                    "tip_id":"2",\n\
                    "tec_fecha_reg":"Now()",\n\
                    "tec_fecha_act":"Now()",\n\
                    "adm_id":"'+sessionStorage.adm_id+'",\n\
                    "usu_usuario":"'+document.getElementById("usu_usuario").value+'",\n\
                    "tiu_id":"2"'+',\n\
                    "usu_contrasena":"'+document.getElementById("usu_contrasena").value+'",\n\
                    "est_id":"'+document.getElementById("est_id").value+'"}';
    $.ajax({
      url: servicioTecnico+"/insert",
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
  }else{
    swal({
        title:"Confirmar Contraseña",
        text: "Las contraseñas no coinciden",
        type: "error",
        showCancelButton:false,
        confirmButtonColor: "#ac2925",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#ac2925",
        closeOnConfirm: true,
        closeOnCancel: false
        }
      );
  }
}
function tecnicoActualizar(){
    var dataJson = '{"per_cc":"'+ document.getElementById("per_cc").value + '",\n\
                    "per_cc_aux":"'+ document.getElementById("per_cc_aux").value + '",\n\
                    "per_nombre":"' + document.getElementById("per_nombre").value + '",\n\
                    "per_apellido":"' + document.getElementById("per_apellido").value + '",\n\
                    "gen_id":"' + document.getElementById("gen_id").value + '",\n\
                    "per_direccion":"' + document.getElementById("per_direccion").value + '",\n\
                    "per_correo":"' + document.getElementById("per_correo").value + '",\n\
                    "per_telefono":"'+document.getElementById("per_telefono").value+'"}';
    $.ajax({
      url: servicioTecnico+"/update",
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
            window.history.back();
          } 
        }
      );
    }).fail( function( jqXHR, textStatus, errorThrown ){
      alert( "Error en insertar" );
    }).always( function(){

    });  
}
function credenciales(){
  var val = confContrasena();
  if (val){
    var dataJson = '{"per_cc":"'+ document.getElementById("per_cc").value + '",\n\
                    "usu_usuario":"' + document.getElementById("usu_usuario").value + '",\n\
                    "usu_contrasena":"' + document.getElementById("usu_contrasena").value + '",\n\
                    "est_id":"'+document.getElementById("est_id").value+'"}';
    $.ajax({
      url: servicioTecnico + "/credencial",
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
            window.history.back();
          } 
        }
      );
    }).fail( function( jqXHR, textStatus, errorThrown ){
      alert( "Error en insertar" );
    }).always( function(){

    });
  }else{
    swal({
        title:"Datos no válidos",
        text: "Error en los datos ingresados",
        type: "error",
        showCancelButton:false,
        confirmButtonColor: "#ac2925",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#ac2925",
        closeOnConfirm: true,
        closeOnCancel: false
        }
      );
  }  
}
function tecnicoClave(){
  var cont = document.getElementById("usu_contrasena_new").value;
  var conf_cont = document.getElementById("conf_contrasena").value;
  if (cont == conf_cont){
    var dataJson = '{"usu_usuario":"'+ sessionStorage.usuario + '",\n\
                    "usu_contrasena":"' + document.getElementById("usu_contrasena").value + '",\n\
                    "usu_contrasena_new":"'+document.getElementById("usu_contrasena_new").value+'"}';
    $.ajax({
      url: servicioTecnico+'/clave',
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
            window.history.back();
          } 
        }
      );
    }).fail( function( jqXHR, textStatus, errorThrown ){
      alert( "Error en insertar" );
    }).always( function(){

    }); 
  }else{
    swal({
        title:"Confirmar Contraseña",
        text: "Error en los datos ingresados",
        type: "error",
        showCancelButton:false,
        confirmButtonColor: "#ac2925",
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
        cancelButtonColor: "#ac2925",
        closeOnConfirm: true,
        closeOnCancel: false
        }
      );
  }
}
function confContrasena(){
  var usu_usuario = document.getElementById("usu_usuario").value;
  var usu_contrasena = document.getElementById("usu_contrasena").value;
  var conf_contrasena = document.getElementById("conf_contrasena").value
  if(usu_contrasena == "" || usu_usuario == "" || usu_usuario == ""){
    return false;
  }
  if (usu_contrasena != conf_contrasena){
    return false;
  }else{
    return true;
  }
}
function tecnicoListar(filtro){
  var valido = validarBuscar();
  if(valido){
    $.ajax({      
      url: servicioTecnico+"/listar/"+filtro,
      type: "GET",
      timeout: 100000,
      dataType: "json"                            
    }).done( function( data ){
      var datos = JSON.parse( data );
      console.log(datos);             
      tecnicoVerLista(datos);
    }).fail( function( jqXHR, textStatus, errorThrown ){
      alert("Error en Listar");
    }).always( function(){

    }); 
  }              
}
function tecnicoBuscar(){
    //alert("prod-listar = "+document.getElementById("filtro").value);
    $.ajax({      
            url: servicioTecnico+"/buscar/"+sessionStorage.tec_id,
            type: "GET",
            timeout: 100000,
            dataType: "json"			                
    }).done( function( data ){
            var datos = JSON.parse( data ); 
            console.log("listar js "+JSON.stringify(datos));               
            TecnicoVerDatos(datos);
            TecnicoVerBusqueda(datos);
            //sessionStorage.removeItem('tec_id');
    }).fail( function( jqXHR, textStatus, errorThrown ){
            alert("Campo de Busqueda Vacio");
    }).always( function(){

    });            
}
function tecnicoVerLista(datos){ 
  $("#tablaResultados tbody").remove();
  var tr;  
  $.each(datos, function(i){
    tr = $("<tr>");
    tr.append(
      "<td><input type='radio'name='tec_sel' value='"+datos[i].tec_id+"'/></td>"
      +"<td>"+datos[i].per_cc+"</td>"
      +"<td>"+datos[i].tec_id+"</td>"
      +"<td>"+datos[i].per_nombre+" "+datos[i].per_apellido+"</td>"
      +"<td>"+datos[i].per_direccion+"</td>"
      +"<td>"+datos[i].per_telefono+"</td>"
      +"<td>"+datos[i].per_correo+"</td>"
      +"</tr>"
    );
    $('#tablaResultados').append(tr);
  });
}
function TecnicoVerBusqueda(datos){
  $('#per_cc').val(datos.per_cc);
  $('#per_cc_aux').val(datos.per_cc);
  $('#per_nombre').val(datos.per_nombre);
  $('#per_apellido').val(datos.per_apellido);
  $('#per_telefono').val(datos.per_telefono);
  $('#per_direccion').val(datos.per_direccion);
  $('#per_correo').val(datos.per_correo);
  $('#usu_usuario').val(datos.usu_usuario);
  if (datos.gen_id == 1){
    var str = "<option value = '1' selected = '' >MASCULINO</option>"
            + "<option value = '2'>FEMENINO</option>"
  }else{
    var str = "<option value = '1'  >MASCULINO</option>"
            + "<option value = '2' selected = ''>FEMENINO</option>"
  }
  $('#gen_id option').remove();
  $('#gen_id').append(str);
}
function TecnicoVerDatos(datos){
    
    $('#per_cc p').remove();
    $('#tec_id p').remove();
    $('#per_nombre p').remove();
    $('#per_apellido p').remove();
    $('#gen_descripcion p').remove();
    $('#per_direccion p').remove();
    $('#per_telefono p').remove();
    $('#per_correo p').remove();
    $('#per_cc').append("<p>"+datos.per_cc+"</p>");
    $('#tec_id').append("<p>"+datos.tec_id+"</p>");
    $('#per_nombre').append("<p>"+datos.per_nombre+"</p>");
    $('#per_apellido').append("<p>"+datos.per_apellido+"</p>");
    $('#gen_descripcion').append("<p>"+datos.gen_descripcion+"</p>");
    $('#per_direccion').append("<p>"+datos.per_direccion+"</p>");
    $('#per_telefono').append("<p>"+datos.per_telefono+"</p>");
    $('#per_correo').append("<p>"+datos.per_correo+"</p>");
}
function tecnicoId(ruta){
  var valido = validarRadio();
  if(valido){
    sessionStorage.tec_id = $('input:radio[name=tec_sel]:checked').val();
    window.location = ruta; 
  }else{
    swal({
      title:'Falta un dato',
      text: 'Seleccione un Técnico' ,
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
  if($('input:radio[name=tec_sel]:checked').val()){
    return true;
  }
  return false;
}
function volver(){
    window.location = 'Gestion-Tecnico.html'
}

