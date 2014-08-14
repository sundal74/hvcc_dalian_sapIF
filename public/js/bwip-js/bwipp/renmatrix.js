// BEGIN renmatrix
BWIPJS.bwipp["renmatrix"]=function() {
	function $f0(){
		//#line 314: args {def} forall
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f1(){
		//#line 315: opt {def} forall
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	}
	function $f2(){
		//#line 324: /pixs8 [ pixx8 pixy mul {0} repeat ] def
		this.stk[this.ptr++]=0;
	}
	function $f3(){
		//#line 326: /i exch def
		this.stk[this.ptr++]="i"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 327: pixs8 pixx8 i mul pixs pixx i mul pixx getinterval putinterval
		var t=this.dstk.get("pixs8");
		if (t===undefined) throw new Error("dict: pixs8: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("pixx8");
		if (t===undefined) throw new Error("dict: pixx8: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
		var t=this.dstk.get("pixs");
		if (t===undefined) throw new Error("dict: pixs: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("pixx");
		if (t===undefined) throw new Error("dict: pixx: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
		var t=this.dstk.get("pixx");
		if (t===undefined) throw new Error("dict: pixx: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-3]=this.stk[this.ptr-3].subset(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=2;
		this.stk[this.ptr-3].assign(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=3;
	}
	function $f4(){
		//#line 334: /i exch def
		this.stk[this.ptr++]="i"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 335: imgstr i 8 idiv 2 copy get 2 7 i 8 mod sub exp cvi pixs i get mul add put
		var t=this.dstk.get("imgstr");
		if (t===undefined) throw new Error("dict: imgstr: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=8;
		this.stk[this.ptr-2]=Math.floor(this.stk[this.ptr-2]/this.stk[this.ptr-1]); this.ptr--;
		this.stk[this.ptr++]=2;
		if (typeof(this.stk[this.ptr-1])=="number") {
			for (var n=this.stk[--this.ptr],t=this.ptr+n; this.ptr<t; this.ptr++) this.stk[this.ptr]=this.stk[this.ptr-n];
		} else if (this.stk[this.ptr-1] instanceof BWIPJS.psstring||this.stk[this.ptr-1] instanceof BWIPJS.psarray) {
			this.stk[this.ptr-1].assign(0,this.stk[this.ptr-2]);
			this.stk[this.ptr-2]=this.stk[this.ptr-1].subset(0,this.stk[this.ptr-2].length);
			this.ptr--;
		} else {
			var src=this.stk[this.ptr-2]; var dst=this.stk[this.ptr-1];
			for (var i in src) dst[i]=src[i];
			this.stk[this.ptr-2]=dst;
			this.ptr--;
		}
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.stk[this.ptr++]=2;
		this.stk[this.ptr++]=7;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr++]=8;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]%this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr-2]=Math.pow(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr--;
		this.stk[this.ptr-1]=parseInt(this.stk[this.ptr-1],10);
		var t=this.dstk.get("pixs");
		if (t===undefined) throw new Error("dict: pixs: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("i");
		if (t===undefined) throw new Error("dict: i: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring || this.stk[this.ptr-2] instanceof BWIPJS.psarray)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].get(this.stk[this.ptr-1]);
		else this.stk[this.ptr-2]=this.stk[this.ptr-2][this.stk[this.ptr-1].toString()];
		this.ptr--;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]+this.stk[this.ptr-1]; this.ptr--;
		if (this.stk[this.ptr-3] instanceof BWIPJS.psstring || this.stk[this.ptr-3] instanceof BWIPJS.psarray)
			this.stk[this.ptr-3].set(this.stk[this.ptr-2], this.stk[this.ptr-1]);
		else this.stk[this.ptr-3][this.stk[this.ptr-2].toString()]=this.stk[this.ptr-1];
		this.ptr-=3;
	}
	function $f5(){
		//#line 342: (<      >) 8 string copy dup 1 anycolor putinterval cvx exec {255 div} forall setrgbcolor
		this.stk[this.ptr++]=255;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
	}
	function $f6(){
		//#line 342: (<      >) 8 string copy dup 1 anycolor putinterval cvx exec {255 div} forall setrgbcolor
		this.stk[this.ptr++]=BWIPJS.psstring("<      >");
		this.stk[this.ptr++]=8;
		this.stk[this.ptr-1]=BWIPJS.psstring(this.stk[this.ptr-1]);
		if (typeof(this.stk[this.ptr-1])=="number") {
			for (var n=this.stk[--this.ptr],t=this.ptr+n; this.ptr<t; this.ptr++) this.stk[this.ptr]=this.stk[this.ptr-n];
		} else if (this.stk[this.ptr-1] instanceof BWIPJS.psstring||this.stk[this.ptr-1] instanceof BWIPJS.psarray) {
			this.stk[this.ptr-1].assign(0,this.stk[this.ptr-2]);
			this.stk[this.ptr-2]=this.stk[this.ptr-1].subset(0,this.stk[this.ptr-2].length);
			this.ptr--;
		} else {
			var src=this.stk[this.ptr-2]; var dst=this.stk[this.ptr-1];
			for (var i in src) dst[i]=src[i];
			this.stk[this.ptr-2]=dst;
			this.ptr--;
		}
		this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
		this.stk[this.ptr++]=1;
		var t=this.dstk.get("anycolor");
		if (t===undefined) throw new Error("dict: anycolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-3].assign(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=3;
		var t=this.stk[--this.ptr];
		if (t instanceof Function) t.call(this); else this.eval(t);
		this.stk[this.ptr++]=$f5;
		var t21=this.stk[--this.ptr];
		var t20=this.stk[--this.ptr];
		for (t19 in t20) {
			if (t20 instanceof BWIPJS.psstring || t20 instanceof BWIPJS.psarray) {
				if (t19.charCodeAt(0) > 57) continue;
				this.stk[this.ptr++]=t20.get(t19);
			} else {
				this.stk[this.ptr++]=t19;
				this.stk[this.ptr++]=t20[t19];
			}
			if (t21.call(this)==-1) break;
		}
		this.setrgb(this.stk[this.ptr-3],this.stk[this.ptr-2],this.stk[this.ptr-1]);
		this.ptr-=3;
	}
	function $f7(){
		//#line 345: (<        >) 10 string copy dup 1 anycolor putinterval cvx exec {255 div} forall setcmykcolor
		this.stk[this.ptr++]=255;
		this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
	}
	function $f8(){
		//#line 345: (<        >) 10 string copy dup 1 anycolor putinterval cvx exec {255 div} forall setcmykcolor
		this.stk[this.ptr++]=BWIPJS.psstring("<        >");
		this.stk[this.ptr++]=10;
		this.stk[this.ptr-1]=BWIPJS.psstring(this.stk[this.ptr-1]);
		if (typeof(this.stk[this.ptr-1])=="number") {
			for (var n=this.stk[--this.ptr],t=this.ptr+n; this.ptr<t; this.ptr++) this.stk[this.ptr]=this.stk[this.ptr-n];
		} else if (this.stk[this.ptr-1] instanceof BWIPJS.psstring||this.stk[this.ptr-1] instanceof BWIPJS.psarray) {
			this.stk[this.ptr-1].assign(0,this.stk[this.ptr-2]);
			this.stk[this.ptr-2]=this.stk[this.ptr-1].subset(0,this.stk[this.ptr-2].length);
			this.ptr--;
		} else {
			var src=this.stk[this.ptr-2]; var dst=this.stk[this.ptr-1];
			for (var i in src) dst[i]=src[i];
			this.stk[this.ptr-2]=dst;
			this.ptr--;
		}
		this.stk[this.ptr]=this.stk[this.ptr-1]; this.ptr++;
		this.stk[this.ptr++]=1;
		var t=this.dstk.get("anycolor");
		if (t===undefined) throw new Error("dict: anycolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.stk[this.ptr-3].assign(this.stk[this.ptr-2],this.stk[this.ptr-1]); this.ptr-=3;
		var t=this.stk[--this.ptr];
		if (t instanceof Function) t.call(this); else this.eval(t);
		this.stk[this.ptr++]=$f7;
		var t25=this.stk[--this.ptr];
		var t24=this.stk[--this.ptr];
		for (t23 in t24) {
			if (t24 instanceof BWIPJS.psstring || t24 instanceof BWIPJS.psarray) {
				if (t23.charCodeAt(0) > 57) continue;
				this.stk[this.ptr++]=t24.get(t23);
			} else {
				this.stk[this.ptr++]=t23;
				this.stk[this.ptr++]=t24[t23];
			}
			if (t25.call(this)==-1) break;
		}
		this.setcmyk(this.stk[this.ptr-4],this.stk[this.ptr-3],this.stk[this.ptr-2],this.stk[this.ptr-1]);
		this.ptr-=4;
	}
	function $f9(){
		//#line 340: /anycolor exch def
		this.stk[this.ptr++]="anycolor"; //ident
		var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
		this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
		//#line 341: anycolor length 6 eq {
		var t=this.dstk.get("anycolor");
		if (t===undefined) throw new Error("dict: anycolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
		this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
		this.stk[this.ptr++]=6;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f6;
		//#line 343: } if
		var t22=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t22.call(this)==-1) return -1;
		}
		//#line 344: anycolor length 8 eq {
		var t=this.dstk.get("anycolor");
		if (t===undefined) throw new Error("dict: anycolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
		this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
		this.stk[this.ptr++]=8;
		if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
			this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()==this.stk[this.ptr-1];
		else this.stk[this.ptr-2]=this.stk[this.ptr-2]==this.stk[this.ptr-1];
		this.ptr--;
		this.stk[this.ptr++]=$f8;
		//#line 346: } if
		var t26=this.stk[--this.ptr];
		if (this.stk[--this.ptr]) {
			if (t26.call(this)==-1) return -1;
		}
	}
	function $f10(){
		//#line 354: backgroundcolor (unset) ne { gsave backgroundcolor setanycolor fill grestore } if 
		this.gsave();
		var t=this.dstk.get("backgroundcolor");
		if (t===undefined) throw new Error("dict: backgroundcolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("setanycolor");
		if (t===undefined) throw new Error("dict: setanycolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		this.fill();
		this.grestore();
	}
	function $f11(){
		//#line 355: color (unset) ne { color setanycolor } if
		var t=this.dstk.get("color");
		if (t===undefined) throw new Error("dict: color: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
		var t=this.dstk.get("setanycolor");
		if (t===undefined) throw new Error("dict: setanycolor: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	}
	function $f12(){
		//#line 356: pixx pixy true [ pixx 0 0 pixy neg 0 pixy ] {imgstr} imagemask
		var t=this.dstk.get("imgstr");
		if (t===undefined) throw new Error("dict: imgstr: undefined");
		if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	}
	//#line 303: 20 dict begin
	this.stk[this.ptr++]=20;
	this.stk[this.ptr-1]={};
	this.dict=this.stk[--this.ptr]; this.dstk.push(this.dict);
	//#line 305: /args exch def
	this.stk[this.ptr++]="args"; //ident
	var t=this.stk[this.ptr-2]; this.stk[this.ptr-2]=this.stk[this.ptr-1]; this.stk[this.ptr-1]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 308: /width 1 def
	this.stk[this.ptr++]="width"; //ident
	this.stk[this.ptr++]=1;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 309: /height 1 def
	this.stk[this.ptr++]="height"; //ident
	this.stk[this.ptr++]=1;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 310: /color (unset) def
	this.stk[this.ptr++]="color"; //ident
	this.stk[this.ptr++]=BWIPJS.psstring("unset");
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 311: /backgroundcolor (unset) def
	this.stk[this.ptr++]="backgroundcolor"; //ident
	this.stk[this.ptr++]=BWIPJS.psstring("unset");
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 314: args {def} forall
	var t=this.dstk.get("args");
	if (t===undefined) throw new Error("dict: args: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=$f0;
	var t2=this.stk[--this.ptr];
	var t1=this.stk[--this.ptr];
	for (t0 in t1) {
		if (t1 instanceof BWIPJS.psstring || t1 instanceof BWIPJS.psarray) {
			if (t0.charCodeAt(0) > 57) continue;
			this.stk[this.ptr++]=t1.get(t0);
		} else {
			this.stk[this.ptr++]=t0;
			this.stk[this.ptr++]=t1[t0];
		}
		if (t2.call(this)==-1) break;
	}
	//#line 315: opt {def} forall
	var t=this.dstk.get("opt");
	if (t===undefined) throw new Error("dict: opt: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=$f1;
	var t5=this.stk[--this.ptr];
	var t4=this.stk[--this.ptr];
	for (t3 in t4) {
		if (t4 instanceof BWIPJS.psstring || t4 instanceof BWIPJS.psarray) {
			if (t3.charCodeAt(0) > 57) continue;
			this.stk[this.ptr++]=t4.get(t3);
		} else {
			this.stk[this.ptr++]=t3;
			this.stk[this.ptr++]=t4[t3];
		}
		if (t5.call(this)==-1) break;
	}
	//#line 317: /width width cvr def
	this.stk[this.ptr++]="width"; //ident
	var t=this.dstk.get("width");
	if (t===undefined) throw new Error("dict: width: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 318: /height height cvr def
	this.stk[this.ptr++]="height"; //ident
	var t=this.dstk.get("height");
	if (t===undefined) throw new Error("dict: height: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=parseFloat(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 319: /color color cvlit def
	this.stk[this.ptr++]="color"; //ident
	var t=this.dstk.get("color");
	if (t===undefined) throw new Error("dict: color: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 320: /backgroundcolor backgroundcolor cvlit def
	this.stk[this.ptr++]="backgroundcolor"; //ident
	var t=this.dstk.get("backgroundcolor");
	if (t===undefined) throw new Error("dict: backgroundcolor: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 323: /pixx8 pixx 8 div ceiling cvi 8 mul def
	this.stk[this.ptr++]="pixx8"; //ident
	var t=this.dstk.get("pixx");
	if (t===undefined) throw new Error("dict: pixx: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=8;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]/this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr-1]=Math.ceil(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=parseInt(this.stk[this.ptr-1],10);
	this.stk[this.ptr++]=8;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 324: /pixs8 [ pixx8 pixy mul {0} repeat ] def
	this.stk[this.ptr++]="pixs8"; //ident
	this.stk[this.ptr++]=Infinity;
	var t=this.dstk.get("pixx8");
	if (t===undefined) throw new Error("dict: pixx8: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("pixy");
	if (t===undefined) throw new Error("dict: pixy: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr++]=$f2;
	var t8=this.stk[--this.ptr];
	var t6=this.stk[--this.ptr];
	for (var t7=0; t7<t6; t7++) {
		if (t8.call(this)==-1) break;
	}
	for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
	if (i < 0) throw "array: underflow";
	var t = this.stk.splice(i+1, this.ptr-1-i);
	this.ptr = i;
	this.stk[this.ptr++]=BWIPJS.psarray(t);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 325: 0 1 pixy 1 sub {
	this.stk[this.ptr++]=0;
	this.stk[this.ptr++]=1;
	var t=this.dstk.get("pixy");
	if (t===undefined) throw new Error("dict: pixy: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=1;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr++]=$f3;
	//#line 328: } for
	var t13=this.stk[--this.ptr];
	var t11=this.stk[--this.ptr];
	var t10=this.stk[--this.ptr];
	var t9=this.stk[--this.ptr];
	for (var t12=t9; t10<0 ? t12>=t11 : t12<=t11; t12+=t10) {
		this.stk[this.ptr++]=t12;
		if (t13.call(this)==-1) break;
	}
	//#line 329: /pixs pixs8 def
	this.stk[this.ptr++]="pixs"; //ident
	var t=this.dstk.get("pixs8");
	if (t===undefined) throw new Error("dict: pixs8: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 332: /imgstr pixs length 8 idiv string def
	this.stk[this.ptr++]="imgstr"; //ident
	var t=this.dstk.get("pixs");
	if (t===undefined) throw new Error("dict: pixs: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
	this.stk[this.ptr++]=8;
	this.stk[this.ptr-2]=Math.floor(this.stk[this.ptr-2]/this.stk[this.ptr-1]); this.ptr--;
	this.stk[this.ptr-1]=BWIPJS.psstring(this.stk[this.ptr-1]);
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 333: 0 1 pixs length 1 sub {
	this.stk[this.ptr++]=0;
	this.stk[this.ptr++]=1;
	var t=this.dstk.get("pixs");
	if (t===undefined) throw new Error("dict: pixs: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	if (typeof(this.stk[this.ptr-1].length)!=="number") throw "length: invalid: " + BWIPJS.pstype(this.stk[this.ptr-1]);
	this.stk[this.ptr-1]=this.stk[this.ptr-1].length;
	this.stk[this.ptr++]=1;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]-this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr++]=$f4;
	//#line 336: } for
	var t18=this.stk[--this.ptr];
	var t16=this.stk[--this.ptr];
	var t15=this.stk[--this.ptr];
	var t14=this.stk[--this.ptr];
	for (var t17=t14; t15<0 ? t17>=t16 : t17<=t16; t17+=t15) {
		this.stk[this.ptr++]=t17;
		if (t18.call(this)==-1) break;
	}
	//#line 339: /setanycolor {
	this.stk[this.ptr++]="setanycolor"; //ident
	this.stk[this.ptr++]=$f9;
	//#line 347: } bind def
	this.dict[this.stk[this.ptr-2]]=this.stk[this.ptr-1]; this.ptr-=2;
	//#line 350: gsave
	this.gsave();
	//#line 351: currentpoint translate
	var t=this.currentpoint();
	this.stk[this.ptr++]=t.x;
	this.stk[this.ptr++]=t.y;
	var y=this.stk[--this.ptr];
	this.translate(this.stk[--this.ptr],y);
	//#line 352: 72 width mul 72 height mul scale
	this.stk[this.ptr++]=72;
	var t=this.dstk.get("width");
	if (t===undefined) throw new Error("dict: width: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
	this.stk[this.ptr++]=72;
	var t=this.dstk.get("height");
	if (t===undefined) throw new Error("dict: height: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-2]=this.stk[this.ptr-2]*this.stk[this.ptr-1]; this.ptr--;
	var y=this.stk[--this.ptr];
	this.scale(this.stk[--this.ptr],y);
	//#line 353: .0001 .0001 moveto .9999 .0001 lineto .9999 .9999 lineto .0001 .9999 lineto closepath
	this.stk[this.ptr++]=0.0001;
	this.stk[this.ptr++]=0.0001;
	var y=this.stk[--this.ptr];
	this.moveto(this.stk[--this.ptr],y);
	this.stk[this.ptr++]=0.9999;
	this.stk[this.ptr++]=0.0001;
	var y=this.stk[--this.ptr];
	this.lineto(this.stk[--this.ptr],y);
	this.stk[this.ptr++]=0.9999;
	this.stk[this.ptr++]=0.9999;
	var y=this.stk[--this.ptr];
	this.lineto(this.stk[--this.ptr],y);
	this.stk[this.ptr++]=0.0001;
	this.stk[this.ptr++]=0.9999;
	var y=this.stk[--this.ptr];
	this.lineto(this.stk[--this.ptr],y);
	this.closepath();
	//#line 354: backgroundcolor (unset) ne { gsave backgroundcolor setanycolor fill grestore } if 
	var t=this.dstk.get("backgroundcolor");
	if (t===undefined) throw new Error("dict: backgroundcolor: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=BWIPJS.psstring("unset");
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()!=this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]!=this.stk[this.ptr-1];
	this.ptr--;
	this.stk[this.ptr++]=$f10;
	var t27=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t27.call(this)==-1) return -1;
	}
	//#line 355: color (unset) ne { color setanycolor } if
	var t=this.dstk.get("color");
	if (t===undefined) throw new Error("dict: color: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=BWIPJS.psstring("unset");
	if (this.stk[this.ptr-2] instanceof BWIPJS.psstring)
		this.stk[this.ptr-2]=this.stk[this.ptr-2].toString()!=this.stk[this.ptr-1];
	else this.stk[this.ptr-2]=this.stk[this.ptr-2]!=this.stk[this.ptr-1];
	this.ptr--;
	this.stk[this.ptr++]=$f11;
	var t28=this.stk[--this.ptr];
	if (this.stk[--this.ptr]) {
		if (t28.call(this)==-1) return -1;
	}
	//#line 356: pixx pixy true [ pixx 0 0 pixy neg 0 pixy ] {imgstr} imagemask
	var t=this.dstk.get("pixx");
	if (t===undefined) throw new Error("dict: pixx: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	var t=this.dstk.get("pixy");
	if (t===undefined) throw new Error("dict: pixy: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=true;
	this.stk[this.ptr++]=Infinity;
	var t=this.dstk.get("pixx");
	if (t===undefined) throw new Error("dict: pixx: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr++]=0;
	this.stk[this.ptr++]=0;
	var t=this.dstk.get("pixy");
	if (t===undefined) throw new Error("dict: pixy: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	this.stk[this.ptr-1]=-this.stk[this.ptr-1];
	this.stk[this.ptr++]=0;
	var t=this.dstk.get("pixy");
	if (t===undefined) throw new Error("dict: pixy: undefined");
	if (t instanceof Function) t.call(this); else this.stk[this.ptr++]=t;
	for (var i = this.ptr-1; i >= 0 && this.stk[i] !== Infinity; i--) ;
	if (i < 0) throw "array: underflow";
	var t = this.stk.splice(i+1, this.ptr-1-i);
	this.ptr = i;
	this.stk[this.ptr++]=BWIPJS.psarray(t);
	this.stk[this.ptr++]=$f12;
	this.stk[--this.ptr].call(this);
	this.imagemask(this.stk[this.ptr-5],this.stk[this.ptr-4],this.stk[this.ptr-3],this.stk[this.ptr-2],this.stk[this.ptr-1]);
	this.ptr-=5;
	//#line 357: grestore
	this.grestore();
	//#line 359: end
	this.dstk.pop(); this.dict=this.dstk[this.dstk.length-1];
	psstptr = this.ptr;
}
// END OF renmatrix
