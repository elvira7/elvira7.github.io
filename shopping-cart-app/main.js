(function(){
    var varene = [{
        tittel: "Julepølse",
        bilde: "julepolse.jpg",
        pris: 39.90
    }, {
        tittel: "Tomtegløgg Original",
        bilde: "glogg.jpg",
        pris: 29.50
    }, {
        tittel: "Pepperkaker",
        bilde: "pepperkaker.jpg",
        pris: 42.90
    }, {
        tittel: "Julebrus",
        bilde: "julebrus.jpg",
        pris: 11.90
    }];
    
    const cookieId = "handlekurven"
    
    var vareTemplate, vareKonteiner, handlekurvKonteiner;
    
    // init function
    var init = function() {
        
        var setHTMLObjects = function() {
            vareKonteiner = document.getElementById("productContainer");
            handlekurvKonteiner = document.getElementById("cartContainer");
            vareTemplate = document.querySelector(".productTemplate");
        }(); // end setHTMLOBjects
        
        if (vareKonteiner) { // Varene
            visAlleVarer();
        }
        else { // Handlekurven
            visVareneIKurven();
        }
        
        oppdaterHandlekurvTekst(); // Vis med en gang hvor mange varer ligger i handlekurven
    }(); // end init
    
    // application logic
    
    // Genererer en vare div og legger til kontaineren
    function visEnVare(index) {
        var vareObj = varene[index];
        var vareDiv = vareTemplate.cloneNode(true);
        vareDiv.classList.remove('productTemplate');
        vareDiv.classList.add("product");
        vareDiv.querySelector('.productImage').src = "img/" + vareObj.bilde;
        vareDiv.querySelector('.productName').innerText = vareObj.tittel;
        vareDiv.querySelector('.productPrice').innerText = Number(vareObj.pris).toFixed(2);
        
        if (vareKonteiner) {
            vareDiv.querySelector('button').addEventListener("click", function() {
                leggVareTilHandlekurv(index, vareDiv);
            });
            if (erIKurven(index)) {
                vareDiv.querySelector('button').setAttribute("hidden", true);
                vareDiv.querySelector('.productAdded').removeAttribute("hidden");
            }
            vareKonteiner.appendChild(vareDiv);
        }
        else {
            vareDiv.querySelector('button').addEventListener("click", function() {
                fjernFraKurven(index, vareDiv);
            });
            handlekurvKonteiner.appendChild(vareDiv);
        }
        
        vareDiv.removeAttribute('hidden');
    };
    // end Genererer en vare div og legger til hjemmeside
            
    // Genererer alle varene på hjemmeside
    function visAlleVarer() {
        for (var i=0; i < varene.length; i++) {
            visEnVare(i);
        }
    };
    // end Genererer alle varene på hjemmeside
    
    // Lagrer en vare i cookies, skjuler kjøpp knappe og oppdaterer handlekurv tekst
    function leggVareTilHandlekurv(index, vareDiv) {
        vareDiv.querySelector('button').setAttribute("hidden", true);
        vareDiv.querySelector('.productAdded').removeAttribute("hidden");
        leggTilCookies(index);
        oppdaterHandlekurvTekst();
    }; // end Lagrer en vare i cookies, skjuler kjøpp knappe og oppdaterer handlekurv tekst
    
    //Lagrer en vare i cookies
    function leggTilCookies(index) {
        var cookie = document.cookie.split("=");
        var cookieExpireDate = new Date();
        var cookieVerdi = "";
        
        cookieExpireDate.setDate(cookieExpireDate.getDate() + 1);
        
        if (cookie && cookie[0] == cookieId && cookie[1]) {
            cookieVerdi = cookie[1] + ",";
        }
        
        cookieVerdi += index;
        document.cookie = cookieId + "=" + cookieVerdi + "; expires" + cookieExpireDate;
    };
    //end Lagrer vare i cookies
    
    // Viser hvor mange varer ligger i handlekurven
    function oppdaterHandlekurvTekst() {
        var tall = 0;
        var cookie = document.cookie.split("=");
        var handlekurvLenk = document.getElementById("handlekurvLenk");
        var ingenVarerText = document.getElementById("ingenVarerText");
        var antallVare = document.getElementById("antallVare");
        
        if (cookie && cookie[0] == cookieId && cookie[1]) {
            tall = cookie[1].split(",").length;
        }
        if (tall == 0) {
            handlekurvLenk.setAttribute("hidden", true);
            ingenVarerText.removeAttribute("hidden");
        }
        else {
            antallVare.innerText = tall;
            ingenVarerText.setAttribute("hidden", true);
            handlekurvLenk.removeAttribute("hidden");
        }
    }; // end Viser hvor mange varer ligger i handlekurven
    
    // Sjekk om en vare med spesifisert indeks ligger i handlekurven
    function erIKurven(index) {
        var cookie = document.cookie.split("=");
        if (cookie && cookie[0] == cookieId && cookie[1]) {
            return cookie[1].split(",").indexOf(index.toString()) > -1;
        }
        else {
            return false;
        }
    }; // end Sjekk om en vare med spesifisert indeks ligger i handlekurven
    
    // Viser alle varene som ligger i handlekurven
    function visVareneIKurven() {
        for (var i=0; i < varene.length; i++) {
            if (erIKurven(i)) {
                visEnVare(i);
            }
        }
    }; // end Viser alle varene som ligger i handlekurven
    
    // Fjerner en vare fra handlekurven/cookies og oppdaterer handlekurve tekst
    function fjernFraKurven(index, vareDiv) {
        var cookie = document.cookie.split("=");
        if (cookie && cookie[0] == cookieId && cookie[1]) {
            var vareIds = cookie[1].split(",");
            vareIds.splice(vareIds.indexOf(index), 1);
            
            var cookieExpireDate = new Date();
            if (vareIds.length > 0) {
                cookieExpireDate.setDate(cookieExpireDate.getDate() + 1);
                document.cookie = cookieId + "=" + vareIds.join() + "; expires" + cookieExpireDate;
            }
            else {
                cookieExpireDate.setDate(cookieExpireDate.getDate() - 1);
                document.cookie = cookieId + "=; expires" + cookieExpireDate;
            }
        }
        vareDiv.parentElement.removeChild(vareDiv);
        oppdaterHandlekurvTekst();
    }; // end Fjerner en vare fra handlekurven/cookies og oppdaterer handlekurve tekst
    
    // end application logic
}());