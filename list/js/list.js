//работа со списком
var lists=[];
var activlist;


function myList(name,shop) {
  this.name=name;
  this.products=[];
  this.shop=shop;    
  this.runButton=createButton("fa fa-map");
  this.runButton.id="run";
  
    //this.runButton.innerHTML="optimal.P";
	
  this.pExist=function(productName) {
    for(var i = 0 ; i < this.products.length ; i++) {
      if(productName === this.products[i].name) {
        alert("такой продукт уже есть");
        return true;
      }    
    }
    return false;
  };
  this.find=function(productName,onfound) {
    for(var i = 0 ; i < this.products.length ; i++) {
      if(productName === this.products[i].name) {
		if(onfound) {
		  onfound(this.products[i]);	
		}   
        return i;
      }    
    }
    return -1;
  };
  this.pushProduct=function(item) {	
    this.products.push(item);
    this.runButton.onclick=(this.products.length>=7) ? newpath : map;
  };
    
  this.popProduct=function(index) {
    this.products.splice(index,1);
    this.runButton.onclick=(this.products.length>=7) ? newpath : map;
  };

}
function addProduct(name) {
	
  var product={"name":name,"selected":false,"x":0,"y":0};
//activlist.products.push(product);
  activlist.pushProduct(product);
  var tr=createproductrow(product);
  var tb=document.getElementById("tb2");	
  tb.appendChild(tr);
    
}


function addList(name) {
  if(listexist(name)) {
    alert("такой список уже есть");
    return;
  }

  var market={"name":"магазин.","selected":false,"x":0,"y":0};
  var list=new myList(name,market);

  lists.push(list);
  add2table(list);
  storesave();
}
function myTrim(x) {
  return x.replace(/^\s+|\s+$/gm,'');
}
function addFrom() {
	
  var elem=document.getElementById("txtname");
 // var trimName_1=myTrim(elem.value);
  
  if(elem == null) {
    elem=document.getElementById("txt2");
	
    var trimName_2=myTrim(elem.value);
	
    if(trimName_2 === "") {
       alert("введите имя продукта");
       return;
    }
	if(activlist.pExist(trimName_2)) {
	  return;
    }
		//elem=document.getElementById("txt2");
    addProduct(trimName_2);
    storesave();
  }
  else if (elem) {
    var trimName_1=myTrim(elem.value);
	if(trimName_1 === "") {
	  alert("введите имя списка");
	  return;
	}
    addList(elem.value);
	elem.value="";
  }		
}

function add2table(item) {
	
  var table=document.getElementById("tb");
  var tr=createlistrow(item);

  tb.appendChild(tr);
}
function createlists() {
  storeload();
  
  var mine=document.getElementById("mine");
  mine.innerHTML="";
  var tb=createTable();
//tb.id="tb";

  var tr=document.createElement("tr");
  
 
  tb.appendChild(tr);

  td=create_td(tr,"col-xs-6");
  td.style.width="80%";
  td.style.paddingRight="25px";
  var input=document.createElement("input");
  input.type="text";
  input.placeholder="название списка";
  input.style.minWidth="100px";
  input.style.width="98%";
  //input.style.padding="2%";
  input.id="txtname";
  td.appendChild(input);

  td=create_td(tr,"col-xs-2");
  

  var button=createButton("fa fa-plus");//"glyphicon glyphicon-plus" 
  button.onclick=addFrom;
  td.appendChild(button);

  td=create_td(tr,"col-xs-2");
  var button=createButton();
  button.innerHTML="exit";
  button.onclick=openRegistration;
  td.appendChild(button);
  
  var tableTwo=createTable();
  tableTwo.id="tb";
  forone(lists,function(item) {
    tr=createlistrow(item);
	tableTwo.appendChild(tr);
    }
  );
  mine.appendChild(tb);
  mine.appendChild(tableTwo);
}

function openRegistration() {
  mine.innerHTML="";
  
  var div=document.getElementById("divLogin");
  
  div.style.display="block";
}

