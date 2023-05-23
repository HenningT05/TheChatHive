<script>

</script>
<!--A realy easy error page-->
<main>
    <div class="MainDiv">
        <h1>Ops... something went wrong</h1>
        <p>Sorry. This page doesn't exist</p>
        <button on:click={() => history.back()}>BACK</button>
    </div>
</main>


<style>
    @media (min-width: 768px){
        .MainDiv{
            position: absolute;
            top: 0px;
            left: 0px;
            height: 100vh;
            width: 100vw;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        h1{
            position: relative;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: 60px;
        }
        p{
            position: relative;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: 30px;
        }
        button{
            position: relative;
            width: 15%;
            height: 8%;
            font-size: xx-large;
            background-color: #1877f2;
            color: white;
            border-radius: 8px;
        }
        
    }
    @media (max-width: 768px){
        .MainDiv{
            position: absolute;
            top: 0px;
            left: 0px;
            height: 100vh;
            width: 100vw;

            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }

        h1{
            position: relative;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: 60px;
        }
        p{
            position: relative;
            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
            font-size: 30px;
        }
        button{
            position: relative;
            width: 40%;
            height: 8%;
            font-size: xx-large;
            background-color: #1877f2;
            color: white;
            border-radius: 8px;
        }
    }
</style>