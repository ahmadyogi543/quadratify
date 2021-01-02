function result(){
	//mengambil json dari assets(local storage)
	fetch('../database/database-soal.json')
				.then(results => results.json())
				.then((data) => startResult(data));	
}

function startResult(data){
	let answer = getAnswer(data.length);
	let score = getScore(data,answer);
	if(score >= 70){
		if(score == 100){
			alert("Skor anda adalah: "+score+"\n anda lulus dengan nilai sempurna!");
		}
		else{
			alert("Skor anda adalah: "+score+"\n anda lulus!");
		}
	}
	else{
		alert("Skor anda adalah: "+score+"\n anda tidak lulus :(");
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