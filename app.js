const form = document.querySelector(".form");
const input = document.querySelector(".search");
const city = document.querySelector(".location");
const degree = document.querySelector(".degree");
const fahrenheit =document.querySelector(".fahrenheit"); 
const celcius = document.querySelector(".celcius"); 




navigator.geolocation.getCurrentPosition((position)=>{
    let lat = position.coords.latitude;
    let long =  position.coords.longitude;
    fetch(`http://api.weatherapi.com/v1/current.json?key=4e3c13ae1d9a43d8be5180345210107&q=${lat}, ${long}`, {mode: "cors"})
    .then(res=>{
        return res.json()
    }).then(data=>{
        city.innerText = `${data.location.name}, ${data.location.country}`;
        degree.innerText = data.current.feelslike_c + "°C";
        fahrenheit.addEventListener("click", () => {
            degree.innerText = toFahr(data.current.feelslike_c) + "°F";
        })
        celcius.addEventListener("click", () => {
            degree.innerText = data.current.feelslike_c + "°C";
        })
    })
});

let h2 = document.createElement("h2");

form.addEventListener("submit", e=>{
    e.preventDefault();
    fetch(`http://api.weatherapi.com/v1/current.json?key=4e3c13ae1d9a43d8be5180345210107&q=${input.value}`, {mode: "cors"})
    .then(res=>{
        return res.json()
    }).then(data=>{
        city.innerText = `${data.location.name}, ${data.location.country}`;
        degree.innerText = data.current.feelslike_c + "°C";
        fahrenheit.addEventListener("click", () => {
            degree.innerText = toFahr(data.current.feelslike_c) + "°F";
        })

        celcius.addEventListener("click", () => {
            degree.innerText = data.current.feelslike_c + "°C";
        })
    }).catch(err=>{
        
        h2.innerText = "Loc does not exist, try again";
        h2.style.textAlign = "center";
        h2.style.color = "red"
        let card = document.querySelector(".city-card");
        h2.classList.add("warning")
        card.appendChild(h2)
        let deleteWarning = () =>{
            if (document.querySelector(".warning")){
                document.querySelector(".warning").remove()
            }else{
                return 
            }
            
        }
        setTimeout(deleteWarning, 2000);


        
    })
        
    
})






function toFahr (deg) {
    return (deg * 9/5) + 32;
} 

