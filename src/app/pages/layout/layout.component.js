  // Add event listener to the input field
  document.getElementById('searchInput').addEventListener('input', function() {
    // Get the search term entered by the user
    const searchTerm = this.value.toLowerCase();

    // Get the list of items to search through
    const items = document.querySelectorAll('.list-item');

    // Loop through each item and hide/show based on search term
    items.forEach(function(item) {
      const text = item.textContent.toLowerCase();
      if (text.includes(searchTerm)) {
        item.style.display = 'block'; // Show the item
      } else {
        item.style.display = 'none'; // Hide the item
      }
    });
  });
