let buttonId = 0; // Initial button id

function loadMore() {
    // Increment button id and update the button text
    buttonId++;
    document.getElementById('load-more-button').innerText = `Load More~! ♡ (${buttonId})`;

    // Create and append three new grids
    const gridContainer = document.getElementById('grid-container');
    const newRow = document.createElement('div');
    newRow.className = 'row';

    for (let i = 1; i <= 3; i++) {
        const newGrid = document.createElement('div');
        newGrid.className = 'col-lg-4';
        newGrid.innerHTML = `
                    <img class="bd-placeholder-img rounded-circle" width="140" height="140" src="Assets/Images/New_Image_${buttonId * 3 + i}.avif" role="img" aria-label="Placeholder" preserveAspectRatio="xMidYMid slice" focusable="false">
                    <title>New Placeholder</title>
                    <rect width="100%" height="100%" fill="var(--bs-secondary-color)"></rect>
                    </img>
                    <h2 class="fw-normal">New Title ${buttonId * 3 + i}</h2>
                    <p>New Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, omnis, soluta expedita maxime laboriosam cumque voluptatem minus porro eos labore itaque possimus a facere aut praesentium quod necessitatibus! Repellendus, alias.</p>
                    <p><a class="btn btn-secondary" href="#">View details »</a></p>
                `;
        newRow.appendChild(newGrid);
    }
    gridContainer.appendChild(newRow);
}
