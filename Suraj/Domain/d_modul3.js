var f = require("./modul1.js");
var let = f.ret;
var len = let.mystudnt.length;
var i;
var j;
var arr;
var domain = require ('domain');
var d = domain.create();

d.on('error', function(err){
	console.log("Error in desc");
});

var set = desc(let);


f.write(set);

function desc(let){	
	d.run(function(){
		process.nextTick(function(){
			for(i = 0 ; i < let.mystudnt.length ; i++)
			{
				for(j = i + 1 ; j < let.mystudnt.length ; j++)
				{
					if(let.mystudnt[i].Score < let.mystudnt[j].Score)
					{
						arr = let.mystudnt[j];
						let.mystudnt[j] = let.mystudnt[i];
						let.mystudnt[i] = arr;
					}
	    		}
			}
			return (let);
		});
	});
}

module.exports.desc = desc;
module.exports.let = let;