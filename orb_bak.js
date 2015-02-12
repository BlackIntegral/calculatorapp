var N; //length of the input data
var input;
var exitloop = 0;
var checkin;//unit translation "in" check
var display = "??";
var originalinput;
var s_value = 0;
var default_errorcode = "unknown";
var errorcode = default_errorcode;
var node = new Array(); // collecting data in the linked list
var Bgn = new Data(); // Globally begin the linked list
var End = new Data(); // Globally end the linked list
var Ans = new Data(); // Collecting data in the last input
	Ans.type = "1";
	Ans.value = 0;
var unitshow = new Array("kg","m","s","A","K","cd");

function Data()//Declaring the struct used in linked list
{
	this.to = null;
	this.from = null;
	this.value = null;
	this.type = null;
	this.unit = new Array(0,0,0,0,0,0);
	this.relink = function(_goal){
		_goal.to = this;
		this.from = _goal;
		};
}

function Help()
{
	output = document.getElementById("output");
	output.innerHTML = "------------------------------------"+"\n";
	output.innerHTML += "Available Operations\n";
	output.innerHTML += "-----------------------------------"+"\n";
	output.innerHTML += " ::Unary::"+"\n";
	output.innerHTML += " - Negation: 1+(-1) = 0"+"\n";
	output.innerHTML += " - Positivity: 1+(+1) = 2"+"\n";
	output.innerHTML += " - Factorial: 5! = 5*4*3*2*1"+"\n";
	output.innerHTML += ""+"\n";
	output.innerHTML += " ::Binary::"+"\n";
	output.innerHTML += " - Addition: 1+1 = 2"+"\n";
	output.innerHTML += " - Subtraction: 2-1 = 1"+"\n";
	output.innerHTML += " - Multiplication: 4*21 = 84"+"\n";
	output.innerHTML += " - Division: 64/16 = 4"+"\n";
	output.innerHTML += " - Exponentiation: 2^5 = 32"+"\n";
	output.innerHTML += ""+"\n";
	output.innerHTML += " ::Others::"+"\n";
	output.innerHTML += " - Scientific notation:"+"\n";
	output.innerHTML += " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1.19e+3 = 1190"+"\n";
	output.innerHTML += ""+"\n";
	output.innerHTML += "------------------------------------"+"\n";
	output.innerHTML += "Available Functions\n";
	output.innerHTML += "-----------------------------------"+"\n";
	output.innerHTML += " - sin"+"\n";
	output.innerHTML += " - cos"+"\n";
	output.innerHTML += " - tan"+"\n";
	output.innerHTML += " - sec"+"\n";
	output.innerHTML += " - csc"+"\n";
	output.innerHTML += " - cot"+"\n";
	output.innerHTML += " - sinh"+"\n";
	output.innerHTML += " - cosh"+"\n";
	output.innerHTML += " - tanh"+"\n";
	output.innerHTML += " - sech"+"\n";
	output.innerHTML += " - csch"+"\n";
	output.innerHTML += " - coth"+"\n";
	output.innerHTML += " - asin"+"\n";
	output.innerHTML += " - acos"+"\n";
	output.innerHTML += " - atan"+"\n";
	output.innerHTML += " - asec"+"\n";
	output.innerHTML += " - acsc"+"\n";
	output.innerHTML += " - acot"+"\n";
	output.innerHTML += " - asinh"+"\n";
	output.innerHTML += " - acosh"+"\n";
	output.innerHTML += " - atanh"+"\n";
	output.innerHTML += " - asech"+"\n";
	output.innerHTML += " - acsch"+"\n";
	output.innerHTML += " - acoth"+"\n";
	output.innerHTML += " - abs"+"\n";
	output.innerHTML += " - ceil"+"\n";
	output.innerHTML += " - floor"+"\n";
	output.innerHTML += " - exp"+"\n";
	output.innerHTML += " - log"+"\n";
	output.innerHTML += " - ln"+"\n";
	output.innerHTML += " - sqrt"+"\n";
	output.innerHTML += ""+"\n";
	output.innerHTML += "------------------------------------"+"\n";
	output.innerHTML += "Priority of Operations\n";
	output.innerHTML += "-----------------------------------"+"\n";
	output.innerHTML += " 1) Parentheses"+"\n";
	output.innerHTML += " 2) Factorial"+"\n";
	output.innerHTML += " 3) Functions & Units (left to right)"+"\n";
	output.innerHTML += " 4) Exponentiation"+"\n";
	output.innerHTML += " 5) Negation"+"\n";
	output.innerHTML += " 6) Scientific notation"+"\n";
	output.innerHTML += " 7) Division"+"\n";
	output.innerHTML += " 8) Multiplication"+"\n";
	output.innerHTML += " 9) Addition"+"\n";
	output.innerHTML += ""+"\n";
	output.innerHTML += "------------------------------------"+"\n";
	output.innerHTML += "Unit Conversion\n";
	output.innerHTML += "-----------------------------------"+"\n";
	output.innerHTML += " Type 'in' before the preferred"+"\n";
	output.innerHTML += " unit, calculator will convert"+"\n";
	output.innerHTML += " the unit of the previous"+"\n";
	output.innerHTML += " calculation."+"\n";
	output.innerHTML += " Example:"+"\n";
	output.innerHTML += " 1 inch"+"\n";
	output.innerHTML += " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = 0.0254 m"+"\n";
	output.innerHTML += " in cm"+"\n";
	output.innerHTML += " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = 2.54 cm"+"\n";
	output.innerHTML += ""+"\n";
	output.innerHTML += "------------------------------------"+"\n";
	output.innerHTML += "Others\n";
	output.innerHTML += "-----------------------------------"+"\n";
	output.innerHTML += " You can use 'ans' to refer to"+"\n";
	output.innerHTML += " the previous calculation result."+"\n";
	output.innerHTML += " Try this:"+"\n";
	output.innerHTML += " 1 cm"+"\n";
	output.innerHTML += " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = 0.01 m"+"\n";
	output.innerHTML += " ans^2"+"\n";
	output.innerHTML += " &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; = 0.0001 m^2"+"\n";
	output.innerHTML += ""+"\n";
}

function Info()
{
	output = document.getElementById("output");
	output.innerHTML = "------------------------------------"+"\n";
	output.innerHTML += "Orb v1.02a (c), 2014\n";
	output.innerHTML += "The JS scientific calculator.\n";
	output.innerHTML += "-----------------------------------"+"\n";
	output.innerHTML += "Update 5/17/2014"+"\n";
	output.innerHTML += "What's new"+"\n";
	output.innerHTML += " - changing interface"+"\n";
	output.innerHTML += " - fix some bugs"+"\n";
	output.innerHTML += "-----------------------------------"+"\n";
	output.innerHTML += "Developer and designer:"+"\n";
	output.innerHTML += " Atis 'Black Integral' Yosprakob"+"\n";
	output.innerHTML += "Email: yosprakob2@gmail.com"+"\n";
	output.innerHTML += ""+"\n";
	output.innerHTML += "Thanks for supporting us."+"\n";
}

function Const()
{
	output = document.getElementById("output");
	output.innerHTML = "------------------------------------"+"\n";
	output.innerHTML += "Constants list\n";
	output.innerHTML += "-----------------------------------"+"\n";
	output.innerHTML += "Bohr radius, Bohr's radius,"+"\n";
	output.innerHTML += " bohr radius, bohr's radius"+"\n";
	output.innerHTML += "kb, kB, Boltzmann constant,"+"\n";
	output.innerHTML += " Boltzmann's constant,"+"\n";
	output.innerHTML += " boltzmann constant,"+"\n";
	output.innerHTML += " boltzmann's constant,"+"\n";
	output.innerHTML += "c, speed of light"+"\n";
	output.innerHTML += "Coulomb constant,"+"\n";
	output.innerHTML += " Coulomb's constant,"+"\n";
	output.innerHTML += " coulomb constant,"+"\n";
	output.innerHTML += " coulomb's constant,"+"\n";
	output.innerHTML += "me, electron mass"+"\n";
	output.innerHTML += "epsilon, electric constant"+"\n";
	output.innerHTML += "q, elementary charge,"+"\n";
	output.innerHTML += " electron charge, proton charge"+"\n";
	output.innerHTML += "Earth mass, earth mass"+"\n";
	output.innerHTML += "Earth radius, earth radius"+"\n";
	output.innerHTML += "G, Gravitational constant,"+"\n";
	output.innerHTML += " gravitational constant"+"\n";
	output.innerHTML += "hbar"+"\n";
	output.innerHTML += "h, Planck constant's,"+"\n";
	output.innerHTML += " planck constant's,"+"\n";
	output.innerHTML += " Planck constant,"+"\n";
	output.innerHTML += " planck constant"+"\n";
	output.innerHTML += "mu, magnetic constant"+"\n";
	output.innerHTML += "mp, proton mass"+"\n";
	output.innerHTML += "pi, Pi, PI"+"\n";
	output.innerHTML += "Rydhberg constant,"+"\n";
	output.innerHTML += " rydhberg constant,"+"\n";
	output.innerHTML += " Rydhberg's constant,"+"\n";
	output.innerHTML += " rydhberg;s constant"+"\n";
	output.innerHTML += "Sun mass, sun mass,"+"\n";
	output.innerHTML += " Solar mass, solar mass"+"\n";
	output.innerHTML += "Sun radius, sun radius,"+"\n";
	output.innerHTML += "Solar radius, solar radius"+"\n";
}

