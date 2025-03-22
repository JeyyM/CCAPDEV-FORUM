document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const searchIcon = document.querySelector('.searchIcon');
    const searchResult = document.getElementById('searchResult');
    async function search(){
        try{
            const keyword = searchInput.value.trim();
            if(!keyword){
                // searchResult.innerHTML = `<p>Please enter a keyword.</p>`
                return alert("Please enter a keyword.");
            }
            const url = new URLSearchParams(window.location.search);
            const currentSearch = url.get("search");
            if(!url.has("search") || currentSearch !== "keyword"){
                const newUrl = `/?search=${encodeURIComponent(keyword)}`;
                if(window.location.search !== `?search=${encodeURIComponent(keyword)}`){ //if there was a previous search
                    window.location.href = newUrl;
                }
            }
            const response = await fetch(`/api/search?keyword=${encodeURIComponent(keyword)}`);
            const html = await response.text();
            searchResult.innerHTML = html;
        } catch(error){
            console.error("Error fetching search results:", error);
        }  
    }
    if(searchIcon){
        searchIcon.addEventListener('click', search);
        searchInput.addEventListener('keydown', (event) => {
            if(event.key === 'Enter'){
                search();
            }
        });
    }
    const url = new URLSearchParams(window.location.search);
    const keyword = url.get("search");
    if(keyword){
        searchInput.value = keyword;
        search(); 
    }
});