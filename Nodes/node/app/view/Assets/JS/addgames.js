

$(document).ready(function () {
    // Function to fetch and display the game table

    function fetchGameTable() {
        // Perform an AJAX request to get the game data from your server
        $.get("/games", function (data, status) {
            // Update the table content with the new data
            var table = $("<table></table>");
            table.addClass("table table-striped table-responsive");

            // Create a table header with the titles
            var thead = $("<thead></thead>");
            var headerRow = $("<tr></tr>");
            var headers = ["Game Name", "Review", "Actions"];

            headers.forEach(function (header) {
                var th = $("<th></th>");
                th.text(header);
                headerRow.append(th);
            });

            thead.append(headerRow);
            table.append(thead);

            // Create a tbody to hold the table data
            var tbody = $("<tbody></tbody>");

            // Loop through the data and create a row for each item
            data.forEach(function (game) {
                var row = $("<tr></tr>");

                // Create cells for each data field
                var nameCell = $("<td></td>");
                nameCell.text(game.game_name);
                var reviewCell = $("<td></td>");
                reviewCell.text(game.game_review);
                var actionsCell = $("<td></td>");
                var updateButton = $("<button class='btn btn-primary editGame'>Update</button>");
                updateButton.attr("id", "updateButton_" + game.gameid); // Set a unique ID for each button
                updateButton.data("gameid", game.gameid);
                var deleteButton = $("<button class='btn btn-danger deleteGame'>Delete</button>");
                deleteButton.attr("id", "deleteButton_" + game.gameid); // Set a unique ID for each button
                deleteButton.data("gameid", game.gameid);

                actionsCell.append(updateButton, deleteButton);

                row.append(nameCell, reviewCell, actionsCell);
                tbody.append(row);
            });

            // Append the tbody to the table
            table.append(tbody);

            // Append the table to the container
            $("#gameTable").empty().append(table);
        });
    }

    // Initial fetch of the game table on page load
    fetchGameTable();

    // Add Game Button Click Event
    $("#addGame").click(function () {
        var gameName = $("#gameNameInput").val();
        var review = $("#reviewInput").val();

        console.log("Adding");

        // Send data to the server
        $.post("/game", {userID: 0, userName : 0,  gameName: gameName, review: review }, function (data, status) {
            // Refresh the game table after adding a new game
            fetchGameTable();
        });
    });

    $(document).on("click", ".editGame", function () {
        

        // Use the existing values or provide an interface for the user to edit
        var updatedGameName = $(this).closest("tr").find("td:first").text()
        var updatedReview = prompt("Enter the updated review:", $(this).closest("tr").find("td:eq(1)").text());

        // Send the updated data to the server
        // $.ajax({
        //     url: `/games/${0}`,
        //     method: 'PUT',
        //     data: {userID: 1, game_name: updatedGameName, game_review: updatedReview },
        //     success: function (data, status) {
        //         // Refresh the game table after editing a game
        //         fetchGameTable();
        //     }
        // });
    });

    // Delete Button Click Event
    $(document).on("click", ".deleteGame", function () {
        GameName = $(this).closest("tr").find("td:first").text()
        
        console.log("NAME: " + GameName);

        // Send request to delete game
        // $.ajax({
        //     url: `/games/${0}`,
        //     method: 'DELETE',
        //     data: {userID: 1, game_name: GameName},
        //     success: function (data, status) {
        //         // Refresh the game table after deleting a game
        //         fetchGameTable();
        //     }
        // });
    });
});
