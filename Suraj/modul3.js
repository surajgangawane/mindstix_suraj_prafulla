var f = require("./modul1.js");
var let = f.ret;
module.exports.let = let;
var len = let.mystudnt.length;
var i;
var j;
var arr;

var set = desc(let);


f.write(set);



function desc(let){	
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
}
module.exports.desc = desc;