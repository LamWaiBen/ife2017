var Tree = function(ele){
	this.ele = ele;
}
Tree.prototype.createTree = function(ele,node){
	for( var obj of node){
		for (var key in obj) {
			if( key == "children"){
				var createUl = document.createElement("ul");
				this.createTree(createUl,obj[key]);
				createLi.appendChild(createUl);
			}else {
				var createLi = document.createElement("li");
				createLi.innerHTML = obj[key];
				ele.append(createLi);
			}
			
		}
		
	}
	this.bindEv("li")
}
Tree.prototype.bindEv = function(item){
	var _this = this;
	this.ele.onclick= function(ev) {
		var ev = window.event || ev,
			target = ev.target || ev.srcElement;
		if(target.tagName.toLowerCase() == item && target.children[0]){
			_this.toggle(target);
		}
	};
}
Tree.prototype.toggle = function(tg){
	var child = tg.children[0];
	if(child.style.display == "none"){
		tg.className = "active";
		child.style.display = "block";
	}else{
		tg.className = "";
		child.style.display = "none";
	}
}
