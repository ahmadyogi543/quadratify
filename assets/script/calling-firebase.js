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

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

//global variables
const database = firebase.database();