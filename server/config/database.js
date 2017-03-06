// exports.DATABASE_URL = process.env.DATABASE_URL ||
//                       global.DATABASE_URL ||
//                       (process.env.NODE_ENV === 'production' ?
//                             'mongodb://codepressd:Shasta89@ds033106.mlab.com:33106/mongo-shopping' :
//                             'mongodb://codepressd:Shasta89@ds033106.mlab.com:33106/mongo-shopping-dev');
exports.DATABASE_URL= process.env.DATABASE_URL ||
	global.DATABASE_URL ||
	(process.env.NODE_ENV === 'production' ?
		'mongodb://localhost:27017/salut' :
		'mongodb://localhost:27017/salut-dev');
exports.PORT = process.env.PORT || 8080;
exports.secret= 'salut';