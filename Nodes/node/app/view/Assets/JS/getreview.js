function getReview() {
    // Get the review container
    const reviewContainer = document.getElementById('reviewContainer');

    // Create and append the review table
    const reviewTable = document.createElement('table');
    reviewTable.className = 'table';

    // Add table content (replace this with your actual review data)
    reviewTable.innerHTML = `
        <thead>
            <tr>
                <th>Review</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td>This is a sample review content.</td>
            </tr>
        </tbody>
    `;

    // Append the review table to the review container
    reviewContainer.appendChild(reviewTable);
}
