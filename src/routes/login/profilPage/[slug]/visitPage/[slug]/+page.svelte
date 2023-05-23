<script>
    export let data;


    let mainUser = data.user

    let dato = new Date();
	let todayYear = dato.getFullYear();
	let todayMonth = dato.getMonth() +1;
	let todayDay = dato.getDate()

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

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

    function goBack(){
        window.history.back()
    }

    let MainUserAge = getAge(mainUser.yearborn, (mainUser.monthbron +1),mainUser.daybron)


</script>



<div class="SetScreen">
    <div class="HeaderTitleDiv">
        <h1 id="HeaderTitle">The Chat Hive</h1>
        <p id="Creator">Henning Trillhus</p>
    </div>

    <div class="MainProfileGui">
        

        <div class="UserInfo">
            <!--Get the correct user img depending on the gender-->
            {#if mainUser.gender == "Man"}
                <img id="UserImg" src="/user.png" alt="ImageOfMan" title="Image of man">
            {:else if mainUser.gender == "Woman"}
                <img id="UserImg" src="/Femaleuser.png" alt="ImageOfWoman" title="Image of Woman">
            {:else}
                <img id="UserImg" src="/Otheruser.png" alt="ImageOfOther" title="Image of Other">
            {/if}

            <h1> {mainUser.name} {mainUser.lastname} </h1>
            <h2> @{mainUser.username}</h2>
            <h3>{MainUserAge} years old {mainUser.gender}</h3>
            <h3>Born: {months[mainUser.monthbron]} {mainUser.daybron}th {mainUser.yearborn} </h3>

        </div>
        <button id="GoHomeButton" on:click={() => goBack()} >Home</button>
        
        <div class="Display_WIOYM_Class">
            <p id="Display_WIOYM_QText">What's on your mind?</p>
            <div class="Display_WIOYM_Input_Div">
                <p id="Display_WIOYM_Input_Text">{mainUser.WIOYM}</p>
                <p id="Display_WIOYM_Post_data">{mainUser.PostTime}<br>{mainUser.PostDate}</p>
                
            </div>
        </div>        
    </div>
</div>


<style>
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

            display: flex;
            justify-content: center;
            align-items: center;
        }

        .MainProfileGui{
            position: relative;
            border: 1px solid black;
            width: 60%;
            height: 70%;
            border-radius: 20px;
        }

        .UserInfo{
            position: relative;
            top: 10%;
            width: 28%;
            margin-left: 10%;
            background-color: aliceblue;
            border: 1px solid black;
            border-radius: 5%;
        }

        h1, h2, h3{
            position: relative;
            font-size: x-large;
            left: 5%;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        h2{
            color: #5A5A5A;
        }

        #Display_WIOYM_QText{
            position: relative;
            left: 5%;
            font-size: x-large;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        #Display_WIOYM_Input_Text{
            position: relative;
            font-size: x-large;
            left: 2%;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .Display_WIOYM_Class{
            position: relative;
            width: 50%;
            height: 74%;
            top: -64%;
            left: 40%;
            background-color: snow;
            border: 1px solid black;
            border-radius: 16px;
        }

        .Display_WIOYM_Input_Div{
            position: relative;
            width: 90%;
            height: 70%;
            margin: 5%;
            background-color: white;
            border: 1px solid black;
            border-radius: 8px;
        }

        #Display_WIOYM_Post_data{
            position: absolute;
            top: 80%;
            left: 2%;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        #UserImg{
            position: relative;
            width: 200px;
            left: 15%;
            top: 10px;
        }

        #GoHomeButton{
            position: absolute;
            width: 15%;
            height: 10%;
            top: 85%;
            left: 16%;
            border-radius: 8px;
            background-color: #1877f2;
            color: white;
            font-size: x-large;
            cursor: pointer;
        }
        #GoHomeButton:hover{
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

            display: flex;
            justify-content: center;
            align-items: center;
        }
        .MainProfileGui{
            position: relative;
            border: 1px solid black;
            width: 90%;
            height: 80%;
            border-radius: 20px;
        }

        .UserInfo{
            position: relative;
            top: 5%;
            width: 80%;
            height: 200px;
            margin-left: 10%;
            background-color: aliceblue;
            border: 1px solid black;
            border-radius: 5%;
        }

        h1, h2, h3{
            position: relative;
            font-size: large;
            top: -100px;
            left: 5%;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }


        #Display_WIOYM_QText{
            position: relative;
            left: 5%;
            font-size: x-large;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        #Display_WIOYM_Input_Text{
            position: relative;
            font-size: large;
            left: 2%;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .Display_WIOYM_Class{
            position: relative;
            width: 80%;
            height: 40%;
            top: 10%;
            left: 10%;
            background-color: snow;
            border: 1px solid black;
            border-radius: 16px;
        }

        .Display_WIOYM_Input_Div{
            position: relative;
            width: 90%;
            height: 70%;
            margin: 5%;
            background-color: white;
            border: 1px solid black;
            border-radius: 8px;
        }

        #Display_WIOYM_Post_data{
            position: absolute;
            top: 45%;
            left: 5%;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        #UserImg{
            position: relative;
            width: 100px;
            left: 60%;
            top: 30px;
        }

        #GoHomeButton{
            position: absolute;
            width:40%;
            height: 10%;
            top: 85%;
            left: 30%;
            border-radius: 8px;
            background-color: #1877f2;
            color: white;
            font-size: x-large;
            cursor: pointer;
        }
    }
    
</style>