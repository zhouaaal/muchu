// 在Cloud code里初始化express框架
var express = require('express');
var app = express();
var name = require('cloud/name.js');
var avosExpressHttpsRedirect = require('avos-express-https-redirect');
var nodemailer=require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var translate = require('cloud/translate.js');

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
var zhongqiu=AV.Object.extend('zhongqiu');
var WD=AV.Object.extend('Words');
var transporter=nodemailer.createTransport(smtpTransport({
	host: 'smtp.swlsg.com',
    	port: 25,
	auth:{
		user:'panyunyi@swlsg.com',
		pass:'swl888888'
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

function renderQuery(res,name,phone,weixin,email){
	var query = new AV.Query(Visitor);
	query.skip(0);
	query.limit(10000);
	query.descending('createdAt');
	query.find({
		success: function(results){
			res.render('query',{ name: name,phone:phone, weixin:weixin, email:email,visitors: results});
		},
		error: function(error){
			console.log(error);
			res.render('500',500)
		}
	});
}

function renderSuccess(res,name,phone,weixin,email){
	var query = new AV.Query(Visitor);
	query.skip(0);
	query.limit(10000);
	query.descending('createdAt');
	query.find({
		success: function(results){
			res.render('success',{ name: name,phone:phone, weixin:weixin,email:email,visitors: results});
		},
		error: function(error){
			console.log(error);
			res.render('500',500)
		}
	});
}

function sendEmails(name,phone,address){
	var mailOptions={
			from:'MUCHU<panyunyi@swlsg.com>',
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

function sendTickets(name,phone,start,end,date,backdate,adults,child,email){
	var mailOptions={
			from:'MUCHU<panyunyi@swlsg.com>',
			to:'panyunyi@swlsg.com,liuqianyu@swlsg.jp,zhangqiong@swlsg.jp',
			bcc: 'hanafujityo3985@yahoo.co.jp,his552d@his-world.com,info@abctravel.jp,ofc@sankeitourist.co.jp,505986270@qq.com,info@meishin-int.co.jp',
			subject:'チケットの予約です',
			text:name,
			html:'<b>日本旅游からのお知らせです</b><br><br><b>お客様から新規のお問合せが来ております</b><br><br>★☆★☆★☆★☆★☆★☆★☆★☆<br><br><b>姓名: </b>'+name+'<br><br><b>电话: </b>'+phone+'<br><br><b>邮箱：</b>'+email+'<br><br><b>出发地: </b>'+start+'<br><br><b>目的地: </b>'+
			end+'<br><br><b>出发日期: </b>'+date+'<br><br><b>返回日期: </b>'+backdate+'<br><br><b>成年人: </b>'+adults+'<br><br><b>未成年: </b>'+child+'<br><br>★☆★☆★☆★☆★☆★☆★☆★☆<br><img src="cid:00000001"/><br><br>問題等ございましたら、<br><br>下記連絡先までご連絡お願いいたします。<br><br><p>・～・～・～・～・株式会社SWL JAPAN ～・～・～・～・</p><br><br><p>　　　Muchu   メディア事業部</p><p>　　　　　張　琼　（　チョウ　ケイ　）</p><br><br><p>〒105-0004　東京都港区新橋6-5-3 山田屋ビル4F</p><p>TEL：03-6432-4540　Fax： 03-4578-0106</p><p>E-Mail: zhangqiong@swlsg.jp</p><br><p>・～・～・～・～・～・～・～・～・～・～・～・～・～・</p>',
			attachments: [{
			        filename: '01.png',
			        path: 'http://7xid3k.com1.z0.glb.clouddn.com/r2.jpg',
			        cid: '00000001'
			    }]
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
	var email=req.query.email;
	renderQuery(res,name,phone,weixin,email);
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
	var backdate=req.body.backdate;
	var email=req.body.email;
	if(name&&name.trim()!=''&&phone&&phone.trim()!=''){
		var tk=new TK();
		tk.set('start',start);
		tk.set('name',name);
		tk.set('phone',phone);
		tk.set('end',end);
		tk.set('date',date);
		tk.set('adults',adults);
		tk.set('child',child);
		tk.set('backdate',backdate);
		tk.set('email',email);
		tk.save(null,{
			success:function(results){
				sendTickets(name,phone,start,end,date,backdate,adults,child,email);
				res.render('ok');
			},
			error:function(results,err){
				console.log(err);
			}
		});
	}else{
		console.log('Message is empty!');
		res.render('ticket');
	}
});

app.post('/',function(req, res){
	var name = req.body.name;
	var phone=req.body.phone;
	var weixin=req.body.weixin;
	var email=req.body.email;
	var studyStatus=req.body.study;
	var license=req.body.license;
	var haveCar=req.body.haveCar;
	var fulltime=req.body.fulltime;
	var age=req.body.age;
	var area=req.body.area;
	if(name && name.trim() !=''){
		//Save visitor
		var visitor = new Visitor();
		visitor.set('name', name);
		visitor.set('phone', phone);
		visitor.set('weixin', weixin);
		visitor.set('email',email);
		visitor.set('studyStatus', studyStatus);
		visitor.set('license', license);
		visitor.set('haveCar', haveCar);
		visitor.set('fulltime', fulltime);
		visitor.set('age',age);
		visitor.set('area',area);
		visitor.save(null, {
			success: function(gameScore) {
				renderSuccess(res,name,phone,weixin,email);
			},
			error: function(gameScore, error) {
				res.render('500', 500);
			}
		});
	}else{
		res.redirect('/');
	}
});

function renderTranslate(res,result,word,lang){
	res.render('translate',{result:result,word:word,lang:lang});
}

app.get('/translate',function(req,res){
	var result=req.query.result;
	var word=req.query.word;
	var lang=req.query.lang;
	if(!result)
		result='';
	if(!word)
		word='';
	if(!lang)
		lang='zh';
	renderTranslate(res,result,word,lang);	
});

app.post('/translate',function(req,res){
	var lang = req.body.lang;
	var word=req.body.word;
	var ftypr,ttype;
	if(lang=='zh'){
		ftype='zh';
		ttype='jp';
	}else if(lang='jp'){
		ftype='jp';
		ttype='zh';
	}
	if(word && word.trim() !=''){
		translate({
		    from: ftype,
		    to: ttype,
		    query: word
		}, function(result) {
			console.log(result);
			var wd = new WD();
			wd.set('type', lang);
			wd.set('word', word);
			wd.set('result', result);
			wd.save(null, {
			success: function(gameScore) {
				res.redirect('/translate?result='+encodeURIComponent(result)+'&word='+encodeURIComponent(word)+'&lang='+lang);
			},
			error: function(gameScore, error) {
				res.render('500', 500);
			}
			});	
		});
	/*translate(word, function(result) {
	    	console.log(result); 
		});*/
		
	}else{
		res.render('translate')
	}	
});


//app.get('/zhongqiu2015',function(req,res){
//	res.render('zhongqiu2015');
//});

app.post('/zhongqiu2015',function(req,res){
	var name=req.body.name;
	var phone=req.body.phone;
	if(name&&name.trim()!=''&&phone&&phone.trim()!=''){
		var zhq=new zhongqiu();
		zhq.set('name', name);
		zhq.set('phone', phone);
		zhq.save(null,{
			success:function(results){
				renderSuccess(res,name,phone);
			},
			error:function(results,err){
				console.log(err);
			}
		});
	}else{
		console.log('Message is empty!');
	}
});

function renderSuccess(res,name,phone){
	var query = new AV.Query(zhongqiu);
	query.skip(0);
	query.limit(10000);
	query.descending('createdAt');
	query.find({
		success: function(results){
			res.render('success2',{ name: name,phone:phone,visitors: results});
		},
		error: function(error){
			console.log(error);
			res.render('500',500);
		}
	});
}

app.get('/zhongqiu2015all',function(req,res){
	var name=req.query.name;
	var phone=req.query.phone;
	renderQuery3(res,name,phone);
});
function renderQuery3(res,name,phone){
	var query = new AV.Query(zhongqiu);
	query.skip(0);
	query.limit(10000);
	query.descending('createdAt');
	query.find({
		success: function(results){
			res.render('zhongqiu2015all',{ name: name,phone:phone,visitors: results});
		},
		error: function(error){
			console.log(error);
			res.render('500',500)
		}
	});
}
app.get('/zhongqiu2015',function(req,res){
	var name=req.query.name;
	renderQuery2(res,name);
});
function renderQuery2(res,name){
	var query = new AV.Query(zhongqiu);
	query.skip(0);
	query.limit(10000);
	query.descending('createdAt');
	query.find({
		success: function(results){
			res.render('zhongqiu2015',{ name: name,visitors: results});
		},
		error: function(error){
			console.log(error);
			res.render('500',500)
		}
	});
}
// This line is required to make Express respond to http requests.
app.listen();