function createTable() {
    
  var tb=document.createElement("table");

  //tb.style.margin="0 auto"; //new // new 
  
  return tb;
}
function createButton(name) {
	
 var button=document.createElement("button");
 
 button.className="ser-btn-succes ser-btn-lg"; 
 if(name) {
	 
 var sp=document.createElement("span");
   sp.className=name;
   button.appendChild(sp);        
 }
 return button;
}
function createlistrow(list) {
	
  var	tr=document.createElement("tr");
  var td=create_td(tr,"col-xs-10");  //col-xs-11

  td.onclick=function() {
    createlist(this.innerHTML);
  };  
  td.innerHTML=list.name;
  td.style.cursor="pointer";
  
  td=create_td(tr,"col-xs-2");  //col-xs-1
  
  var button=createButton("fa fa-trash"); //"glyphicon glyphicon-trash"
  
  button.onclick=function() {
	  
    var row=this.parentNode.parentNode;
	var listname=row.childNodes[0].innerText;
	
	if (confirm("вы действительно хотите удалить ВЕСЬ СПИСОК" +  " " + listname + "?") ) {
		
      var index=-1;
	  
      forone(lists,function(item,i) {
 	    if(item.name==listname) {index=i;}
      } ); 
 	  lists.splice(index,1);
 	  row.parentNode.removeChild(row);
 	  storesave();
 	
    } 
	else {
	  alert("Вы нажали кнопку отмена");
    }
  };
  
  td.appendChild(button);
  return tr;
}

function create_td(row,className) {
	
  var td=document.createElement("td");
  
  if(className) {
    td.className=className;
  }
  row.appendChild(td);
  return td;
}
function listexist(listname) {
	
	for(var i=0;i<lists.length;i++) {
		
		if(listname ===lists[i].name) {
			return true;
		}
	}
	return false;
}
//function productexist(listname) {
//	for(var i=0;i<activlist.products.length;i++) {
//		if(listname ===activlist.products[i].name) {
//			return true;
//		}
//		
//	}
//	return false;
//}
function productfind(name) {
    
	for(var i=0;i<activlist.products.length;i++) {
		if(name ===activlist.products[i].name) {
		  return activlist.products[i];
		}
	}
    if(name + "." === activlist.shop.name) {
      return activlist.shop;
    }
	return null;
}

//создать список

function createlist(listname) {
  for(var i=0;i<lists.length;i++) {
    if(listname ===lists[i].name) {
	  activlist=lists[i];
	  break;
  }
}
    
    
  var mine=document.getElementById("mine");
  mine.innerHTML="";
    
  var dv=createTable(); //table; //document.createElement("div");
  dv.innerHTML=listname;
  mine.appendChild(dv);

  var tr=document.createElement("tr"); //new 
  var td=create_td;
  dv.appendChild(tr);

  td=create_td(tr);
  td.style.width="80%";
  td.style.paddingRight="25px"; 
  var input=document.createElement("input");
  
  input.style.minWidth="100px";
  input.type="text";
  input.id="txt2";
  input.placeholder="введите продукт";
  td.appendChild(input); //mine
 
  td=create_td(tr); // new 
  var button=createButton("fa fa-arrow-left");//tglyphicon glyphicon-arrow-left"
//button.style.margin = "5px 5px";
//button.style.width="2%";
  button.onclick=createlists;
  td.appendChild(button); //td.appendChild(button); //mine

  td=create_td(tr);   // new 
  var button2=createButton("fa fa-plus");
  //button2.style.width="2%";
  button2.onclick=addFrom;
  td.appendChild(button2); //td.appendChild(button2); mine


//mine.appendChild(button2);
//mine.appendChild(button);
  td=create_td(tr); // new 
  td.appendChild(activlist.runButton);
//mine.appendChild(activlist.runButton);


  var tb=createTable();
  tb.id="tb2";
  mine.appendChild(tb);


  for(var i=0;i<activlist.products.length;i++) {
    var product=activlist.products[i];
    var tr=createproductrow(product);
    //tr.id="tr2";
    tb.appendChild(tr);	
  }
}
var c=0;

