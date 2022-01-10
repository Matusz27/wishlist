




export async function onRequestGet(context:any) {
    
        const params = context.params.id;
        
        let url = `https://store.steampowered.com/wishlist/profiles/${params[0]}/${params[1]}`

        let responseData = await fetch(url).then(response => response.json())       
        
        return new Response(JSON.stringify(responseData), {status: 200} )
}