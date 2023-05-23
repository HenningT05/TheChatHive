//get the slug
export async function load({params}) {
    const result = await getUser(params.slug)
    return result
}

//Get the user that you are visiting from the server
async function getUser(slug) {
    const res = await fetch(`http://localhost:5173/API/Users?username=${slug}`)
    let dataUser = await res.json()
    return dataUser
}