function createproductrow(product) {
  tr=document.createElement("tr");	
  td=create_td(tr,"span4");
  td.innerHTML=product.name; 
  td.style.cursor="pointer";
	
  td=create_td(tr,"span3");
  td.innerText=roundFloat(product.x);

  td=create_td(tr,"span2");
  td.innerText=roundFloat(product.y);
  
  td=create_td(tr,"span1");

  var buttonCart=createButton("fa fa-shopping-cart");
    //fa fa-globe
  if(product.selected == true) {
	  buttonCart.firstChild.className="fa fa-cart-plus";
  }
  else {
  	buttonCart=createButton("fa fa-shopping-cart");
  } 
  buttonCart.onclick=function() {
	product.selected=!product.selected;
    if(product.selected == true) {
  	  buttonCart.firstChild.className="fa fa-cart-plus";
    }
    else {
    	buttonCart.firstChild.className="fa fa-shopping-cart";
    } 
    storesave();
  }

  td.appendChild(buttonCart);
  tr.appendChild(td);
  
  td=create_td(tr,"span1");
  
  var buttonGlobe=createButton("fa fa-globe");
 
  
  buttonGlobe.onclick=function() {
	buttonGlobe.firstChild.className="fa fa-spinner fa-spin";  	  
    getLocation(this);
	//buttonGlobe.firstChild.className="fa fa-globe";
		
  };
  
  td.appendChild(buttonGlobe);
  tr.appendChild(td);
	
  var clean=document.getElementById("txt2");
  clean.value="";
	
  td=create_td(tr,"span1");
  
  var button=createButton("fa fa-trash"); //glyphicon glyphicon-trash

  button.onclick=function() {
    var row=this.parentNode.parentNode;
	var listname=row.childNodes[0].innerText;
	if (confirm("вы действительно хотите удалить этот продукт" +  " " + listname + "?") ) {
	  var index=-1;
      for(var i=0;i<activlist.products.length;i++){
        var nameX=activlist.products[i].name;
 	    if(nameX === listname) {
          index=i;
        }
      }
      if(index == -1) {
        alert("can't find " + listname);
        return;
      }
 	  activlist.popProduct(index);
 	  row.parentNode.removeChild(row);
 	  storesave();
 	
    } 
	else {
		console.log("вы нажали отмена");
    }

  };
  td.appendChild(button);
  return tr;
}



function randomGeo(){		
  return {
    coords:{
	  longitude:Math.random()*360,
      latitude:Math.random()*360
	}
  };
	
}
function roundFloat(num) {
	
  var str=String(num);
  
  var mas="";
  
  for(var i=0;i<str.length;i++) {
    mas+=str[i];
    if(i==6) {
      return mas;
    }    
  }
    return mas;
}
function forone(array,callback) {
  for(var i=0;i<array.length;i++) {
    callback(array[i],i);
  }
}

function display_route (route,distants) {
	
    var sbody = document.getElementById("sbody");	 
    sbody.innerHTML = "Расстояние " + roundFloat(distants) +  " " + "Маршрут : " + route;
    toggleModal();
}

function sort_and_save (ordered_name) {
  
  var ordered_list = [];
  	
  for(var i = 0 ; i < ordered_name.length ; i++) { //заменил на 0 место 1 
    activlist.find(ordered_name[i] , function(product) {
  	 ordered_list.push(product);	
  	});
  }
  activlist.products = ordered_list;
  storesave();
  createlist(activlist.name);
}

function print_worker_result() {
  if(!result[0].d) {
    alert("нет данных с геолокации");
   	return;	
  }

  var product_name_order = result[0].path.split(".");
  product_name_order.shift();
  
  var route = "";	 
  for(var i = 0 ; i < product_name_order.length-2 ; i++) {
    route += product_name_order[i] + ".";
  }
  
  display_route(route , result[0].d);
  
  product_name_order.splice(product_name_order.length-2 , 2);
  
  sort_and_save(product_name_order);

}
//распечатать результаты расчетов
function print_result(route , route_length) {
  if(!route || !route_length) {
    alert("нет данных с геолокации");
    return;
  }
  display_route(route , route_length);
  
  sort_and_save(route.split("."));
}

function newpath() {
	
  var productsSliced=activlist.products.slice();  
  var marsh=[]; 
  var sump=0;
  var shop={"name":"магазин","selected":false,"x":0,"y":0};
  var point=shop;
  
  while (productsSliced.length > 0) {
	  
    var n=[];
	
	forone(productsSliced,function(item,i) {
		
	  var d=distant(point,item);
	  
	  n.push({d:d,index:i,product:item});		
    });	
	n.sort(function(a, b) {
      return a.d - b.d;
    });
    point=n[0].product;
    marsh.push(point);
    sump+=n[0].d;
    productsSliced.splice(n[0].index,1);
  }
  
  var ready_route="";
  
  forone(marsh,function(product) {
    ready_route+=product.name + ".";
  });
  print_result(ready_route,sump);

}

