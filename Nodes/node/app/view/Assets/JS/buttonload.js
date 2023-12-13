let buttonId = 0; // Initial button id
let lastAdded;

function loadMore() {
    // Increment button id and update the button text

    // Create and append new grids based on the data
    const gridContainer = document.getElementById('grid-container');
    const newRow = document.createElement('div');
    newRow.className = 'row';

    // Use template literals to construct the correct URL
    $.get(`/allgames/${buttonId}`, function (data, status) {


        
        if(data.length == 3){
            buttonId++;
            document.getElementById('load-more-button').innerText = `Load More!`;
        }
        else if(data[data.length - 1].game_name == lastAdded){

            return;
        }


        data.forEach(function (game, i) { // Add 'i' as the second parameter
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
            newRow.appendChild(newGrid1);
            lastAdded = game.game_name;
        });
    
    
        // Append the new row to the grid container
        gridContainer.appendChild(newRow);
    });
    
}

function getReview(button){

    // button.getAttribute('offset');
    const parentGrid = button.parentNode;
    const childGrid = parentGrid.querySelector('.reviewContainer');
    var newRow;
    var offset = childGrid.childElementCount;
    button.setAttribute('offset', offset);
    console.log(offset);
    console.log(">"+button.getAttribute('offset'));
    console.log("PARENT: " + parentGrid);
    game =  parentGrid.getAttribute('gameID');
    //get
    
    $.get(`/getReview/${offset}/${game}`, function (data, status) {
        
        if(data.length == 0){
            return;
        }
        console.log(Object.values(data[0])[0]);

        const newRow = document.createElement('div');
        newRow.className = 'reviewRow';

        const newGrid1 = document.createElement('div');
        newGrid1.className = 'col-lg-4';
        newGrid1.innerHTML = `
            <h2 class="fw-normal"> ${Object.values(data[0])[0]}</h2>
        `;

        newRow.appendChild(newGrid1);
        childGrid.appendChild(newRow);
        console.log(childGrid);
    });
    //end get

}

