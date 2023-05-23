//Import svlete kit json, sanity client, and random token generatior
import {json} from '@sveltejs/kit';
import {createClient} from '@sanity/client';
import { v4 as uuidv4 } from 'uuid';


//the Sanity Project with my users
const client = createClient({
  projectId: "iz58wwi4",
  dataset: "production",
  apiVersion: "2021-10-21",
  useCdn: false, //true
  token: "skZw4oAnOwPd0bHhUBH3K5fdtkYp8mpa1FfMOJj45T7E6ecCL1uNMvNheCqju0q1BmAcLDH2COGE60LNaXHnAK5OEG7EGqsBxqvUDkVyihraEWPb1kd2M5DF3CTwp7U7lJJ7Q5JrFzGQ7mgw0PLMMpAnflGSdbjOL5z0tRJBWLK3Tek8QWyE"
});

//Fetch all value of type user from sanity
async function getUsers() {
  const users = await client.fetch('*[_type == "user"]')
  return users
};

//fetch only user with this user name, and only the first
async function getUser(username) {
  const user = await client.fetch(`*[_type == "user" && username == "${username}" ][0]`)
  return user
};


export async function GET({request, url}) {
  console.log("url searchParms:",url.searchParams)
  const users = await getUsers()
  const user = await getUser(url.searchParams.get('username'))
  return json({users: users, user: user})
}

//funtion post, sends data to the server
export async function POST({request, response, cookies}) {
  //get data from the user
  const formData = await request.json()
  //creat token for user using uuidv4
  let userToken = uuidv4()
  //check if users id is new if new then creat new user if not then we know we are going to upgrade a user 
  if (formData._id) {
    //patch users values
    console.log("at patch. patching user id: ", formData._id, " with WIOYM", formData.WIOYM)
    //patch user with this id, set the WIOYM value with the date in to sanity and commit()
    const NewWIOYMValue = await client.patch(formData._id).set({WIOYM: formData.WIOYM, PostDate: formData.PostDate, PostTime:formData.PostTime}).commit()
    .then(response => {
      console.log("What is on your mind? ", response)
    })
    .catch(error => {
      console.error('Error:', error);
    });
  } 
  //if the user id doset exisit make new user
  else {
    //creat new user with the input values from the user
    const newUser = await client.create({
      _type: 'user',
      name: formData.name,
      lastname: formData.lastName,
      gender: formData.gender,
      age: formData.age,
      yearborn: formData.yearborn,
      monthbron: formData.monthbron,
      daybron: formData.daybron,
      username: formData.userName,
      password:formData.password,
      WIOYM:formData.post,
      token: userToken
    })
    .then(response => {
      console.log('User created:', response);
    })
    .catch(error => {
      console.error('Error:', error);
    });
  } 
}


