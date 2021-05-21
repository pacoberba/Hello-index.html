let distance_entries=[];
let time_entries=[];
let mood_entries=[];

let distance_total=distance_entries;
let time_total=time_entries;
let mood_total=mood_entries;

const distanceWrapper = document.querySelector("#entries");

function addNewEntry(newentrydistance){
    distanceWrapper.removeChild(distanceWrapper.firstElementChild);
    const listItem = document.createElement("li");
    const listValue = document.createTextNode(newentrydistance);
    listItem.appendChild(listValue);

    distanceWrapper.appendChild(listItem);

    if(distance_total.length>7)
    {
        distance_total.shift();
    }
    return;
}

function reducer(totalD, currentD){
    return totalD + currentD;
}

function congratulations(){
    document.getElementById("completed").style.display="block";
}

function calculations(){
    const totalDistance = distance_total.reduce(reducer).toFixed(1);
    // if (totalDistance = Number.isInteger(totalDistance))
    //     {
    //         totalDistance=distance_total.reduce(reducer);
    //         return;
    //     }
    // totalDistance = distance_total.reduce(reducer).toFixed(2);
    document.getElementById("totalDistance").innerText = totalDistance;
    document.getElementById("weekProgress").innerText = totalDistance;
    
    const averageDistance = (totalDistance/distance_total.length).toFixed(1);
    document.getElementById("averageDistance").innerText = averageDistance;

    maxDistance = Math.max.apply(Math,distance_total).toFixed(1);
    document.getElementById("highestDistance").innerText = maxDistance;

    const completePercent = (totalDistance / 25)*100;
    if(completePercent>100) 
        {   
            document.getElementById("percentage").innerText = "100%";
            congratulations();
            return;
        }
    document.getElementById("percentage").innerText = completePercent.toFixed(0) + "%";
}
    
function goalTracker(){
    const totalDistance = distance_total.reduce(reducer);
    const completePercent = (totalDistance / 25)*100;
    // NOTE: CHANGE THIS INTO A VARIABLE LATER ON
    const progressCircle = document.querySelector("#circle");
    if(completePercent>100) completePercent==100;
    if(comepletePercent=0){
        progressCircle.style.background= "#152A3D";
    }
    progressCircle.style.background = `conic-gradient(lightgreen ${completePercent}%, #152A3D ${completePercent}% 100%)`;
    console.log(completePercent);
}

function update(event){
    event.preventDefault();
    const entrydistance = Number(document.querySelector("#milesinput").value);
    const entrytime = Number(document.querySelector("#timeinput").value);
    const entrymood = document.querySelector("#moodinput").value;
    if(!entrydistance) 
        {
            alert("You have not filled up the form. Please complete the information before clicking Log Run.");
            return;
        }
        else if(!entrytime)
            {
                alert("You have not filled up the form. Please complete the information before clicking Log Run.");
                return;
            }
        else if(entrymood=="Select One")
            {
                alert("You have not filled up the form. Please complete the information before clicking Log Run.");
                return;
            }
        else{
            document.querySelector("form").reset();
            distance_entries.push(entrydistance);
            time_entries.push(entrytime);
            mood_entries.push(entrymood);
            addNewEntry(entrydistance);
            calculations();
            goalTracker();
            }
}

const form = document.querySelector("form").addEventListener("submit", update);

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function restart(){
    var confirmation = confirm("You are about to restart your log. Are you sure?");

    if(confirmation==true){
        location.reload();
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        return;
    }
    return;
}
