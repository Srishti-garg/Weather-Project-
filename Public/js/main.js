const submitbtn=document.getElementById("submitbtn");
const cityname=document.getElementById("cityname");
const city_name=document.getElementById("city_name");
const temp=document.getElementById("temp_real_val");
const temp_status=document.getElementById("temp_status");
const datahide=document.querySelector('.middle_layer');
let day=document.getElementById('day');
const today_date=document.getElementById("today_date");

const getcurrday=() => {
    let weekday=new Array(7);
    weekday[0]="Sunday";
    weekday[1]="Monday";
    weekday[2]="Tueesday";
    weekday[3]="Wednesday";
    weekday[4]="Thursday";
    weekday[5]="Friday";
    weekday[6]="Saturday";
        let currtime=new Date();
    let day=weekday[currtime.getDay()];

   return day;
};
const getCurrentTime=()=>{
    var months=[
        "Jan","Feb","Mar","Apr","May","June","July",
        "Aug","Sept","Oct","Nov","Dec"
    ];

    var now=new Date();
    var month=months[now.getMonth()];
    var date=now.getDate();

    return `${date} ${month}`;
}
const apikey="52217d5662986757bd694f78e7d5826d";
const getinfo=async(event)=>{
    event.preventDefault();
    let cityval=cityname.value;
    if(cityval==="")
    {
        city_name.innerText=`Please write the name before you search`;
        datahide.classList.add("data-hide");
    }
    else
    {
        try{
            let url=`http://api.openweathermap.org/data/2.5/weather?q=${cityval}&units=metric&appid=${apikey}`;
            const resp=await fetch(url);
            const data=await resp.json();
            console.log(data);
            const arrData=[data];//conversion to array
            city_name.innerText=`${arrData[0].name}, ${arrData[0].sys.country} `;
            temp.innerText=arrData[0].main.temp;
            tempmood=arrData[0].weather[0].main; 
            //condn to check sunny or cloudy
            if(tempmood==="clear")
            {
                temp_status.innerHTML="<i class='fas fa-sun' style='color:#eccc68;'></i>";
            }
            else if(tempmood==="clouds")
            {
                temp_status.innerHTML="<i class='fas fa-cloud' style='color:#f1f2f6;'></i>";
            }
            else if(tempmood==="rain")
            {
                temp_status.innerHTML="<i class='fas fa-rain' style='color:#a4b0be;'></i>";
            }
            else
            {
                temp_status.innerHTML="<i class='fas fa-sun' style='color:#eccc68;'></i>";
            }
            datahide.classList.remove("data-hide");
        }
        catch{
            city_name.innerText=`Please enter the city name properly`;
            datahide.classList.add("data-hide");
        }
    }
}
day.innerHTML=getcurrday();
today_date.innerHTML=getCurrentTime();
submitbtn.addEventListener("click",getinfo);