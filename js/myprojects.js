
$(document).ready(function() {
  storeload();  
 
$("#recap").click(function() {
	load_content("resume.html");
	
});
$("#contacts").click(function() {
	load_content("contacts.html");
	
});
$("#main").click(function() {
	load_content("main.html");

  })
$("#portfolio").click(function() {
  load_content("portfolio.html");	

  }) 
  
});
var is_first_time=true;
function load_content(content,caption) {
	if(state.page ==  content) {
		return;
		
	}	
    state.page = content;
	storesave();
	
	$("#box_midle").empty();
	$("#box_midle").hide("slide");
	
  $.ajax({
    url: content
	})
  .done(function( data ) {
	   is_first_time=true;
       $("#box_midle").html(data);
	   if(content != "portfolio.html" ) {
		 animation();
	   }
	  
      });
	  //animation(); 	

}
var stack=[];

function populate_portfolio() {
	var url = "/data/portfolio.json"  +'?tm='+ new Date().getTime();
	$.ajax({
	  url: url , // url: "http://sergei13.maxbuk.com/data/portfolio.json" +'?tm='+ new Date().getTime(),
		async:true
	 })
	.done(function(data){
		var d=data;
        if (typeof data === 'string' || data instanceof String) {
        	d=$.parseJSON(data);
        }
		//d=$.parseJSON(data);
		stack=[];
		show_pages(d);
		//sr_slide();
	});
}
var  toggle3=true;

function animation() {
  $("#box_midle").show("slide"); 
}

function show_parent_pages() {
  var d=stack.pop();
  if(!d) {
    return;
  }
  show_pages(d); 
}
var first_page=true;

function show_pages(d){

   	  $("#container_portfolio").empty();
   if(!is_first_time) {
     $("#container_portfolio").hide("slide");

   }
	var s="";
	var dv;
	for(var i = 0 ; i < d.length ; i ++ ) {
		
		if(i % 4 == 0) {
			dv=$('<div class="row"></div>');
			$("#container_portfolio").append(dv);
			//s='<div class="row">';
			count=0;
		}
		s='<div class="col-sm-3" id="portfolio_box" data-toggle="tooltip" title="'+(d[i].info ? d[i].info : " допиши описание")
		+'"><div> <img src="'+d[i].image+
	    '"id="image_portfolio"/></div><div '+'class="title_portfolio"><h4>'+d[i].title+'</h4> <h5 id="title_portfolio'+i+'">'+d[i].link+'</h5></div></div>';
		$(dv).append(s);
		//$("#container_portfolio").show("slide");
		 if(is_first_time) {
	 		 animation();	 //sr_slide();
	 		 is_first_time=false;

	 		}
	 		else {
	          $("#container_portfolio").show("slide");
	 }
		 
		if(d[i].pages) {
		  $('#title_portfolio'+ i).prop('pages',d[i].pages);
		  $('#title_portfolio'+ i).click(function () {
			 stack.push(d);			 
			show_pages($(this).prop('pages'));
			
		  });	  	  		 
		}
     }
	 var mydiv='<div class="row" style="text-align:center">\
	 <div class="btn-group"role="group" aria-label="...">\
	 <button class="btn btn-warning btn-lg" id="back_to_menu"><span class="glyphicon glyphicon-menu-left"></span> </button>\
	 <button class="btn btn-warning btn-lg"><span class="glyphicon glyphicon-menu-right"></span></button></div></div>';
	 
	 $("#container_portfolio").append(mydiv);
	 $("#back_to_menu").click(function () {
	 show_parent_pages();
	 });	 
}


///send_email
function sendEmail(){
    var compose_message=$("#compose-message").val();
	var compose_from=$("#compose-from").val(); 
   	var url="/send_email.php?msg="+compose_message + '&email='+compose_from;
	 $.get(url,function(data) {	 	
	 });
	 $("#compose-from").val('');
	 $("#compose-message").val('');
  }
	
	//store
	var state = { page :"" };
	
	function storesave () {
	
	  if(typeof(Storage) !== "undefined") {
	  
	    var s=JSON.stringify(state);
	    localStorage.setItem('page_state',s);
	  }
	} 

  function storeload () {
	  
	var s;
	
    if(typeof(Storage) !== "undefined" && (s = localStorage.getItem('page_state')) != null ) {  
	  state=JSON.parse(s);
	  var page = state.page;
	  state.page = "";
	  load_content(page);
      return;
    }	
	  load_content("main.html");
  }















