export function onRequest(context) {
    const url = new URL(context.request.url)
    
    if (url.hostname.endsWith(".pages.dev")) {
        return Response.redirect("https://pointercrate2028.com", 301)
    }
    
    return context.next()
}
