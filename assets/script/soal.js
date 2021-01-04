hideOrShowButton("hide");

// Your web app's Firebase configuration
let firebaseConfig = {
	apiKey: "AIzaSyCTuxvM2N03WiqUUt59uM-wDTNp2CAwpC0",
	authDomain: "quadratify-27605.firebaseapp.com",
	databaseURL: "https://quadratify-27605-default-rtdb.firebaseio.com",
	projectId: "quadratify-27605",
	storageBucket: "quadratify-27605.appspot.com",
	messagingSenderId: "1044231705591",
	appId: "1:1044231705591:web:f8300ffb3171c7adcb54f2"
};

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

//fungsi membuat soal 
function startCreateSoal(data){
	for(let i = 0; i < data.length; i++){
		displayQuestion(data[i],i+1);
	}
	getDB(data);
}

function hideOrShowButton(state){
	const btn = document.getElementsByClassName("tool-btn");
	for(let i = 0; i < btn.length; i++){
		if(state === "hide"){
			btn[i].style.display = "none";
		}
		else{
			btn[i].style.display = "inline";
		}
	}
}

function hideSpin(){
	const spin = document.getElementById("spin-container");
	spin.style.display = "none";
}

//mengambil data dari database
function getData(data){
	data = data.val();
	let keys = Object.keys(data);
	console.log(keys.length);
	let soal = data[keys[Math.floor(Math.random()*keys.length)]];
	soal = shuffle(soal);
	startCreateSoal(soal);
	hideSpin();
	hideOrShowButton("show");
}

//fungsi apa bila pengambilan data dari database mengalami error
function errData(err){
	console.log("An error has occurred!");
	console.log(err);
}

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//global variables
const database = firebase.database();
const soalRef = database.ref("soal");

//mengambil data dari database
soalRef.on("value",getData,errData);

//soalRef.push(getQuestions(15));