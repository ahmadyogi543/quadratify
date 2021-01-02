//hide button for look and feel purpose
const doneAns = document.getElementById("done-ans");
doneAns.style.display = "none";

//mengambil json dari assets(local storage)
fetch('../database/database-soal.json')
				.then(results => results.json())
				.then((data) => startCreateSoal(data));

function startCreateSoal(data){
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
	soalContainer.appendChild(document.createElement("br"));

}

function reset(){
	//uncheck radio
}