var hash;
var result;

function map() {
	
  var worker;
  result=[];
  //var d = new Date();
  //var n = d.getTime();
  var points=[];
  hash = new Object();
  hash["магазин"] = activlist.shop;
  
  for(var i=0;i<activlist.products.length;i++) {
	  
    var item=activlist.products[i];
	
    points.push(item.name);
    hash[item.name]=item;
  };
  if (!window. Worker){
    alert('WebWorkers не подерживаются!');
  }
  else {
        //worker = new Worker('js/Worker.js');
        //worker.postMessage({points:points,name:" + "});
  }
  //n=printime(n, "for N1");
  
  var worker_count=points.length;
  var workers=[];
  var target= {path:"one",d:6789879898989898687687687};
  
  for(var i=0;i<points.length;i++) {
        
    var w = new Worker('js/Worker.js');
	workers.push(w);	
    //w.addEventListener('message', function(e) {
		w.onmessage=function(e) {
      if(e.data.cmd === "finish") {
        worker_count--;
        if(worker_count === 0) {
          console.log("конец расчетов",result.length);
          result.push(target);
          print_worker_result();//n
          for(var i=0;i<points.length;i++) {
			  var ddd=workers[i];
			  console.log(ddd);			
              workers[i].terminate();
			  workers[i].onerror=workers[i].onmessage=null;
              workers[i]=null;
          }
      //конец расчетов ;
        }
      }
    else if(e.data.cmd === "result") {
          //result.push(e.data);
      if(e.data.d < target.d) {
        target = e.data;
      }
  //console.log('Worker said: ',worker_count, e.data);
    }
    else {
      console.log("error");
    }
                           
    };//,
      //false
                           //);
		w.onerror=function(e) {
			console.log(e);
		}
    // w.addEventListener('error', function(e) {
 //      conosle.log(e);
 //    },
 //      false);
      // workers.push(w);
  }
  for(var i=0;i<points.length;i++) {
	  
  var name=points[i]+".";
        //onestep(points,name);
        //workers[i].postMessage({list:activlist,name:name,cmd:"start",id:i});
		
  var x=JSON.parse(JSON.stringify(activlist));
		
  workers[i].postMessage({list:x,name:name,cmd:"start",id:i});
  }
}

var isModalVisible=true;

function toggleModal() {
	
  var modal=document.getElementById("modalDiv");
  var content=document.getElementById("modalContent");
 
    if(isModalVisible){
      modal.style.visibility="visible";
	  content.style.display="table";
    // $( "#modalContent" ).dialog("open");
      //modalContent.style.webkitAnimationPlayState = "running";
    }
    else {
		//$( "#modalContent" ).dialog("close");
      modal.style.visibility="hidden";
	    content.style.display="none";
     // modalContent.style.webkitAnimationPlayState = "paused";
        
    }
    isModalVisible=!isModalVisible;
}

// $(function() {
//   $( "#modalContent" ).dialog({
//     autoOpen: false,
//     show: {
//       effect: "blind",
//       duration: 1000
//     },
//     hide: {
//       effect: "explode",
//       duration: 1000
//     }
//   });
//
//    $( "#run" ).click(function() {
//      $( "#modalContent" ).dialog( "open" );
//   });
// });





function printime (n,text) {
	
  var d1 = new Date();
  var n1 = d1.getTime();
  var t  = n1-n;
  console.log(text + "  time = " + t);
  return n1;
}
function shortpath() { 
	
  var s=result;
  var i=0;
  
  while (i<s.length-1) {
	  
    var b=s[i];
	var c=s[i+1];
	
	if(b.d < c.d) {
	  s.splice(i+1,1);
	}
	else if(b.d > c.d) {
	  s.splice(i,1);
	}
	else {
	  i++;
	}
  }
}
function distpoints(name1,name2){
	
  var p1 = hash[name1];
  var p2 = hash[name2];
  var dx=p2.x-p1.x;
  var dy=p2.y-p1.y;
  var d=Math.sqrt(dx * dx + dy * dy);
  return d;
}
function distant(p1,p2){
	
  var dx=p2.x-p1.x;
  var dy=p2.y-p1.y;
  var d=Math.sqrt(dx * dx + dy * dy);
  return d;
}

