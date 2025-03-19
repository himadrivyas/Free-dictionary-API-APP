//(function(){
console.log("page loaded");


//const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

const url= "https://api.dictionaryapi.dev/api/v2/entries/en/";

const result = document.querySelector('.result');

const searchButton = document.querySelector('#search-btn');

const sound = document.querySelector('#sound');


searchButton.addEventListener("click",()=>{
    let word = document.querySelector('.inp-word').value;
  
    fetch(`${url}${word}`).then((response) => response.json()).then((data) => {
        console.log(data[0]);
        let synonymText = data[0].meanings[0].synonyms;
        let antonymText = data[0].meanings[0].antonyms;
        let synonym = '', antonym = '';
        for(let x in synonymText){
            synonym += synonymText[x] + '</br>';
        }

        for(let y in antonymText){
            antonym += antonymText[y] + '</br>';
        }

        result.innerHTML = `
        <div class="word">
                <h2>${word}</h2>
                <h5>${data[0].meanings[0].partOfSpeech}  ${data[0].phonetic}</h5>
                <button class="playSound" onclick="playSound()"><i class="fa-solid fa-volume-high"></i></button>
            </div>
            <div class="details">
                
                <p class="word-meaning">${data[0].meanings[0].definitions[0].definition}</p>
                
                <p class="word-example">${data[0].meanings[0].definitions[0].example || ""}</p>

                <p class="title">Synonyms: </p>
                <p class="synonym">${synonym || ""}</p>
                <p class="title">Antonyms: </p>
                <p class="antonym">${antonym || ""}</p>
            </div>
        
        `;

        if(data[0].phonetics[0].audio == ''){
            console.log('no audio');
            document.querySelector('.playSound').disabled = true;
            document.querySelector('.playSound').setAttribute('disabled','');
            sound.src = '';
        }else{
            document.querySelector('.playSound').setAttribute('enabled','');
            document.querySelector('.playSound').disabled = false;
            sound.setAttribute("src",data[0].phonetics[0].audio );     
        }

    })
    .catch(() => {
        result.innerHTML = `<h3 class="error">Couldn't Find The Word</h3>`;
    });

});



function playSound(){
        sound.play();
    
}

//document.querySelector('.playSound').addEventListener("click",playSound,false);

//})();