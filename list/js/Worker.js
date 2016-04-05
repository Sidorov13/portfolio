onmessage = function(e) {
    if(e.data.cmd && e.data.cmd === "start") {
    //self.result=[];
     self.ident  =e.data.id;
    //console.log(e.data.name + "начало расчета...");
     this.points=[];
    var name=e.data.name;
    var shop =e.data.list.shop;
    
    this.hash = new Object();
    this.hash["магазин"] = shop;
    
    for(var i=0;i<e.data.list.products.length;i++) {
        var item=e.data.list.products[i];
        points.push(item.name);
        this.hash[item.name]=item;
    };
    
    dowork(name,shop.name,this.points);
    //console.log("finish",self.ident);
    self.postMessage({cmd:"finish"});

    }
    else {
        console.log("the end ");
    }
    
}
 dowork=function(name,shop,ar){    //показывает все варианты маршрута
    var x=[];
     //var ar=this.points;
    for(var i=0;i<ar.length;i++) {
        if(name.indexOf(ar[i]+".") == -1) {
            x.push(name + ar[i]+".");
        }
    }
    if(x.length == 0) {
        name=shop + name + shop;
        var d=dist(name);
        //self.result.push({path:name,d:d});
        //console.log(name + "  " + d + "  расчет закончен " + self.ident);
        self.postMessage({path:name,d:d,cmd:"result"});
        return;
    }
    for(var i=0;i<x.length;i++) {
        var mas=[];
        for(var j=0;j<ar.length;j++) {
            
            if(x[i].indexOf(ar[j]+".") == -1) {
                mas.push(ar[j]);
            }
        }
        //dowork(mas,x[i]);
        dowork(x[i],shop,mas);
    }
}
//}
 dist=function(path) {   //длинна маршрута
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
function distpoints(name1,name2){
    var p1 =  this.hash[name1];
    var p2 = this.hash[name2];
    //var p1=productfind(name1);
    //var p2=productfind(name2);
    var dx=p2.x-p1.x;
    var dy=p2.y-p1.y;
    var d=Math.sqrt(dx * dx + dy * dy);
    return d;
}
