//variabel global sebagai pemegang data dari database
let dataSoal;

//mengambil data dari database dan disimpan di dataSoal
function getDB(data){
	dataSoal = data;
}

//fungsi untuk meremove elemen soal
function removeElements(elements){
	while(elements[0] != undefined){
		elements[0].remove();
	}
}

//fungsi ini akan dipanggil setelah user mengklik tombol reset
function startReset(data){
	//soal akan di acak
	let newData = shuffle(data);
	//tampilkan soal ke layar
	startCreateSoal(newData);
}

//fungsi yang akan dijalankan ketika user menglik tombol reset
function resetSoal(){
	//menghapus elemen soal berdasarkan class
	const nS = document.getElementsByClassName("node-soal");
	removeElements(nS);
	//menghapus elemen br
	const br = document.getElementsByClassName("breakline-soal");
	removeElements(br);

	startReset(dataSoal);
}

//fungsi yang akan dipanggil ketika user mengklik tombol selesai
function result(){
	startResult(dataSoal);
	showModal();
}

//fungsi start result untuk menampilkan pesan ke user di modal
function startResult(data){
	let answer = getAnswer(data);
	let score = getScore(data,answer);
	const notif = document.getElementById("notif");
	if(score >= 70){
		if(score == 100){
			notif.innerHTML = "Skor anda adalah: "+score+"<br> anda lulus dengan nilai sempurna!";
		}
		else{
			notif.innerHTML = "Skor anda adalah: "+score+"<br> anda lulus!";
		}
	}
	else{
			notif.innerHTML = "Skor anda adalah: "+score+"<br> anda tidak lulus :(";
	}
}


//fungsi untuk mendapatkan jawaban dari user
function getAnswer(data){
	const choices = [];

	//15 adalah banyak soal dari json
	for(let i = 0; i < data.length; i++){
		let choiceStr = "soal_x";
		choiceStr = choiceStr.replace("x",i+1);
		let choice = document.getElementsByName(choiceStr);
		choices.push(choice);
	}

	let answer = [];
	for(let i = 0; i < choices.length; i++){
		let isAnswerEmpty = true;
		for(let j = 0; j < choices[i].length; j++){
			if(choices[i][j].checked){
				let choice = {
					soalNo: i+1,
					ans: choices[i][j].value
				};
				answer.push(choice);
				isAnswerEmpty = false;
			}
		}
		if(isAnswerEmpty){
			let choice = {
				soalNo: i+1,
				ans: ""
			};
			answer.push(choice);
		}
	}
	return answer;
}

//perhitungan skor
function getScore(data,answer){
	let count = 0;
	for(let i = 0; i < answer.length; i++){
		let noSoal = i+1;
		if(data[i].rightAnswer == answer[i].ans){
			count += 1;
		}
	}
	return Math.floor((count*20)/3);
}