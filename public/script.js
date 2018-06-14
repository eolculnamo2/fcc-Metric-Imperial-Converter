function convert(){
    //input 33mi, 5L etc
    let inp = {
        data: document.getElementById('inp').value.split(" ").join("")
    }

    alert("Sending inp to server")
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
          //document.getElementById('units').innerHTML = data.unit
      })
}