// 在Cloud code里初始化express框架
var express = require('express');
var app = express();
var name = require('cloud/name.js');
var avosExpressHttpsRedirect = require('avos-express-https-redirect');
var nodemailer=require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

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
var TK=AV.Object.extend('Ticket');
var transporter=nodemailer.createTransport(smtpTransport({
	host: 'smtp.126.com',
    	port: 25,
	auth:{
		user:'panyunyi@126.com',
		pass:'pyylovezt924'
	}
}));

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

function sendEmails(name,phone,address){
	var mailOptions={
			from:'PYY<panyunyi@126.com>',
			to:'panyunyi@swlsg.com,liuqianyu@swlsg.jp,zhangqiong@swlsg.jp',
			subject:'搬家信息',
			text:name,
			html:'<b>姓名: </b>'+name+'<br><b>电话: </b>'+phone+'<br><b>地址: </b>'+address
		};
		transporter.sendMail(mailOptions,function(error,info){
					if(error){
						console.log(error);
					}else{
						console.log('Message sent: '+info.response);
						console.log(mailOptions);
					}
					}); 
}

function sendTickets(name,phone,start,end,date,adults,child){
	var mailOptions={
			from:'PYY<panyunyi@126.com>',
			to:'panyunyi@swlsg.com,liuqianyu@swlsg.jp,zhangqiong@swlsg.jp',
			subject:'求机票',
			text:name,
			html:'<b>姓名: </b>'+name+'<br><b>电话: </b>'+phone+'<br><b>出发地: </b>'+start+'<br><b>目的地:</b>'+
			end+'<br><b>出发日期:</b>'+date+'<br><b>成年人:</b>'+adults+'<br><b>未成年:</b>'+child
		};
		transporter.sendMail(mailOptions,function(error,info){
					if(error){
						console.log(error);
					}else{
						console.log('Message sent: '+info.response);
						console.log(mailOptions);
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
				sendEmails(name,phone,address);
				res.render('ok');
			},
			error:function(results,err){
				console.log(err);
			}
		});
	}else{
		console.log('Message is empty!');
	}
});

app.get('/ticket',function(req,res){
	res.render('ticket');
});

app.post('/ticket',function(req,res){
	var start=req.body.start;
	var end=req.body.end;
	var name=req.body.name;
	var phone=req.body.phone;
	var date=req.body.date;
	var adults=req.body.adults;
	var child=req.body.child;
	if(name&&name.trim()!=''&&phone&&phone.trim()!=''){
		var tk=new TK();
		tk.set('start',start);
		tk.set('name',name);
		tk.set('phone',phone);
		tk.set('end',end);
		tk.set('date',date);
		tk.set('adults',adults);
		tk.set('child',child);
		tk.save(null,{
			success:function(results){
				sendTickets(name,phone,start,end,date,adults,child);
				res.render('ok');
			},
			error:function(results,err){
				console.log(err);
			}
		});
	}else{
		console.log('Message is empty!');
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
