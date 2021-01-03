function result(){
	//mengambil json dari assets(local storage)
	fetch('../database/database-soal.json')
				.then(results => results.json())
				.then((data) => startResult());	
	showModal();
}

function startResult(){
	let answer = getAnswer(newDataAns.length);
	let score = getScore(newDataAns,answer);
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

function getAnswer(data){
	const choices = [];

	//15 adalah banyak soal dari json
	for(let i = 0; i < data; i++){
		let choiceStr = "choice-x";
		choiceStr = choiceStr.replace("x",i+1);
		let choice = document.getElementsByClassName(choiceStr);
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


//masih bug
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