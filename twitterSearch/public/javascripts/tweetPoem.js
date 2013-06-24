var List = tweets;
var canvas = document.getElementById("myCanvas");
var ctx=canvas.getContext("2d");
var width = canvas.width;
var height = canvas.height;
ctx.font="20px Arial";


function cPoint(X,Y,letter){
	console.log("making new point");
	this.endX = X;
	this.endY = Y;
	this.character = letter;
	this.startX = Math.floor(Math.random()*width);
	this.startY = Math.floor(Math.random()*height);
	this.move = function(){
		if(this.startX< this.endX)
			this.startX++;
		if(this.startX> this.endX)
			this.startX--;
		if(this.startY< this.endY)
			this.startY++;
		if(this.startY> this.endY)
			this.startY--;
	
	};
	this.draw = function(){
		ctx.fillText(letter,this.startX,this.startY);
	
	};


}

console.log("test1");
pointArray =[];
var startingX = 10;
var firstX = startingX;
var firstY = height/10;
xSpacing = 12;
ySpacing = 70;
var draw= function(){
	ctx.clearRect( 0 , 0 , width , height );
	for(var i = 0; i< pointArray.length; i++){
		pointArray[i].draw();
		pointArray[i].move();
	}

	setTimeout(draw, 1000/100);
}
function createPoints(tweetList){
	for( var i =0; i< tweetList.length;i++){
		firstY = i*ySpacing + 50;
		var length = tweetList[i].length;
		var charArr = tweetList[i].split('');
		for(var z=0; z<charArr.length;z++){
			if(charArr[z] === ' '){
				if(firstX + 10 > width){
					firstX = startingX;
					firstY+= 15;
					}
			}
			pointArray.push(new cPoint(firstX,firstY,charArr[z]));
			firstX+= xSpacing;
		}
		firstX = startingX;
	}
}
createPoints(List);
draw();

