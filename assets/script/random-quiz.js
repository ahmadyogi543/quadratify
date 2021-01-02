//variabel global tempat menyimpan koefisien koefisien random untuk pers. kuadrat
let koef;

//fungsi untuk mencek apakah memenuhi syarat diskriminan yakni tidak < 0 dan bisa merupakan akar kuadrat sempurna
function checkDiscriminant(a,b,c){
	let D = b**2 - 4*a*c;
	if(a != 0){
		if(D >= 0){
			let x1 = (-b + Math.sqrt(D))/(2*a);
			let x2 = (-b - Math.sqrt(D))/(2*a);
			if(Math.sqrt(D) % 1 === 0 &&  x1 % 1 === 0 && x2 % 1 === 0){
				return true;
			}
			else{
				return false;
			}
		}
		else{
			return false;
		}
	}
	else{
		return false;
	}
}

//membuat nilai random untuk koefisien
function random(){
	let makeNegative = Math.random() < 0.5 ? -1 : 1;
	return Math.floor(Math.random()* 50) * makeNegative;
}

//fungsi untuk dipanggil di html
function randomize(){
	let quadEqStr = "ax<sup>2</sup> + bx + c = 0";
	koef = {
		a: random(),
		b: random(),
		c: random()
	};
	if(checkDiscriminant(koef.a,koef.b,koef.c)){
		quadEqStr = createQuadraticStr(koef.a,koef.b,koef.c,quadEqStr);
		const quadEq = document.getElementById("quadratic_equation");
		quadEq.innerHTML =quadEqStr;	
	}
	else{
		randomize();
	}
	document.getElementById("x1").value = "";
	document.getElementById("x2").value = "";
}

function findQuadraticRoots(x1,x2){
	let D = koef.b**2 - 4*koef.a*koef.c;
	let x1_ = (-koef.b + Math.sqrt(D))/(2*koef.a);
	let x2_ = (-koef.b - Math.sqrt(D))/(2*koef.a);

	const notif = document.getElementById("notif");
	if(x1_ == x1 && x2_ == x2 || x1_ == x2 && x2_ == x1){	
		notif.innerHTML = "Jawaban anda benar!";
	}
	else if(isNaN(x1) || isNaN(x2)){
		notif.innerHTML = "Masukan jawaban yang benar, berupa angka!";
	}
	else{
		notif.innerHTML = "Jawaban anda salah :(";
	}
}

function check(){
	const x1 = parseFloat(document.getElementById("x1").value);
	const x2 = parseFloat(document.getElementById("x2").value);
	findQuadraticRoots(x1,x2);
	showModal();
}

//do from the load
randomize();
