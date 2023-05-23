<script>
    //import navigators to navigate between paths
    import { navigate } from 'svelte-routing';  

    //get user data from the server
    export let data = {}
    
    let wroungUser = false

    let inputUsername = '';
    let inputpassword = '';

    let displayText = '';

    let passwordShow = false;


    //go back to index function
    function GoBack(){
        navigate('/')
        location.reload()
    }

    function logIn(){
        //Get users from the server
        let usersData = data.users
        
        //runs a foreach loop that go trough all the usernames and check the user is real
        usersData.forEach(function(user) {
            if (user.username !== inputUsername){
                wroungUser = true
            }
            else{
                //if it is check if the password is corect
                if (user.password == inputpassword){
                    wroungUser = false
                    //display welcome user and relocate to the users home page
                    document.getElementById("DisplayText").innerHTML = "Welcome " + user.name
                    navigate('/login/profilPage/' + user.username);
                    location.reload()
                }
            }
            //if username not real or password not corect display Wrong username or password
            if (wroungUser == true) {
                document.getElementById("DisplayTextBox").style.display = "block"
                displayText = 'Wrong username or password';
            }
        });
        
    }

    //make password hidden or shown
    function showPassword(){
        passwordShow = !passwordShow
    }
    
</script>

<div class="SetScreen">
    <div class="HeaderTitleDiv">
        <h1 id="HeaderTitle">The Chat Hive</h1>
        <p id="Creator">Henning Trillhus</p>
    </div>
    <div class="mainGui">
        <!--Go back button-->
        <button id="GoBackButton" on:click={() => GoBack()}>Back</button>

        <h1 id="title">The Chat Hive</h1>

        <!--Normal input box for your Username -->
        <input type="text" class="InputUserName" bind:value={inputUsername} placeholder="Enter your username">

        <!--Password container that change depending on password showen or hidden-->
        <div class="password-container">
            {#if passwordShow}
                <input type="text" id="password" bind:value={inputpassword} placeholder="Enter your password">
                <button id="Show-HideButton" on:click={() => showPassword()}><img src="OpenEye.png" alt="Hide Password" title="Hide Password"></button>  
            {:else}
                <input type="password" id="password" bind:value={inputpassword} placeholder="Enter your password">
                <button id="Show-HideButton" on:click={() => showPassword()}><img src="ClosedEye.png" alt="Show Password" title="Show Password"></button>  
            {/if}
        </div>
        <!--Display box where text pop up-->
        <div id="DisplayTextBox">
            <h1 id="DisplayText">{displayText}</h1> 
        </div>

        <!--login button-->
        <button id="logInButton" on:click={() => logIn()} alt="Login">Login</button>   
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

        .mainGui{
            position: relative;
            width: 30%;
            background-color: white;
            height: 70%;
            border-radius: 16px;

            border: 1px solid black;
            background-color: #f5f6f7;
        }

        #title{
            position: relative;
            text-align: center;
            top: 5%;

            color: #1877f2;
            font-size: 40px;

            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            cursor:default;
        }

        .InputUserName{
            position: relative;
            margin-top: 10%;
            margin-left: 20%;    

            width: 60%;
            height: 8%;
            font-size: large;
            z-index:1;
        }

        .password-container{
            position: relative;
            width: 100%;
            height: 25%;
            display: flex;
            flex-direction: row;
            top:-10%;
        }

        #password{
            position: relative;
            top: -10%;
            margin: 20%;

            width: 50%;
            height: 32%;
            font-size: large;
        }

        #Show-HideButton{
            position: relative;
            top:-12%;
            left: -18%;
            margin-top: 20%;
            background-color: transparent;
            border: none;
            cursor: pointer;
        }
        #Show-HideButton img{
            width: 50px;
            height: 50px;  
        }
        #Show-HideButton:hover{
            transform: scale(1.05);
        }

        #logInButton{
            margin-top: 5%;
            margin-left: 20%;
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
        #logInButton:hover{
            transform: scale(1.05);
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
            font-size: large;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        #GoBackButton:hover{
            transform: scale(1.05);
        }

        #DisplayTextBox{
            position: relative;
            margin-top: -5%;
            margin-left: 20%;
            justify-content: center;
            align-items: center;
            width: 60%;
            height:9%;
            background-color:#ECECEC;
            border: 1px solid black;
            border-radius: 6px;
            display: none;
        }

        #DisplayText{
            position: relative;
            text-align: center;
            top: -5%;
            font-size: x-large;
            color: #697479;
            font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
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

        .mainGui{
            position: relative;
            width: 80%;
            background-color: white;
            height: 55%;
            border-radius: 16px;

            border: 1px solid black;
            background-color: #f5f6f7;

            display: block;
            align-items: center;
        }
        #title{
            position: relative;
            text-align: center;
            top: 5%;

            color: #1877f2;
            font-size: 40px;

            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            cursor:default;
        }
        .InputUserName{
            position: relative;
            margin-top: 10%;
            margin-left: 20%;    

            width: 60%;
            height: 8%;
            font-size: large;
            cursor: pointer;
        } 

        .password-container{
            position: relative;
            width: 100%;
            height: 25%;
            display: flex;
            flex-direction: row;
            top:-3%;
        }

        #password{
            position: relative;
            top: -10%;
            margin: 20%;

            width: 66%;
            height: 32%;
            font-size: medium;
        }
        #Show-HideButton{
            position: relative;
            top:-12%;
            left: -17%;
            margin-top: 20%;
            background-color: transparent;
            border: none;
            cursor: pointer;
        }
        #Show-HideButton img{
            width: 35px;
            height: 35px;  
        }
        #logInButton{
            margin-top: 5%;
            margin-left: 20%;
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

        #DisplayTextBox{
            position: relative;
            margin-top: -5%;
            margin-left: 20%;
            justify-content: center;
            align-items: center;
            width: 60%;
            height:9%;
            background-color:#ECECEC;
            border: 1px solid black;
            border-radius: 6px;
            display: none;
        }

        #DisplayText{
            position: relative;
            text-align: center;
            top: -15%;
            font-size: x-large;
            color: #697479;
            font-family:'Franklin Gothic Medium', 'Arial Narrow', Arial, sans-serif;
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