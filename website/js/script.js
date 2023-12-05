// Majed Alshehri 2142466
document.getElementById("insert").addEventListener("submit", function(event){
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    fetch("/insert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: name, email: email }),
      })
    .then(function(response){
        if(response.ok){
            alert("Data inserted successfully!");
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            getData();
        } else {
            alert("Failed to insert data!");
        }
    })
    .catch(function(error){
        console.error(error);
        alert("An error occurred!");
    });
});

function getData() {
    const dataList = document.getElementById("dataList");
    while(dataList.firstChild){
        dataList.removeChild(dataList.firstChild);
    }
    fetch("/view")
    .then(function (response) {
        return response.json();
      })
    .then(function(data){
        data.forEach(function(item){
            let listItem = document.createElement("li");
            listItem.textContent = item.name + " - " + item.email;
            dataList.appendChild(listItem);
        });
    })
    .catch(function(error){
        console.error("Error: ", error);
        alert("An error occurred!");
    });
}