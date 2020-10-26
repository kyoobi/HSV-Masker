document.body.classList.add("loading");

//Inputting and showing the image
let imgSourceElement = document.getElementById("sourceImage");
let inputSourceElement = document.getElementById("sourceInput");
inputSourceElement.addEventListener(
    "change",
    e => {
        imgSourceElement.src = URL.createObjectURL(e.target.files[0]);
    },
    false
);

//Lower values functions
var vlhue = 0;
let elhue = document.getElementById("lhue");
elhue.oninput = function () {
    vlhue = this.value;
    this.form.amountInput.value = this.value
    processImage();
}
let nelhue = document.getElementById("nlhue");
nelhue.oninput = function () {
    vlhue = this.value;
    this.form.amountRange.value = this.value

    processImage();
}

var vlsat = 0;
let elsat = document.getElementById("lsat");
elsat.oninput = function () {
    vlsat = this.value;
    this.form.amountInput.value = this.value
    processImage();
}
let nelsat = document.getElementById("nlsat");
nelsat.oninput = function () {
    vlsat = this.value;
    this.form.amountRange.value = this.value

    processImage();
}

var vlval = 0;
let elval = document.getElementById("lval");
elval.oninput = function () {
    vlval = this.value;
    this.form.amountInput.value = this.value
    processImage();
}
let nelval = document.getElementById("nlval");
nelval.oninput = function () {
    vlval = this.value;
    this.form.amountRange.value = this.value

    processImage();
}


// Higher value functions
var vhhue = 0;
let ehhue = document.getElementById("hhue");
ehhue.oninput = function () {
    vhhue = this.value;
    this.form.amountInput.value = this.value
    processImage();
}
let nehhue = document.getElementById("nhhue");
nehhue.oninput = function () {
    vhhue = this.value;
    this.form.amountRange.value = this.value

    processImage();
}

var vhsat = 0;
let ehsat = document.getElementById("hsat");
ehsat.oninput = function () {
    vhsat = this.value;
    this.form.amountInput.value = this.value
    processImage();
}
let nehsat = document.getElementById("nhsat");
nehsat.oninput = function () {
    vhsat = this.value;
    this.form.amountRange.value = this.value

    processImage();
}

var vhval = 0;
let ehval = document.getElementById("hval");
ehval.oninput = function () {
    vhval = this.value;
    this.form.amountInput.value = this.value
    processImage();
}
let nehval = document.getElementById("nhval");
nehval.oninput = function () {
    vhval = this.value;
    this.form.amountRange.value = this.value

    processImage();
}




//Processing the Image
function processImage() {
    document.getElementById("heading").style.display = "none";

    this.disabled = true;
    let src = cv.imread(imgSourceElement);

    let dst = new cv.Mat();

    let lstorer = HSVtoRGB(vlhue, vlsat / 100, vlval / 100);
    let hstorer = HSVtoRGB(vhhue, vhsat / 100, vhval / 100);


    let low = new cv.Mat(src.rows, src.cols, src.type(), [lstorer.r, lstorer.g, lstorer.b, 255]);
    let high = new cv.Mat(src.rows, src.cols, src.type(), [hstorer.r, hstorer.g, hstorer.b, 255]);
    cv.inRange(src, low, high, dst);
    let res = new cv.Mat();
    cv.bitwise_and(src, src, res, mask = dst);
    cv.imshow('imageCanvas', res);
    console.log("1");

    this.disabled = false;
}




//Converting HSV2RGB
function HSVtoRGB(h, s, v) {
    var r, g, b, i, f, p, q, t;
    if (arguments.length === 1) {
        s = h.s, v = h.v, h = h.h;
    }
    i = Math.floor(h * 6);
    f = h * 6 - i;
    p = v * (1 - s);
    q = v * (1 - f * s);
    t = v * (1 - (1 - f) * s);
    switch (i % 6) {
        case 0: r = v, g = t, b = p; break;
        case 1: r = q, g = v, b = p; break;
        case 2: r = p, g = v, b = t; break;
        case 3: r = p, g = q, b = v; break;
        case 4: r = t, g = p, b = v; break;
        case 5: r = v, g = p, b = q; break;
    }
    return {
        r: Math.round(r * 255),
        g: Math.round(g * 255),
        b: Math.round(b * 255)
    };
}




function onOpenCvReady() {
    document.body.classList.remove("loading");
}