function Units()
{
	output = document.getElementById("output");
	output.innerHTML = "------------------------------------"+"\n";
	output.innerHTML += "Units list\n";
	output.innerHTML += "-----------------------------------"+"\n";
	output.innerHTML += "au"+"\n";
	output.innerHTML += "amu"+"\n";
	output.innerHTML += "atm"+"\n";
	output.innerHTML += "angstrom"+"\n";
	output.innerHTML += "A, Ampere, ampere, Amp, amp"+"\n";
	output.innerHTML += "Bq, Becquerel, becquerel"+"\n";
	output.innerHTML += "cd, Candela, candela"+"\n";
	output.innerHTML += "C, Coulomb, coulomb,"+"\n";
	output.innerHTML += " Coulombs, coulombs"+"\n";
	output.innerHTML += "deg, degree"+"\n";
	output.innerHTML += "day, days"+"\n";
	output.innerHTML += "eV, electronvolt, electron volt"+"\n";
	output.innerHTML += "eV/c^2"+"\n";
	output.innerHTML += "ft, foot, feet"+"\n";
	output.innerHTML += "F, Farad"+"\n";
	output.innerHTML += "g, gram"+"\n";
	output.innerHTML += "Gy"+"\n";
	output.innerHTML += "Gauss"+"\n";
	output.innerHTML += "hr, hour, hours"+"\n";
	output.innerHTML += "Hz, Hertz, hertz"+"\n";
	output.innerHTML += "H, Henry, henry"+"\n";
	output.innerHTML += "inch"+"\n";
	output.innerHTML += "J, Joule, joule, Joules, joules"+"\n";
	output.innerHTML += "K, Kelvin, kelvin, Kelvins, kelvins"+"\n";
	output.innerHTML += "lb, pound, pounds"+"\n";
	output.innerHTML += "lm, lumen"+"\n";
	output.innerHTML += "lx, lux"+"\n";
	output.innerHTML += "l, litre"+"\n";
	output.innerHTML += "league"+"\n";
	output.innerHTML += "ly, light year, light years,"+"\n";
	output.innerHTML += " lightyear, lightyears, light-year"+"\n";
	output.innerHTML += "min, minute, minutes"+"\n";
	output.innerHTML += "mile, miles"+"\n";
	output.innerHTML += "m, metre"+"\n";
	output.innerHTML += "Maxwell"+"\n";
	output.innerHTML += "N, Newton, newton"+"\n";
	output.innerHTML += "Ohm, ohm, &Ohm;"+"\n";
	output.innerHTML += "parsec"+"\n";
	output.innerHTML += "Pa, Pascal, pascal"+"\n";
	output.innerHTML += "rad, radian"+"\n";
	output.innerHTML += "s, sec, second, seconds"+"\n";
	output.innerHTML += "Sy"+"\n";
	output.innerHTML += "S"+"\n";
	output.innerHTML += "tonne"+"\n";
	output.innerHTML += "T"+"\n";
	output.innerHTML += "V, Volt, Volts, volt, volts"+"\n";
	output.innerHTML += "Wb, Weber"+"\n";
	output.innerHTML += "W, Watt, Watts, watt, watts"+"\n";
	output.innerHTML += "yard, yards"+"\n";
	output.innerHTML += "yr, year, years"+"\n";
	output.innerHTML += ""+"\n";
	output.innerHTML += "------------------------------------"+"\n";
	output.innerHTML += "Prefixes\n";
	output.innerHTML += "-----------------------------------"+"\n";
	output.innerHTML += "yotta"+"\n";
	output.innerHTML += "zetta"+"\n";
	output.innerHTML += "exa"+"\n";
	output.innerHTML += "peta"+"\n";
	output.innerHTML += "tera (T)"+"\n";
	output.innerHTML += "giga (G)"+"\n";
	output.innerHTML += "mega (M)"+"\n";
	output.innerHTML += "kilo (k)"+"\n";
	output.innerHTML += "hecto"+"\n";
	output.innerHTML += "deca"+"\n";
	output.innerHTML += "deci (d)"+"\n";
	output.innerHTML += "centi (c)"+"\n";
	output.innerHTML += "milli (m)"+"\n";
	output.innerHTML += "micro (&mu;)"+"\n";
	output.innerHTML += "nano (n)"+"\n";
	output.innerHTML += "pico (p)"+"\n";
	output.innerHTML += "femto (f)"+"\n";
	output.innerHTML += "atta"+"\n";
	output.innerHTML += "zepto"+"\n";
	output.innerHTML += "yocto"+"\n";
	output.innerHTML += ""+"\n";
	output.innerHTML += "Please note that prefix symbols"+"\n";
	output.innerHTML += "T, G, c, and m"+"\n";
	output.innerHTML += "are reserved for these units"+"\n";
	output.innerHTML += "only:"+"\n";
	output.innerHTML += "A, C, F, g ,H, J, K, l, m, N, s, S,"+"\n";
	output.innerHTML += "T, V, eV, eV/c^2, W, Hz, hz,"+"\n";
	output.innerHTML += "Pa, and Wb"+"\n";
}

function Add(x)
{
	document.getElementById("inp").value+=x;
}

function Clear()
{
	document.getElementById("output").innerHTML = "";
}

