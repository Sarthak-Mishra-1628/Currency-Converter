const url="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdown= document.querySelectorAll(".options select");
const btn= document.querySelector("form button");
const fromCurr= document.querySelector(".FROM select");
const toCurr= document.querySelector(".TO select");
const msg= document.querySelector(".msg");

for(select of dropdown){
    for(i in list){
        let neww=document.createElement("option");
        neww.innerText=i;
        neww.value=i;

        if(select.name==="from" && i==="USD") neww.selected="selected";
        else if(select.name==="to" && i==="INR") neww.selected="selected";
        select.append(neww);
    }
    
    select.addEventListener("change", (ele) => {
        update(ele.target);
    })
}

update = (ele) =>{
    let code= ele.value;
    let ccode=list[code];

    new_link=`https://flagsapi.com/${ccode}/flat/64.png`;

    let img=ele.parentElement.querySelector("img");
    img.src=new_link;
}

btn.addEventListener("click", async (e) => {
    e.preventDefault();
    let amt=document.querySelector("form input");
    
    if(amt.value==="" || amt.value<1){
        amt.value="1";
    }

    const new_url =`${url}/${fromCurr.value.toLowerCase()}.min.json`;

    let response= await fetch(new_url);
    let data= await response.json();

    let from = fromCurr.value.toLowerCase();
    let to = toCurr.value.toLowerCase();

    let rate= data[from][to];
    let amount=rate*amt.value;
    let rounded_rate=Math.round(amount*100)/100;

    msg.innerHTML="<b>"+amt.value+" "+fromCurr.value+"  =  "+" "+rounded_rate+" "+toCurr.value+"</b>";
    
});