//hide button for look and feel purpose
const doneAns = document.getElementById("done-ans");
doneAns.style.display = "none";

let jumlahSoal;
let newDataAns;



function startCreateSoal(data){
	newDataAns = data;
	//just to get a len of json
	jumlahSoal = data.length;

	for(let i = 0; i < data.length; i++){
		//do the stuff here
		let nomorSoal = i + 1;
		createSoal(data[i],nomorSoal);
	}
	//tampilkan kembali elemen button
	doneAns.style.display = "block";
}
/*
function createSoal(data, nomorSoal){
	//ambil elemen soal container sebagai parent dari kumpulan - kumpulan soal
	const soalContainer = document.getElementById("soal-container");

	//membuat div untuk container node soal
	const nodeSoal = document.createElement("div");
	nodeSoal.className = "node-soal";

	//p untuk soal
	let soalStr = "num. Akar - akar persamaan kuadrat eq adalah...";
	soalStr = soalStr.replace("num",nomorSoal);
	soalStr = soalStr.replace("eq",data.soal);
	nodeSoal.innerHTML = soalStr;

	//div untuk container pilgan
	const choices = document.createElement("div");
	choices.className = "choices";

	//pilgan ada 5
	//membuat button virtual
	let pilgan = ['a','b','c','d','e'];
	for(let i = 0; i < 5; i++){
		console.log("tes");
		//membuat container soal bertipe label
		const choice = document.createElement("label");
		let forStr = "choicex-pg";
		forStr = forStr.replace("x",nomorSoal);
		forStr = forStr.replace("pg",pilgan[i]);
		choice.setAttribute("for",forStr);
		choice.className = "radio";

		//membuat elemen input
		const inputChoice = document.createElement("input");
		inputChoice.setAttribute("id",forStr);
		inputChoice.value = pilgan[i];
		inputChoice.type = "radio";
		inputChoice.name = "choicex";
		inputChoice.name = inputChoice.name.replace("x",nomorSoal);
		inputChoice.className = "radio__input";

		//membuat div untuk elemen virtual button
		let virtualEl = document.createElement("div");
		virtualEl.className = "radio__radio";

		//masukan data ke elemen
		choice.appendChild(inputChoice);
		choice.appendChild(virtualEl);


		let p = document.createElement("p");
		p.innerHTML = "ajat";
		choice.appendChild(p);
		choice.innerHTML = data.pilihan[pilgan[i]];
		choices.appendChild(choice);
		choices.appendChild(document.createElement("br"));
	}
	nodeSoal.appendChild(choices);
	soalContainer.appendChild(nodeSoal);
	soalContainer.appendChild(document.createElement("br"));
}
*/


function createSoal(data,nomorSoal){
	//ambil elemen soal container sebagai parent dari kumpulan - kumpulan soal
	const soalContainer = document.getElementById("soal-container");

	//membuat div untuk container node soal
	const nodeSoal = document.createElement("div");
	nodeSoal.className = "node-soal";

	//p untuk soal
	const soal = document.createElement("p");
	let soalStr = "num. Akar - akar persamaan kuadrat eq adalah...";
	soalStr = soalStr.replace("num",nomorSoal);
	soalStr = soalStr.replace("eq",data.soal);
	soal.innerHTML = soalStr;

	//div untuk pilihan jawaban
	let choicesContainer = document.createElement("div");
	choicesContainer.className = "choices-container";	

	//input untuk choices container
	//5 buah pilihan ganda
	let pilgan = ['a','b','c','d','e'];
	for(let i = 0; i < 5; i++){
		//membuat elemen input
		let choice = document.createElement("input");
		choice.value = pilgan[i];
		choice.type = "radio";
		choice.name = "choice-x";
		choice.name = choice.name.replace("x",nomorSoal);
		choice.className = choice.name;
		choicesContainer.appendChild(choice);

		//isi jawaban
		let text = document.createElement("span");
		text.innerHTML = data["pilihan"][pilgan[i]];
		choicesContainer.appendChild(text);

		//breakline karena berbentuk span
		choicesContainer.appendChild(document.createElement("br"));

	}

	//masukan soal ke container soal
	nodeSoal.appendChild(soal);
	nodeSoal.appendChild(choicesContainer);
	soalContainer.appendChild(nodeSoal);

	//tambahkan new line
	let br = document.createElement("br");
	br.className = "breakline-soal";
	soalContainer.appendChild(br);

}

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

function removeElements(elements){
	while(elements[0] != undefined){
		elements[0].remove();
	}
}

function startReset(data){
	let newData = shuffle(data);
	newDataAns = newData;
	startCreateSoal(newData);
}

function reset(){
	const nS = document.getElementsByClassName("node-soal");
	removeElements(nS);
	const br = document.getElementsByClassName("breakline-soal");
	removeElements(br);
	// const choices = [];

	// //15 adalah banyak soal dari json
	// for(let i = 0; i < jumlahSoal; i++){
	// 	let choiceStr = "choice-x";
	// 	choiceStr = choiceStr.replace("x",i+1);
	// 	let choice = document.getElementsByClassName(choiceStr);
	// 	choices.push(choice);
	// }

	// let answer = [];
	// for(let i = 0; i < choices.length; i++){
	// 	for(let j = 0; j < choices[i].length; j++){
	// 		if(choices[i][j].checked){
	// 			choices[i][j].checked = false;
	// 		}
	// 	}
	// }

	fetch('../database/database-soal.json')
				.then(results => results.json())
				.then((data) => startReset(data));
}