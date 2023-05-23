<!--This is the start page (index), where you get meet with the log in or sign up.-->
<div class="BackScreenSet">
    <div class="HeaderTitleDiv">
        <h1 id="HeaderTitle">The Chat Hive</h1>
        <p id="Creator">Henning Trillhus</p>
    </div>
    <div class="guiBackground">
        <div class="MainGui">
            <h1 id="title">The Chat Hive</h1>
            <!--sends you to the peage you request to be sent-->
            <a id="logIn" href="/login">LOG IN</a>
            <a id="signUp" href="/signin">SIGN UP</a>
        </div>
        
    </div>
</div>

<div class="MyName">
    <p>A creation by Henning Trillhus</p>
    <p>Summer of 2023</p>
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
        .BackScreenSet{
            position: absolute;
            left: 0%;
            top: 0%;
            height: 100vh;
            width: 100vw;

            display: flex;
            justify-content: center;
            align-items: center;
        }

        .guiBackground{
            position: relative;
            width: 30%;
            background-color: white;
            height: 70%;

            display: flex;
            justify-content: center;
            align-items: center;
        }

        .MainGui{
            position: relative;
            width: 100%;
            height: 100%;
            background-color: #f5f6f7;;
            border-radius: 15px;

            border: 1px solid black;
        }

        #title{
            position: relative;
            text-align: center;

            color: #1877f2;
            font-size: 40px;

            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        #logIn{
            position: relative;
            display: flex;
            margin: 10%;

            width: 80%;
            height: 25%;
            border-radius: 8px;

            background-color: #1877f2;
            justify-content: center;
            align-items: center;

            color: white;
            text-decoration: none;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: xx-large;
        }
        
        #logIn:hover{
            transform: scale(1.01);
        }

        #signUp{
            position: relative;
            display: flex;
            margin: 10%;
            margin-top: 20%;

            width: 80%;
            height: 25%;

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
            transform: scale(1.01);
        }

        .MyName{
            position:absolute;
            width: 15%;
            top: 88%;
            background-color: #f5f6f7;
            border: 1px solid black;
            text-align: center;
            border-radius: 6%;
        }

        p{
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
    }
    @media (max-width: 768px){
        .HeaderTitleDiv{
			display: none;
        }
        .BackScreenSet{
            position: absolute;
            left: 0%;
            top: 0%;
            height: 100vh;
            width: 100vw;

            display: flex;
            justify-content: center;
            align-items: center;
        }

        .guiBackground{
            position: relative;
            width: 80%;
            background-color: white;
            height: 55%;

            display: flex;
            justify-content: center;
            align-items: center;
        }
        .MainGui{
            position: relative;
            width: 100%;
            height: 100%;
            background-color: #f5f6f7;;
            border-radius: 15px;

            border: 1px solid black;
        }

        #title{
            position: relative;
            text-align: center;

            color: #1877f2;
            font-size: 40px;

            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }

        #logIn{
            position: relative;
            display: flex;
            margin: 10%;

            width: 80%;
            height: 25%;
            border-radius: 8px;

            background-color: #1877f2;
            justify-content: center;
            align-items: center;

            color: white;
            text-decoration: none;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: xx-large;
        }

        #signUp{
            position: relative;
            display: flex;
            margin: 10%;
            margin-top: 20%;

            width: 80%;
            height: 25%;

            border-radius: 8px;

            background-color: #1877f2;
            justify-content: center;
            align-items: center;

            color: white;
            text-decoration: none;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: xx-large;
        }

        .MyName{
            position:absolute;
            left: 20%;
            width: 60%;
            top: 90%;
            background-color: #f5f6f7;
            border: 1px solid black;
            text-align: center;
            border-radius: 6%;
        }

        p{
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
    }
</style>
