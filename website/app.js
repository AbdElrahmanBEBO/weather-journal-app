/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=" ;
const APIKEY = "&appid=a88edfc1fc2d25a91686842d0fbb9f4d&units=metric";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (1+d.getMonth())+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to all function to existing HTML DOM element
const action = document.getElementById('generate').addEventListener('click',() => {

    const zipCode = document.getElementById('zip').value;
    const content = document.getElementById('feelings').value;

    KEY(baseURL,zipCode,APIKEY).then((data)=>{
        entry = {
            temp: data.main.temp,
            date: newDate,
            feelings: content
        }
        console.log(entry);
        postData('/all',entry);
        updateUI();
    });
});

// API DATA
const KEY = async (baseURL,zipCode,APIKEY)=>{
    const response = await fetch(baseURL+zipCode+APIKEY);
    try{
        const data = await response.json();
        return data;
    }
    catch(err){
        console.log("error KEY", err);
    }
};

//POST DATA
const postData = async ( url = '', data = {})=>{
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });
    try {
        const newData = await response.json();
        return newData;
    }
    catch(error) {
        console.log("error postData", error);
    }
};

//UPDATE DATA
const updateUI = async () => {
    const request = await fetch('/all');
    try{
      const allData = await request.json();
      document.getElementById('date').innerHTML = `date is ${allData.date}`;
      document.getElementById('temp').innerHTML = `temp is ${allData.temp}`;
      document.getElementById('content').innerHTML = `feelings is ${allData.feelings}`;
    }catch(error){
      console.log("error updateUI", error);
    }
  };
