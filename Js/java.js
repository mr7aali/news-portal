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
    console.log(id);
    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    fetch(url)
    .then(res=>res.json())
    .then(  data =>displayNews(data.data));
}

const displayNews = (newses)=>{
    console.log(newses);
  const newsContainer =document.getElementById('full-news-container');
    for(const news of newses){
        console.log(news);
        
        const newDiv = document.createElement('div');
        
    
  if(news.details.length > 20){
    var sliceNews =  news.details.slice(0,50) +'....';
    console.log(sliceNews)
  }
  else{
     sliceNews = news.details;
  }

        newDiv.innerHTML=`
        <div class="news-container">

             <div class="img-div">
                <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
              </div> 

        <div class="Blog">
           <h1>${news.title}</h1>
           <p>${sliceNews}</p>

           <div class="blog-details">                    
                    <span><div class="author-img"> <img src="" alt="">  </div><span>Name</span></span>
                    <p>View</p> 
          </div>
        </div>
      </div>
       
        `;
        newsContainer.appendChild(newDiv);
    }
}


loadCatagoris();