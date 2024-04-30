const gallery = document.querySelector('.image-gallery');


            function getRandomInt(min, max) {
                min = Math.ceil(min);
                max = Math.floor(max);
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }

            let randomNumberIndexLast = 0;
            const likedRecipes = [];

            function showHomePage() {
                console.log('Home button clicked');
            
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    mainContent.style.display = 'flex';
                }
    
                const likedContainer = document.querySelector('.liked-recipes-container');
                if (likedContainer) {
                    likedContainer.innerHTML = '';
                    likedContainer.style.display = 'none';
                }
            
                const imageGallery = document.querySelector('.image-gallery img');
                if (imageGallery) {
                    imageGallery.style.left = '0px';
                }
            }

            function showNewRecipe() {
                gallery.querySelector('img').style.left = 0;

                if (recipes.length === 0) {
                    console.log("No more recipse available");
                    return;
                }

                let randomNumber = getRandomInt(0, recipes.length - 1);
                
                randomNumberIndexLast = randomNumber;

                const chosenRecipe = recipes[randomNumber];

                gallery.querySelector('img').src = chosenRecipe.image;
                gallery.querySelector('.title').textContent = chosenRecipe.title;
                gallery.querySelector('.descriptionShort').textContent = chosenRecipe.description;
            }


            let currentPosition = 0;
            const slideAmount = 50;
        
            function slideRight() {
                currentPosition += slideAmount;
                gallery.querySelector('img').style.left = currentPosition + 'px';
                    
                if (currentPosition < 2000) {
                    requestAnimationFrame(slideRight);
                }
            }

            function slideLeft() {
                currentPosition -= slideAmount;
                gallery.querySelector('img').style.left = currentPosition + 'px';
                    
                if (currentPosition > -2000) {
                    requestAnimationFrame(slideLeft);
                }
            }



            function dislikeButtonClicked() {

                if (recipes.length === 0) {
                    console.log("No more recipse available");
                    return;
                }

                currentPosition = 0;
                recipes.splice(randomNumberIndexLast, 1);
                slideLeft();
                setTimeout(showNewRecipe, 1000);
            }

            function likeButtonClicked() {
                if (recipes.length === 0) {
                    console.log("No more recipse available");
                    return;
                }

                currentPosition = 0;
                likedRecipes.push(recipes[randomNumberIndexLast]);
                recipes.splice(randomNumberIndexLast, 1);
                slideRight();
                setTimeout(showNewRecipe,1000);
            }
            function showLikedRecipes() {
                
                const likedContainer = document.querySelector('.liked-recipes-container');
                likedContainer.innerHTML = '';
            
                likedRecipes.forEach(recipe => {
                    if (recipe.image === null) {
                        return;
                    }
                    const card = document.createElement('div');
                    card.className = 'recipe-card';

                    card.innerHTML = `
                        <img src="${recipe.image}" alt="Recipe Image">
                        <h2>${recipe.title}</h2>
                        <p>${recipe.description}</p>
                        <button class="detail-button" onclick="toggleDetails(this)">Details</button>
                        <div class="details" style="display: none;">
                            <p><strong>Instructions:</strong> ${recipe.instructions}</p>
                            <p><strong>Ingredients:</strong> ${recipe.ingredients.join(', ')}</p>
                        </div>
                    `;
                    likedContainer.appendChild(card);
                });
            
                
                likedContainer.style.display = 'block';
                document.querySelector('.main-content').style.display = 'none'; 
            }
              
                function toggleDetails(button) {
                        var detailsDiv = button.nextElementSibling;
                        if (detailsDiv.style.display === 'block') {
                            detailsDiv.style.display = 'none';
                        } else {
                            detailsDiv.style.display = 'block';
                        }
                    }
            
            showNewRecipe();
            gallery.querySelector('.arrow.left').addEventListener('click', dislikeButtonClicked);
            gallery.querySelector('.arrow.right').addEventListener('click', likeButtonClicked);

            document.addEventListener('DOMContentLoaded', function() {
                document.getElementById('homeButton').addEventListener('click', showHomePage);
                document.getElementById('likeButton').addEventListener('click', showLikedRecipes);
            });
            
