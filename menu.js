let chef;

fetch('food.json')
.then(response => response.json())
.then(data =>{
    //console.log(data);
    chef = data;
    console.log(chef.num);
})
.catch(error => console.log(error));

console.log(chef.num);