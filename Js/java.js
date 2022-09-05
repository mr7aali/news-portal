const loadCatagoris = () => {
  const url = `https://openapi.programming-hero.com/api/news/categories`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayCatagoris(data.data.news_category))
    .catch(error => console.log(error)) ///this line for unexpected error ()

}

const displayCatagoris = (Catagoris) => {
  const catagoryNav = document.getElementById('Catagory');

  for (const Catagory of Catagoris) {
    //  console.log(Catagory);

    const crteatSpan = document.createElement('span');
    crteatSpan.innerHTML = `
      <span onclick="getIdForSpanTag('${Catagory.category_id}')">${Catagory.category_name} </span>   
      `;
    catagoryNav.appendChild(crteatSpan);


  }
}

const getIdForSpanTag = (id) => {
  // console.log(id);
  const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayNews(data.data))

    .catch(errr => console.log(errr)); ///this line for unexpected error ()


}


const displayNews = (newses) => {
  //console.log(newses);
  var tem = 0;


  document.getElementById('footer').classList.remove('d-none');
  const newsContainer = document.getElementById('full-news-container');
  newsContainer.innerHTML = ``;

  // console.log(newses);
  for (const news of newses) {

    
    const newDiv = document.createElement('div');

    if (news.details.length > 100) {
      news.details = (news.details.slice(0, 500));
      //console.log(sliceNews)
    }
    else {
      sliceNews = news.details;
    }
    // let date = news.author.published_date.length;
    //date = news.author.published_date.slice(0,10);



    newDiv.innerHTML = `
        <article onclick="modalDetails('${news._id}')"  data-bs-toggle="modal" data-bs-target="#exampleModal">
        <div class="img-container">
             <img src="${news.thumbnail_url}" alt="">
        </div>
        <div class="news-blog">
             <div>
               <h1>${news.title}</h1>
               <p>${news.details} ....</p>
             </div>
             <div class="author-details"> 
                        <div class="my-div">
                              <div class="author-img">
                                 <img src="${news.author.img}" alt="">
                                
                              </div>
                              <div class="author-name">
                               <p> ${news.author.name ? news.author.name : 'Unknown'}</p>
                               <p>${news.author.published_date}</p>
                              </div>
                        </div>
                        <div><span><i class="fa-solid fa-eye"></i> ${news.total_view ? news.total_view + 'k' : 'Unknown'}</span></div>
                        <div id="Rating"> 
                         <i class="fa-solid fa-star"></i>
                         <i class="fa-solid fa-star"></i>
                         <i class="fa-solid fa-star"></i>
                         <i class="fa-solid fa-star"></i>
                         <i class="fa-solid fa-star-half-stroke"></i>
                    
                       </div>
                        <div><i class="fa-solid fa-arrow-right"></i></div>
             </div>
        </div>
  </article>
        `;

    newsContainer.appendChild(newDiv);
    tem++;


    ///console.log(news._id);
    // const code =news._id ;
    // console.log(code);
    
     

  }

 
  if (tem === 0) {
    document.getElementById('found-data-id').innerHTML = `
      <div class="found-data">
        <h2>No News Found</h2>
        </div>
      `;
  }
  else {
    document.getElementById('found-data-id').innerHTML = `
      <div class="found-data">
        <h2>${tem} items found for category Entertainment</h2>
        </div>
      `;
  }



}


 const modalDetails=(code)=>{    
  const Detailsurl =`https://openapi.programming-hero.com/api/news/${code}`;
  fetch(Detailsurl)
  .then(res=>res.json())
  .then(data=> displayDetails(data.data[0]));
      
 }

 const displayDetails=(data)=>{
    console.log(data);
    const name =data.details;
    console.log(name);



    document.getElementById('exampleModalLabel').innerText=`${data.author.name?data.author.name : 'Name Unknown'}`;
    document.getElementById('news-details').innerText=`${data.details}`;
   // document.getElementById('modal-body1').innerHTML=`
      

   // <div class="img-container">
  //  <img src="${data.thumbnail_url}" alt="">
   //</img> 
   // </div>
    
    
  //  `;
 }
loadCatagoris();