//membuat nilai random untuk koefisien
function random(){
	let makeNegative = Math.random() < 0.5 ? -1 : 1;
	return Math.floor(Math.random()* 50) * makeNegative;
}

//fungsi untuk mencek apakah memenuhi syarat diskriminan yakni tidak < 0 dan bisa merupakan akar kuadrat sempurna
function checkDiscriminant(a,b,c){
	let D = b**2 - 4*a*c;
	if(a != 0){
		if(D >= 0){
			let x1 = (-b + Math.sqrt(D))/(2*a);
			let x2 = (-b - Math.sqrt(D))/(2*a);
			//jangan b = 0 dan c = 0 bersamaan
			if(Math.sqrt(D) % 1 === 0 &&  (x1 % 1 === 0 && x2 % 1 === 0) && (b !== 0 || c !== 0)){
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

//fungsi untuk mendapatkan pilihan ganda random
function randomChoiceStr(x1,x2){
	let makeNegative = Math.random() < 0.5 ? -1 : 1;
	let r1 =  (1 + Math.floor(Math.random()*5)) * makeNegative;
	let r2 =  (1 + Math.floor(Math.random()*5)) * makeNegative;
	return (x1 + r1) + " dan " + (x2 + r2);
}

//shuffling array
function shuffle(array) {
	let currentIndex = array.length, temporaryValue, randomIndex;

	// While there remain elements to shuffle...
	while (0 !== currentIndex) {

	// Pick a remaining element...
	randomIndex = Math.floor(Math.random() * currentIndex);
	currentIndex -= 1;

	// And swap it with the current element.
	temporaryValue = array[currentIndex];
	array[currentIndex] = array[randomIndex];
	array[randomIndex] = temporaryValue;
	}

	return array;
}

//membuat pilgan
function createChoices(x1,x2){
	let choices = [x1 + " dan " + x2];
	for(let i = 0; i < 4; i++){
		choices.push(randomChoiceStr(x1,x2));
	}
	return shuffle(choices);
}

//cari jawaban yang benar ada dimana
function getRightAnswer(x1,x2,choices){
	let pilgan = ['a','b','c','d','e'];
	let rightAns = x1 + " dan " + x2;
	for(let i = 0; i < choices.length; i++){
		if(rightAns === choices[i]){
			return pilgan[i];
		}
	}
}

//fungsi membuat soal
function getSoal(){
	let quadEqStr = "ax<sup>2</sup> + bx + c = 0";
	let a_ = random();
	let b_ = random();
	let c_ = random();
	if(checkDiscriminant(a_,b_,c_)){
		let D = b_**2 - 4*a_*c_;
		let x1_ = (-b_ + Math.sqrt(D))/(2*a_);
		let x2_ = (-b_ - Math.sqrt(D))/(2*a_);
		quadEqStr = createQuadraticStr(a_,b_,c_,quadEqStr);
		let choices = createChoices(x1_,x2_);
		let question = {
			soal: quadEqStr,
			koefisien: {
				a: a_,
				b: b_,
				c: c_
			},
			diskriminan: D,
			akar: {
				x1: x1_,
				x2: x2_
			},
			pilihan: {
				a: choices[0],
				b: choices[1],
				c: choices[2],
				d: choices[3],
				e: choices[4]
			},
			rightAnswer: getRightAnswer(x1_,x2_,choices)
		};
		return question;
	}
}


function getQuestions(n){
	let i = 0;
	let questions = [];
	while(i < n){
		let question = getSoal();
		while(question === undefined){
			question = getSoal();
		}
		questions.push(question);
		i++;
	}
	return questions;
}