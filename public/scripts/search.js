document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('search');
    const searchIcon = document.querySelector('.searchIcon');
    const searchResult = document.getElementById('searchResult');
    async function search(){
        try{
            const searchText = searchInput.value.trim();
            if(!searchText){
                // searchResult.innerHTML = `<p>Please enter a keyword.</p>`
                return alert("Please enter a keyword.");
            }
            let community = "";
            let keyword = searchText;
            if(searchText.startsWith("s/")){
                const parts = searchText.split(" ");
                community = parts[0].substring(2);
                keyword = parts.slice(1).join(" ");
                if(!community){ //if s/
                    community = "*";
                }
            }
            const url = new URLSearchParams(window.location.search);
            const currentSearch = url.get("search");
            const currentCommunity = url.get("community");
            const params = new URLSearchParams(); //new
            if(keyword){
                params.set("search", keyword);
            }
            if(community){
                params.set("community", community);
            }
            const newUrl = `/?${params.toString()}`;
            if((!currentSearch && keyword) || (currentSearch && currentSearch !== keyword) || (!currentCommunity && community) || (currentCommunity && currentCommunity !== community)){
                if(window.location.search !== newUrl){ //if there was a previous search
                    window.location.href = newUrl;
                }
            }
            const response = await fetch(`/api/search?${params.toString()}`);
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
    const community = url.get("community");
    if(keyword || community){
        searchInput.value = community ? `s/${community} ${keyword || ""}`: keyword || "";
        search(); 
    }
});