function io()//input, operate, and output the result
{
	checkin = 0;
	var _begin = new Data();
	var _end = new Data();
	var _num = new Data();
	var _bracket_cnt = new Data();
	var unitdisplay;
	var bracket_cnt = 0;
	var unitcheck;
	input = document.getElementById("inp").value;
	originalinput = input;
	inp = document.getElementById("inp");
	inp.value = "";
	
	encode();
	N = input.length;
	codedinput = input;
	assign();
	numerize();
	despace();
	prefix(Bgn,End);
		_end = Bgn;
		_bracket_cnt = Bgn;
		while(_bracket_cnt != End)
		{
			if(_bracket_cnt.type == "(")
			bracket_cnt++;
			if(_bracket_cnt.type == ")")
			bracket_cnt--;
			_bracket_cnt = _bracket_cnt.to;
		}
		if(bracket_cnt == 0)
		{
			while(_end != End)
			{
				if(_end.type == ")")
				{
					_begin = _end;
					while(_begin.type != "(")
					{
						_begin = _begin.from;
					}
					// Begin local operations ---------------------------------------
					Factorial(_begin,_end);
					power(_begin,_end);
					sign_adjust(_begin,_end);
					E(_begin,_end);
					prefix(_begin,_end);
					decode(_begin,_end);
					sign_adjust(_begin,_end);
					devision(_begin,_end);
					product(_begin,_end);
					sum(_begin,_end);
					// End local operations -----------------------------------------
					if(_begin.to.to.type != ")")
					return;
					_begin.type = "1";
					_begin.value = _begin.to.value;
					for(i=0;i<6;i++)
					{
						_begin.unit[i] = _begin.to.unit[i];
					}
					_end = _end.to;
					_end.relink(_begin);
					_end = _begin;
				}
				_end = _end.to;
			}
			_begin = Bgn;
			_end = End;
			// Begin local operations -----------------------------------------------
			Factorial(_begin,_end);
			power(_begin,_end);
			sign_adjust(_begin,_end);
			E(_begin,_end);
			prefix(_begin,_end);
			decode(_begin,_end);
			sign_adjust(_begin,_end);
			devision(_begin,_end);
			product(_begin,_end);
			sum(_begin,_end);
			// End local operations -------------------------------------------------
			
			if(_begin.to.type == "1" && _begin.to.to.type == "}")
			{
				_num = _begin.to;
				unitdisplay = "";
				for(i=0;i<6;i++)
				{
					if(_num.unit[i] != 0 && _num.unit[i] != 1)
					{
						unitdisplay += " "+unitshow[i]+"^"+_num.unit[i];
					}
					else if(_num.unit[i] == 1)
					unitdisplay += " "+unitshow[i];
				}
				display = format(_num.value.toPrecision(6))+" "+unitdisplay+" ";
				errorcode = "fine";
				output = document.getElementById("output");
			}
		}
		else
		errorcode = "incomplete parenthesis";
		if(checkin == 1)
		{
			unitcheck = 0;
			for(i=0;i<6;i++)
			unitcheck += abs(Ans.unit[i] - _num.unit[i]);
			if(unitcheck == 0)
			{
				new_unit = originalinput.replace("in","");
				new_value = Ans.value/_num.value;
				display = format(new_value.toPrecision(6))+" "+new_unit+" ";
				output.innerHTML = originalinput + "\n&nbsp;&nbsp;&nbsp;= "+display+"\n"+output.innerHTML;
			}
			else
			{
				errorcode = "unit error : "+unitcheck;
				output.innerHTML = originalinput + "\n&nbsp;&nbsp;&nbsp;error: "+errorcode+"\n"+output.innerHTML;
			}
			_num.value = _Ans.value;
			for(i=0;i<6;i++)
			_num.unit[i] = Ans.unit[i];
		}
		else
		{
			if(errorcode == "fine" && display != "??")
			output.innerHTML = originalinput + "\n&nbsp;&nbsp;&nbsp;= "+display+"\n"+output.innerHTML;
			else
			output.innerHTML = originalinput + "\n&nbsp;&nbsp;&nbsp;error: "+errorcode+"\n"+output.innerHTML;
		}
		errorcode = default_errorcode;
		display = "??";
		Ans.value = _num.value;
		for(i=0;i<6;i++)
		Ans.unit[i] = _num.unit[i];
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

function format(str)
{
	e = str.search("e");
	dot = str.search("\\.");
	N = str.length;
	if(dot==-1 && e==-1)
	return str;
	else if(dot!=-1 && e!=-1)
	{
		l = e-dot-1;
		trigger=0;
		X = str.substring(0,dot);
		Y = str.substring(dot+1,e);
		Z = str.substring(e,N);
		refine = "";
		for(i=l-1;i>=0;i--)
		{
			if(Y.charAt(i)==0 && trigger==0)
			refine=""+refine;
			else
			{
				trigger = 1;
				refine=Y.charAt(i)+refine;
			}
		}
		if(refine!="")
		return X+"."+refine+Z;
		else
		return X+Z;
	}
	else if(e == -1)
	{
		l = N-dot-1;
		trigger=0;
		X = str.substring(0,dot);
		Y = str.substring(dot+1,N);
		refine = "";
		for(i=l-1;i>=0;i--)
		{
			if(Y.charAt(i)==0 && trigger==0)
			refine=""+refine;
			else
			{
				trigger = 1;
				refine=Y.charAt(i)+refine;
			}
		}
		if(refine!="")
		return X+"."+refine;
		else
		return X;
	}
}

function Factorial(_begin,_end)
{
	var _wtf = new Data();
	var _cache = new Data();
	_wtf = _begin.to;
	while(_wtf != _end)
	{
		if(_wtf.type == "!" && _wtf.from.type == "1")
		{
			_cache = _wtf.to;
			_wtf = _wtf.from;
			_wtf.value = factorial(_wtf.value);
			if(_wtf.value == null)
			{
				errorcode = "invalid factorial";
				return;
			}
			_cache.relink(_wtf);
		}
		_wtf = _wtf.to;
	}
}

function sign_adjust(_begin,_end)
{
	var _sign = new Data();
	_sign = _begin.to;
	while(_sign != _end)
	{
		if((_sign.type == "+" || _sign.type == "-") && _sign.to.type != "1"  && _sign.to.type != "Y"  && _sign.to.type != "X")
		errorcode = "signing syntax";
		if(_sign.type == "-" && _sign.to.type == "1")
		{
			_sign.to.value*=-1;
			_sign.type = "+";
		}
		if(_sign.type == "+" && _sign.to.type == "1")
		{
			if(_sign.from.type == "*" || _sign.from.type == "/" || _sign.from.type == "e" || _sign.from.type == "E" || _sign.from.type == "(" || _sign.from.type == "{"|| _sign.from.type == "^")
			{
				_sign.to.relink(_sign.from);
			}
		}
		_sign = _sign.to;
	}
}

function E(_begin,_end)//[local] Evaluating scientific notations such as 1.2e+20;
{
	var unitcheck;
	var _E = new Data();
	var _cache = new Data();
	_E = _begin.to;
	while(_E != _end)
	{
		if( (_E.type == "e" || _E.type == "E") && _E.from.type == "1" && _E.to.type == "1")
		{
			unitcheck = 0;
			for(i=0;i<6;i++)
			{
				unitcheck+=Math.abs(_E.from.unit[i]);
				unitcheck+=Math.abs(_E.to.unit[i]);
			}
			if(unitcheck == 0)
			{
				_cache = _E.to.to;
				_E.from.value = _E.from.value*Math.pow(10,_E.to.value);
				_cache.relink(_E.from);
				_E = _E.from;
			}
			else
			errorcode = "unit error";
		}
		else if( (_E.type == "e" || _E.type == "E") && (_E.from.type != "1" || _E.to.type != "1"))
		{
			if( _E.type == "e" && (_E.to.type != "x"||_E.to.to.type != "p"))
			errorcode = "scientific notation syntax";
		}
		_E = _E.to;
	}
}

function devision(_begin,_end)
{
	var _slash = new Data();
	var _cache = new Data();
	_slash = _begin.to;
	while(_slash != _end)
	{
		if(_slash.type == "/" && _slash.from.type == "1" && _slash.to.type == "1")
		{
			_cache = _slash.to.to;
			_slash.from.value/=_slash.to.value;
			for(i=0;i<6;i++)
			_slash.from.unit[i]-=_slash.to.unit[i];
			_cache.relink(_slash.from);
			_slash = _slash.from;
		}
		if(_slash.type == "/" && (_slash.from.type != "1" || _slash.to.type != "1"))
		errorcode = "division syntax";
		_slash = _slash.to;
	}
}

function product(_begin,_end)
{
	var _star = new Data();
	var _cache = new Data();
	_star = _begin.to;
	while(_star != _end)
	{
		if(_star.type == "*" && _star.from.type == "1" && _star.to.type == "1")
		{
			_cache = _star.to.to;
			_star.from.value*=_star.to.value;
			for(i=0;i<6;i++)
			_star.from.unit[i]+=_star.to.unit[i];
			_cache.relink(_star.from);
			_star = _star.from;
		}
		if(_star.type == "*" && (_star.from.type != "1" || _star.to.type != "1"))
		errorcode = "multiplication syntax";
		_star = _star.to;
	}
}

function sum(_begin,_end)
{
	var _plus = new Data();
	var _cache = new Data();
	var unitcheck;
	_plus = _begin.to;
	while(_plus != _end)
	{
		if(_plus.type == "+" && _plus.from.type == "1" && _plus.to.type == "1")
		{
			unitcheck = 0;
			_cache = _plus.to.to;
			for(i=0;i<6;i++)
			unitcheck+=Math.abs((_plus.from.unit[i])-(_plus.to.unit[i]));
			if(unitcheck == 0)
			{
				_plus.from.value+=_plus.to.value;
				_cache.relink(_plus.from);
				_plus = _plus.from;
			}
			else
			errorcode = "unit error"
		}
		_plus = _plus.to;
	}
}

function power(_begin,_end)
{
	var unitcheck;
	var _hat = new Data();
	var _cache = new Data();
	_hat = _begin.to;
	while(_hat != _end)
	{
		if(_hat.type == "^" && _hat.from.type == "1" && _hat.to.type == "1")
		{
			unitcheck = 0;
			for(i=0;i<6;i++)
			{
				unitcheck+=Math.abs(_hat.to.unit[i]);
			}
			if(unitcheck == 0)
			{
				_cache = _hat.to.to;
				_hat.from.value = Math.pow(_hat.from.value,_hat.to.value);
				for(i=0;i<6;i++)
				_hat.from.unit[i]*=_hat.to.value;
				_cache.relink(_hat.from);
				_hat = _hat.from;
			}
			else
			errorcode = "unit error";
		}
		else if( _hat.type == "^" && (_hat.from.type != "1" || _hat.to.type != "1"))
		{
			errorcode = "scientific notation syntax";
		}
		_hat = _hat.to;
	}
}

function encode()//[global] encoding units, constants, etc. into a specific code, e.g. au is coded to U01x .
{
	while(input.search("Gravitational constant") != -1) input = input.replace("Gravitational constant","X10x");
	while(input.search("gravitational constant") != -1) input = input.replace("gravitational constant","X10x");
	while(input.search("Boltzmann\'s constant") != -1) input = input.replace("Boltzmann's constant","X02x");
	while(input.search("boltzmann\'s constant") != -1) input = input.replace("boltzmann's constant","X02x");
	while(input.search("Rydhberg\'s constant") != -1) input = input.replace("Rydhberg's constant","X16x");
	while(input.search("rydhberg\'s constant") != -1) input = input.replace("rydhberg's constant","X16x");
	while(input.search("Boltzmann constant") != -1) input = input.replace("Boltzmann constant","X02x");
	while(input.search("boltzmann constant") != -1) input = input.replace("boltzmann constant","X02x");
	while(input.search("Coulomb\'s constant") != -1) input = input.replace("Coulomb's constant","X04x");
	while(input.search("coulomb\'s constant") != -1) input = input.replace("coulomb's constant","X04x");
	while(input.search("electric constant") != -1) input = input.replace("electric constant","X06x");
	while(input.search("elementary charge") != -1) input = input.replace("elementary charge","X07x");
	while(input.search("magnetic constant") != -1) input = input.replace("magnetic constant","X13x");
	while(input.search("Magnetic constant") != -1) input = input.replace("Magnetic constant","X13x");
	while(input.search("Rydhberg constant") != -1) input = input.replace("Rydhberg constant","X16x");
	while(input.search("rydhberg constant") != -1) input = input.replace("rydhberg constant","X16x");
	while(input.search("Planck\'s constant") != -1) input = input.replace("Planck\'s constant","X12x");
	while(input.search("planck\'s constant") != -1) input = input.replace("planck\'s constant","X12x");
	while(input.search("Coulomb constant") != -1) input = input.replace("Coulomb constant","X04x");
	while(input.search("coulomb constant") != -1) input = input.replace("coulomb constant","X04x");
	while(input.search("electron charge") != -1) input = input.replace("electron charge","X07x");
	while(input.search("Planck constant") != -1) input = input.replace("Planck constant","X12x");
	while(input.search("planck constant") != -1) input = input.replace("planck constant","X12x");
	while(input.search("speed of light") != -1) input = input.replace("speed of light","X03x");
	while(input.search("electron volt") != -1) input = input.replace("electron volt","U11x");
	while(input.search("electron mass") != -1) input = input.replace("electron mass","X05x");
	while(input.search("proton charge") != -1) input = input.replace("proton charge","X07x");
	while(input.search("Bohr\'s radius") != -1) input = input.replace("Bohr's radius","X01x");
	while(input.search("bohr\'s radius") != -1) input = input.replace("bohr's radius","X01x");
	while(input.search("Earth radius") != -1) input = input.replace("Earth radius","X09x");
	while(input.search("earth radius") != -1) input = input.replace("earth radius","X09x");
	while(input.search("Solar radius") != -1) input = input.replace("Solar radius","X18x");
	while(input.search("solar radius") != -1) input = input.replace("solar radius","X18x");
	while(input.search("electronvolt") != -1) input = input.replace("electronvolt","U11x");
	while(input.search("proton mass") != -1) input = input.replace("proton mass","X14x");
	while(input.search("light years") != -1) input = input.replace("light years","U30x");
	while(input.search("Bohr radius") != -1) input = input.replace("Bohr radius","X01x");
	while(input.search("bohr radius") != -1) input = input.replace("bohr radius","X01x");
	while(input.search("Solar mass") != -1) input = input.replace("Solar mass","X17x");
	while(input.search("solar mass") != -1) input = input.replace("solar mass","X17x");
	while(input.search("Sun radius") != -1) input = input.replace("Sun radius","X18x");
	while(input.search("sun radius") != -1) input = input.replace("sun radius","X18x");
	while(input.search("light-year") != -1) input = input.replace("light-year","U30x");
	while(input.search("lightyears") != -1) input = input.replace("lightyears","U30x");
	while(input.search("light year") != -1) input = input.replace("light year","U30x");
	while(input.search("Earth mass") != -1) input = input.replace("Earth mass","X08x");
	while(input.search("earth mass") != -1) input = input.replace("earth mass","X08x");
	while(input.search("lightyear") != -1) input = input.replace("lightyear","U30x");
	while(input.search("becquerel") != -1) input = input.replace("becquerel","U06x");
	while(input.search("Becquerel") != -1) input = input.replace("Becquerel","U06x");
	while(input.search("angstrom") != -1) input = input.replace("angstrom","U04x");
	while(input.search("Sun mass") != -1) input = input.replace("Sun mass","X17x");
	while(input.search("sun mass") != -1) input = input.replace("sun mass","X17x");
	while(input.search("Coulombs") != -1) input = input.replace("Coulombs","U08x");
	while(input.search("coulombs") != -1) input = input.replace("coulombs","U08x");
	while(input.search("minutes") != -1) input = input.replace("minutes","U31x");
	while(input.search("Maxwell") != -1) input = input.replace("Maxwell","U34x");
	while(input.search("seconds") != -1) input = input.replace("seconds","U40x");
	while(input.search("epsilon") != -1) input = input.replace("epsilon","X06x");
	while(input.search("TeV/c\\^2") != -1) input = input.replace("TeV/c^2","PR16xU12x");
	while(input.search("GeV/c\\^2") != -1) input = input.replace("GeV/c^2","PR15xU12x");
	while(input.search("ceV/c\\^2") != -1) input = input.replace("ceV/c^2","PR09xU12x");
	while(input.search("meV/c\\^2") != -1) input = input.replace("meV/c^2","PR08xU12x");
	while(input.search("Coulomb") != -1) input = input.replace("Coulomb","U08x");
	while(input.search("coulomb") != -1) input = input.replace("coulomb","U08x");
	while(input.search("Kelvins") != -1) input = input.replace("Kelvins","U24x");
	while(input.search("kelvins") != -1) input = input.replace("kelvins","U24x");
	while(input.search("candela") != -1) input = input.replace("candela","U07x");
	while(input.search("Candela") != -1) input = input.replace("Candela","U07x");
	while(input.search("eV/c\\^2") != -1) input = input.replace("eV/c^2","U12x");
	while(input.search("league") != -1) input = input.replace("league","U29x");
	while(input.search("minute") != -1) input = input.replace("minute","U31x");
	while(input.search("Newton") != -1) input = input.replace("Newton","U35x");
	while(input.search("newton") != -1) input = input.replace("newton","U35x");
	while(input.search("parsec") != -1) input = input.replace("parsec","U37x");
	while(input.search("Pascal") != -1) input = input.replace("Pascal","U38x");
	while(input.search("pascal") != -1) input = input.replace("pascal","U38x");
	while(input.search("second") != -1) input = input.replace("second","U40x");
	while(input.search("pounds") != -1) input = input.replace("pounds","U25x");
	while(input.search("Ampere") != -1) input = input.replace("Ampere","U05x");
	while(input.search("ampere") != -1) input = input.replace("ampere","U05x");
	while(input.search("Joules") != -1) input = input.replace("Joules","U22x");
	while(input.search("joules") != -1) input = input.replace("joules","U22x");
	while(input.search("Kelvin") != -1) input = input.replace("Kelvin","U24x");
	while(input.search("kelvin") != -1) input = input.replace("kelvin","U24x");
	while(input.search("degree") != -1) input = input.replace("degree","U09x");
	while(input.search("radian") != -1) input = input.replace("radian","U39x");
	while(input.search("asinh") != -1) input = input.replace("asinh","Y19x");
	while(input.search("acosh") != -1) input = input.replace("acosh","Y20x");
	while(input.search("atanh") != -1) input = input.replace("atanh","Y21x");
	while(input.search("asech") != -1) input = input.replace("asech","Y22x");
	while(input.search("acsch") != -1) input = input.replace("acsch","Y23x");
	while(input.search("acoth") != -1) input = input.replace("acoth","Y24x");
	while(input.search("floor") != -1) input = input.replace("floor","Y27x");
	while(input.search("Gauss") != -1) input = input.replace("Gauss","U17x");
	while(input.search("hours") != -1) input = input.replace("hours","U18x");
	while(input.search("litre") != -1) input = input.replace("litre","U28x");
	while(input.search("miles") != -1) input = input.replace("miles","U32x");
	while(input.search("metre") != -1) input = input.replace("metre","U33x");
	while(input.search("tonne") != -1) input = input.replace("tonne","U43x");
	while(input.search("years") != -1) input = input.replace("years","U49x");
	while(input.search("yocto") != -1) input = input.replace("yocto","PR01x");
	while(input.search("zepto") != -1) input = input.replace("zepto","PR02x");
	while(input.search("femto") != -1) input = input.replace("femto","PR04x");
	while(input.search("micro") != -1) input = input.replace("micro","PR07x");
	while(input.search("milli") != -1) input = input.replace("milli","PR08x");
	while(input.search("centi") != -1) input = input.replace("centi","PR09x");
	while(input.search("hecto") != -1) input = input.replace("hecto","PR12x");
	while(input.search("zetta") != -1) input = input.replace("zetta","PR19x");
	while(input.search("yotta") != -1) input = input.replace("yotta","PR20x");
	while(input.search("pound") != -1) input = input.replace("pound","U25x");
	while(input.search("yards") != -1) input = input.replace("yards","U48x");
	while(input.search("Farad") != -1) input = input.replace("Farad","U14x");
	while(input.search("Hertz") != -1) input = input.replace("Hertz","U19x");
	while(input.search("hertz") != -1) input = input.replace("hertz","U19x");
	while(input.search("Joule") != -1) input = input.replace("Joule","U22x");
	while(input.search("joule") != -1) input = input.replace("joule","U22x");
	while(input.search("lumen") != -1) input = input.replace("lumen","U26x");
	while(input.search("Tesla") != -1) input = input.replace("Tesla","U44x");
	while(input.search("tesla") != -1) input = input.replace("tesla","U44x");
	while(input.search("Volts") != -1) input = input.replace("Volts","U45x");
	while(input.search("volts") != -1) input = input.replace("volts","U45x");
	while(input.search("Weber") != -1) input = input.replace("Weber","U46x");
	while(input.search("Watts") != -1) input = input.replace("Watts","U47x");
	while(input.search("watts") != -1) input = input.replace("watts","U47x");
	while(input.search("Henry") != -1) input = input.replace("Henry","U20x");
	while(input.search("henry") != -1) input = input.replace("henry","U20x");
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
	while(input.search("sqrt") != -1) input = input.replace("sqrt","Y31x");
	while(input.search("days") != -1) input = input.replace("days","U10x");
	while(input.search("foot") != -1) input = input.replace("foot","U13x");
	while(input.search("feet") != -1) input = input.replace("feet","U13x");
	while(input.search("gram") != -1) input = input.replace("gram","U15x");
	while(input.search("hour") != -1) input = input.replace("hour","U18x");
	while(input.search("inch") != -1) input = input.replace("inch","U21x");
	while(input.search("mile") != -1) input = input.replace("mile","U32x");
	while(input.search("yard") != -1) input = input.replace("yard","U48x");
	while(input.search("year") != -1) input = input.replace("year","U49x");
	while(input.search("hbar") != -1) input = input.replace("hbar","X11x");
	while(input.search("atta") != -1) input = input.replace("atta","PR03x");
	while(input.search("pico") != -1) input = input.replace("pico","PR05x");
	while(input.search("nano") != -1) input = input.replace("nano","PR06x");
	while(input.search("deci") != -1) input = input.replace("deci","PR10x");
	while(input.search("deca") != -1) input = input.replace("deca","PR11x");
	while(input.search("kilo") != -1) input = input.replace("kilo","PR13x");
	while(input.search("mega") != -1) input = input.replace("mega","PR14x");
	while(input.search("giga") != -1) input = input.replace("giga","PR15x");
	while(input.search("tera") != -1) input = input.replace("tera","PR16x");
	while(input.search("peta") != -1) input = input.replace("peta","PR17x");
	while(input.search("Volt") != -1) input = input.replace("Volt","U45x");
	while(input.search("volt") != -1) input = input.replace("volt","U45x");
	while(input.search("Watt") != -1) input = input.replace("Watt","U47x");
	while(input.search("watt") != -1) input = input.replace("watt","U47x");
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
	while(input.search("min") != -1) input = input.replace("min","U31x");
	while(input.search("Ohm") != -1) input = input.replace("Ohm","U36x");
	while(input.search("ohm") != -1) input = input.replace("ohm","U36x");
	while(input.search("rad") != -1) input = input.replace("rad","U39x");
	while(input.search("sec") != -1) input = input.replace("sec","U40x");
	while(input.search("exa") != -1) input = input.replace("exa","PR18x");
	while(input.search("ans") != -1) input = input.replace("ans","Q01x");
	while(input.search("Ans") != -1) input = input.replace("Ans","Q01x");
	while(input.search("ANS") != -1) input = input.replace("ANS","Q01x");
	while(input.search("Amp") != -1) input = input.replace("Amp","U05x");
	while(input.search("amp") != -1) input = input.replace("amp","U05x");
	while(input.search("erg") != -1) input = input.replace("erg","U50x");
	while(input.search("Erg") != -1) input = input.replace("Erg","U50x");
	while(input.search("TeV") != -1) input = input.replace("TeV","PR16xU11x");
	while(input.search("THz") != -1) input = input.replace("THz","PR16xU19x");
	while(input.search("Thz") != -1) input = input.replace("Thz","PR16xU19x");
	while(input.search("TPa") != -1) input = input.replace("TPa","PR16xU38x");
	while(input.search("TWb") != -1) input = input.replace("TWb","PR16xU46x");
	while(input.search("GeV") != -1) input = input.replace("GeV","PR15xU11x");
	while(input.search("GHz") != -1) input = input.replace("GHz","PR15xU19x");
	while(input.search("Ghz") != -1) input = input.replace("Ghz","PR15xU19x");
	while(input.search("GPa") != -1) input = input.replace("GPa","PR15xU38x");
	while(input.search("GWb") != -1) input = input.replace("GWb","PR15xU46x");
	while(input.search("ceV") != -1) input = input.replace("ceV","PR09xU11x");
	while(input.search("cHz") != -1) input = input.replace("cHz","PR09xU19x");
	while(input.search("chz") != -1) input = input.replace("chz","PR09xU19x");
	while(input.search("cPa") != -1) input = input.replace("cPa","PR09xU38x");
	while(input.search("cWb") != -1) input = input.replace("cWb","PR09xU46x");
	while(input.search("meV") != -1) input = input.replace("meV","PR08xU11x");
	while(input.search("mHz") != -1) input = input.replace("mHz","PR08xU19x");
	while(input.search("mhz") != -1) input = input.replace("mhz","PR08xU19x");
	while(input.search("mPa") != -1) input = input.replace("mPa","PR08xU38x");
	while(input.search("mWb") != -1) input = input.replace("mWb","PR08xU46x");
	while(input.search("lux") != -1) input = input.replace("lux","U27x");
	while(input.search("mu") != -1) input = input.replace("mu","X13x");
	while(input.search("pi") != -1) input = input.replace("pi","X15x");
	while(input.search("Pi") != -1) input = input.replace("Pi","X15x");
	while(input.search("PI") != -1) input = input.replace("PI","X15x");
	while(input.search("ln") != -1) input = input.replace("ln","Y30x");
	while(input.search("Bq") != -1) input = input.replace("Bq","U06x");
	while(input.search("cd") != -1) input = input.replace("cd","U07x");
	while(input.search("au") != -1) input = input.replace("au","U01x");
	while(input.search("eV") != -1) input = input.replace("eV","U11x");
	while(input.search("ft") != -1) input = input.replace("ft","U13x");
	while(input.search("Gy") != -1) input = input.replace("Gy","U16x");
	while(input.search("hr") != -1) input = input.replace("hr","U18x");
	while(input.search("Hz") != -1) input = input.replace("Hz","U19x");
	while(input.search("hz") != -1) input = input.replace("hz","U19x");
	while(input.search("kg") != -1) input = input.replace("kg","U23x");
	while(input.search("lb") != -1) input = input.replace("lb","U25x");
	while(input.search("lm") != -1) input = input.replace("lm","U26x");
	while(input.search("lx") != -1) input = input.replace("lx","U27x");
	while(input.search("ly") != -1) input = input.replace("ly","U30x");
	while(input.search("Pa") != -1) input = input.replace("Pa","U38x");
	while(input.search("Sy") != -1) input = input.replace("Sv","U41x");
	while(input.search("Wb") != -1) input = input.replace("Wb","U46x");
	while(input.search("yr") != -1) input = input.replace("yr","U49x");
	while(input.search("me") != -1) input = input.replace("me","X05x");
	while(input.search("mp") != -1) input = input.replace("mp","X14x");
	while(input.search("in") != -1) {input = input.replace("in","1");checkin = 1;}		
	while(input.search("TA") != -1) input = input.replace("TA","PR16xU05x");
	while(input.search("TC") != -1) input = input.replace("TC","PR16xU08x");
	while(input.search("TF") != -1) input = input.replace("TF","PR16xU14x");
	while(input.search("Tg") != -1) input = input.replace("Tg","PR16xU15x");
	while(input.search("TH") != -1) input = input.replace("TH","PR16xU20x");
	while(input.search("TJ") != -1) input = input.replace("TJ","PR16xU22x");
	while(input.search("TK") != -1) input = input.replace("TK","PR16xU24x");
	while(input.search("Tl") != -1) input = input.replace("Tl","PR16xU28x");
	while(input.search("Tm") != -1) input = input.replace("Tm","PR16xU33x");
	while(input.search("Ts") != -1) input = input.replace("Ts","PR16xU40x");
	while(input.search("TS") != -1) input = input.replace("TS","PR16xU42x");
	while(input.search("TT") != -1) input = input.replace("TT","PR16xU44x");
	while(input.search("TV") != -1) input = input.replace("TV","PR16xU45x");
	while(input.search("TW") != -1) input = input.replace("TW","PR16xU47x");
	while(input.search("TN") != -1) input = input.replace("TN","PR16xU35x");
	while(input.search("GA") != -1) input = input.replace("GA","PR15xU05x");
	while(input.search("GC") != -1) input = input.replace("GC","PR15xU08x");
	while(input.search("GF") != -1) input = input.replace("GF","PR15xU14x");
	while(input.search("Gg") != -1) input = input.replace("Gg","PR15xU15x");
	while(input.search("GH") != -1) input = input.replace("GH","PR15xU20x");
	while(input.search("GJ") != -1) input = input.replace("GJ","PR15xU22x");
	while(input.search("GK") != -1) input = input.replace("GK","PR15xU24x");
	while(input.search("Gl") != -1) input = input.replace("Gl","PR15xU28x");
	while(input.search("Gm") != -1) input = input.replace("Gm","PR15xU33x");
	while(input.search("Gs") != -1) input = input.replace("Gs","PR15xU40x");
	while(input.search("GS") != -1) input = input.replace("GS","PR15xU42x");
	while(input.search("GT") != -1) input = input.replace("GT","PR15xU44x");
	while(input.search("GV") != -1) input = input.replace("GV","PR15xU45x");
	while(input.search("GW") != -1) input = input.replace("GW","PR15xU47x");
	while(input.search("GN") != -1) input = input.replace("GN","PR15xU35x");
	while(input.search("cA") != -1) input = input.replace("cA","PR09xU05x");
	while(input.search("cC") != -1) input = input.replace("cC","PR09xU08x");
	while(input.search("cF") != -1) input = input.replace("cF","PR09xU14x");
	while(input.search("cg") != -1) input = input.replace("cg","PR09xU15x");
	while(input.search("cH") != -1) input = input.replace("cH","PR09xU20x");
	while(input.search("cJ") != -1) input = input.replace("cJ","PR09xU22x");
	while(input.search("cK") != -1) input = input.replace("cK","PR09xU24x");
	while(input.search("cl") != -1) input = input.replace("cl","PR09xU28x");
	while(input.search("cm") != -1) input = input.replace("cm","PR09xU33x");
	while(input.search("cs") != -1) input = input.replace("cs","PR09xU40x");
	while(input.search("cS") != -1) input = input.replace("cS","PR09xU42x");
	while(input.search("cT") != -1) input = input.replace("cT","PR09xU44x");
	while(input.search("cV") != -1) input = input.replace("cV","PR09xU45x");
	while(input.search("cW") != -1) input = input.replace("cW","PR09xU47x");
	while(input.search("cN") != -1) input = input.replace("cN","PR09xU35x");
	while(input.search("mA") != -1) input = input.replace("mA","PR08xU05x");
	while(input.search("mC") != -1) input = input.replace("mC","PR08xU08x");
	while(input.search("mF") != -1) input = input.replace("mF","PR08xU14x");
	while(input.search("mg") != -1) input = input.replace("mg","PR08xU15x");
	while(input.search("mH") != -1) input = input.replace("mH","PR08xU20x");
	while(input.search("mJ") != -1) input = input.replace("mJ","PR08xU22x");
	while(input.search("mK") != -1) input = input.replace("mK","PR08xU24x");
	while(input.search("ml") != -1) input = input.replace("ml","PR08xU28x");
	while(input.search("mm") != -1) input = input.replace("mm","PR08xU33x");
	while(input.search("ms") != -1) input = input.replace("ms","PR08xU40x");
	while(input.search("mS") != -1) input = input.replace("mS","PR08xU42x");
	while(input.search("mT") != -1) input = input.replace("mT","PR08xU44x");
	while(input.search("mV") != -1) input = input.replace("mV","PR08xU45x");
	while(input.search("mW") != -1) input = input.replace("mW","PR08xU47x");
	while(input.search("mN") != -1) input = input.replace("mN","PR08xU35x");
	while(input.search("kB") != -1) input = input.replace("kB","X02x");
	while(input.search("kb") != -1) input = input.replace("kb","X02x");
	while(input.search("A") != -1) input = input.replace("A","U05x");
	while(input.search("C") != -1) input = input.replace("C","U08x");
	while(input.search("F") != -1) input = input.replace("F","U14x");
	while(input.search("g") != -1) input = input.replace("g","U15x");
	while(input.search("H") != -1) input = input.replace("H","U20x");
	while(input.search("J") != -1) input = input.replace("J","U22x");
	while(input.search("K") != -1) input = input.replace("K","U24x");
	while(input.search("l") != -1) input = input.replace("l","U28x");
	while(input.search("m") != -1) input = input.replace("m","U33x");
	while(input.search("N") != -1) input = input.replace("N","U35x");
	while(input.search("s") != -1) input = input.replace("s","U40x");
	while(input.search("S") != -1) input = input.replace("S","U42x");
	while(input.search("T") != -1) input = input.replace("T","U44x");
	while(input.search("V") != -1) input = input.replace("V","U45x");
	while(input.search("W") != -1) input = input.replace("W","U47x");
	while(input.search("c") != -1) input = input.replace("c","X03x");
	while(input.search("q") != -1) input = input.replace("q","X07x");
	while(input.search("G") != -1) input = input.replace("G","X10x");
	while(input.search("h") != -1) input = input.replace("h","X12x");
	while(input.search("M") != -1) input = input.replace("M","PR14x");
	while(input.search("k") != -1) input = input.replace("k","PR13x");
	while(input.search("d") != -1) input = input.replace("d","PR10x");
	while(input.search("n") != -1) input = input.replace("n","PR06x");
	while(input.search("p") != -1) input = input.replace("p","PR05x");
	while(input.search("f") != -1) input = input.replace("f","PR04x");
	while(input.search("\u03A9") != -1) input = input.replace("\u03A9","U36x");
	while(input.search("\u2126") != -1) input = input.replace("\u2126","U36x");
	while(input.search("\u03BC") != -1) input = input.replace("\u03BC","PR07x");
	while(input.search("\u00B5") != -1) input = input.replace("\u00B5","PR07x");	
}

function decode(_begin,_end)//[local] decode the units, constants, and so on .
{
	var _scan = new Data();
	var _cache = new Data();
	var code;
	var unit_pow;
	var unitcheck;
	_scan = _begin.to;
	while(_scan != _end)
	{
		if(_scan.from.type != "1" && _scan.type == "Q" && _scan.to.type == "1" && _scan.to.to.type == "x" && _scan.to.to.to.type != "1")
		{
			_cache = _scan.to.to.to;
			code = _scan.to.value;
			_scan.type = "1";
			switch(code)
			{
				case 1:
				_scan.value = Ans.value;
				for(i=0;i<6;i++)
				_scan.unit[i] = Ans.unit[i];
				break;
				default:
				return;
				break;
			}
			_cache.relink(_scan);
		}
		else if((_scan.from.type == "1"||(_scan.from.type == "/" && _scan.from.from.type == "1")) && _scan.type == "U" && _scan.to.type == "1" && _scan.to.to.type == "x")
		{
			//Unitsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
			unit_pow = 1;
			if(_scan.from.type == "1")
			_cache = _scan.from;
			else if(_scan.from.type == "/" && _scan.from.from.type == "1")
			_cache = _scan.from.from;
			code = _scan.to.value;
			if(_scan.to.to.to.type == "^" && _scan.to.to.to.to.type == "1")
			{
				unit_pow = _scan.to.to.to.to.value;
				_scan.to.to.to.to.to.relink(_scan.to.to);
			}
			if(_scan.from.type == "/")
			unit_pow *= -1;
			switch(code)
			{
				case 1:
				_cache.value*=Math.pow(1.49597870700e+11,unit_pow);
				_cache.unit[1]+=1*unit_pow;
				break;
				case 2:
				_cache.value*=Math.pow(1.66053892e-27,unit_pow);
				_cache.unit[0]+=1*unit_pow;
				break;
				case 3:
				_cache.value*=Math.pow(1.01325e+5,unit_pow);
				_cache.unit[0]+=1*unit_pow;
				_cache.unit[1]-=1*unit_pow;
				_cache.unit[2]-=2*unit_pow;
				break;
				case 4:
				_cache.value*=Math.pow(1e-10,unit_pow);
				_cache.unit[1]+=1*unit_pow;
				break;
				case 5:
				_cache.unit[3]+=1*unit_pow;
				break;
				case 6:
				_cache.unit[2]-=1*unit_pow;
				break;
				case 7:
				_cache.unit[5]+=1*unit_pow;
				break;
				case 8:
				_cache.unit[2]+=1*unit_pow;
				_cache.unit[3]+=1*unit_pow;
				break;
				case 9:
				_cache.value*=Math.pow(Math.PI/180,unit_pow);
				break;
				case 10:
				_cache.value*=Math.pow(86400,unit_pow);
				_cache.unit[2]+=1*unit_pow;
				break;
				case 11:
				_cache.value*=Math.pow(1.60217657e-19,unit_pow);
				_cache.unit[0]+=1*unit_pow;
				_cache.unit[1]+=2*unit_pow;
				_cache.unit[2]-=2*unit_pow;
				break;
				case 12:
				_cache.value*=Math.pow(1.78266184e-36,unit_pow);
				_cache.unit[0]+=1*unit_pow;
				break;
				case 13:
				_cache.value*=Math.pow(0.3048,unit_pow);
				_cache.unit[1]+=1*unit_pow;
				break;
				case 14:
				_cache.unit[0]-=1*unit_pow;
				_cache.unit[1]-=2*unit_pow;
				_cache.unit[2]+=4*unit_pow;
				_cache.unit[3]+=2*unit_pow;
				break;
				case 15:
				_cache.value*=Math.pow(1e-3,unit_pow);
				_cache.unit[0]+=1*unit_pow;
				break;
				case 16:
				_cache.unit[1]+=2*unit_pow;
				_cache.unit[2]-=2*unit_pow;
				break;
				case 17:
				_cache.value*=Math.pow(1e-4,unit_pow);
				_cache.unit[0]+=1*unit_pow;
				_cache.unit[2]-=2*unit_pow;
				_cache.unit[3]-=1*unit_pow;
				break;
				case 18:
				_cache.value*=Math.pow(3600,unit_pow);
				_cache.unit[2]+=1*unit_pow;
				break;
				case 19:
				_cache.unit[2]-=1*unit_pow;
				break;
				case 20:
				_cache.unit[0]+=1*unit_pow;
				_cache.unit[1]+=2*unit_pow;
				_cache.unit[2]-=2*unit_pow;
				_cache.unit[3]-=2*unit_pow;
				break;
				case 21:
				_cache.value*=Math.pow(0.0254,unit_pow);
				_cache.unit[1]+=1*unit_pow;
				break;
				case 22:
				_cache.unit[0]+=1*unit_pow;
				_cache.unit[1]+=2*unit_pow;
				_cache.unit[2]-=2*unit_pow;
				break;
				case 23:
				_cache.unit[0]+=1*unit_pow;
				break;
				case 24:
				_cache.unit[4]+=1*unit_pow;
				break;
				case 25:
				_cache.value*=Math.pow(0.453,unit_pow);
				_cache.unit[0]+=1*unit_pow;
				break;
				case 26:
				_cache.unit[5]+=1*unit_pow;
				break;
				case 27:
				_cache.unit[1]-=2*unit_pow;
				_cache.unit[5]+=1*unit_pow;
				break;
				case 28:
				_cache.value*=Math.pow(0.001,unit_pow);
				_cache.unit[1]+=3*unit_pow;
				break;
				case 29:
				_cache.value*=Math.pow(5556,unit_pow);
				_cache.unit[1]+=1*unit_pow;
				break;
				case 30:
				_cache.value*=Math.pow(9.4605284e+15,unit_pow);
				_cache.unit[1]+=1*unit_pow;
				break;
				case 31:
				_cache.value*=Math.pow(60,unit_pow);
				_cache.unit[2]+=1*unit_pow;
				break;
				case 32:
				_cache.value*=Math.pow(1609.344,unit_pow);
				_cache.unit[1]+=1*unit_pow;
				break;
				case 33:
				_cache.unit[1]+=1*unit_pow;
				break;
				case 34:
				_cache.value*=Math.pow(1e-8,unit_pow);
				_cache.unit[0]+=1*unit_pow;
				_cache.unit[1]+=2*unit_pow;
				_cache.unit[2]-=2*unit_pow;
				_cache.unit[3]-=1*unit_pow;
				break;
				case 35:
				_cache.unit[0]+=1*unit_pow;
				_cache.unit[1]+=1*unit_pow;
				_cache.unit[2]-=2*unit_pow;
				break;
				case 36:
				_cache.unit[0]+=1*unit_pow;
				_cache.unit[1]+=2*unit_pow;
				_cache.unit[2]-=3*unit_pow;
				_cache.unit[3]-=2*unit_pow;
				break;
				case 37:
				_cache.value*=Math.pow(3.08567758e+16,unit_pow);
				_cache.unit[1]+=1*unit_pow;
				break;
				case 38:
				_cache.unit[0]+=1*unit_pow;
				_cache.unit[1]-=1*unit_pow;
				_cache.unit[2]-=2*unit_pow;
				break;
				case 39:
				break;
				case 40:
				_cache.unit[2]+=1*unit_pow;
				break;
				case 41:
				_cache.unit[1]+=2*unit_pow;
				_cache.unit[2]-=2*unit_pow;
				break;
				case 42:
				_cache.unit[0]-=1*unit_pow;
				_cache.unit[1]-=2*unit_pow;
				_cache.unit[2]+=3*unit_pow;
				_cache.unit[3]+=2*unit_pow;
				break;
				case 43:
				_cache.value*=Math.pow(1e+3,unit_pow);
				_cache.unit[0]+=1*unit_pow;
				break;
				case 44:
				_cache.unit[0]+=1*unit_pow;
				_cache.unit[2]-=2*unit_pow;
				_cache.unit[3]-=1*unit_pow;
				break;
				case 45:
				_cache.unit[0]+=1*unit_pow;
				_cache.unit[1]+=2*unit_pow;
				_cache.unit[2]-=3*unit_pow;
				_cache.unit[3]-=1*unit_pow;
				break;
				case 46:
				_cache.value*=Math.pow(1e-8,unit_pow);
				_cache.unit[0]+=1*unit_pow;
				_cache.unit[1]+=2*unit_pow;
				_cache.unit[2]-=2*unit_pow;
				_cache.unit[3]-=1*unit_pow;
				break;
				case 47:
				_cache.unit[0]+=1*unit_pow;
				_cache.unit[1]+=2*unit_pow;
				_cache.unit[2]-=3*unit_pow;
				break;
				case 48:
				_cache.value*=Math.pow(0.9144,unit_pow);
				_cache.unit[1]+=1*unit_pow;
				break;
				case 49:
				_cache.value*=Math.pow(3.1556926e+7,unit_pow);
				_cache.unit[2]+=1*unit_pow;
				break;
				case 50:
				_cache.value*=Math.pow(1e-7,unit_pow);
				_cache.unit[0]+=1*unit_pow;
				_cache.unit[1]+=2*unit_pow;
				_cache.unit[2]-=2*unit_pow;
				break;
				default:
				return;
				break;
			}
			_scan = _scan.to.to.to;
			_scan.relink(_cache);
			_scan = _cache;
		}
		else if((_scan.from.type != "1" || _scan.from.type != "x") && _scan.type == "U" && _scan.to.type == "1" && _scan.to.to.type == "x")
		errorcode = "misplaced unit";
		else if((_scan.from.type != "1" || _scan.from.type != "x") && _scan.type == "Y" && _scan.to.type == "1" && _scan.to.to.type == "x" && _scan.to.to.to.type == "1")
		{
			_cache = _scan.to.to.to;
			code = _scan.to.value;
			unitcheck = 0;
			for(i=0;i<6;i++)
			unitcheck+=Math.abs(_cache.unit[i]);
			_scan.type = "1";
			switch(code)
			{
				//Functionsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
				case 1:
				if(unitcheck==0)_scan.value = sin(_cache.value);else {errorcode="unit error";return;}
				break;
				case 2:
				if(unitcheck==0)_scan.value = cos(_cache.value);else {errorcode="unit error";return;}
				break;
				case 3:
				if(unitcheck==0)_scan.value = tan(_cache.value);else {errorcode="unit error";return;}
				break;
				case 4:
				if(unitcheck==0)_scan.value = sec(_cache.value);else {errorcode="unit error";return;}
				break;
				case 5:
				if(unitcheck==0)_scan.value = csc(_cache.value);else {errorcode="unit error";return;}
				break;
				case 6:
				if(unitcheck==0)_scan.value = cot(_cache.value);else {errorcode="unit error";return;}
				break;
				case 7:
				if(unitcheck==0)_scan.value = sinh(_cache.value);else {errorcode="unit error";return;}
				break;
				case 8:
				if(unitcheck==0)_scan.value = cosh(_cache.value);else {errorcode="unit error";return;}
				break;
				case 9:
				if(unitcheck==0)_scan.value = tanh(_cache.value);else {errorcode="unit error";return;}
				break;
				case 10:
				if(unitcheck==0)_scan.value = sech(_cache.value);else {errorcode="unit error";return;}
				break;
				case 11:
				if(unitcheck==0)_scan.value = csch(_cache.value);else {errorcode="unit error";return;}
				break;
				case 12:
				if(unitcheck==0)_scan.value = coth(_cache.value);else {errorcode="unit error";return;}
				break;
				case 13:
				if(unitcheck==0)_scan.value = asin(_cache.value);else {errorcode="unit error";return;}
				break;
				case 14:
				if(unitcheck==0)_scan.value = acos(_cache.value);else {errorcode="unit error";return;}
				break;
				case 15:
				if(unitcheck==0)_scan.value = atan(_cache.value);else {errorcode="unit error";return;}
				break;
				case 16:
				if(unitcheck==0)_scan.value = asec(_cache.value);else {errorcode="unit error";return;}
				break;
				case 17:
				if(unitcheck==0)_scan.value = acsc(_cache.value);else {errorcode="unit error";return;}
				break;
				case 18:
				if(unitcheck==0)_scan.value = acot(_cache.value);else {errorcode="unit error";return;}
				break;
				case 19:
				if(unitcheck==0)_scan.value = asinh(_cache.value);else {errorcode="unit error";return;}
				break;
				case 20:
				if(unitcheck==0)_scan.value = acosh(_cache.value);else {errorcode="unit error";return;}
				break;
				case 21:
				if(unitcheck==0)_scan.value = atanh(_cache.value);else {errorcode="unit error";return;}
				break;
				case 22:
				if(unitcheck==0)_scan.value = asech(_cache.value);else {errorcode="unit error";return;}
				break;
				case 23:
				if(unitcheck==0)_scan.value = acsch(_cache.value);else {errorcode="unit error";return;}
				break;
				case 24:
				if(unitcheck==0)_scan.value = acoth(_cache.value);else {errorcode="unit error";return;}
				break;
				case 25:
				_scan.value = abs(_cache.value);
				for(i=0;i<6;i++)
				_scan.unit[i] = _cache.unit[i];
				break;
				case 26:
				_scan.value = ceil(_cache.value);
				for(i=0;i<6;i++)
				_scan.unit[i] = _cache.unit[i];
				break;
				case 27:
				_scan.value = floor(_cache.value);
				for(i=0;i<6;i++)
				_scan.unit[i] = _cache.unit[i];
				break;
				case 28:
				if(unitcheck==0)_scan.value = exp(_cache.value);else {errorcode="unit error";return;}
				break;
				case 29:
				if(unitcheck==0)_scan.value = log(_cache.value);else {errorcode="unit error";return;}
				break;
				case 30:
				if(unitcheck==0)_scan.value = ln(_cache.value);else {errorcode="unit error";return;}
				break;
				case 31:
				_scan.value = sqrt(_cache.value);
				for(i=0;i<6;i++)
				_scan.unit[i] = _cache.unit[i]/2;
				break;
				default:
				return;
				break;
			}
			_cache.to.relink(_scan);
		}
		else if((_scan.from.type != "1" || _scan.from.type != "x") && _scan.type == "X" && _scan.to.type == "1" && _scan.to.to.type == "x" && _scan.to.to.to.type != "1")
		{
			//Constantsssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
			_cache = _scan.to.to.to;
			code = _scan.to.value;
			_scan.type = "1";
			switch(code)
			{
				case 1:
				_scan.value = 5.29177211e-11;
				_scan.unit[1]=1;
				break;
				case 2:
				_scan.value = 1.3806488e-23;
				_scan.unit[0]=1;
				_scan.unit[1]=2;
				_scan.unit[2]=-2;
				_scan.unit[4]=-1;
				break;
				case 3:
				_scan.value = 299792458;
				_scan.unit[1]=1;
				_scan.unit[2]=-1;
				break;
				case 4:
				_scan.value = 8.9875517873681764e+9;
				_scan.unit[0]=1;
				_scan.unit[1]=3;
				_scan.unit[2]=-4;
				_scan.unit[3]=-2;
				break;
				case 5:
				_scan.value = 9.10938291e-31;
				_scan.unit[0]=1;
				break;
				case 6:
				_scan.value = 8.85418782e-12;
				_scan.unit[0]=-1;
				_scan.unit[1]=-3;
				_scan.unit[2]=4;
				_scan.unit[3]=2;
				break;
				case 7:
				_scan.value = 1.60217657e-19;
				_scan.unit[2]=1;
				_scan.unit[3]=1;
				break;
				case 8:
				_scan.value = 5.97219e+24;
				_scan.unit[0]=1;
				break;
				case 9:
				_scan.value = 6.371009e+6;
				_scan.unit[1]=1;
				break;
				case 10:
				_scan.value = 6.67384e-11;
				_scan.unit[0]=-1;
				_scan.unit[1]=3;
				_scan.unit[2]=-2;
				break;
				case 11:
				_scan.value = 1.054571726e-34;
				_scan.unit[0]=1;
				_scan.unit[1]=2;
				_scan.unit[2]=-1;
				break;
				case 12:
				_scan.value = 1.054571726e-34*2*Math.PI;
				_scan.unit[0]=1;
				_scan.unit[1]=2;
				_scan.unit[2]=-1;
				break;
				case 13:
				_scan.value = 1.25663706-6;
				_scan.unit[0]=1;
				_scan.unit[1]=1;
				_scan.unit[2]=-2;
				_scan.unit[3]=-2;
				break;
				case 14:
				_scan.value = 1.672621777e-27;
				_scan.unit[0]=1;
				break;
				case 15:
				_scan.value = Math.PI;
				break;
				case 16:
				_scan.value = 1.0973731568539e+7;
				_scan.unit[1]=-1;
				break;
				case 17:
				_scan.value = 1.9885e+30;
				_scan.unit[0]=1;
				break;
				case 18:
				_scan.value = 6.955e+8;
				_scan.unit[1]=1;
				break;
				default:
				return;
				break;
			}
			_cache.relink(_scan);
		}
		_scan = _scan.to;
	}
}

function prefix()//[local] decode the prefixes.
{
	var toread = new Data();
	var res;
	var _scan = new Data();
	var _star = new Data();
	var _open = new Data();
	var _close = new Data();
	var _numeric = new Data();
	var _lunit = new Data();
	var _runit = new Data();
	var _fend = new Data();
	var code;
	var p;
	var prefixcheck = 0;
	_begin = Bgn;
	_end = End;
	_scan = _begin.to;
	i=100;
	
	while(prefixcheck != -1)
	{
		while(_scan != _end)
		{
			if((_scan.from.type == "1" || _scan.from.type == "x" || _scan.from.type == ")") && _scan.type == "P" && _scan.to.type == "R" && _scan.to.to.type == "1" && _scan.to.to.to.type == "x" && _scan.to.to.to.to.type == "U" && _scan.to.to.to.to.to.type == "1" && _scan.to.to.to.to.to.to.type == "x")
			{
				code = _scan.to.to.value;
				_star = _scan;
				_open = _star.to;
				_numeric = _open.to;
				_close = _numeric.to;
				_lunit = _close.to;
				_runit = _lunit.to.to;
				_fend = _runit.to;
				
				_star.type = "*";
				_open.type = "(";
				_close.type = ")";
				
				_fend.relink(_close);
				_close.relink(_runit);
				_lunit.relink(_numeric);
				
				switch(code)
				{
					case 1:
					p = 1e-24;
					break;
					case 2:
					p = 1e-21;
					break;
					case 3:
					p = 1e-18;
					break;
					case 4:
					p = 1e-15;
					break;
					case 5:
					p = 1e-12;
					break;
					case 6:
					p = 1e-9;
					break;
					case 7:
					p = 1e-6;
					break;
					case 8:
					p = 1e-3;
					break;
					case 9:
					p = 1e-2;
					break;
					case 10:
					p = 1e-1;
					break;
					case 11:
					p = 1e+1;
					break;
					case 12:
					p = 1e+2;
					break;
					case 13:
					p = 1e+3;
					break;
					case 14:
					p = 1e+6;
					break;
					case 15:
					p = 1e+9;
					break;
					case 16:
					p = 1e+12;
					break;
					case 17:
					p = 1e+15;
					break;
					case 18:
					p = 1e+18;
					break;
					case 19:
					p = 1e+21;
					break;
					case 20:
					p = 1e+24;
					break;
					default:
					return;
					break;
				}
				_numeric.value = p;
			}
			else
			{
				return 0;
			}
			_scan = _scan.to;
		}
		res = "";
		for(toread = Bgn.to; toread!=End;toread = toread.to)
		{
			res = res+toread.type;
		}
		prefixcheck = res.search("PR");
	}
}