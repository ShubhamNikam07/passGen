const range=document.querySelector("[rangehandler");
const passLength=document.querySelector("#passlen");
const indicatorColor=document.querySelector(".indicatorcolor");
const copyBtn=document.querySelector(".ficon");
const displayFlex=document.querySelector(".display");
let rangeDefaltVal=10;
let color="grey";
let checkCount=1;
const symbol="`~!@#$%^&*()?|}{";
const chekcbox1 = document.querySelector("#include1");
const chekcbox2 = document.querySelector("#include2");
const chekcbox3 = document.querySelector("#include3");
const chekcbox4 = document.querySelector("#include4");
const passDisplay=document.querySelector(".copysec");
let showhidden=document.querySelector(".showhidden");
let allCheckBoxes=document.querySelectorAll("input[type=checkbox]");
let generatePassButton=document.querySelector('.genpass');

rangeHandler();

function rangeHandler(){
    range.value=rangeDefaltVal;
    passLength.innerHTML=rangeDefaltVal;
    colorIndicator("grey")
}

function colorIndicator(color){

    indicatorColor.style.backgroundColor=color;
    indicatorColor.style.boxShadow = `1px 1px 30px ${color}`;
}

function generateRandInt(min ,max){
    return Math.floor(Math.random() * (max - min)+min);
}

function createRandInt(){
    return generateRandInt(0,20);
}


function createRandCharlwr(){
     return String.fromCharCode(generateRandInt(97,123));
    
}

function createRandCharUpr(){
    return String.fromCharCode(generateRandInt(65,91))
}

function generateSymbol(){
    return symbol.charAt(generateRandInt(0,symbol.length-1));
}

function strengthChecker(){
    let isUpper=false;
    let isLwr=false;
    let isSmbl=false;
    let isChar=false;
    if(chekcbox1.checked) isUpper = true;
    if(chekcbox2.checked) isLwr = true;
    if(chekcbox3.checked) isSmbl = true;
    if(chekcbox4.checked) isChar = true;

    if(isUpper && isLwr && isSmbl && isChar){
        colorIndicator('green');
    }
        
    else if(isUpper && isLwr || isSmbl && isChar){
        colorIndicator('yellow');
    }
    else{
        colorIndicator('red');
    }

}

async function copyContent(str){

    try{
        console.log(str);
    await navigator.clipboard.writeText(str);
    setTimeout(()=>{
        displayFlex.value="";
    },5000);
    }
    catch(e){
        showhidden.innerHTML="unable to cpoy due to ",e;
    }
}

range.addEventListener('input',()=>{
    rangeDefaltVal=parseInt(range.value);
    rangeHandler();     
});

copyBtn.addEventListener('click',()=>{
    if(displayFlex.value)
        copyContent(displayFlex.value);
    else{
        alert(" please !!!first generate password");
    }
});

function handleboxChange(){
    allCheckBoxes.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    });
    if(parseInt(passLength)<checkCount){
        passLength=checkCount;
        rangeHandler();
    }
}

allCheckBoxes.forEach((checkbox)=>{
    checkbox.addEventListener("click",handleboxChange);
});

generatePassButton.addEventListener("click",()=>{
    if(checkCount<=0){
        alert("click on checkboxes");
    }


    let password="";

    let funArr=[];

    if(chekcbox1.checked)
        funArr.push(createRandCharUpr);
    if(chekcbox2.checked)
        funArr.push(createRandCharlwr);
    if(chekcbox3.checked)
        funArr.push(createRandInt);
    if(chekcbox4.checked)
        funArr.push(generateSymbol);


    for(let i=0;i<funArr.length;i++){
        password+=funArr[i]();
    }
    for(let i=0;i<parseInt(passLength.innerHTML) - funArr.length;i++){
        let randIndex=generateRandInt(0,funArr.length);
        password+=funArr[randIndex]();
    }
    displayFlex.value=password;
    strengthChecker();
    colorIndicator();
})
