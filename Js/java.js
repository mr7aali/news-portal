const loadCatagoris =()=>{
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
    .then(res => res.json())
    // .then(data => displayCatagoris(data.data))
    .then(data => displayCatagoris(data.data.news_category))
}

const displayCatagoris=(Catagoris)=>{
    const catagoryNav = document.getElementById('Catagory');

    for(const Catagory of Catagoris){
        //  console.log(Catagory);

      const crteatSpan =document.createElement('span');
      crteatSpan.innerHTML =`
      <span onclick="getIdForSpanTag('${Catagory.category_id}')">${Catagory.category_name} </span>   
      `;
      catagoryNav.appendChild(crteatSpan);

      
    }
}

const getIdForSpanTag=(id)=>{
//console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(  data =>displayNews(data.data));
}

const displayNews = (newses)=>{
    //console.log(newses);
  const newsContainer =document.getElementById('full-news-container');
  newsContainer.innerHTML=``;
    for(const news of newses){
        console.log(news.author);
        
        const newDiv = document.createElement('div');

  if(news.details.length > 100){
    news.details =  (news.details.slice(0,500))  ;
    //console.log(sliceNews)
  }
  else{
     sliceNews = news.details;
  }
   const date = news.author.published_date.slice(0,10);

   

        newDiv.innerHTML =`
        <article>
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
                               <p>${date}</p>
                              </div>
                        </div>
                        <div><span><i class="fa-solid fa-eye"></i> ${news.total_view  ? news.total_view+'k':'Unknown' }</span></div>
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
    }
}



loadCatagoris();