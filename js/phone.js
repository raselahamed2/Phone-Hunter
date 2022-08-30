const loadphone = async(searchText, dataLimit) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
    const data = await res.json()
    displyPhone(data.data, dataLimit)
}

const displyPhone = (data, dataLimit) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';
    // phone limit 10
    const showAll = document.getElementById('show-all')
    if(dataLimit && data.length > 10){
        data = data.slice(0, 10)
        showAll.classList.remove('d-none')
    }
    else{
        showAll.classList.add('d-none')
    }
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
            <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            <button href="#" class="btn btn-primary">Show Ditails</button>
            </div>
      </div>
          `;
          phoneContainer.appendChild(phoneDiv);
        });
        //   stop spinar loader 
        toggleLoader(false);
} 

const procceseSearch = (dataLimit) =>{
    toggleLoader(true);
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // searchField.value = '';
    loadphone(searchText, dataLimit);
}


document.getElementById('btn-search').addEventListener('click', function(){
    // loading 
    procceseSearch(10)
    
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

document.getElementById('btn-show-all').addEventListener('click', function(){
    procceseSearch();
})

loadphone();