var twitter = require('ntwitter');

var twit = new twitter({
  consumer_key: 'I4Lgs7cO5PW0qoOFlJoBrg',
  consumer_secret: 'Z8lACmP2JgwQS9SqXUpePNJN8fkQ0NAgxn0zxKGA4',
  access_token_key: '1446626059-5ShUuke14R6uCpUTcEthg0evqGsHkzkeNhSq7P7',
  access_token_secret: 'MtS2SgdQDvhIHteDOlMXgn4Jz1T9E1yEMDlGDUPvk'
});

var express = require('express')
  , http = require('http')
  , path = require('path');

var app = express();
var server = http.createServer(app);
// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.post('/search', function(req,res){
	var tweetList= [];
	twit.search(req.body.search, {"count": 10, "lang": "en"}, function(err, data){
		if (err)
			console.log(err);
		else{
			var results=data.statuses.length;
			 for(var i = 0; i <10; i++ ){
			 		if(tweetList.length == 5 ) break;
					var str = data.statuses[i].text;
					str=str.replace(/#/g , "").replace(/@/g , "").replace(/RT/g , "").replace(/:/g,"") ;
					var start = str.indexOf("http");
					if (start != -1)
							str = str.substring(0,start);
					str=str.substr(0, 1).toUpperCase().concat(str.substr(1).toLowerCase());
					if((tweetList.indexOf(str)== -1) || (results-i <= 5-tweetList.length) || results<10)
							tweetList.push( str);
				}
				res.json(tweetList);
			}
	});
});

app.get('/',function(req,res){
	res.render('index');

});

app.get('/getPoettry/:id',function(req,res){
	var id = (req.params.id);
	console.log(new String(id).charAt(0));
	return;

});


 server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
