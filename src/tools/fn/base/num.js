import BigNumber from 'bignumber.js'

//加法 
function add(val1,val2){
	return new BigNumber(val1).plus(val2).toNumber() 
}

//减法
function diff(val1,val2){
	return new BigNumber(val1).minus(val2).toNumber() 
}

//乘法
function cheng(val1,val2){
	return new BigNumber(val1).times(val2).toNumber() 
}

//普通除法
function chu(val1,val2){
	return new BigNumber(val1).div(val2).toNumber() 
}

//取模
function mod(val1,val2){
	return new BigNumber(val1).mod(val2).toNumber() 
}

//金额千分位， 小数点后保留小数位
function qian(s, n = 2){
	s = parseFloat((s + "").replace(/[^\d\.-]/g, "")).toFixed(n) + ""; //n为小数点后保留小数位
		var l = s.split(".")[0].split("").reverse(),
			r = s.split(".")[1],
			t = "";
	for (let i = 0; i < l.length; i++) {
	  t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? "," : "");
	}
	return t.split("").reverse().join("") + "." + r;
}

//金额转化   小数点后保留小数位
function change(num ,n = 2,unit = "万"){
	let dividend = 10000;
	if(unit == "万"){
		dividend = 10000;
	}
	
	return chu(num,dividend).toFixed(n)
}

export default{
	add,
	diff,
	cheng,
	chu,
	mod,
	qian,
	change
}

// export default{
// 	plus,
// 	minus,
// 	times,
// 	div,
// 	mod
// }
