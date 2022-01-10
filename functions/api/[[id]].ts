




export async function onRequestGet(context:any) {
    
        const params = context.params.id;
        
        let url = `https://store.steampowered.com/wishlist/profiles/${params[0]}/${params[1]}`
        let response

        fetch(url).then(response=>{response.json()})
        .then((data:any)=>{return new Response(data, {status: 200} )})
        
        
}