var N; //length of the input data
var input;
var originalinput;
var node = new Array(); // collecting data in the linked list
var Bgn = new Data(); // Globally begin the linked list
var End = new Data(); // Globally end the linked list

function Data()//Declaring the struct used in linked list
{
	this.to = null;
	this.from = null;
	this.value = null;
	this.type = null;
	this.unit = new Array();
	this.relink = function(_goal){
		_goal.to = this;
		this.from = _goal;
		};
}

function run()//The first function that would run right after opening the application.
{
	document.write("<center><table width=300>");
	document.write("<tr><td><center><form name='finput' autocomplete = 'off' action='javascript:io()' method='get'><input type='text' autofocus='autofocus' name='input' id='inp' onSubmit='io()'><input type='button' name='compute' value='go' onClick='io()'></form>");
	document.write("</center></td></tr><tr><td><font face='Consolas' color='000000'><p id='output1'></p></font>");
	document.write("<font face='Consolas' color='777777'><p id='output2'></p></font>");
	document.write("<font face='Consolas' color='aaaaaa'><p id='output3'></p></font>");
	document.write("<font face='Consolas' color='cccccc'><p id='output4'></p></font>");
	document.write("<font face='Consolas' color='dadada'><p id='output5'></p></font>");
	document.write("</td></tr></table><img src='chart.png' width=500>");
	document.write("</center>");
}

function io()//input, operate, and output the result
{
	var _reader = new Data();
	var _begin = new Data();
	var _end = new Data();
	input = document.getElementById("inp").value;
	originalinput = input;
	inp = document.getElementById("inp");
	inp.value = "";
	
	encode();
	N = input.length;
	assign();
	numerize();
	despace();
	_end = Bgn;
	while(_end != End)
	{
		if(_end.type == ")")
		{
			_begin = _end.from;
			while(_begin.type != "(")
			{
				_begin = _begin.from;
			}
			// Begin local operations
			decode(_begin,_end);
			// End local operations
			if(_begin.to.to.type != ")")
			return;
			_begin.type = "1";
			_begin.value = _begin.to.value;
			_end = _end.to;
			_end.relink(_begin);
			_end = _begin;
		}
		_end = _end.to;
	}
	_begin = Bgn;
	_end = End;
	// Begin local operations
	decode(_begin,_end);
	// End local operations
	
	
	display1 = "";
	display2 = "";
	_reader=Bgn.to;	
	do
	{
		display1+=_reader.type+", ";
		display2+=_reader.value+", ";
		_reader=_reader.to;
	}while(_reader!=End);
	
	output1 = document.getElementById("output1");
	output2 = document.getElementById("output2");
	output3 = document.getElementById("output3");
	output4 = document.getElementById("output4");
	output5 = document.getElementById("output5");
	output5.innerHTML = output4.innerHTML;
	output4.innerHTML = output3.innerHTML;
	output3.innerHTML = output2.innerHTML;
	output2.innerHTML = output1.innerHTML;
	output1.innerHTML = originalinput + "<p align='right'>= "+display1+"</p>";
}

function assign()//[global] assigning the initial conditions of each node
{
	for(i=0;i <= N+1;i++)
	{
		node[i] = new Data();
	}
	for(i=1;i <= N;i++)
	{
		node[i].type = input.charAt(i-1);
		node[i].value = null;
		if(node[i].type == "0" || node[i].type == "1" || node[i].type == "2" || node[i].type == "3" || node[i].type == "4" || node[i].type == "5" || node[i].type == "6" || node[i].type == "7" || node[i].type == "8" || node[i].type == "9")
		{
			node[i].type = "1";
			node[i].value = parseFloat(input.charAt(i-1));
		}
		node[i].relink(node[i-1]);
	}
	node[N+1].relink(node[N]);
	node[0].type = "{";
	node[N+1].type = "}";
	Bgn = node[0];
	End = node[N+1];
}

