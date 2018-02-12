var servicioProductor = "http://localhost/sigatWS/productor";

function productorInsertar(){
  var dataJson = '{"per_cc":"'+ document.getElementById("per_cc").value + '",\n\
                  "per_nombre":"' + document.getElementById("per_nombre").value + '",\n\
                  "per_apellido":"' + document.getElementById("per_apellido").value + '",\n\
                  "gen_id":"' + document.getElementById("gen_id").value + '",\n\
                  "per_direccion":"' + document.getElementById("per_direccion").value + '",\n\
                  "per_correo":"' + document.getElementById("per_correo").value + '",\n\
                  "per_telefono":"' + document.getElementById("per_telefono").value + '",\n\
                  "tip_id":"3",\n\
                  "prod_fecha_reg":"Now()",\n\
                  "prod_fecha_act":"Now()",\n\
                  "prod_tec_reg":"'+sessionStorage.tec_id+'",\n\
                  "prod_tec_act":"'+sessionStorage.tec_id+'",\n\
                  "prod_estado":"true",\n\
                  "mun_id":"'+document.getElementById("mun_id").value+'"}';
  $.ajax({
    url: servicioProductor+'/insert',
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

function productorActualizar(){
  var dataJson = '{"per_cc":"'+ document.getElementById("per_cc").value + '",\n\
                  "per_nombre":"' + document.getElementById("per_nombre").value + '",\n\
                  "per_apellido":"' + document.getElementById("per_apellido").value + '",\n\
                  "gen_id":"' + document.getElementById("gen_id").value + '",\n\
                  "per_direccion":"' + document.getElementById("per_direccion").value + '",\n\
                  "per_correo":"' + document.getElementById("per_correo").value + '",\n\
                  "per_telefono":"' + document.getElementById("per_telefono").value + '",\n\
                  "tip_id":"3",\n\
                  "prod_fecha_act":"Now()",\n\
                  "prod_tec_act":"'+sessionStorage.tec_id+'",\n\
                  "prod_estado":"true",\n\
                  "mun_id":"'+document.getElementById("mun_id").value+'",\n\
                  "per_cc_aux":"'+document.getElementById("per_cc_aux").value+'"}'
  $.ajax({
    url: servicioProductor,
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

function productorListar(filtro){
  var valido = validarBuscar();
  if(valido){
    $.ajax({      
      url: servicioProductor+"/listar/"+filtro,
      type: "GET",
      timeout: 100000,
      dataType: "json"                            
    }).done( function( data ){
      var datos = JSON.parse( data );             
      productorVerLista(datos);
    }).fail( function( jqXHR, textStatus, errorThrown ){
      alert("Error en Listar");
    }).always( function(){

    }); 
  }              
}
function productorListarxMunicipio(filtro,per_cc){
  
    $.ajax({      
      url: servicioProductor+"/listarxMunicipio/"+filtro,
      type: "GET",
      timeout: 100000,
      dataType: "json"                            
    }).done( function( data ){
      var datos = JSON.parse( data );
      //console.log(JSON.stringify(datos));
      selectProductor(datos,per_cc);
    }).fail( function( jqXHR, textStatus, errorThrown ){
      alert("Error en Listar");
    }).always( function(){

    }); 
                
}

function ListarAutomatico(){
    alert(sessionStorage.filtro);
    $("#filtro").val(sessionStorage.filtro);
    var valido = validarBuscar();
    if (sessionStorage.filtro){
        productorListar(sessionStorage.filtro);
    }
}

function productorId(ruta){
  var valido = validarRadio();
  if(valido){
    sessionStorage.Prod_id = $('input:radio[name=prod_sel]:checked').val();
    window.location = ruta; 
  }else{
    swal({
      title:'Falta un dato',
      text: 'Seleccione un Productor' ,
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
  if($('input:radio[name=prod_sel]:checked').val()){
    return true;
  }
  return false;
}

function volver(){
  window.history.back();
  productorListar(sessionStorage.filtro);
}

function productorBuscar(){
  $.ajax({      
    url: servicioProductor+"/buscar/"+sessionStorage.Prod_id,
    type: "GET",
    timeout: 100000,
    dataType: "json"			                
  }).done( function( data ){
    var datos = JSON.parse( data );             
    productorVerBusqueda(datos);
    sessionStorage.removeItem('Prod_id');
  }).fail( function( jqXHR, textStatus, errorThrown ){
    alert("Campo de Busqueda Vacio");
  }).always( function(){

  });            
}

function productorVerLista(datos){ 
  $("#tablaResultados tbody").remove();
  var tr;  
  $.each(datos, function(i){
    tr = $("<tr>");
    tr.append(
      "<td><input type='radio'name='prod_sel' value='"+datos[i].per_cc+"'/></td>"
      +"<td>"+datos[i].per_cc+"</td>"
      +"<td>"+datos[i].per_nombre+" "+datos[i].per_apellido+"</td>"
      +"<td>"+datos[i].mun_descripcion
      +"<td>"+datos[i].per_direccion
      +"<td>"+datos[i].per_telefono
      +"</tr>"
    );
    $('#tablaResultados').append(tr);
  });
}

function selectGenero(gen_id){
  $("#gen_id option").remove();
  switch(gen_id){
    case '1': 
      var str = "<option value = '1' selected = '' >Masculino</option>"
              +"<option value = '2' > Femenino</option>";
      break;
     case '2': 
      var str = "<option value = '1' >Masculino</option>"
              +"<option value = '2' selected = '' > Femenino</option>";
      break;
    }
    $("#gen_id").append(str);
}
function selectProductor(datos,per_cc){
    var str = "";
    $("#per_cc option").remove();
    $("#per_cc_act option").remove();
    str=str+"<option value = 'null' selectted=''></option>";
    $.each(datos, function(i){
        str = str+"<option  value='";
        str=str+datos[i].per_cc;
        if(datos[i].per_cc==per_cc){
           str=str+"' selected=''>";  
       }else{
            str=str+"'>";
       }
        str=str+datos[i].per_nombre+' '+datos[i].per_apellido;
        str=str+"</option>";
    });
    
    $("#per_cc").append(str);
    $("#per_cc_act").append(str);
}
function productorVerBusqueda(datos){ 
  $('#Historial-Productor div').remove();

  var str = $("<div class = ''>");
  str.append(
    "<h2>"+datos.per_nombre+" " +datos.per_apellido
    +"<br>"+datos.per_cc+"</h2>"
    +"<p> REGISTRADO POR : "+datos.tec_reg_nombre+" El "+datos.prod_fecha_reg+"<br>"
    +"ACTUALIZADO POR : "+datos.tec_act_nombre+" El "+datos.prod_fecha_act+"</p>"
    +"</div>"
  );
  $("#HistorialProductor").append(str);
  $("#per_cc").val(datos.per_cc);
  $("#per_cc_aux").val(datos.per_cc);
  $("#per_nombre").val(datos.per_nombre);
  $("#per_apellido").val(datos.per_apellido);
  $("#per_direccion").val(datos.per_direccion);
  $("#per_telefono").val(datos.per_telefono);
  $("#per_correo").val(datos.per_correo);
  departamentoListar(datos.dep_id);
  municipioListar(datos.dep_id,datos.mun_id);
  selectGenero(datos.gen_id);
}

function productorAsignar(filtro){
  $.ajax({      
    url: servicioProductor+"/buscar/"+filtro,
    type: "GET",
    timeout: 100000,
    dataType: "json"                      
  }).done( function( data ){
    var datos = JSON.parse( data );             
    $("prod_id").val(datos.per_cc)
  }).fail( function( jqXHR, textStatus, errorThrown ){
    alert("Error al obtener información del productor");
  }).always( function(){

  }); 
}
