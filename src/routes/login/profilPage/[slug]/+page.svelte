<script>
    import { navigate } from 'svelte-routing';  

    //get users from the server
    export let data;

    let mainUser = data.user
    let users = data.users

    let settingsOpen = false

    let WIOYM_Value = mainUser.WIOYM;

    //get the requierd data
    let now = new Date();
    let today = now.toLocaleDateString();
    let time = now.toLocaleTimeString();

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

    //funtion that opens the settings
    function Settings(){
        settingsOpen = !settingsOpen
    }


    async function Post_WIOYM(){
        //post data to the server
        const res = await fetch('http://localhost:5173/API/Users', {
			method: 'POST',

            //sends with ID, What the user posted, and the date and for the post
			body: JSON.stringify({_id:mainUser._id, WIOYM: WIOYM_Value, PostDate:today, PostTime:time}),
		});

        const NewWIOYMValue = await res.json();
    }

    //get the users age
    let MainUserAge = getAge(mainUser.yearborn, (mainUser.monthbron +1),mainUser.daybron)

    function LogOut(){
        //log out and go back to the lognin
        navigate('/../../../../login');
        location.reload()
    }
       

</script>

<!--Sett the screen make the css easier-->
<div class="SetScreen">
    <div class="HeaderTitleDiv">
        <h1 id="HeaderTitle">The Chat Hive</h1>
        <p id="Creator">Henning Trillhus</p>
    </div>

    <div class="MainProfileGui">
        <div class="UserInfo">
            <h1> {mainUser.name} {mainUser.lastname} </h1>
            <h2> @{mainUser.username}</h2>
            <h3>{MainUserAge} years old {mainUser.gender}</h3>
            <h3>Born: {months[mainUser.monthbron]} {mainUser.daybron}th {mainUser.yearborn} </h3>
        </div>
        
        <div class="Display_WIOYM_Class">
            <p id="Display_WIOYM_QText">What's on your mind?</p>
            <div class="Display_WIOYM_Input_Div">
                <p id="Display_WIOYM_Input_Text">{WIOYM_Value}</p>
                <p id="Display_WIOYM_Post_data">Posted at: {mainUser.PostTime}<br>On the {mainUser.PostDate}</p>
                
            </div>
        </div>

        <div class="HowToUsePost">
            <p id="HowToUsePostText">Write a post here and let the world see what's on your mind</p>
        </div>

        <div class="Wright_WIOYM_Class">
            <input id="WIOYM" bind:value={WIOYM_Value} placeholder="Whats on your mind" />
            <button id="POST_WIOMY_Button" on:click={() => Post_WIOYM()} >Post</button>
        </div>          
    </div>

    <!--When pressed the button, opens the setings tab-->
    <button id="SettingsButton" on:click={() => Settings()} ><img src="/settings.png" alt="OpenSettings" title="Open settings"></button>
        {#if settingsOpen}
            <div class="SettingsClass">
                <button id="LogOutButton" on:click={() => LogOut()} >Log out</button>
            </div>
        {/if}  
    
    

    <div class="VisitFriends">
        <!--Normal foreach loop that sets up all the users-->
        {#each users as user}
            {#if user._id !== mainUser._id}
                <div class="VisitFriendBox">
                    <p id="VisitFriendName">{user.name} {user.age}</p>
                    <p id="VisitFriendUserName">@{user.username}</p>
                    <a id="VisitFriendButton" href="{mainUser.username}/visitPage/{user.username}">Visit {user.name}</a>
                    <!--Depending on the gender selected, you get a different img-->
                    {#if user.gender == "Man"}
                        <img id="userImg" src="/user.png" alt="User_image">
                    {:else if user.gender == "Woman"}
                        <img id="userImg" src="/Femaleuser.png" alt="User_image">
                    {:else}
                    <img id="userImg" src="/Otheruser.png" alt="User_image">
                    {/if}
                    
                </div>
            {/if}
        {/each}
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
            left: -5%;
            border-radius: 20px;
        }

        .UserInfo{
            position: relative;
            top: 12.8%;
            width: 28%;
            margin-left: 10%;
            background-color: #f5f6f7;
            border: 1px solid black;
            border-radius: 5%;
        }

        h1, h2, h3{
            position: relative;
            left: 5%;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

        }

        h2{
            color: #5A5A5A;
        }

        .Wright_WIOYM_Class{
            position: relative;
            top: -74%;
            margin: 10%;
            width: 28%;
            height: 21.1%;
            background-color: #f5f6f7;
            border: 1px solid black;
            border-radius: 8px;
        }

        #WIOYM{
            position: relative;
            width: 90%;
            height: 25%;
            margin: 5%;
            background-color: white;
            border: 1px solid black;
            border-radius: 6px;
            word-wrap: break-word;
            font-size: large;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        #POST_WIOMY_Button{
            position: relative;
            margin-left: 30%;
            width: 40%;
            height: 40%;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: large;
            background-color: #1877f2;
            color: white;
            border-radius: 8px;
            cursor: pointer;
        }

        #POST_WIOMY_Button:hover{
            transform: scale(1.05);
        }

        .HowToUsePost{
            position: relative;
            width: 28%;
            height: 8%;
            left: 10%;
            top:-58%;
            margin-top: 1%;
            text-align: center;
            background-color: #ECECEC;
            border: 1px solid black;
            border-radius: 10px;
        }
        #HowToUsePostText{
            position: relative;
            top: -24%;
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
            font-size: xx-large;
            left: 2%;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .Display_WIOYM_Class{
            position: relative;
            width: 50%;
            height: 70%;
            top: -25%;
            left: 40%;
            background-color: #f5f6f7;
            border: 1px solid black;
            border-radius: 8px;
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

        .VisitFriends{
            position: absolute;
            overflow: auto;
            width: 20%;
            left: 80%;
            height: 99%;
            background-color:#f5f6f7;
            border-radius: 15px 0px 0px 15px;
            border: 1px solid black;
        }

        .VisitFriendBox{
            background-color: aliceblue;
            line-height: 5px;
            height: 10%;
            margin: 10%;
            border-radius: 5px;
            border: 1px solid black;
        }

        #VisitFriendName{
            position: relative;
            margin-left: 10%;
            font-size:large;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        #VisitFriendUserName{
            position: relative;
            margin-left: 10%;
            font-size:medium;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        #VisitFriendButton{
            position: relative;
            margin-left: 10%;
            top: 5%;
            font-size:large;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            color: #1877f2;
        }

        #userImg{
            position:absolute;
            left: 63%;
            margin-top: -13%;
            width: 50px;
        }

        #SettingsButton{
            position:absolute;
            top: 75%;
            left: 17%;
            background-color: transparent;
            border: none;
            z-index: 2;
            cursor: pointer;
        }

        #SettingsButton:hover{
            transform: scale(1.05);
        }
        #SettingsButton img{
            width: 50px;
            
        }

        .SettingsClass{
            position: absolute;
            top: 74%;
            left: 17%;
            width: 10%;
            height: 8%;
            background-color: #f5f6f7;
            border: 1px solid black;
            border-radius: 15px;
        }

        #LogOutButton{
            position:relative;
            width: 50%;
            height: 80%;
            top: 10%;
            left: 40%;
            background-color: #1877f2;
            color: white;
            cursor: pointer;
            font-size: large;
            border-radius: 12px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        #LogOutButton:hover{
            transform: scale(1.03);
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
            top: -2%;
            height: 85%;
            left: 0%;
            border-radius: 20px;
        }

        .UserInfo{
            position: relative;
            top: 5%;
            width: 90%;
            margin-left: 5%;
            background-color: #f5f6f7;
            border: 1px solid black;
            border-radius: 5%;
        }

        h1, h2, h3{
            position: relative;
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
            width: 90%;
            height: 30%;
            top: 7%;
            left: 5%;
            background-color: #f5f6f7;
            border: 1px solid black;
            border-radius: 8px;
        }

        .Display_WIOYM_Input_Div{
            position: relative;
            width: 90%;
            height: 50%;
            margin: 5%;
            background-color: white;
            border: 1px solid black;
            border-radius: 8px;
        }

        #Display_WIOYM_Post_data{
            position: absolute;
            top: 50%;
            left: 2%;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        .Wright_WIOYM_Class{
            position: relative;
            top: 5%;
            margin: 5%;
            width: 90%;
            height: 15%;
            background-color: #f5f6f7;
            border: 1px solid black;
            border-radius: 8px;
        }

        #WIOYM{
            position: relative;
            width: 90%;
            height: 25%;
            margin: 5%;
            background-color: white;
            border: 1px solid black;
            border-radius: 6px;
            word-wrap: break-word;
            font-size: large;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        #POST_WIOMY_Button{
            position: relative;
            margin-left: 30%;
            width: 40%;
            height: 40%;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: large;
            background-color: #1877f2;
            color: white;
            border-radius: 8px;
            cursor: pointer;
        }

        .HowToUsePost{
            position: relative;
            width: 90%;
            height: 7%;
            left: 5%;
            top:7%;
            margin-top: 1%;
            text-align: center;
            background-color: #ECECEC;
            border: 1px solid black;
            border-radius: 10px;
        }
        #HowToUsePostText{
            position: relative;
            top: -24%;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            
        }

        
        .VisitFriends{
            position: absolute;
            overflow: auto;
            top: 95%;
            left: 15%;
            width: 70%;
            height: 99%;
            background-color:#f5f6f7;
            border-radius:15px;
            border: 1px solid black;
        }

        .VisitFriendBox{
            background-color: aliceblue;
            line-height: 5px;
            height: 10%;
            margin: 10%;
            border-radius: 5px;
            border: 1px solid black;
        }

        #VisitFriendName{
            position: relative;
            margin-left: 10%;
            font-size:large;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        #VisitFriendUserName{
            position: relative;
            margin-left: 10%;
            font-size:medium;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        #VisitFriendButton{
            position: relative;
            margin-left: 10%;
            top: 5%;
            font-size:large;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            color: #1877f2;
        }
        #userImg{
            position:absolute;
            left: 63%;
            margin-top: -13%;
            width: 50px;
        }

        #SettingsButton{
            position:absolute;
            top: 83%;
            left: 15%;
            background-color: transparent;
            border: none;
            z-index: 2;
            cursor: pointer;
        }
        #SettingsButton img{
            width: 50px;
            
        }

        .SettingsClass{
            position: absolute;
            top: 83%;
            left: 14.5%;
            width: 40%;
            height: 6%;
            background-color: #f5f6f7;
            border: 1px solid black;
            border-radius: 15px;
        }
        #LogOutButton{
            position:relative;
            width: 50%;
            height: 80%;
            top: 10%;
            left: 40%;
            background-color: #1877f2;
            color: white;
            cursor: pointer;
            font-size: medium;
            border-radius: 12px;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
    }
</style>