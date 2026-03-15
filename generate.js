export default async function handler(req,res){

const {prompt,provider,key,model} = req.body

let url=""
let body={}

if(provider==="openai"){

url="https://api.openai.com/v1/chat/completions"

body={
model:model || "gpt-4o-mini",
messages:[{role:"user",content:prompt}]
}

}

if(provider==="deepseek"){

url="https://api.deepseek.com/v1/chat/completions"

body={
model:model || "deepseek-chat",
messages:[{role:"user",content:prompt}]
}

}

if(provider==="gemini"){

let r = await fetch(
"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key="+key,
{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify({
contents:[{parts:[{text:prompt}]}]
})
}
)

let data = await r.json()

return res.status(200).json(data)

}


let r = await fetch(url,{
method:"POST",
headers:{
"Content-Type":"application/json",
Authorization:"Bearer "+key
},
body:JSON.stringify(body)
})

let data = await r.json()

res.status(200).json(data)

}