function encode()//[global] encoding units, constants, etc. into a specific code, e.g. au is coded to U01x .
{
	while(input.search("electron volt") != -1) input = input.replace("electron volt","U11x");
	while(input.search("angstrom") != -1) input = input.replace("angstrom","U04x");
	while(input.search("minutes") != -1) input = input.replace("minutes","U34x");
	while(input.search("Maxwell") != -1) input = input.replace("Maxwell","U37x");
	while(input.search("seconds") != -1) input = input.replace("seconds","U43x");
	while(input.search("eV/c^2") != -1) input = input.replace("eV/c^2","U12x");
	while(input.search("league") != -1) input = input.replace("league","U32x");
	while(input.search("minute") != -1) input = input.replace("minute","U34x");
	while(input.search("Newton") != -1) input = input.replace("Newton","U38x");
	while(input.search("parsec") != -1) input = input.replace("parsec","U40x");
	while(input.search("Pascal") != -1) input = input.replace("Pascal","U41x");
	while(input.search("second") != -1) input = input.replace("second","U43x");
	while(input.search("asinh") != -1) input = input.replace("asinh","Y19x");
	while(input.search("acosh") != -1) input = input.replace("acosh","Y20x");
	while(input.search("atanh") != -1) input = input.replace("atanh","Y21x");
	while(input.search("asech") != -1) input = input.replace("asech","Y22x");
	while(input.search("acsch") != -1) input = input.replace("acsch","Y23x");
	while(input.search("acoth") != -1) input = input.replace("acoth","Y24x");
	while(input.search("floor") != -1) input = input.replace("floor","Y27x");
	while(input.search("Gauss") != -1) input = input.replace("Gauss","U20x");
	while(input.search("hours") != -1) input = input.replace("hours","U21x");
	while(input.search("litre") != -1) input = input.replace("litre","U31x");
	while(input.search("miles") != -1) input = input.replace("miles","U35x");
	while(input.search("metre") != -1) input = input.replace("metre","U36x");
	while(input.search("tonne") != -1) input = input.replace("tonne","U46x");
	while(input.search("years") != -1) input = input.replace("years","U52x");
	while(input.search("sinh") != -1) input = input.replace("sinh","Y07x");
	while(input.search("cosh") != -1) input = input.replace("cosh","Y08x");
	while(input.search("tanh") != -1) input = input.replace("tanh","Y09x");
	while(input.search("sech") != -1) input = input.replace("sech","Y10x");
	while(input.search("csch") != -1) input = input.replace("csch","Y11x");
	while(input.search("coth") != -1) input = input.replace("coth","Y12x");
	while(input.search("asin") != -1) input = input.replace("asin","Y13x");
	while(input.search("acos") != -1) input = input.replace("acos","Y14x");
	while(input.search("atan") != -1) input = input.replace("atan","Y15x");
	while(input.search("asec") != -1) input = input.replace("asec","Y16x");
	while(input.search("acsc") != -1) input = input.replace("acsc","Y17x");
	while(input.search("acot") != -1) input = input.replace("acot","Y18x");
	while(input.search("ceil") != -1) input = input.replace("ceil","Y26x");
	while(input.search("sqrt") != -1) input = input.replace("sqrt","Y32x");
	while(input.search("days") != -1) input = input.replace("days","U10x");
	while(input.search("foot") != -1) input = input.replace("foot","U14x");
	while(input.search("feet") != -1) input = input.replace("feet","U15x");
	while(input.search("gram") != -1) input = input.replace("gram","U17x");
	while(input.search("hour") != -1) input = input.replace("hour","U21x");
	while(input.search("inch") != -1) input = input.replace("inch","U24x");
	while(input.search("mile") != -1) input = input.replace("mile","U35x");
	while(input.search("yard") != -1) input = input.replace("yard","U51x");
	while(input.search("year") != -1) input = input.replace("year","U52x");
	while(input.search("sin") != -1) input = input.replace("sin","Y01x");
	while(input.search("cos") != -1) input = input.replace("cos","Y02x");
	while(input.search("tan") != -1) input = input.replace("tan","Y03x");
	while(input.search("sec") != -1) input = input.replace("sec","Y04x");
	while(input.search("csc") != -1) input = input.replace("csc","Y05x");
	while(input.search("cot") != -1) input = input.replace("cot","Y06x");
	while(input.search("abs") != -1) input = input.replace("abs","Y25x");
	while(input.search("exp") != -1) input = input.replace("exp","Y28x");
	while(input.search("log") != -1) input = input.replace("log","Y29x");
	while(input.search("amu") != -1) input = input.replace("amu","U02x");
	while(input.search("atm") != -1) input = input.replace("atm","U03x");
	while(input.search("deg") != -1) input = input.replace("deg","U09x");
	while(input.search("day") != -1) input = input.replace("day","U10x");
	while(input.search("min") != -1) input = input.replace("min","U34x");
	while(input.search("Ohm") != -1) input = input.replace("Ohm","U39x");
	while(input.search("ohm") != -1) input = input.replace("ohm","U39x");
	while(input.search("rad") != -1) input = input.replace("rad","U42x");
	while(input.search("sec") != -1) input = input.replace("sec","U43x");
	while(input.search("ln") != -1) input = input.replace("ln","Y30x");
	while(input.search("Bq") != -1) input = input.replace("Bq","U06x");
	while(input.search("cd") != -1) input = input.replace("cd","U07x");
	while(input.search("au") != -1) input = input.replace("au","U01x");
	while(input.search("eV") != -1) input = input.replace("eV","U11x");
	while(input.search("ft") != -1) input = input.replace("ft","U13x");
	while(input.search("Gy") != -1) input = input.replace("Gy","U19x");
	while(input.search("hr") != -1) input = input.replace("hr","U21x");
	while(input.search("Hz") != -1) input = input.replace("Hz","U22x");
	while(input.search("kg") != -1) input = input.replace("kg","U26x");
	while(input.search("lb") != -1) input = input.replace("lb","U28x");
	while(input.search("lm") != -1) input = input.replace("lm","U29x");
	while(input.search("lx") != -1) input = input.replace("lx","U30x");
	while(input.search("ly") != -1) input = input.replace("ly","U33x");
	while(input.search("Pa") != -1) input = input.replace("Pa","U41x");
	while(input.search("Sy") != -1) input = input.replace("Sv","U44x");
	while(input.search("Wb") != -1) input = input.replace("Wb","U49x");
	while(input.search("yr") != -1) input = input.replace("yr","U53x");
	while(input.search("A") != -1) input = input.replace("A","U05x");
	while(input.search("C") != -1) input = input.replace("C","U08x");
	while(input.search("F") != -1) input = input.replace("F","U16x");
	while(input.search("g") != -1) input = input.replace("g","U18x");
	while(input.search("H") != -1) input = input.replace("H","U23x");
	while(input.search("J") != -1) input = input.replace("J","U25x");
	while(input.search("K") != -1) input = input.replace("K","U27x");
	while(input.search("l") != -1) input = input.replace("l","U31x");
	while(input.search("m") != -1) input = input.replace("m","U36x");
	while(input.search("N") != -1) input = input.replace("N","U38x");
	while(input.search("s") != -1) input = input.replace("s","U43x");
	while(input.search("S") != -1) input = input.replace("S","U45x");
	while(input.search("T") != -1) input = input.replace("T","U47x");
	while(input.search("V") != -1) input = input.replace("V","U48x");
	while(input.search("W") != -1) input = input.replace("W","U50x");
}

