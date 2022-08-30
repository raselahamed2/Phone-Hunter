const loadphone = async(searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    displyPhone(data.data)
}

const displyPhone = (data) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';
    // phone limit 20
    data = data.slice(0, 10);
    // disply no phone fuonds 
    const noPhoneFounds = document.getElementById('no-phone-found')
    if(data.length === 0){
        noPhoneFounds.classList.remove('d-none');
    }
    else{
        noPhoneFounds.classList.add('d-none')
    }
    data.forEach(phone => {
        const phoneDiv = document.createElement ('div')
        phoneDiv.classList.add('col')
        phoneDiv.innerHTML = `
        <div class="card p-4 m-4">
            <img src="${phone.image}" class="card-img-top" alt="...">
            <div class="card-body">
            <h5 class="card-title">${phone.phone_name}</h5>
            <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
      </div>
          `;
          phoneContainer.appendChild(phoneDiv);
        });
        //   stop spinar loader 
        toggleLoader(false);
} 

document.getElementById('btn-search').addEventListener('click', function(){
    // loading 
    toggleLoader(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    searchField.value = '';
    loadphone(searchText);

    
})

const toggleLoader = isLoader => {
    const loaderSection = document.getElementById('loader')
    if(isLoader){
        loaderSection.classList.remove('d-none')
    }
    else{
        loaderSection.classList.add('d-none')
    }
}

loadphone();