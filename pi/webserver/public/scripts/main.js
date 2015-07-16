requirejs(["ControlInput","CesiumVisualization","FakeHunter"], function(ControlInput,Visualization,FakeHunter) {
	
	var hunters = [];
	var obstructions = [];
	
	var updatePositions = function(updateResponse){
		var platforms = JSON.parse(updateResponse);
		for(var platform in platforms){
			Visualization.updateHunter(platforms[platform].pid,{latitude:platforms[platform].lat,longitude:platforms[platform]["long"]});
		}
	};
	
	var statusUpdateInterval = setInterval(function(){
	
		var req = new XMLHttpRequest();
		req.onload = function(evt){
			updatePositions(req.response);
		};
		req.withCredentials = true;
		req.open("GET", "http://localhost:8080/status", true);
		req.send();
	},2000);
	
	
	window.onresize = function(){
		Visualization.resize();
	}
	
	var fh = new FakeHunter();
	fh.start();
	
	var controlInput = new ControlInput();
	controlInput.setEntityPID(105);

	//Visualization.addHunter(1,{longitude:-76.896736,latitude:39.170863});
	
});