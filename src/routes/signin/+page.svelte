<script>
	//Imports navigator to navigate between paths
	import { navigate } from 'svelte-routing';  

	//data get sent from the server (users)
	export let data = {}

	//all the user input varibles
	let inputNewName = '';
	let inputNewLastname = '';
	let inputNewAge = '';
	let inputNewYear = '';
	let inputNewMonth = '';
	let inputNewDay = '';
	let inputNewUsername = '';
	let inputNewpassword = '';
	let inputNewSecondPassword = '';
	let inputNewGender = '';

	let firstPost = 'No postes yet'

	//Using new date() to get todays date
	let dato = new Date();
	let todayYear = dato.getFullYear();
	let todayMonth = dato.getMonth() + 1;
	let todayDay = dato.getDate()


	let displayText = '';

	let ShowPassword = false;

	let userNameTaken = false;

	//Arrays that defined Years, months and days
	let years = Array.from({ length: 100 }, (_, i) => new Date().getFullYear() - i);
	let months = Array.from({ length: 12 }, (_, i) => i);
	let days = Array.from({ length: 31 }, (_, i) => i + 1);

	//Get the user exsact age
	function getAge(year, month, day){
		//take the age the user are or are going to be this year 
		let age = todayYear - year
		//check if the user have had their birthday yet
		if (month == todayMonth){
			if (day <= todayDay){
				//they have had thire birthday then age = age
				age = age;
			}
			else{
				//if not subtract a 1 from their age
				age = age -1
			}
		}
        if (month < todayMonth){
            age = age
        }
        else{
            age = age -1
        }
		return age
	}

	//Funtion that creats the users
	async function createUser() {
		//Displays text: "Creating User"
		document.getElementById("DisplayTextDiv").style.display = "inherit";
		displayText = 'Welcome ' + inputNewName;
		
		//Fetches data form API/Users with method post
		const res = await fetch('http://localhost:5173/API/Users', {
			method: 'POST',

			//Sends a body of the new user information back to the server
			body: JSON.stringify({name:inputNewName, lastName:inputNewLastname, gender:inputNewGender, age:inputNewAge, yearborn:inputNewYear, monthbron:inputNewMonth, daybron:inputNewDay, userName:inputNewUsername, password:inputNewpassword, post:firstPost}),
		});

		//declears a verible of the new user data and pushes it
		const newUser = await res.json();

		data.users.push(newUser);

		data = { ...data };
		
		//reload page to the new user home page
		navigate('/login/profilPage/'+ inputNewUsername);
    	location.reload()
		
	}

	//funtion check if username is taken
	function CheckIfUsedUserName(){
		let usersData = data.users

		//runs a forEach user and check if the username is allready in use
		usersData.forEach(function(Users){
			//Checkes if username allready exist in any user
			if (Users.username == inputNewUsername){
				userNameTaken = true;
			}
			else{
				//if it dose display text of (Username taken)
				document.getElementById("DisplayTextDiv").style.display = "inherit";
				displayText = 'Username taken';
			}
		});
		//if The username is not taken move on
		if (userNameTaken == false){
			createUser();
		}
	}

	//Check if password match
	function CheckPasswordCorckt(){
		//if they do move on
		if (inputNewpassword == inputNewSecondPassword && inputNewpassword !== ""){
			CheckIfUsedUserName()
		}
		//id they dont display text of (Passwords don`t match)
		else{
			document.getElementById("DisplayTextDiv").style.display = "inherit";
			displayText = 'Passwords don`t match';
		}
	}

	//check if the user has put in a gender
	function CheckGender(){
		//if the inputNewGender is not empty move on
		if (inputNewGender !== ""){
			CheckPasswordCorckt()
		}
		//if it is display text of (Select a gender)
		else{
			document.getElementById("DisplayTextDiv").style.display = "inherit";
			displayText = 'Select a gender';
		}
	}

	//First step to sign up
	function SignUp(){
		//Sett username taken false just in case the user has allready signed up with a allready in use username
		userNameTaken = false
		//Get the user age
		inputNewAge = getAge(inputNewYear, (inputNewMonth + 1), inputNewDay)

		//check if the user has put in a first name last name and are over the age of 12
		if (inputNewName !== ""){
			if (inputNewLastname !== ""){
				if (inputNewAge >= 12){
					CheckGender()
				}
				else{
					document.getElementById("DisplayTextDiv").style.display = "inherit";
					displayText = 'You have to be over the age of 12';
				}
			}
			else{
				document.getElementById("DisplayTextDiv").style.display = "inherit";
				displayText = 'Please  input a last name';
			}
		}
		else{
			document.getElementById("DisplayTextDiv").style.display = "inherit";
			displayText = 'Please  input a first name';
		}
	}

	//Sets the selected gender option to the target value
	function handleGenderChange(event) {
		selectedGender = event.target.value;
	}

	//Changes the ShowPassword value to the oppesite
	function showPasswordFunc(){
		ShowPassword = !ShowPassword
	}

	//navigates back to the index page
	function GoBack(){
        navigate('/')
        location.reload()
    }


