
let historyRef = database.ref("history");


//fungsi untuk menghitung akar kuadrat
function quadraticRoots(a,b,c){
	const roots = document.getElementById("roots");
	const D = b**2 - 4*a*c;

	if(a != 0){
		if(D > 0){
			//dua akar penyelesaian
			let x1 = (-b + Math.sqrt(D))/(2*a);
			let x2 = (-b - Math.sqrt(D))/(2*a);
			if(Math.sqrt(D) % 1 != 0){
				x1 = x1.toFixed(2);
				x2 = x2.toFixed(2);
			}
			let ans = "Karena D = " + D + ", maka akar - akarnya adalah " + x1 + " dan " + x2;
			roots.innerHTML = ans;

		}
		else if(D == 0){
			//akar penyelesaian sama
			let x = -b/2*a;
			let ans = "Karena D = " + D + ", maka akarnya adalah " + x;
			roots.innerHTML = ans;
		}
		else{
			//akar imajiner
			roots.innerHTML = "Karena D < 0, maka akar - akarnya merupakan akar - akar imajiner!";
		}
	}
	else{
		//bukan persamaan kuadrat
	}
}

//fungsi untuk mengubah bentuk persamaan kuadrat
function createQuadraticStr(a,b,c,str){
	//untuk a
	if(a == 1){
		//hilangkan angkanya
		str = str.replace("a","");
	}
	else if(a == -1){
		//diberi tanda negatif
		str = str.replace("a","-");
	}
	else{
		//biasa
		str = str.replace("a",a);
	}

	//untuk b
	if(b == 0){
		//dihilangkan tanda + dan x
		str = str.replace("+ bx","");
	}
	else if(b == 1){
		//dihilangkan angkanya
		str = str.replace("b","");
	}
	else if(b < 0){
		//dinegatifkan dan hilang angkanya
		if(b == -1){
			str = str.replace("+ b","- ");
		}
		//dinegatifkan
		else{
			str = str.replace("+ b","- "+(b/-1));
		}
	}
	else{
		//biasa
		str = str.replace("b",b);
	}

	//untuk c
	if(c == 0){
		str = str.replace("+ c","");
	}
	else if(c < 0){
		str = str.replace("+ c","- "+(c/-1));
	}
	else{
		str = str.replace("c",c);
	}

	return str;
}

//fungsi validasi input
function validateInput(a,b,c){
	return !isNaN(a) && !isNaN(b) && !isNaN(c);
}

function getTanggal(){
	let d = new Date();
	let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
	let hour = d.getHours();
	let minute = d.getMinutes();
	let second = d.getSeconds();
	let day = days[d.getDay()];
	let date = d.getDate();
	let month = months[d.getMonth()];
	let year = d.getFullYear();

	//adding 0 to hour, minute and second if < 10
	if(hour < 10){
		hour = "0" + hour;
	}

	if(minute < 10){
		minute = "0" + minute;
	}

	if(second < 10){
		second = "0" + second;
	}

	return day + ", " + date + " " + month + " " + year + " " + hour + ":" + minute + ":" + second;
}

//fungsi membuat soal
function getSoalNew(a_,b_,c_){
	let D = b_**2 - 4*a_*c_;
	if(D >= 0){
		let quadEqStr = "ax<sup>2</sup> + bx + c = 0";
		let x1_ = (-b_ + Math.sqrt(D))/(2*a_);
		let x2_ = (-b_ - Math.sqrt(D))/(2*a_);
		if(Math.sqrt(D) % 1 != 0){
			x1_ = x1_.toFixed(2);
			x2_ = x2_.toFixed(2);
		}
		quadEqStr = createQuadraticStr(a_,b_,c_,quadEqStr);
		let choices = createChoices(x1_,x2_);
		let question = {
			soal: quadEqStr,
			tanggal: getTanggal(),
			diskriminan: D,
			akar: {
				x1: x1_,
				x2: x2_
			}
		};
		return question;
	}
}

function pushQuadraticEqToDB(a,b,c){
	let soal = getSoalNew(a,b,c);
	historyRef.push(soal);
}

function find(){
	//koefisien hanya untuk integer
	let a = parseInt(document.getElementById("a").value);
	let b = parseInt(document.getElementById("b").value);
	let c = parseInt(document.getElementById("c").value);

	//validasi input dari user
	//jika bukan angka, beri alert
	const notif = document.getElementById("notif");
	if(validateInput(a,b,c)){
		//jika a bukan 0, maka merupakan pers. kuadrat
		if(a != 0){
			//deklarasi variabel
			const quadraticEq = document.getElementById("quadratic_equation");
			const answer = document.getElementById("answer");
			let quadratic_str = "ax<sup>2</sup> + bx + c = 0";

			//mengganti tampilan pers. kuadrat di jawaban
			quadratic_str = createQuadraticStr(a,b,c,quadratic_str);
			quadraticEq.innerHTML = quadratic_str;

			//mencari akar pers. kuadrat
			quadraticRoots(a,b,c);

			//menampilkan jawaban
			answer.style.display = "block";

			//kirim soal ke database
			pushQuadraticEqToDB(a,b,c);
		}
		else{
			notif.innerHTML = "Bukan persamaan kuadrat!";
			showModal();
			reset();
		}
	}
	else{
		notif.innerHTML = "Mohon masukan input yang benar, berupa angka!";
		showModal();
	}	
}

//fungsi untuk mereset halaman
function reset(){
	const answer = document.getElementById("answer");
	document.getElementById("a").value = "";
	document.getElementById("b").value = "";
	document.getElementById("c").value = "";
	answer.style.display = "none";
	document.getElementById("quadratic_equation").innerHTML = "ax<sup>2</sup> + bx + c = 0";
}


