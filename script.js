// Mute/Unmute Button functions
var mute = 0;
function muteUnmute ()
{
    mute++;
    var audio = document.getElementById("audio");
    document.getElementById("bg__img").style.display = 'block';
    setTimeout(function () { document.getElementById("bg__img").style.display = 'none'; }, 100);

    if (mute % 2 != 0)
    {
        // console.log( mute ); Volume On
        document.getElementById("volumeBtn").src = "./volumeOn.png";
        document.getElementById("volumeBtn").style.background = "transparent";
        audio.play();
        audio.muted = false;
    } else
    {
        //Volume Off
        document.getElementById("volumeBtn").src = "./volumeOff.png";
        audio.muted = true;
        audio.pause();
    }
}

// cross button 
function cross ()
{
    document.getElementById('query').value = null;
    document.getElementById("marvelCharacter").style.display = 'none';
    window.location.reload();
}

let result_div = document.getElementById("marvelCharacter");
// var timerId;

async function searchDetails ()
{
    const publicKey = "8a5b1a52222fcbf1df02198165f0b100";
    const privateKey = "98ca0a4fa9ea38457b16d5d35740ca6ce6168923";
    var ts = Date.now()
    var hash = md5(ts + privateKey + publicKey);
    let query = document.getElementById('query').value;

    let res = await fetch(`https://gateway.marvel.com:443/v1/public/characters?ts=${ ts }&apikey=${ publicKey }&hash=${ hash }&nameStartsWith=${ query }&limit=20`);
    let data = await res.json();
    console.log("data:", data);

    return data.results;
}

function throttleFunction ()
{
    document.getElementById("searchImg").src = "https://icon-library.com/images/loading-icon-transparent-background/loading-icon-transparent-background-12.jpg";
    main();
    setTimeout(() =>
    {

        console.log('YEs');
    }, 800);
}

function displayResults (d)
{
    result_div.innerHTML = null;
    document.getElementById("marvelCharacter").style.display = 'block';
    d.forEach(({ name, birth_year, gender, height, eye_color, mass, hair_color }) =>
    {
        console.log("name:", name);
        console.log("birth_year:", birth_year);
        console.log("gender:", gender);
        // console.log( document.getElementById( 'query' ).value );

        // dynamic result showing
        let divResult = document.createElement("div");
        divResult.className = "searchResults";

        let divInfo = document.createElement("div");
        divInfo.className = "searchInfo";

        let divNameDOBContainer = document.createElement("div");

        let pName = document.createElement("p");
        pName.innerHTML = name;
        pName.className = "resultName";

        let pDOB = document.createElement("p");
        pDOB.innerHTML = birth_year;
        pDOB.className = "resultDOB";

        divNameDOBContainer.append(pName, pDOB);

        let pGender = document.createElement("p");
        pGender.innerHTML = gender;
        pGender.className = "resultGender";

        divInfo.append(divNameDOBContainer, pGender);
        // console.log( "divInfo", divInfo );
        divResult.append(divInfo);
        // console.log( "divResult", divResult );
        result_div.append(divResult);

        divInfo.onclick = function () { showCharacterDetails(name, birth_year, gender, height, eye_color, mass, hair_color) };

        if (document.getElementById('query').value == "")
        {
            document.getElementById("marvelCharacter").style.display = 'none';

            console.log("qR1:", document.getElementById('query').value);

            window.location.reload();
        } else
        {
            console.log("qR2:", document.getElementById('query').value);

            document.getElementById("marvelCharacter").style.transition = 'max-height 5s';
            document.getElementById("searchImg").src = "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Z2pzPSJodHRwOi8vc3ZnanMuY29tL3N2Z2pzIiB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgeD0iMCIgeT0iMCIgdmlld0JveD0iMCAwIDExOC43ODMgMTE4Ljc4MyIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+PGc+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+Cgk8cGF0aCBkPSJNMTE1Ljk3LDEwMS41OTdMODguNjYxLDc0LjI4NmM0LjY0LTcuMzg3LDcuMzMzLTE2LjExOCw3LjMzMy0yNS40ODhjMC0yNi41MDktMjEuNDktNDcuOTk2LTQ3Ljk5OC00Ny45OTYgICBTMCwyMi4yODksMCw0OC43OThjMCwyNi41MSwyMS40ODcsNDcuOTk1LDQ3Ljk5Niw0Ny45OTVjMTAuMTk3LDAsMTkuNjQyLTMuMTg4LDI3LjQxNC04LjYwNWwyNi45ODQsMjYuOTg2ICAgYzEuODc1LDEuODczLDQuMzMzLDIuODA2LDYuNzg4LDIuODA2YzIuNDU4LDAsNC45MTMtMC45MzMsNi43OTEtMi44MDZDMTE5LjcyLDExMS40MjMsMTE5LjcyLDEwNS4zNDcsMTE1Ljk3LDEwMS41OTd6ICAgIE00Ny45OTYsODEuMjQzYy0xNy45MTcsMC0zMi40NDMtMTQuNTI1LTMyLjQ0My0zMi40NDNzMTQuNTI2LTMyLjQ0NCwzMi40NDMtMzIuNDQ0YzE3LjkxOCwwLDMyLjQ0MywxNC41MjYsMzIuNDQzLDMyLjQ0NCAgIFM2NS45MTQsODEuMjQzLDQ3Ljk5Niw4MS4yNDN6IiBmaWxsPSIjMDAwMDAwIiBkYXRhLW9yaWdpbmFsPSIjMDAwMDAwIiBzdHlsZT0iIj48L3BhdGg+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPC9nPgo8ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8L2c+CjxnIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjwvZz4KPC9nPjwvc3ZnPg==";
            document.getElementById("appSearch").style.top = '26%';
            document.getElementById("search__searchbox__input").style.borderRadius = '20px 20px 0 0';
            document.getElementById("hr").style.visibility = 'visible';
            document.getElementById("cross").style.visibility = 'visible';
        }
    });
}

function showCharacterDetails (name, birth_year, gender, height, eye_color, mass, hair_color)
{
    document.getElementById("appSearch").style.display = 'none';
    document.getElementById("appShow").style.display = 'flex';
    document.getElementById("marvel_character-name").innerHTML = name;
    document.getElementById("marvel_character-DOB").innerHTML = `Birth Year : ${ birth_year }`;
    document.getElementById("marvel_character-Gender").innerHTML = `Gender : ${ gender }`;
    document.getElementById("marvel_character-Height").innerHTML = `Height : ${ height }`;
    document.getElementById("marvel_character-EyeColor").innerHTML = `Eye Color : ${ eye_color }`;
    document.getElementById("marvel_character-Weight").innerHTML = `Mass : ${ mass }`;
    document.getElementById("marvel_character-HairColor").innerHTML = `Hair Color : ${ hair_color }`;
}

function mainRefreshedPage ()
{
    window.location.reload();
}

async function main ()
{
    let charactersQuery = await searchDetails();
    console.log("charactersQuery:", charactersQuery);
    if (charactersQuery.length == 0)
    {
        document.getElementById('notFound').style.display = 'block';
        document.getElementById("marvelCharacter").style.display = 'none';
    } else
    {
        document.getElementById('notFound').style.display = 'none';

        displayResults(charactersQuery);
    }
}
