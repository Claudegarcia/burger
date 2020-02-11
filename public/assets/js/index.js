$(document).ready(function () {

    //event listeners for buttons
    $(document).on("click", "#submit", createBurger);
    $(document).on("click", "button.eat", eatBurger);

    //html element references
    let newBurgerName = document.getElementById("userBurger");
    const toEat = document.getElementById("toEat");
    const eaten = document.getElementById("eaten");

    //auto run get burgers
    getBurgers();

    //array to store burgers
    let burgerArray = [];

    //get burger function, clears burger array, populates it with new burgers, runs renderBurger function
    function getBurgers() {
        axios.get("/api/burgers").then((data) => {

            burgerArray = [];

            burgerArray = data.data;

            renderBurgers();
        })
    };

    //render burger function, loops through burger array and adds html to screen
    function renderBurgers() {

        toEat.innerHTML = "";
        eaten.innerHTML = "";

        //loops through burgerArray
        burgerArray.forEach(burger => {

            console.log(burger);
            //if burger is not devoured
            if (burger.devoured === false) {

                const burgerHTML = $(
                    [
                        `<div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h5 class="display-4">${burger.burger_name}</h5>
                    <button id = "${burger.id}" class="eat btn btn-danger">Devour Burger!</button>
                </div>
            </div>`
                    ]);

                burgerHTML.find("button.eat").data("id", burger.id);

                // adds burger to un eaten container
                toEat.innerHTML += burgerHTML[0]
            }

            //if burger is devoured
            if (burger.devoured === true) {
                const burgerHTML =
                    `<div class="jumbotron jumbotron-fluid">
                <div class="container">
                    <h5 class="display-4">${burger.burger_name}</h5>
                </div>
            </div>`

                // adds burger to eaten container
                eaten.innerHTML += burgerHTML
            }

        });
    };


    //create burger function - puts burger into db and runs get burger function
    function createBurger() {
        let burgerName = JSON.stringify(newBurgerName.value)

        axios.post("/api/burgers", { burger_name: burgerName, devoured: false })
            .then(() => {
                getBurgers();
            });
    }

    //eat burger function - gets id of element, updates devoured status, runs render function
    function eatBurger(event) {
        event.stopPropagation();

        //gets id from button data
        const id = this.id

        //axios put request updates devoured status
        axios.put("api/burgers/" + id)
            .then(() => {
                getBurgers();
            });
    };
});