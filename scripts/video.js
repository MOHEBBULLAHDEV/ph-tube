


function getTimeSrting(time){
  const hour = parseInt(time /3600);
  const remainingMinute = (time % 3600);
  const minute = parseInt(remainingMinute / 60)
  const remainingSecond = parseInt(remainingMinute % 60);
 return (`${hour} Hour ${minute} Munite ${remainingSecond} Second Ago
  
  
  `);
}


const loadCategories = () =>{
    fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    .then(res =>res.json())
    .then(data => displayCategories(data.categories))
    .catch("Eroor")

};
const removeClassBtn = () =>{
  const removeClass = document.getElementsByClassName("category-btn");
  for (let btn of removeClass) {
    btn.classList.remove("bg-black");

    
  }
}
function loadCategoriesVideo(id){
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
  .then(res =>res.json())
  .then(data => {
    removeClassBtn();
     
    const activeButton = document.getElementById(`btn-${id}`);
    activeButton.classList.add("bg-black")
    

    displayVideos(data.category)
  })
  .catch("Eroor")


}



const displayCategories = (categories) =>{
    categories.forEach(item => {
        console.log(item.category);
        const categoriesSection = document.getElementById('categories-section');
        const btnContainer = document.createElement("div");
        btnContainer.innerHTML = `
        <button id= "btn-${item.category_id}" onclick="(loadCategoriesVideo(${item.category_id}))" class="btn px-4 category-btn">${item.category}</button>
        
        
        
        `
             
     
        categoriesSection.appendChild(btnContainer);
        
    });
   

};


const loadVideos = (searchtext) =>{
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchtext


      
    }`)
    .then(res =>res.json())
    .then(data => displayVideos(data.videos))
    .catch("Eroor")

};
const loadDetails = async(id) =>{
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayVideoDetails(data.video)
}



// {
//   "category_id": "1001",
//   "video_id": "aaab",
//   "thumbnail": "https://i.ibb.co/QPNzYVy/moonlight.jpg",
//   "title": "Midnight Serenade",
//   "authors": [
//     {
//       "profile_picture": "https://i.ibb.co/fDbPv7h/Noha.jpg",
//       "profile_name": "Noah Walker",
//       "verified": false
//     }
//   ],
//   "others": {
//     "views": "543K",
//     "posted_date": ""
//   },
//   "description": "'Midnight Serenade' by Noah Walker is a soulful journey into the depths of the night, capturing the mystique and allure of a moonlit evening. With 543K views, this song brings together tender melodies and evocative lyrics, making it a favorite among listeners seeking a contemplative yet uplifting experience. Immerse yourself in this musical masterpiece and feel the calm embrace of the night."
// }


















const displayVideos = (videos) =>{
    const videosSection = document.getElementById('videos');
    
    
    
    videosSection.innerHTML = "";
    if (videos.length == 0) {
      videosSection.classList.remove('grid');

      videosSection.innerHTML = `
      <div class="min-h-[300px] flex flex-col gap-5 justify-center items-center">
      <img src="assets/icon.png"> 
      <h2 class="text-2xl font-bold">No Content Here In This Category</h2>
      
      
      </div>
      
      
      
      `;
      return;

      
    }else{
      videosSection.classList.add('grid');

    }
    videos.forEach(video => {
        const div = document.createElement("div");
        div.classList = "card card-compact"
        div.innerHTML = `
  <figure class = "h-[200px] relative">
    <img
      src= ${video.thumbnail} class ="w-full h-full object-cover"
      alt="Shoes" />
      ${
        video.others.posted_date?.length === 0?"":`<span class="absolute right-2 bottom-2 bg-black text-white p-1 rounded">${getTimeSrting(video.others.posted_date)}</span>`
      }
      
  </figure>
  <div class="px-0 py-2 flex gap-2">
  <div>
  <img class= "w-10 h-10 rounded-full object-cover" src="${video.authors[0].profile_picture}">
  
  
  </div>
  <div>
       <h2 class="text-xl font-bold">${video.title}</h2>
       <div class="flex items-center gap-2">
       <p>${video.authors[0].profile_name}</p>
       ${video.authors[0].verified == true ?`<img class="w-5" src="https://img.icons8.com/?size=48&id=D9RtvkuOe31p&format=png"></img> `: ""}
       
       
       
       </div>
        

  
  
  
  </div>
 
  
    
  </div>
   <button onclick ="loadDetails('${video.video_id}')" class="btn">Details</button>
 

        
        
        
        
        `;
        videosSection.appendChild(div)
        
    
   });

};
const displayVideoDetails = (Details) =>{
  


  const modalContaienr = document.getElementById("modal-container");
  modalContaienr.innerHTML = `
   <div >
   <img src =${Details.thumbnail}>
   <p>${Details.description}</P>
      <form method="dialog">
        <!-- if there is a button in form, it will close the modal -->
        <button class="btn">Close</button>
      </form>
    </div>
  
  
  
  `
  // modalContaienr.innerHTML = `
  // <img src=${Details.thumbnail}>
  
  
  
  
  // document.getElementById("showModalData").click();
  document.getElementById("customModal").showModal();


}




document.getElementById("search-input").addEventListener('keyup',(e)=>{
 loadVideos( e.target.value);


})
loadCategories();
loadVideos("")