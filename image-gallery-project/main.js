(function(){

    //HTML objects
    var galleryContainer, slideShowSection;
    var slideshowFigure, slideshowImage, slideshowFigcaption;
    var showPrevBtn, showNextBtn, closeBtn;
    var previewIndex;


    //image-array
    var imagelist = [{
        name: "on_the_other_side.jpeg",
        caption: "On the other side of the river"
    }, {
        name: "volga.jpeg",
        caption: "Volga river"
    }, {
        name: "samara_railway_station.jpg",
        caption: "Railway station"
    }, {
        name: "samara_old.jpeg",
        caption: "Old city"
    }, {
        name: "samara_theatre.jpeg",
        caption: "Theatre"
    }, {
        name: "art_gallery.jpeg",
        caption: "Art gallery"
    }, {
        name: "brewery.jpeg",
        caption: "Brewery"
    }, {
        name: "city_library.jpeg",
        caption: "City library"
    }, {
        name: "evening.jpeg",
        caption: "Evening"
    }, {
        name: "museum_and_catholic_church.jpeg",
        caption: "Museum and catholic church"
    }, {
        name: "piece_of_art.jpeg",
        caption: "Statue in the park"
    }, {
        name: "volga_beach.jpeg",
        caption: "City beach and promenade"
    }, {
        name: "samara_church.jpeg",
        caption: "Russian orthodox church"
    }];


    //init function
    var init = function(){
        var setHTMLObjects = function(){

            galleryContainer = document.getElementById("galleryContainer");
            slideShowSection = document.getElementById("slideShowSection");
            slideshowFigure = document.getElementById("slideshowFigure");
            slideshowImage = document.getElementById("slideshowImage");
            slideshowFigcaption = document.getElementById("slideshowFigcaption");
            showPrevBtn = document.getElementById("showPrevBtn");
            showNextBtn = document.getElementById("showNextBtn");
            closeBtn = document.getElementById("closeBtn");
        }();
        //end setHTMLObjcts

        var setStyles = function () {
            galleryContainer.style.position = "relative";
            galleryContainer.style.display = "flex";
            galleryContainer.style.flexWrap = "wrap";

            slideShowSection.style.display = "none";
            slideShowSection.style.position = "fixed";
            slideShowSection.style.top = "0px";
            slideShowSection.style.left = "0px";
            slideShowSection.style.background = "rgba(0, 0, 0, 0.8)";
            slideShowSection.style.width = "100%";
            slideShowSection.style.height = "100%";
            slideShowSection.removeAttribute("hidden");

            slideshowFigure.style.margin = "0 auto";
            slideshowFigure.style.maxWidth= "70%";

            slideshowImage.style.maxWidth ="100%";
            slideshowImage.style.maxHeight ="100%";
            slideshowImage.style.border = "4px solid white";

            slideshowFigcaption.style.color = "white";
            slideshowFigcaption.style.fontSize = "24px";
            slideshowFigcaption.style.textAlign = "center";

            showPrevBtn.style.position = "fixed";
            showPrevBtn.style.top = "50%";
            showPrevBtn.style.left = "20px";
            showPrevBtn.style.width = "50px";
            showPrevBtn.style.outline = "none";

            showPrevBtn.onmouseover = onImgMouseOver;
            showPrevBtn.onmouseout = onImgMouseOut;

            showNextBtn.style.position = "fixed";
            showNextBtn.style.top = "50%";
            showNextBtn.style.right = "20px";
            showNextBtn.style.width = "50px";
            showNextBtn.style.outline = "none";

            showNextBtn.onmouseover = onImgMouseOver;
            showNextBtn.onmouseout = onImgMouseOut;

            closeBtn.style.position = "fixed";
            closeBtn.style.top = "20px";
            closeBtn.style.right = "20px";
            closeBtn.style.width = "30px";
            closeBtn.style.outline = "none";

            closeBtn.onmouseover = onImgMouseOver;
            closeBtn.onmouseout = onImgMouseOut;

        }();

        var setEvents = function(){

            showPrevBtn.onclick = showPreviousImage;
            showNextBtn.onclick = showNextImage;
            closeBtn.onclick = hidePreview;
        }();

        var setGUI = function(){
            createGallery();
        }();

    }();//end init

    //app logic

    function showPreviousImage() {
        previewIndex--;
        showPreview(previewIndex);
    }

    function showNextImage() {
        previewIndex++;
        showPreview(previewIndex);
    }

    function showPreview(index) {
        var imgObject = imagelist[index];

        previewIndex = index;

        if (previewIndex == 0) {
            showPrevBtn.style.display = "none";
        }
        else {
            showPrevBtn.style.display = "block";
        }

        if (previewIndex == imagelist.length - 1) {
            showNextBtn.style.display = "none";
        }
        else {
            showNextBtn.style.display = "block";
        }

        slideshowImage.setAttribute("src", "bilder/" + imgObject.name);
        slideshowFigcaption.innerHTML =  imgObject.caption;
        slideShowSection.style.display = "block";

        galleryContainer.style.position = "fixed";



    }

    function hidePreview() {
        slideShowSection.style.display = "none";
        galleryContainer.style.position = "relative";
    }

    function onImageClick(index) {
        return function () {
            showPreview(index);
        };
    }

    function createGallery(){
        var imgObject, figure, img, figcaption;

        for(var i = 0; i < imagelist.length; i++){
            imgObject = imagelist[i];  //get object from array

            figure = document.createElement("figure"); // create figure container

            img = document.createElement("img"); // create image element
            img.setAttribute("src", "bilder/" + imgObject.name);
            img.style.maxWidth = "200px";
            img.style.maxHeight = "200px";

            img.onclick = onImageClick(i);
            img.onmouseover = onImgMouseOver;
            img.onmouseout = onImgMouseOut;

            figcaption = document.createElement("figcaption");
            figcaption.innerHTML = imgObject.caption;

            figure.appendChild(img);
            figure.appendChild(figcaption);

            galleryContainer.appendChild(figure);

        }
    }

    function onImgMouseOver(event) {
        event.target.style.opacity = "0.6";
        event.target.style.cursor = "pointer";
    }

    function onImgMouseOut(event) {
        event.target.style.opacity = "1";
        event.target.style.cursor = "default";
    }


}());//end slideshow App
