let intervalID = setInterval(()=> {
    console.log("Loading...")
},1000)

setTimeout(()=> {
    clearInterval(intervalID);
    console.log("Loaded successfully!")
},5000)