</script>
<!--Sets the screen (makes css easier)-->
<div class="SetScreen">
	<div class="HeaderTitleDiv">
        <h1 id="HeaderTitle">The Chat Hive</h1>
        <p id="Creator">Henning Trillhus</p>
    </div>
	<div class="MainGui">
		<button id="GoBackButton" on:click={() => GoBack()}>Back</button>
		<h1 id="Title">Sign Up</h1>
		<!--Normal input boxes to input Name and username-->
		<div class="NameInputBox">
			<input id="InputFirstName" bind:value={inputNewName} placeholder="Enter your first name" />
			<input id="InputLastName" bind:value={inputNewLastname} placeholder="Enter your last name" />
		</div>
		<input id="InputUserName" bind:value={inputNewUsername} placeholder="Enter a username" />

		<!--Normal options boxses with gender selections-->
		<div class="SelectGender">
			<label id="GenderText" for="gender">Gender:</label>
			<select id="genderInput" bind:value={inputNewGender} on:change={handleGenderChange}>
				<option value="">Select gender</option>
				<option value="Man">Male</option>
				<option value="Woman">Female</option>
				<option value="Other">Other</option>
			</select>
		</div>

		<!--The div for age selection-->
		<div class="AgeBox">
			<div class="AgeYear">
				<label for="year">Year:</label>
				<!--runs a svetle foreach function to the allready exsiting arrays of dates-->
				<select id="year" bind:value={inputNewYear}>
					{#each years as year}
					  <option value={year}>{year}</option>
					{/each}
				  </select>
			</div>
			<div class="AgeMonth">
				<label for="month">Month:</label>
				<!--Same thin only with months where we have to import the different months-->
				<select id="month" bind:value={inputNewMonth}>
				  {#each months as month}
				  <option value={month}>{(new Date(0, month)).toLocaleString('en-US', { month: 'long' })}</option>
				  {/each}
				</select>
			</div>
			<div class="AgeDay">
				<label for="day">Day:</label>
				<!--same as with years-->
				<select id="day" bind:value={inputNewDay}>
				  {#each days as day}
					<option value={day}>{day}</option>
				  {/each}
				</select>
			</div>
		</div>

		<!--Password contaner-->
		<div class="Password-Container">
			<!--Using svelte if function makes me switch between type="password" og type="text"-->
			{#if ShowPassword}
				<input id="Password1" type="text" bind:value={inputNewpassword} placeholder="Enter a password" />
				<input id="Password2" type="text"  bind:value={inputNewSecondPassword} placeholder="Enter your password again" />
				<button id="ShowHideButton" on:click={() => showPasswordFunc()}><img src="OpenEye.png" alt="Hide Password Button" title="Showing Password"></button>
			{:else}
				<input id="Password1" type="password" bind:value={inputNewpassword} placeholder="Enter a password" />
				<input id="Password2" type="password"  bind:value={inputNewSecondPassword} placeholder="Enter your password again" />
				<button id="ShowHideButton" on:click={() => showPasswordFunc()}><img src="ClosedEye.png" alt="Show Password Button" title="Hinding Password"></button>
			{/if}
			
		</div>
		
		<!--Normal dispaly text, in style switch between display="noen" og display="inherit"-->
		<div id="DisplayTextDiv">
			<h1 id="DisplayTextId">{displayText}</h1>
		</div>
		
		<!--the sign up button that starts the whole sign up funtion-->
		<button id="signUp" on:click={() => SignUp()} >Sign Up</button>
	</div>
</div>
<style>
	/*using @media to different style between pc and phone*/
	@media (min-width: 768px){
		.HeaderTitleDiv{
            position: absolute;
            top: 0px;
            left: 0px;
            width: 23%;
            height: 10%;
            background-color: #1877f2;
            text-align: center;
            border-radius: 0px 0px 80px 0px;
        }
        #HeaderTitle{
            position: relative;
            top: -10%;
            left: -5%;
            color: white;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: xx-large;
        }
        #Creator{
            position: relative;
            top: -35%;
            left: -19%;
            color: white;
            font-size: smaller;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
		.SetScreen{
			position: absolute;
			left: 0%;
			top: 0%;
			height: 100vh;
			width: 100vw;

			background-color: white;

			display: flex;
			justify-content: center;
			align-items: center;
		}
		.MainGui{
			position: relative;
			width: 30%;
			background-color: white;
			height: 70%;
			border-radius: 16px;

			border: 1px solid black;
			background-color: #f5f6f7;
		}
		#Title{
			position: relative;
			text-align: center;
			top: -2%;

			color: #1877f2;
			font-size: 40px;

			font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
			cursor:default;
		}
		.NameInputBox{
			position: relative;
			top: -3%;
			width: 90%;
			height: 13%;
			margin: 5%;
			display: flex;
			background-color: #FAF9F6;
			border: 1px solid black;
			border-radius: 12px;
		}
		#InputFirstName{
			position: relative;
			width: 40%;
			height: 50%;
			margin: 5%;
			top: -10%;
			font-size: large;
			text-align: center;
			border-radius: 8px;
		}
		#InputLastName{
			position: relative;
			width: 40%;
			height: 50%;
			margin: 5%;
			top: -10%;
			font-size: large;
			text-align: center;
			border-radius: 8px;
		}

		#InputUserName{
			position: relative;
			top: -3%;
			margin-left: 25%;
			width: 50%;
			height: 8%;
			font-size: x-large;
		}

		.SelectGender{
			position: relative;
			margin-left: 10%;
			width: 31%;
			height: 5%;

			background-color: #f5f6f7;
			border: 1px solid black;
			border-radius: 6px;
		}

		#GenderText{
			position: relative;
			top: 10%;
			left: 2%;
			font-size: medium;
			font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		}

		#genderInput{
			position: relative;
			top: 10%;
			left: 2%;
			width: 55%;
			font-size: medium;
			font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		}

		.AgeBox{
			position: relative;
			top: -8%;
			width: 31%;
			height: 15%;
			margin: 10%;
			background-color: #FAF9F6;
			border: 1px solid black;
			border-radius: 8px;
			display: block;

		}
		.AgeYear{
			position: relative;
			left: 5%;
			top:2%;
			margin: 0;
			font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		}
		.AgeMonth{
			position: relative;
			margin: 5%;
			font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		}
		.AgeDay{
			position: relative;
			margin: 5%;
			font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		}

		.Password-Container{
			position: relative;
			left: 45%;
			top: -38%;
			width: 40%;
			height: 21%;
			background-color: #FAF9F6;
			border: 1px solid black;
			border-radius: 8px;
		}

		#Password1{
			width: 85%;
			height: 20%;
			margin: 5%;
			font-size: medium;
		}

		#Password2{
			width: 85%;
			height: 20%;
			margin: 5%;
			font-size: medium;
			display: block;
		}
		#ShowHideButton{
			position: relative;
			left: 100%;
			top: -70%;
			background-color: transparent;
			border: none;
			cursor: pointer;
		}
		#ShowHideButton img{
			width: 50px;
			height: 50px;  
		}

		#DisplayTextDiv{
			position: relative;
			top: -40%;
			background-color: white;
			margin-left: 15%;
			margin-top: 5%;
			justify-content: center;
			align-items: center;
			width: 70%;
			height:9%;
			border: 1px solid black;
			border-radius: 6px;
			display: none;
		}

		#DisplayTextId{
			position: relative;
			text-align: center;
			top: -7%;
			font-size: x-large;
			color: #697479;
			font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		}

		#signUp{
			position: relative;
			top: -40%;
			display: flex;
			margin: 20%;
			margin-top: 5%;

			width: 60%;
			height: 15%;

			border-radius: 8px;

			background-color: #1877f2;
			justify-content: center;
			align-items: center;

			color: white;
			text-decoration: none;
			font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
			font-size: xx-large;
		}
		#signUp:hover{
			transform: scale(1.03);
		}

		#GoBackButton{
            position: absolute;
            top: 2%;
            left: 2%;
            width: 20%;
            height: 7%;
            border-radius: 8px;
            background-color: #1877f2;
            color: white;
			font-size: large;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
			z-index: 2;
        }
        #GoBackButton:hover{
            transform: scale(1.05);
        }
	}
	@media (max-width: 768px){
		.HeaderTitleDiv{
			display: none;
        }
		.SetScreen{
			position: absolute;
			left: 0%;
			top: 0%;
			height: 100vh;
			width: 100vw;

			background-color: white;

			display: flex;
			justify-content: center;
			align-items: center;
		}

		.MainGui{
			position: relative;
			width: 90%;
			background-color: white;
			height: 70%;
			border-radius: 16px;

			border: 1px solid black;
			background-color: #f5f6f7;
		}

		#Title{
			position: relative;
			text-align: center;
			top: -2%;

			color: #1877f2;
			font-size: 40px;

			font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
			cursor:default;
		}
		.NameInputBox{
			position: relative;
			top: -3%;
			width: 90%;
			height: 13%;
			margin: 5%;
			display: flex;
			background-color: #FAF9F6;
			border: 1px solid black;
			border-radius: 12px;
		}
		#InputFirstName{
			position: relative;
			width: 40%;
			height: 50%;
			margin: 5%;
			top: -10%;
			font-size: small;
			text-align: center;
			border-radius: 8px;
		}
		#InputLastName{
			position: relative;
			width: 40%;
			height: 50%;
			margin: 5%;
			top: -10%;
			font-size: small;
			text-align: center;
			border-radius: 8px;
		}

		#InputUserName{
			position: relative;
			top: -3%;
			margin-left: 25%;
			width: 50%;
			height: 8%;
			font-size: large;
		}

		.SelectGender{
			position: relative;
			margin-left: 10%;
			width: 31%;
			height: 5%;

			background-color: #f5f6f7;
			border: 1px solid black;
			border-radius: 6px;
		}

		#GenderText{
			position: relative;
			top: 10%;
			left: 2%;
			font-size: small;
			font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		}

		#genderInput{
			position: relative;
			top: 10%;
			left: 2%;
			width: 50%;
			font-size: small;
			font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		}

		.AgeBox{
			position: relative;
			top: -5%;
			width: 31%;
			height: 15%;
			margin: 10%;
			background-color: #FAF9F6;
			border: 1px solid black;
			border-radius: 8px;
			display: block;

		}
		.AgeYear{
			position: relative;
			left: 5%;
			top:2%;
			margin: 0;
			font-size: small;
			font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		}
		.AgeMonth{
			position: relative;
			margin: 5%;
			font-size: small;
			font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		}
		.AgeDay{
			position: relative;
			margin: 5%;
			font-size: small;
			font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		}

		.Password-Container{
			position: relative;
			left: 45%;
			top: -32.5%;
			width: 40%;
			height: 21%;
			background-color: #FAF9F6;
			border: 1px solid black;
			border-radius: 8px;
		}

		#Password1{
			width: 85%;
			height: 20%;
			margin: 5%;
			margin-top: 10%;
			font-size: small;
		}

		#Password2{
			width: 85%;
			height: 20%;
			margin: 5%;
			margin-top: 10%;
			font-size: small;
			display: block;
		}

		#ShowHideButton{
			position: relative;
			left: 98%;
			top: -55%;
			background-color: transparent;
			border: none;
			cursor: pointer;
		}
		#ShowHideButton img{
			width: 50px;
			height: 50px;  
		}

		#DisplayTextDiv{
			position: relative;
			top: -30%;
			background-color: white;
			margin-left: 15%;
			margin-top: 5%;
			justify-content: center;
			align-items: center;
			width: 70%;
			height:9%;
			border: 1px solid black;
			border-radius: 6px;
			display: none;
		}

		#DisplayTextId{
			position: relative;
			text-align: center;
			top: -7%;
			font-size: 22px;
			color: #697479;
			font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
		}

		#signUp{
			position: relative;
			top: -30%;
			display: flex;
			margin: 20%;
			margin-top: 5%;

			width: 60%;
			height: 15%;

			border-radius: 8px;

			background-color: #1877f2;
			justify-content: center;
			align-items: center;

			color: white;
			text-decoration: none;
			font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
			font-size: xx-large;
		}

		#GoBackButton{
            position: relative;
            top: 2%;
            left: 2%;
            width: 20%;
            height: 7%;
            border-radius: 12px;
            background-color: #1877f2;
            color: white;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
	}
	
</style>
