//mendisplay soal ke layar
function displayQuestion(data,nomorSoal){
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
		//membuat label
		let radio = document.createElement("label");
		radio.className = "radio";
		let radioStr = "soalx_pg";
		radioStr = radioStr.replace("x",nomorSoal);
		radioStr = radioStr.replace("pg",pilgan[i]);
		radio.setAttribute("for",radioStr);

		//create input
		let radioInput = document.createElement("input");
		radioInput.type = "radio";
		let radioInputStr = "soal_x";
		radioInputStr = radioInputStr.replace("x",nomorSoal);
		radioInput.setAttribute("name",radioInputStr);
		radioInput.id = radioStr;
		radioInput.className = "radio__input";
		radioInput.value = pilgan[i];
		radio.appendChild(radioInput);

		//create div for custom radio btn
		let radioBtn = document.createElement("div");
		radioBtn.className = "radio__radio";
		radio.appendChild(radioBtn);

		//soal using span
		let pilganSoal = document.createElement("span");
		pilganSoal.innerHTML = data["pilihan"][pilgan[i]];
		radio.appendChild(pilganSoal);

		//insert the radio to btn container
		choicesContainer.appendChild(radio);

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

//fungsi membuat soal 
function startCreateSoal(data){
	for(let i = 0; i < data.length; i++){
		displayQuestion(data[i],i+1);
	}
	getDB(data);
}

function showButton(){
	const btnAll = document.getElementById("done-ans");
	btnAll.style.display = "block";
}

function hideSpin(){
	const spin = document.getElementById("spin-container");
	spin.style.display = "none";
}

//mengambil data dari database
function getData(data){
	data = data.val();
	let keys = Object.keys(data);
	let soal = data[keys[Math.floor(Math.random()*keys.length)]];
	soal = shuffle(soal);
	startCreateSoal(soal);
	hideSpin();
	showButton();
}

//fungsi apa bila pengambilan data dari database mengalami error
function errData(err){
	console.log("An error has occurred!");
	console.log(err);
}

//global variables
const soalRef = database.ref("soal");

//mengambil data dari database
//tunggu 2 detik
setTimeout(runSoal,2000);
function runSoal(){
	soalRef.on("value",getData,errData);	
}

//ini untuk membuat soal baru
//soalRef.push(getQuestions(15));