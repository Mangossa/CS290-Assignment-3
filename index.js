document.addEventListener('DOMContentLoaded', function () {
  // Elements for the modal and buttons
  const sellButton = document.getElementById('sell-something-button');
  const modal = document.getElementById('sell-something-modal');
  const modalBackdrop = document.getElementById('modal-backdrop');
  const closeButton = document.getElementById('modal-close');
  const cancelButton = document.getElementById('modal-cancel');
  const acceptButton = document.getElementById('modal-accept');
  const postContainer = document.getElementById('posts');
  const filterButton = document.getElementById('filter-update-button');

  // Modal input fields
  const itemDescriptionInput = document.getElementById('post-text-input');
  const itemPhotoInput = document.getElementById('post-photo-input');
  const itemPriceInput = document.getElementById('post-price-input');
  const itemCityInput = document.getElementById('post-city-input');
  const itemConditionInput = document.querySelectorAll(
    'input[name="post-condition"]'
  );

  // Show the modal
  function showModal() {
    modal.classList.remove('hidden');
    modalBackdrop.classList.remove('hidden');
  }

  // Hide the modal and reset its input fields
  function closeModal() {
    modal.classList.add('hidden');
    modalBackdrop.classList.add('hidden');
    clearModalInputs();
  }

  // Clear modal inputs
  function clearModalInputs() {
    itemDescriptionInput.value = '';
    itemPhotoInput.value = '';
    itemPriceInput.value = '';
    itemCityInput.value = '';
    itemConditionInput[0].checked = true;
  }

  // Validate and create a new post
  function createPost() {
    const itemDescription = itemDescriptionInput.value.trim();
    const itemPhotoURL = itemPhotoInput.value.trim();
    const itemPrice = itemPriceInput.value.trim();
    const itemCity = itemCityInput.value.trim();
    let itemCondition = '';

    // Get selected condition
    itemConditionInput.forEach((input) => {
      if (input.checked) {
        itemCondition = input.value;
      }
    });

    // Alert if any input is empty
    if (!itemDescription || !itemPhotoURL || !itemPrice || !itemCity || !itemCondition) {
      alert('Please fill out all fields to create a post.');
      return;
    }

    // Create the new post element
    const postElem = document.createElement('div');
    postElem.classList.add('post');
    postElem.dataset.price = itemPrice;
    postElem.dataset.city = itemCity.toLowerCase();
    postElem.dataset.condition = itemCondition;

    const postContents = document.createElement('div');
    postContents.classList.add('post-contents');
    postElem.appendChild(postContents);

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('post-image-container');
    const postImage = document.createElement('img');
    postImage.src = itemPhotoURL;
    postImage.alt = itemDescription;
    imageContainer.appendChild(postImage);
    postContents.appendChild(imageContainer);

    const infoContainer = document.createElement('div');
    infoContainer.classList.add('post-info-container');
    postContents.appendChild(infoContainer);

    const postTitle = document.createElement('a');
    postTitle.classList.add('post-title');
    postTitle.href = '#';
    postTitle.textContent = itemDescription;
    infoContainer.appendChild(postTitle);

    const postPrice = document.createElement('span');
    postPrice.classList.add('post-price');
    postPrice.textContent = `$${itemPrice}`;
    infoContainer.appendChild(postPrice);

    const postCity = document.createElement('span');
    postCity.classList.add('post-city');
    postCity.textContent = `(${itemCity})`;
    infoContainer.appendChild(postCity);

    postContainer.appendChild(postElem);
    closeModal();
  }

  // Filter posts based on user input
  function filterPosts() {
    const textFilter = document.getElementById('filter-text').value.toLowerCase().trim();
    const minPriceFilter = document.getElementById('filter-min-price').value.trim();
    const maxPriceFilter = document.getElementById('filter-max-price').value.trim();
    const cityFilter = document.getElementById('filter-city').value.toLowerCase().trim();

    const conditionFilters = Array.from(document.querySelectorAll('input[name="filter-condition"]:checked')).map(
      (checkbox) => checkbox.value
    );

    // Select all posts
    const allPosts = document.querySelectorAll('.post');
    allPosts.forEach((post) => {
      const postTitle = post.querySelector('.post-title').textContent.toLowerCase();
      const postPrice = parseFloat(post.dataset.price);
      const postCity = post.dataset.city.toLowerCase();
      const postCondition = post.dataset.condition;

      // Filter conditions
      const matchesText = !textFilter || postTitle.includes(textFilter);
      const matchesMinPrice = !minPriceFilter || postPrice >= parseFloat(minPriceFilter);
      const matchesMaxPrice = !maxPriceFilter || postPrice <= parseFloat(maxPriceFilter);
      const matchesCity = !cityFilter || postCity === cityFilter;
      const matchesCondition = conditionFilters.length === 0 || conditionFilters.includes(postCondition);

      // Show or remove post based on filter
      if (matchesText && matchesMinPrice && matchesMaxPrice && matchesCity && matchesCondition) {
        postContainer.appendChild(post); // Re-add post to container if it matches
      } else {
        postContainer.removeChild(post); // Remove post if it doesn't match
      }
    });
  }

  // Event Listeners
  sellButton.addEventListener('click', showModal);
  closeButton.addEventListener('click', closeModal);
  cancelButton.addEventListener('click', closeModal);
  acceptButton.addEventListener('click', createPost);
  filterButton.addEventListener('click', filterPosts);
});
