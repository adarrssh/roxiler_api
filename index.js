const app = require('express')();
const PORT = 3000;
const axios = require('axios');
var data, data_all, id_data;


axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(response => {
        console.log(response.data)
        // storing response.data in data variable for /users/:id
        data = response.data
        // storing response .data in data_all variable for /todos route
        data_all = response.data;
    })
    .catch(error => {
        console.log(error);
    });


app.get('/todos', (req, res) => {
    for (ele of data_all) {
        //deleting the userId element
        delete ele.userId
    }
    res.status(200).send(data_all)
})

app.get('/users/:id', (req, res) => {
    // getting id from url 
    var id = req.params.id;
    // calling api 
    axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => {
            id_data = response.data
            console.log(id_data);
            // filtering data
            var filtered_data=data.filter(function(item){
                return item.userId==id});
            id_data.appendedItems = filtered_data
        })
        .catch(error=>{
            console.log(error);
        })
    res.send(id_data)

})


app.listen(PORT, () => {
    console.log("api running");
})
