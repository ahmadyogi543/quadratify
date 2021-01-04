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

	fetch('../database/database-soal.json')
				.then(results => results.json())
				.then((data) => startReset(data));
}

