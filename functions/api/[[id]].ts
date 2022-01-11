



export async function onRequestGet(context:any) {
    
        const params = context.params.id;
        
        let url = `https://store.steampowered.com/wishlist/profiles/${params[0]}`

        let response = await fetch(url)
        let responseData = response.text() 
        
        return new Response(await responseData, {status: 200} )
}