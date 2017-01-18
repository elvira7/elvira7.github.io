(function(){

    // 1. atributer

            var tittelTxt, ideer, forkastet;
           

     // 2. HTML objects (som vi trenger å jobbe mot)

            var tittel, ide;
            var leggTilTittelBtn, leggTilIdeBtn;
            var ideBank;

        

    // 3. init-funksjon
        var init = function(){

            //få tak i og sette/inisialisere objekter vi skal jobbe med
            var setHTMLObjects = function(){
                tittel = document.getElementById("tittel");
                ide = document.getElementById("ide");
                tittelTxt = document.getElementById("tittelTxt");
                leggTilTittelBtn = document.getElementById("leggTilTittelBtn");
                leggTilIdeBtn = document.getElementById("leggTilIdeBtn");
                ideBank = document.getElementById("ideBank");
                ideer = document.getElementById("ideer");
                forkastet = document.getElementById("forkastet");

            
            }(); //end setHTMLObjcts

            var setEvents = function(){

                leggTilTittelBtn.onclick = leggTilTittel;
                leggTilIdeBtn.onclick = leggTilIde;


            }();

            var setGUI = function(){
                tittel.focus();
            }();

        }(); // end init

    // 4. applikasjonslogikk

        function leggTilTittel() {
            if (tittel.value == "") {
                alert("Vennligst legg til tittel");
             }else{
             tittelTxt.innerHTML = tittel.value;
             tittel.value = "";
            }

		}


        function leggTilIde() {
            if(ide.value == ""){
                alert("Vennligst legg til ide");
            }else{
                var nyIde = document.createElement("p");
                nyIde.innerHTML = ide.value;
                nyIde.onclick = function(){
                    flyttIde(nyIde);
                    ide.value = "";
                }
                ideer.appendChild(nyIde);
            }
        }

        function flyttIde(badIdea) {
            badIdea.onclick = function(){
                flyttForkast(badIdea);
            }

            document.getElementById("forkastet").appendChild(badIdea);

        }

        function flyttForkast(goodIdea){
            goodIdea.onclick = function(){
                flyttIde(goodIdea);
            }

            document.getElementById("ideer").appendChild(goodIdea);

        }
 }()); //end app