function onestep(ar,name){    //показывает все варианты маршрута
	
  var x=[];
  
  for(var i=0;i<ar.length;i++) {
    if(name.indexOf(ar[i]+".") == -1) {
      x.push(name + ar[i]+".");
    }
  }
  if(x.length == 0) {
    name=activlist.shop.name + name + activlist.shop.name;
	
	var d=dist(name);
	
	result.push({path:name,d:d});
	console.log(name + "  " + d);
	return;
  }
  for(var i=0;i<x.length;i++) {
	  
    var mas=[];
	
    for(var j=0;j<ar.length;j++) {
      if(x[i].indexOf(ar[j]+".") == -1) {
        mas.push(ar[j]);
      }
    }
    onestep(mas,x[i]);
		//onestep(ar,x[i]);
  }
}

function dist(path) {   //длинна маршрута
	
  var m=path.split(".");
  var sum=0;
  
  for(var i=0;i<m.length-2;i++) {
	  
    var a=m[i];
    var b=m[i+1];
    var d=distpoints(a,b);
    sum+=d;
  }
  return sum;
	
}                                     
var demo;
var currentbutton;   
     //geoLocation
var request;
function errorHandler(err) {
  if(err.code == 1) {
    alert("Error: Access is denied!");
  }
  else if( err.code == 2) {
    alert("Error: Position is unavailable!");
  }
         }	
		 
function getLocation(btn) {
 
   currentbutton = btn;
// случайная  геолокация 
  var g=randomGeo();

  showPosition(g);
  return;	
  //  настоящая  геолокация   
  if (navigator.geolocation) {
	  
    var options = {timeout:60000};
	if(request == true)
	  { 
		alert("need request");
		return;
		
	  }
	request=true;
    navigator.geolocation.getCurrentPosition(showPosition,errorHandler,options);
	  
	
  }
  else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  request=false;
  var tr=currentbutton.parentNode.parentNode;
	
  tr.childNodes[1].innerHTML=roundFloat(position.coords.longitude);
  tr.childNodes[2].innerHTML=roundFloat(position.coords.latitude);
  
  var name=tr.childNodes[0].innerHTML;
  
  for(var i=0;i<activlist.products.length;i++) {
    if(name === activlist.products[i].name) {
      activlist.products[i].x=position.coords.longitude;
      activlist.products[i].y=position.coords.latitude;
      break;
    }
  }
currentbutton.firstChild.className="fa fa-globe";
storesave(); 
}

function containts(where,who) {	
  where="the  red revalotion";
  who="rev";
  
  var j,f="";
  
  for(var i=0;i<where.length;i++) {
    f="";
		
    var o=where[i];
	
    if(o == who[0]) {
	  for(j=0;j<who.length;j++) {
		  
	    var a=where[i+j];
		var b=who[j];
				
	    if(a != b ) {
	      break;
	    }
	    else {
	      f+=b;
	    }
	  }
  if(j == who.length) {
    console.log(f);
	return true;
  }	
   }
  }
  return false;
}

function storesave () {
	
  if(typeof(Storage) !== "undefined") {
	  
    var l=JSON.stringify(lists);
    localStorage.setItem('список',l);
    //alert(l,"storesave");
  }
} 

function storeload () {

  if(typeof(Storage) !== "undefined") {
	  
    var s = localStorage.getItem('список');
	
    if(s != null) {
     //lists=JSON.parse(s);
     //alert(s,"storeload");
	 
      var m=JSON.parse(s);
	
      lists=[];
      for(var i=0;i<m.length;i++) {
		  
        var item=new myList(m[i].name,m[i].shop);
		
        for(var j=0;j<m[i].products.length;j++) {
          item.pushProduct(m[i].products[j]);
        }
        lists.push(item);
      }
    }

  }
  else {
    alert("Sorry! No Web Storage support..");
  }
}
