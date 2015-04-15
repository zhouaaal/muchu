// 在Cloud code里初始化express框架
var express = require('express');
var app = express();
var name = require('cloud/name.js');
var avosExpressHttpsRedirect = require('avos-express-https-redirect');
var nodemailer=require('nodemailer');

// App全局配置
//设置模板目录
if(__production)
	app.set('views', 'cloud/views');
else
	app.set('views', 'cloud/dev_views');
app.set('view engine', 'ejs');    // 设置template引擎
app.use(avosExpressHttpsRedirect()); //启用HTTPS
app.use(express.bodyParser());    // 读取请求body的中间件

//使用express路由API服务/hello的http GET请求
app.get('/hello', function(req, res) {
	res.render('hello', { message: 'Congrats, you just set up your app!' });
});

var Visitor = AV.Object.extend('Visitor');
var MH=AV.Object.extend('MoveHouse');
var transporter=nodemailer.createTransport({
	service:'Gmail',
	auth:{
		user:'panyunyi1234@gmail.com',
		pass:'51153520314'
	}
});

function renderIndex(res, name){
	var query = new AV.Query(Visitor);
	query.skip(0);
	query.limit(10000);
	query.descending('createdAt');
	query.find({
		success: function(results){
			res.render('index',{ name: name, visitors: results});
		},
		error: function(error){
			console.log(error);
			res.render('500',500)
		}
	});
}

function renderQuery(res,name,phone,weixin){
	var query = new AV.Query(Visitor);
	query.skip(0);
	query.limit(10000);
	query.descending('createdAt');
	query.find({
		success: function(results){
			res.render('query',{ name: name,phone:phone, weixin:weixin,visitors: results});
		},
		error: function(error){
			console.log(error);
			res.render('500',500)
		}
	});
}

function renderSuccess(res,name,phone,weixin){
	var query = new AV.Query(Visitor);
	query.skip(0);
	query.limit(10000);
	query.descending('createdAt');
	query.find({
		success: function(results){
			res.render('success',{ name: name,phone:phone, weixin:weixin,visitors: results});
		},
		error: function(error){
			console.log(error);
			res.render('500',500)
		}
	});
}

app.get('/query',function(req,res){
	var name=req.query.name;
	var phone=req.query.phone;
	var weixin=req.query.weixin;
	renderQuery(res,name,phone,weixin);
});

app.get('/', function(req, res){
	var name = req.query.name;
	if(!name)
		name = 'AVOS Cloud';
	renderIndex(res, name);
});

app.get('/move',function(req,res){
	res.render('move');
});
var mailOptions={
			from:'PYY<panyunyi1234@gmail.com>',
			to:'panyunyi@swlsg.com,panyunyi@126.com,pyy@pyy.club',
			subject:'搬家信息',
			text:'name',
			html:'ttt'
		};
app.post('/move',function(req,res){
	var address=req.body.address;
	var name=req.body.name;
	var phone=req.body.phone;
	if(name&&name.trim()!=''&&phone&&phone.trim()!=''){
		var mh=new MH();
		mh.set('address',address);
		mh.set('name',name);
		mh.set('phone',phone);
		mh.save(null,{
			success:function(results){
				transporter.sendMail(mailOptions,function(error,info){
					if(error){
						console.log(error);
					}else{
						console.log('Message sent: '+info.response);
						res.send('提交成功!');
						console.log(mailOptions);
					}
					}); 
			},
			error:function(results,err){
				console.log(err);
			}
		});
	}else{
		console.log('Message'+address);
	}
});

app.post('/',function(req, res){
	var name = req.body.name;
	var phone=req.body.phone;
	var weixin=req.body.weixin;
	var studyStatus=req.body.study;
	var license=req.body.license;
	var haveCar=req.body.haveCar;
	var fulltime=req.body.fulltime;
	if(name && name.trim() !=''){
		//Save visitor
		var visitor = new Visitor();
		visitor.set('name', name);
		visitor.set('phone', phone);
		visitor.set('weixin', weixin);
		visitor.set('studyStatus', studyStatus);
		visitor.set('license', license);
		visitor.set('haveCar', haveCar);
		visitor.set('fulltime', fulltime);
		visitor.save(null, {
			success: function(gameScore) {
				renderSuccess(res,name,phone,weixin);
			},
			error: function(gameScore, error) {
				res.render('500', 500);
			}
		});
	}else{
		res.redirect('/');
	}
});

// This line is required to make Express respond to http requests.
app.listen();
