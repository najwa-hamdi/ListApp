let addMemberBtn=document.querySelector(".addMember")
let closeModalBtn=document.querySelector(".closeBtn")
let overlayForm=document.querySelector(".overlayForm")
let contactForm=document.querySelector(".addNewContact")

addMemberBtn.addEventListener('click',()=>{
    overlayForm.classList.add("overlay")
    contactForm.style.display="block"
})

closeModalBtn.addEventListener('click',()=>{
    overlayForm.classList.remove("overlay")
    contactForm.style.display="none"
})

// end of overlay

let saveData=localStorage.getItem("contact")
let contactList=JSON.parse(saveData || "[]");

let contactFormName =document.getElementById("contactFormName")
let contactFormPhone =document.getElementById("contactFormPhone")
let contactFormEmail =document.getElementById("contactFormEmail")
let contactFormAddress =document.getElementById("contactFormAddress")

let lastContactID =contactList.length;

let newContact = ()=>{
    contactList.push({
        contactID : lastContactID+=1,
        contactName : contactFormName.value,
        contactPhone : contactFormPhone.value,
        contactEmail : contactFormEmail.value,
        contactAddress : contactFormAddress.value
    });
    console.log(contactList);
}

let contactTableBody=document.querySelector(".tBody")

let renderContacts =()=>{
    let tr=''
    contactList.forEach(contact => {
        tr+=`
        <tr data-id = ${contact.contactID}>
            <td>${contact.contactID}</td>
            <td>${contact.contactName}</td>
            <td>${contact.contactPhone}</td>
            <td>${contact.contactEmail}</td>
            <td>${contact.contactAddress}</td>
            <td class="green">Edit</td>
            <td class="red">Delete</td>
        </tr>
        `
    })
    contactTableBody.innerHTML=tr;
};
renderContacts();

let resetContactForm=()=>{
    contactFormName.value=''
    contactFormPhone.value=''
    contactFormEmail.value=''
    contactFormAddress.value=''
}

let saveBtn = document.querySelector(".saveBtn")

let saveBtnHandler =() =>{
    newContact();
    localStorage.setItem("contact",JSON.stringify(contactList));
    resetContactForm();
    renderContacts();
    overlayForm.classList.remove("overlay");
    contactForm.style.display="none";
    console.log("add")
}

saveBtn.addEventListener('click',saveBtnHandler);

contactTableBody.addEventListener('click',(e)=>{
    if(e.target.classList.contains("green")){
        let tr=e.target.parentElement;
        let id=tr.dataset.id;
        let index=parseInt(id)-1;

        contactFormName.value= contactList[index].contactName
        contactFormPhone.value= contactList[index].contactPhone
        contactFormEmail.value= contactList[index].contactEmail
        contactFormAddress.value= contactList[index].contactAddress
        console.log(contactList);
        overlayForm.classList.add("overlay")
        contactForm.style.display="block"

        let updateHandler=() =>{
            let updateContact={
                contactID : parseInt(id),
                contactName : contactFormName.value,
                contactPhone : contactFormPhone.value,
                contactEmail : contactFormEmail.value,
                contactAddress : contactFormAddress.value
            }
            contactList[index]=updateContact;
            localStorage.setItem("contact",JSON.stringify(contactList));


            overlayForm.classList.remove("overlay");
            contactForm.style.display="none";

            resetContactForm();
            renderContacts();

            console.log("update")
            saveBtn.removeEventListener('click',updateHandler)
            saveBtn.addEventListener('click',saveBtnHandler)
        }
        saveBtn.removeEventListener('click',saveBtnHandler);
        saveBtn.addEventListener('click',updateHandler)

    };
    if(e.target.classList.contains("red")){
        let tr=e.target.parentElement;
        let id=tr.dataset.id;
        let index=parseInt(id)-1;
        contactList.splice(index,1);
        localStorage.setItem("contact",JSON.stringify(contactList));
        renderContacts();
    };
})


let searchInput= document.getElementById("search")
let form= searchInput.parentElement;
let trs= document.querySelectorAll('tbody tr')
form.addEventListener('submit',e=>e.preventDefault())

searchInput.addEventListener('keyup', () =>{
    let searchInputValue=searchInput.value.toLowerCase();
    trs.forEach(tr=>{
        trName = tr.children[1].textContent.toLowerCase();
        if(trName.includes(searchInputValue)){
            tr.style.display="";
        }
        else{
            tr.style.display="none";
        }
    })
})