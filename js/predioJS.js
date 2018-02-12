var servicioPredio = "http://localhost/sigatWS/predio";

function predioInsertar(){
  var dataJson = '{"mun_id":"'+ document.getElementById("mun_id").value + '",\n\
                  "pre_nombre":"' + document.getElementById("pre_nombre").value + '",\n\
                  "pre_area":"' + document.getElementById("pre_area").value + '",\n\
                  "pre_lotes":"' + document.getElementById("pre_lotes").value + '",\n\
                  "per_cc":"' + document.getElementById("per_cc").value + '",\n\
                  "pre_fecha_reg":"Now()",\n\
                  "pre_fecha_act":"Now()",\n\
                  "pre_tec_reg":"'+sessionStorage.tec_id+'",\n\
                  "pre_tec_act":"'+sessionStorage.tec_id+'"}';
  $.ajax({
    url: servicioPredio,
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

function predioListar(filtro){
  var valido = validarBuscar();
  if(valido){
    $.ajax({      
      url: servicioPredio+"/listar/"+filtro,
      type: "GET",
      timeout: 100000,
      dataType: "json"                            
    }).done( function( data ){
      var datos = JSON.parse( data );
      predioVerLista(datos);
      console.log(JSON.stringify(datos));
    }).fail( function( jqXHR, textStatus, errorThrown ){
      alert("Error en Listar");
    }).always( function(){

    }); 
  }              
}
function predioListarxMunicipio(filtro){
  var valido = true;
  if(valido){
    $.ajax({      
      url: servicioPredio+"/listarxMunicipio/"+filtro,
      type: "GET",
      timeout: 100000,
      dataType: "json"                            
    }).done( function( data ){
      var datos = JSON.parse( data );
      selectPredio(datos,'');
      console.log(JSON.stringify(datos));
    }).fail( function( jqXHR, textStatus, errorThrown ){
      alert("Error en Listar");
    }).always( function(){

    }); 
  }              
}
function predioListarxUbi(filtro){
  var valido = true;
  if(valido){
    $.ajax({      
      url: servicioPredio+"/listarxUbi/"+filtro,
      type: "GET",
      timeout: 100000,
      dataType: "json"                            
    }).done( function( data ){
      var datos = JSON.parse( data );
      selectPredio(datos,'');
      console.log(JSON.stringify(datos));
    }).fail( function( jqXHR, textStatus, errorThrown ){
      alert("Error en Listar");
    }).always( function(){

    }); 
  }              
}
function predioListarxRuta(filtro){
  var valido = true;
  if(valido){
    $.ajax({      
      url: servicioPredio+"/listarxRuta/"+filtro,
      type: "GET",
      timeout: 100000,
      dataType: "json"                            
    }).done( function( data ){
      var datos = JSON.parse( data );
      selectPredio(datos,'');
      console.log(JSON.stringify(datos));
    }).fail( function( jqXHR, textStatus, errorThrown ){
      alert("Error en Listar");
    }).always( function(){

    }); 
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

function predioActualizar(){
  var dataJson = '{"pre_id":"'+ document.getElementById("pre_id").value + '",\n\
                  "pre_nombre":"' + document.getElementById("pre_nombre").value + '",\n\
                  "pre_area":"' + document.getElementById("pre_area").value + '",\n\
                  "pre_lotes":"' + document.getElementById("pre_lotes").value + '",\n\
                  "per_cc":"' + document.getElementById("per_cc").value + '",\n\
                  "pre_fecha_act":"Now()",\n\
                  "pre_tec_act":"'+sessionStorage.tec_id+'",\n\
                  "pre_id_aux":"'+document.getElementById("pre_id_aux").value+'"}';
  $.ajax({
    url: servicioPredio,
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

function predioVerLista(datos){ 
  $("#tablaResultados tbody").remove();
  var tr;  
  $.each(datos, function(i){
    tr = $("<tr>");
    tr.append(
      "<td><input type='radio'name='pre_sel' value='"+datos[i].pre_id+"'/></td>"
      +"<td>"+datos[i].pre_id+"</td>"
      +"<td>"+datos[i].pre_nombre+"</td>"
      +"<td>"+datos[i].mun_descripcion
      +"<td>"+datos[i].pre_area
      +"<td>"+datos[i].per_nombre+" "+datos[i].per_apellido
      +"</tr>"
    );
    $('#tablaResultados').append(tr);
  });
}

function predioId(ruta){
  var valido = validarRadio();
  if(valido){
    sessionStorage.Pre_id = $('input:radio[name=pre_sel]:checked').val();
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
  if($('input:radio[name=pre_sel]:checked').val()){
    return true;
  }
  return false;
}

function volver(){
  window.history.back();
  $("#botonBuscar").click();
}

function predioBuscar(){
  $.ajax({      
    url: servicioPredio+"/buscar/"+sessionStorage.Pre_id,
    type: "GET",
    timeout: 100000,
    dataType: "json"			                
  }).done( function( data ){
    var datos = JSON.parse( data );
    console.log(JSON.stringify(datos));
    predioVerBusqueda(datos);
    sessionStorage.removeItem('Pre_id');
  }).fail( function( jqXHR, textStatus, errorThrown ){
    alert("Error en predioBuscar()");
  }).always( function(){

  });            
}

function predioVerBusqueda(datos){ 
  $('#Historial-Predio div').remove();

  var str = $("<div class = ''>");
  str.append(
    "<h2>"+datos.pre_nombre
    +"<br>"+datos.pre_id+"</h2>"
    +"<p> REGISTRADO POR : "+datos.tec_reg_nombre+" El "+datos.pre_fecha_reg+"<br>"
    +"ACTUALIZADO POR : "+datos.tec_act_nombre+" El "+datos.pre_fecha_act+"</p>"
    +"</div>"
  );
  $("#HistorialPredio").append(str);
  $("#pre_id").val(datos.pre_id);
  $("#pre_id_aux").val(datos.pre_id);
  $("#pre_nombre").val(datos.pre_nombre);
  $("#pre_area").val(datos.pre_area);
  $("#pre_lotes").val(datos.pre_lotes);
  $("#per_cc").val(datos.per_cc);
  $("#dep_id").val(datos.dep_id);
  $("#dep_descripcion").val(datos.dep_descripcion);
  $("#mun_id").val(datos.mun_id);
  $("#mun_descripcion").val(datos.mun_descripcion);
//  departamentoListar(datos.dep_id);
//  municipioListar(datos.dep_id,datos.mun_id);
  productorListarxMunicipio(datos.mun_id,datos.per_cc);
  //selectProductor()
}
function selectPredio(datos,pre_id){
    var str = "";
    $("#pre_id option").remove();
    $("#pre_id_act option").remove();
    str=str+"<option value = 'null' selectted=''></option>";
    $.each(datos, function(i){
        str = str+"<option  value='";
        str=str+datos[i].pre_id;
        if(datos[i].pre_id==pre_id){
           str=str+"' selected=''>";  
       }else{
            str=str+"'>";
       }
        str=str+datos[i].pre_id+' '+datos[i].pre_nombre;
        str=str+"</option>";
    });
    
    $("#pre_id").append(str);
    $("#pre_id_act").append(str);
}

function GetProductor(filtro){
  
  $.ajax({      
    url: servicioPredio+"/buscar/"+filtro,
    type: "GET",
    timeout: 100000,
    dataType: "json"                      
  }).done( function( data ){
    var datos = JSON.parse( data );             
    var str = "";
    $("#per_cc option").remove();
    $("#per_cc_act option").remove();
    str=str+"<option value = 'null' selected=''></option>";
    
        str = str+"<option  value='";
        str=str+datos.per_cc;
        str=str+"' selected = '' >";
        str=str+datos.per_cc+' '+datos.per_nombre+' '+datos.per_apellido;
        str=str+"</option>";
    
    
    $("#per_cc").append(str);
    $("#per_cc_act").append(str);
  }).fail( function( jqXHR, textStatus, errorThrown ){
    alert("Error al obtener información del productor");
  }).always( function(){

  }); 
}
