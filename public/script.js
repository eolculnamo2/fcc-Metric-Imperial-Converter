function convert(){
    let inp = {
        data: document.getElementById('inp').value.split(" ").join("")
    }

    fetch('/convert',{
        method: "POST",
        body: JSON.stringify(inp),
        headers: { "Content-Type": "application/json" },
        credentials: "same-origin"
      })
      .then((response)=>{
          return response.json()
      })
      .then((data)=>{
          document.getElementById('conversion').innerHTML = data.string
      })
}