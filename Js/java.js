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
        
        newDiv.innerHTML=`
        
        <div class="card mb-3" style="max-width: 540px;">
        <div class="row g-0">
          <div class="col-md-4">
            <img src="${news.thumbnail_url}" class="img-fluid rounded-start" alt="...">
          </div>
          <div class="col-md-8">
            <div class="card-body">
              <h5 class="card-title">${news.title}</h5>
              <p class="card-text">${news.details}</p>
              
            </div>
          </div>
        </div>
      </div>
        
        `;
        newsContainer.appendChild(newDiv);
    }
}
loadCatagoris();