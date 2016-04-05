var elem;
var mem;
var oper,exp;
var deg;
function initcol() {
	 mem=document.getElementById("mem");
	 elem=document.getElementById("middle");
	 exp=document.getElementById("exp");
	 deg=document.getElementById("deg");
}
function adddigit (d){      //фун для добавления  чисел
	//var elem=document.getElementById("middle");
	if(elem.innerHTML == "0") {
		elem.innerHTML=d;
	}
	else {
		if(d == '.' && is_point(elem.innerHTML)){
			return;
		}
		elem.innerHTML=elem.innerHTML + d; // канкатенация
	}
} 
function reset(b){ //фун 
	switch(b){
		case"c":
		exp.innerHTML="";
		elem.innerHTML="0";
		break;
		case"ce":
		elem.innerHTML=mem.innerHTML="0";//elem.innterHTML="0";mem.innterHTML="0";
		break;
		case"m":
		mem.innerHTML="0";
		break;	
	}
}
function back(){
	var s=elem.innerHTML;
	elem.innerHTML="";
	for(var i=0;i<s.length-1;i++) {
		elem.innerHTML+=s[i];
	}
}
	function is_empty(s) { // функция которая проверяет  Пустая ли строка
		var i=0;
		while (i<s.length){     
			var c=s[i];
			if(c !=' ' && c!='0' ) {  // ! если операнды разные то условие выполняется,если операнды одинаковые то не выполняется 
				return false;
			}
			i++;
		}
		return true;
	}
function it_eval(val) {
	var c  =getlastsym();
	var el =elem.innerHTML;
	var ex =exp.innerHTML; 
if(c == "+" || c == "-" || c == "*" || c == "/") {
	if(is_empty(ex) && !is_empty(el)) {
	exp.innerHTML=elem.innerHTML+val;
	elem.innerHTML="0";
	}
	else if (!is_empty(ex) && is_empty(el)) {
		//так и должно быть;
	}
	else if (!is_empty(ex) && !is_empty(el)) {
	exp.innerHTML+=elem.innerHTML+val;
	elem.innerHTML="0";	
	}
	else if (is_empty(ex) && is_empty(el)) {
			
	}
	return;
}
if(is_empty(ex) && !is_empty(el)) {
	exp.innerHTML=elem.innerHTML+val;
	elem.innerHTML="0";
	}
	else if (!is_empty(ex) && is_empty(el)) {
		//так и должно быть;
		exp.innerHTML+=val; //добавил
	}
	else if (!is_empty(ex) && !is_empty(el)) {
		if(getlastsym() == ")") { 
		return alert("error");    //добавил
		 }                                           	
	exp.innerHTML+=elem.innerHTML+val;
	elem.innerHTML="0";	 
	}
	else if (is_empty(ex) && is_empty(el)) {
		//так и должно быть;	
	}
//exp.innerHTML=elem.innerHTML+val;
//elem.innerHTML="0";
return;	
	if(is_empty(elem.innerHTML)){
		//exp.innerHTML+=val;
		return;
	}			 	
			 	oper=val;
			 	exp.innerHTML+=elem.innerHTML + " " + oper + " ";
			 	elem.innerHTML="0";
			 	return;
			 	if(is_empty(mem.innerHTML)){
			 		mem.innerHTML=elem.innerHTML;
			 	    elem.innerHTML="0";
			 	}
			 	else {
			 		if(val == "/" && elem.innerHTML == "0"){
			 			alert("на ноль делить нельзя");
			 			return;
			 		}
			 		var s=mem.innerHTML + val + elem.innerHTML;
			 		var result=eval(s);
			 		mem.innerHTML=result;
			 		elem.innerHTML="0";		 
			 	}
			 } //finish it_eval
function it_assign() {
	if(oper == "pow") {
		elem.innerHTML=Math.pow(mem.innerHTML,elem.innerHTML);
		oper="=";
		return;
	}
	if(oper=="log"){
	elem.innerHTML=Math.log(mem.innerHTML) / Math.log(elem.innerHTML);
	oper="=";
	return;
	}
	if(oper=="root"){
		var x=elem.innerHTML;
		var y=mem.innerHTML;
	elem.innerHTML=Math.pow(x,parseFloat(1/y));  //z:=power(x,(1/N)
	oper="=";
	return;
	}
	if(!is_empty(exp.innerHTML) && !is_empty(elem.innerHTML)) {   ///изменил и добавил if
	var s=exp.innerHTML + elem.innerHTML;
	                //var s=mem.innerHTML + oper + elem.innerHTML;
			 		var result=eval(s);
			 		//mem.innerHTML=result;
			 		oper="=";
			 		elem.innerHTML=result;
			 		exp.innerHTML="";
			 	}

else {
	var s=exp.innerHTML;
	var result=eval(s);
	oper="=";
   elem.innerHTML=result;
			 		exp.innerHTML="";
}
}
	function is_point(s) {
		var i=0;
		while (i<s.length){
			var c=s[i];
			if(c == '.') { 
				return true;
			}
			i++;
		}
		return false;
	}
function minus() {
	if(is_empty(elem.innerHTML)) 
	{
		return;
	}
	if(elem.innerHTML[0] == "-") {
		elem.innerHTML=xsub(elem.innerHTML,1);
	}
	else {
		elem.innerHTML="-" + elem.innerHTML;
	}
}  
function xsub (s,pos) {   // фун которая копирует строку с назначеной позиции
	var result="";
	for(var i=pos;i<s.length;i++){
		result+=s[i];
	//if(result.length==count){ 
	  //  return result;
	//}
	}
	return result;
}
function share(){
	if(is_empty(elem.innerHTML)){
	return;
	}
	var m=mem.innerHTML;
	mem.innerHTML="1";
	it_eval("/");
	elem.innerHTML=mem.innerHTML;
	mem.innerHTML=m;
	
}  

