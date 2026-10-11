// ===========================
// Elements
// ===========================

const colorCards = document.querySelectorAll(".color");

const generateBtn = document.getElementById("generate");

const saveBtn = document.getElementById("save");

// ===========================
// Generate Random HEX Color
// ===========================

function randomColor(){

const letters="0123456789ABCDEF";

let color="#";

for(let i=0;i<6;i++){

color+=letters[Math.floor(Math.random()*16)];

}

return color;

}

// ===========================
// Generate Palette
// ===========================

function generatePalette(){

colorCards.forEach(card=>{

// Ignore Locked Cards

if(card.dataset.locked==="true"){

return;

}

const color=randomColor();

const box=card.querySelector(".color-box");

const hex=card.querySelector(".hex");

box.style.background=color;

hex.textContent=color;

});

}

// ===========================
// Generate on Load
// ===========================

generatePalette();

// ===========================
// Generate Button
// ===========================

generateBtn.addEventListener(

"click",

generatePalette

);

// ===========================
// Copy HEX Code
// ===========================

colorCards.forEach(card=>{

const copyBtn=card.querySelector(".copy");

copyBtn.addEventListener("click",()=>{

const hex=

card.querySelector(".hex").textContent;

navigator.clipboard.writeText(hex);

copyBtn.textContent="✅ Copied";

setTimeout(()=>{

copyBtn.textContent="📋 Copy";

},1200);

});

});

// ===========================
// Lock / Unlock
// ===========================

colorCards.forEach(card=>{

card.dataset.locked="false";

const lockBtn=

card.querySelector(".lock");

lockBtn.addEventListener("click",()=>{

if(card.dataset.locked==="false"){

card.dataset.locked="true";

lockBtn.textContent="🔒 Locked";

}

else{

card.dataset.locked="false";

lockBtn.textContent="🔓 Lock";

}

});

});

// ===========================
// Spacebar Shortcut
// ===========================

document.addEventListener("keydown",(event)=>{

if(event.code==="Space"){

event.preventDefault();

generatePalette();

}

});
// ===========================
// Save Palette
// ===========================

function savePalette(){

const palette=[];

colorCards.forEach(card=>{

palette.push(

card.querySelector(".hex").textContent

);

});

let saved=

JSON.parse(

localStorage.getItem("palettes")

)||[];

saved.push(palette);

localStorage.setItem(

"palettes",

JSON.stringify(saved)

);

alert("✅ Palette Saved!");

}

saveBtn.addEventListener(

"click",

savePalette

);

// ===========================
// Export Palette
// ===========================

function exportPalette(){

const palette=[];

colorCards.forEach(card=>{

palette.push(

card.querySelector(".hex").textContent

);

});

const blob=new Blob(

[JSON.stringify(palette,null,2)],

{

type:"application/json"

}

);

const url=

URL.createObjectURL(blob);

const a=document.createElement("a");

a.href=url;

a.download="palette.json";

a.click();

URL.revokeObjectURL(url);

}

// ===========================
// Export Button
// ===========================

const exportBtn=

document.createElement("button");

exportBtn.textContent="📤 Export";

exportBtn.style.flex="1";

exportBtn.style.padding="15px";

exportBtn.style.border="none";

exportBtn.style.borderRadius="12px";

exportBtn.style.background="#8b5cf6";

exportBtn.style.color="white";

exportBtn.style.cursor="pointer";

exportBtn.style.fontWeight="600";

document.querySelector(".buttons")

.appendChild(exportBtn);

exportBtn.addEventListener(

"click",

exportPalette

);

// ===========================
// HEX → RGB
// ===========================

function hexToRGB(hex){

hex=hex.replace("#","");

const r=parseInt(

hex.substring(0,2),

16

);

const g=parseInt(

hex.substring(2,4),

16

);

const b=parseInt(

hex.substring(4,6),

16

);

return `rgb(${r}, ${g}, ${b})`;

}

// ===========================
// Show RGB on Double Click
// ===========================

colorCards.forEach(card=>{

const hex=

card.querySelector(".hex");

hex.addEventListener(

"dblclick",

()=>{

const value=hex.textContent;

hex.textContent=

hexToRGB(value);

setTimeout(()=>{

hex.textContent=value;

},2000);

}

);

});

// ===========================
// Load Last Saved Palette
// ===========================

function loadLastPalette(){

const saved=

JSON.parse(

localStorage.getItem("palettes")

);

if(

!saved ||

saved.length===0

){

return;

}

const last=

saved[saved.length-1];

colorCards.forEach((card,index)=>{

const box=

card.querySelector(".color-box");

const hex=

card.querySelector(".hex");

box.style.background=

last[index];

hex.textContent=

last[index];

});

}

loadLastPalette();

// ===========================
// Keyboard Shortcuts
// ===========================

document.addEventListener("keydown",(event)=>{

// G = Generate

if(

event.key==="g" ||

event.key==="G"

){

generatePalette();

}

// S = Save

if(

event.key==="s" ||

event.key==="S"

){

event.preventDefault();

savePalette();

}

// E = Export

if(

event.key==="e" ||

event.key==="E"

){

exportPalette();

}

});