function numerize()//[global] turning string of numbers into a single meaningful number, e.g. 0|1|2|.|0|5 is turned to 12.05 .
{

	var _begin = new Data();
	var _end = new Data();
	var _cache = new Data();
	_begin = Bgn;
	while(_begin != End)
	{
		var order = 10;
		if(_begin.type == "1")
		{
			_end = _begin.to;
			while(_end.type == "1")
			{
				_begin.value = _begin.value*10 + _end.value;
				_end = _end.to;
			}
			if(_end.type == "." && _end.to.type == "1")
			{
				_end = _end.to;
				while(_end.type == "1")
				{
					_begin.value = _begin.value + _end.value/order;
					order*=10;
					_end = _end.to;
				}
			}
			_end.relink(_begin);
		}
		_begin = _begin.to;
	}
}

function despace()//[global] delete unnecessary spaces .
{
	var _begin = new Data();
	var _end = new Data();
	var _cache = new Data();
	_begin = Bgn;
	while(_begin != End)
	{
		if(_begin.type == " ")
		{
			_cache = _begin.from;
			_begin = _begin.to;
			_begin.relink(_cache);
			_begin = _cache;
		}
		_begin = _begin.to;
	}
}

function decode(_begin,_end)//[local] decode the units, constants, and so on .
{
	var _scan = new Data();
	var _cache = new Data();
	var code;
	_scan = _begin.to;
	while(_scan != _end)
	{
		if(_scan.from.type == "1" && _scan.type == "U" && _scan.to.type == "1" && _scan.to.to.type == "x")
		{
			_cache = _scan.from;
			code = _scan.to.value;
			switch(code)
			{
				case 1:
				_cache.value*=1.49597870700e+11;
				_cache.unit[1]+=1;
				break;
				case 2:
				_cache.value*=1.66053892e-27;
				_cache.unit[0]+=1;
				break;
				default:
				return;
				break;
			}
			_scan = _scan.to.to.to;
			_scan.relink(_cache);
			_scan = _cache;
		}
		_scan = _scan.to;
	}
}