function square () {
if(is_empty(elem.innerHTML)){
	return;
	}
	if(elem.innerHTML[0] == "-"){
		alert("перепишите основы математики");
		return;
	}
	var m=Math.sqrt(elem.innerHTML);
	mem.innerHTML=m;
	elem.innerHTML="0";
}
function percent() {
if(is_empty(elem.innerHTML)){
	return;
	}
if(is_empty(mem.innerHTML))	{
	mem.innerHTML=elem.innerHTML;
	elem.innerHTML="0";
	return;
}		
var x=elem.innerHTML;
var y=mem.innerHTML;
var result=x*100/y;	
mem.innerHTML=result;
elem.innerHTML="0"
}
function assign_pi() {
	elem.innerHTML=Math.PI;
}
function evalstring(s) {
	var result=eval(s);
	elem.innerHTML=result;
	exp.innerHTML="";
}
function sin() {
	var x=exp.innerHTML+elem.innerHTML;
	var s="Math.sin(("+x+")";
	s+=deg.innerHTML =="Rad" ? ")" : "*Math.PI/180)";
	evalstring(s);
}
	

function cos() {
	var x=exp.innerHTML+elem.innerHTML;
	 var s="Math.cos(("+x+")";
	 s+=deg.innerHTML =="Rad"  ? ")" : "*Math.PI/180)";
	   evalstring(s);
	
}

function tan(){
	var x=exp.innerHTML+elem.innerHTML;
	var s="Math.tan(("+x+")";
	s+=deg.innerHTML =="Rad" ? ")" : "*Math.PI/180)" 
	evalstring(s);
}

function kwadr() {
if(is_empty(elem.innerHTML)){
	return;
	}
	var s=elem.innerHTML + "*" + elem.innerHTML;
	elem.innerHTML=eval(s);           
}
function sin1() {
	if(is_empty(elem.innerHTML)){
	return;
	}
	var s="1/Math.sin("+elem.innerHTML+")";
	elem.innerHTML=eval(s);
}
function cos1() {
if(is_empty(elem.innerHTML)){
	return;
	}
	var s="1/Math.cos("+elem.innerHTML+")";
	elem.innerHTML=eval(s);	
}
function tan1(){
if(is_empty(elem.innerHTML)){
	return;
	}
	var s="1/Math.tan("+elem.innerHTML+")";
	elem.innerHTML=eval(s);		
}
function xpowy() {
	mem.innerHTML=elem.innerHTML;
	elem.innerHTML="0";
	oper="pow";
	//Math.pow(mem.innerHTML,elem.innerHTML);
}
function rootXY(){ 
	mem.innerHTML=elem.innerHTML;
	elem.innerHTML="0";
	oper="root";                                               //z:=power(x,(1/N)
	                                              //корень игриковой степени из 	
}
function log(){
	if(is_empty(elem.innerHTML)){
	return;
	}
	mem.innerHTML=elem.innerHTML;
	elem.innerHTML="0";
	oper="log";
}

function tenpowx(){
	elem.innerHTML=Math.pow(10,elem.innerHTML);
}
function epowx(){
	elem.innerHTML=Math.pow(Math.E,elem.innerHTML);
}
function fake() {
	if(is_empty(elem.innerHTML)){
	return;
	}
	var s=parseInt(elem.innerHTML);
	//elem.innerHTML=fak(s);
	//return;
	var m=1;  //м=для хранения предыдуших результатов
	for(var i=1;i<=s;i++){
	m*=i;     //m=m*i
	}
	elem.innerHTML=m;
}
function fak(n) {
	if(n == 1) {
		return n;
	}
	var x=fak(n-1);
	var y=n*x;
	return y;  //return n*fak(n-1)
}

function ln(){
	if(is_empty(elem.innerHTML)){
	return;
	}
	var s=elem.innerHTML;
	var result=Math.log(s);
	elem.innerHTML="0";
	mem.innerHTML=result;
}
function getlastsym() {
	var s=exp.innerHTML;
	for(var i=s.length-1;i>=0;i--) {
		var c=s[i];
		if(c!= " ") {
			return s[i];
		}
	}
	return "";
}
function bracket (b) {
	var c=getlastsym();
	var counL=countOf("(");
	var counR=countOf(")");
	if(b==")" && counL <= counR ) {
		return;
		}
	switch(c) {
		case"+":case "-": case"*":case"/":case"":
		if(b==")") {	 
			exp.innerHTML+=elem.innerHTML+b;
			elem.innerHTML="0";
		}
		else {
	    exp.innerHTML+=b;
	   }
	    break;
	    default:
	    //alert(counL + " " + counR + " " + (counL-counR));
	    if(getlastsym() == b) {    
	    	exp.innerHTML+=b;
	    	elem.innerHTML="0";
	    }
	    else {
	    alert("нельзя");
	    }                         
	    break;                      
	}
	return;
}
function countOf(sym) {
var s=exp.innerHTML;
var count=0;
for(var i=0;i<s.length;i++)	 {
	if(s[i] == sym) {
		count++;
	}
}
return count;
}
function Deg() {
var rad;
if(deg.innerHTML == "Deg"){
	deg.innerHTML = "Rad";
	rad=true;
	
}
else {
	rad=false;
	deg.innerHTML = "Deg";
  }
 /*if(rad) {
 	elem.innerHTML*=Math.PI/180;
 }
 else {
 	elem.innerHTML*=180/Math.PI;
 }
 */
}
	

