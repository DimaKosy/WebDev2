let buttonId = 0; // Initial button id
let lastAdded;    //helps figure out how many have been loaded

//joint function to run to functions on pagestart
function start(){
    loadMore();
    CheckLogin()
}

//checking the status of the page
function CheckLogin(){
    var signout = document.getElementById("signOutButton");
    var login = document.getElementById("loginButton");

    //finds out if the user is logged in or not and sets button visabilty
    $.get('/state',function(data, status){
        if(data[0] ==  null || data[0] <= 0){
            document.getElementById("signOutButton").hidden = true;
        }
        else{
            document.getElementById("loginButton").hidden = true;
        }
    });

    
}

//main content loader for index
function loadMore() {
    // Increment button id and update the button text/ calls the new cotent aka game list

    // Create and append new grids based on the data
    const gridContainer = document.getElementById('grid-container');
    const newRow = document.createElement('div');
    newRow.className = 'row';

    // Use template literals to construct the correct URL
    $.get(`/allgames/${buttonId}`, function (data, status) {

        if(data.length == 3){
            buttonId++; //increments if correct the amount loaded fits the 3 wide spacing
        }
        else if(data[data.length - 1].game_name == lastAdded){ //exits if there are no additional titles to load
            return;
        }


        //Create our content to show up with an image, Title from the database & a button to fetch reviews
        data.forEach(function (game, i) {   //loops for each element returned by query
            console.log(game);
            const newGrid1 = document.createElement('div');
            newGrid1.className = 'col-lg-4';
            newGrid1.innerHTML = `
                <img class="bd-placeholder-img rounded-circle" width="140" height="140" src="https://picsum.photos/seed/${game.game_name}/140/140" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                <title>Game Image</title>
                <rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect>
                </img>
                <h2 class="fw-normal"> ${game.game_name}</h2>
                <div class="reviewParent" gameID=${game.game_id}>
                    <div class="reviewContainer"></div>
                    <button  id="get-review" offset=0  onclick="getReview(this)" class="btn btn-secondary">View Review</button>
                </div>
            `;

            //appending Games
            newRow.appendChild(newGrid1);
            lastAdded = game.game_name;
        });
    
    
        // Append the new row to the grid container
        gridContainer.appendChild(newRow);
    });
    
}

function getReview(button){

    // button.getAttribute('offset');
    const parentGrid = button.parentNode;   //gets parent node of button
    const childGrid = parentGrid.querySelector('.reviewContainer'); //gets review container
    var offset = childGrid.childElementCount;//gets offset so we know what review to load next

    button.setAttribute('offset', offset);//sets an attribute to the button

    console.log(offset);
    console.log(">"+button.getAttribute('offset'));
    console.log("PARENT: " + parentGrid);

    
    game =  parentGrid.getAttribute('gameID');  //gets game id attribute from parent container so we know what game we're working with
    
    //get
    //check our database for any reviews from any of our users then fetcs them and displays them
    $.get(`/getReview/${offset}/${game}`, function (data, status) {
        
        if(data.length == 0){//exits if no data
            return;
        }
        console.log(Object.values(data[0])[0]);

        //create new review row
        const newRow = document.createElement('div');
        newRow.className = 'reviewRow';

        const newGrid1 = document.createElement('div');
        newGrid1.className = 'col-lg-4 reviewPanel';
        newGrid1.innerHTML = `
            <p class="fw-normal lead"> ${Object.values(data[0])[0]}</p>
        `;

        //appends
        newRow.appendChild(newGrid1);
        childGrid.appendChild(newRow);
        console.log(childGrid);
    });
    //end get

}

