function sqrt(x)
{
	return Math.sqrt(x);
}

function abs(x)
{
	return Math.abs(x);
}

function sign(x)
{
	if(x!=0)
	return x/abs(x);
	else
	return 1;
}

function pow(x,y)
{
	return Math.pow(x,y);
}

function exp(x)
{
	return Math.exp(x);
}

function ln(x)
{
	return Math.log(x);
}

function log(x)
{
	return ln(x)/ln(10);
}

function floor(x)
{
	return Math.floor(x);
}

function ceil(x)
{
	return Math.ceil(x);
}

function pcos(x)
{
	return Math.cos(x);
}

function psin(x)
{
	return Math.sin(x);
}

function sin(x)
{
	return sqrt(1-pow(pcos(x),2))*sign(psin(x));
}

function cos(x)
{
	return sqrt(1-pow(psin(x),2))*sign(pcos(x));
}

function sec(x)
{
	return 1/cos(x);
}

function csc(x)
{
	return 1/sin(x);
}

function tan(x)
{
	return sin(x)/cos(x);
}

function cot(x)
{
	return 1/tan(x);
}

function cosh(x)
{
	return (exp(x)+exp(-x))/2;
}

function sinh(x)
{
	return (exp(x)-exp(-x))/2;
}

function tanh(x)
{
	return sinh(x)/cosh(x);
}

function sech(x)
{
	return 1/cosh(x);
}

function csch(x)
{
	return 1/sinh(x);
}

function coth(x)
{
	return 1/tanh(x);
}

function asin(x)
{
	return Math.asin(x);
}

function acos(x)
{
	return Math.acos(x);
}

function atan(x)
{
	return Math.atan(x);
}

function asec(x)
{
	return acos(1/x);
}

function acsc(x)
{
	return asin(1/x);
}

function acot(x)
{
	if(x>0)
	return atan(1/x);
	if(x<0)
	return Math.PI+atan(1/x);
}

function asinh(x)
{
	return ln(x+sqrt(pow(x,2)+1))
}

function acosh(x)
{
	return ln(x+sqrt(pow(x,2)-1))
}

function atanh(x)
{
	return (1/2)*ln((1+z)/(1-z))
}

function acoth(x)
{
	return (1/2)*ln((z+1)/(z-1))
}

function acsch(x)
{
	return ln((1/x)+sqrt((1/x/x)+1))
}

function asech(x)
{
	return ln((1/x)+sqrt((1/x/x)-1))
}

function factorial(n)
{
	if(n != floor(n) || n < 0)
	return null;
	else if(n == 0)
	return 1;
	else
	{
		fct=1;
		for(i=1;i<=n;i++)
		fct*=i;
		return fct;
	}
}