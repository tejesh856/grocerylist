const input=document.querySelector('#text-box');
const items=document.querySelector('.cover');
const submit=document.querySelector('.submit');
const notify=document.querySelector('.notify');
const clear=document.querySelector('.clear');
const inputbox=document.querySelector('.input');

function arr(){
    let ar=[...items.children];
    return ar;
}

function loaditems() {
    for (let index = 0; index < JSON.parse(localStorage.getItem('item')).length; index++) {
        items.innerHTML+=`<div class="items">
                             <span>${JSON.parse(localStorage.getItem('item'))[index]}</span>
                                 <div class="btns">
                                    <button class="btn1"><i class="fa-solid fa-pen-to-square"></i></button>
                                    <button class="btn2"><i class="fa-solid fa-trash"></i></button>
                                 </div>
                             
                           </div>`;
            
         
        

    }
    if (arr().length>0) {
        clear.classList.add('clears');     
    }
    

}
window.addEventListener('load',()=>{
    loaditems();
})

function saveitems(val) {
    if (localStorage.getItem('item')===null) {
        localStorage.setItem('item','[]');
        
    }
    
    var old=JSON.parse(localStorage.getItem('item'));
    console.log(old);
    old.push(val);
    localStorage.setItem('item',JSON.stringify(old));

}
console.log(JSON);
function additems(){
    if(input.value.length>0){
        const div1=document.createElement('div');
        div1.classList.add('items');
        const span=document.createElement('span');
        const div2=document.createElement('div');
        div2.classList.add('btns');
        const edit=document.createElement('button');
        edit.classList.add('btn1');
        const del=document.createElement('button');
        del.classList.add('btn2');
        span.innerHTML=input.value;
        input.value='';
        
        edit.innerHTML=`<i class="fa-solid fa-pen-to-square"></i>`;
        del.innerHTML=`<i class="fa-solid fa-trash"></i>`;
        items.appendChild(div1);
        div1.appendChild(span);
        div1.appendChild(div2);
        div2.appendChild(edit);
        div2.appendChild(del);
        saveitems(span.innerText);
        
        
        
        notify.style=`visibility: visible; background-color: lightgreen; color:black`;
        notify.innerHTML=`item added to list`;

        setTimeout(() => {
            notify.style=`visibility:hidden`;
        }, 1000);
        
        
        
        
        

    }
    else{
        notify.style=`visibility: visible; background-color:rgba(255, 0, 0, 0.171); color:rgba(165, 7, 7, 0.452)`;
        notify.innerHTML=`empty item`;
        setTimeout(()=>{
            notify.style=`visibility:hidden`;

        },1000);
        

    }
    if(arr().length>0){
        clear.classList.add('clears');
    }
    

    
    
    

    

}


function changeitem(s){
    
    let sr=JSON.parse(localStorage.getItem('item'));
    
    var ol=s.innerText;
    let ind=sr.indexOf(ol);
    inputbox.children[1].replaceWith(submit);
    s.innerText=input.value;
    var ne=s.innerText;
    sr[ind]=ne;
    
    
            

    localStorage.setItem('item',JSON.stringify(sr));
    input.value=``;
    notify.style=`visibility: visible; background-color: lightgreen; color:black`;
    notify.innerHTML=`item edited`;
    setTimeout(()=>{
        notify.style=`visibility:hidden`;

    },1000);
    





}
function delitems(e) {
    let i=e.target;
   
    if(i.classList[1]==='fa-trash'){
        const p=i.parentElement.parentElement.parentElement;
        
        notify.style=`visibility: visible; background-color:rgba(255, 0, 0, 0.171); color:rgba(165, 7, 7, 0.452)`;
        notify.innerHTML=`item deleted`;
        setTimeout(() => {
            notify.style=`visibility:hidden`;
        },1000);

        let a=JSON.parse(localStorage.getItem('item'));
        for (let id = 0; id < a.length; id++) {
            if ( p.children[0].innerText===a[id]) {
                let j=a.splice(id,1);
                localStorage.setItem('item',JSON.stringify(a));
                
            }
            
            
            
        }
       
        p.remove();
        
    }
    if(i.classList[1]==='fa-pen-to-square'){
        input.value=i.parentElement.parentElement.parentElement.children[0].innerText;
        const editbtn=document.createElement('button');
        editbtn.classList.add('edit');
        editbtn.innerHTML='edit';
        submit.replaceWith(editbtn);
        inputbox.children[1].addEventListener('click',()=>{
            changeitem(i.parentElement.parentElement.parentElement.children[0]);
            
        });
    }

    if(arr().length===0){
        clear.classList.remove('clears');
    }
    
    
}
function dellist(){
    
    items.innerHTML=``;
    clear.classList.remove('clears'); 
    localStorage.setItem('item','[]');
    notify.style=`visibility: visible; background-color:rgba(255, 0, 0, 0.171); color:rgba(165, 7, 7, 0.452)`;
    notify.innerHTML=`empty list`;

    setTimeout(()=>{
        notify.style=`visibility:hidden`;
    },1000);
}
submit.addEventListener('click',additems);

items.addEventListener('click',delitems);

clear.addEventListener('click',dellist);


