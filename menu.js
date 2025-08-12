document.addEventListener("DOMContentLoaded", () => {
  const category = document.body.dataset.category;
  fetch("food.json")
    .then(response => response.json())
    .then(data => {
      const menuDiv = document.getElementById("menu");
      menuDiv.innerHTML = ""; // Clear menu

      if (category === "App") {
        const apps = data.filter(item => item.cat.toLowerCase() === "app");
        apps.forEach(item => {
          if (item.sizes && Array.isArray(item.sizes)) {
            item.sizes.forEach(sizeObj => {
              const div = document.createElement("div");
              div.textContent = `${item.num}: ${item.name} (${sizeObj.size}) - $${sizeObj.price.toFixed(2)}`;
              menuDiv.appendChild(div);
            });
          } else {
            const size = item.size ? item.size : "large";
            const div = document.createElement("div");
            div.textContent = `${item.num}: ${item.name} (${size}) - $${item.price.toFixed(2)}`;
            menuDiv.appendChild(div);
          }
        });
      }
      else if (category === "R&N") {
        const rice = data.filter(item => item.cat === "R&N");
        rice.forEach(item => {
          if (item.type && Array.isArray(item.type)) {
            item.type.forEach(ty => {
              if (ty.sizes && Array.isArray(ty.sizes)) {
                ty.sizes.forEach(sizeObj => {
                  const div = document.createElement("div");
                  div.textContent = `${ty.num}: ${ty.name} (${sizeObj.size}) - $${sizeObj.price.toFixed(2)}`;
                  menuDiv.appendChild(div);
                });
              } else {
                const size = ty.size ? ty.size : "large";
                const div = document.createElement("div");
                div.textContent = `${ty.num}: ${ty.name} (${size}) - $${ty.price.toFixed(2)}`;
                menuDiv.appendChild(div);
              }
            });
          }
        });
      }
      else if (category === "lunch") {
        const lunch = data.filter(item => item.cat === "Lunch");
        lunch.forEach(item => {
          if (item.dishes && Array.isArray(item.dishes)) {
            item.dishes.forEach(dish => {
              const div = document.createElement("div");
              div.textContent = `${dish.num}: ${dish.name} - $${item.price.toFixed(2)}`;
              menuDiv.appendChild(div);
            });
          }
        });
      }
      else if (category === "combo") {
        const combo = data.filter(item => item.cat === "Combo")
        combo.forEach(item => {
          if (Array.isArray(item.dishes)) {
            item.dishes.forEach(dish => {
              const div = document.createElement("div");
              const price = dish.price !== undefined ? dish.price : item.price;
              div.textContent = `${dish.num}: ${dish.name} - $${price.toFixed(2)}`;
              menuDiv.appendChild(div);
            })
          }
        })
      }
      else if (category === "Specials") {
        const specials = data.filter(item => item.cat.toLowerCase() === "specials");
        specials.forEach(item => {
          if (item.dishes && Array.isArray(item.dishes)) {
            item.dishes.forEach(dish => {
              const div = document.createElement("div");
              const description = dish.description ? ` (${dish.description})` : "";
              div.textContent = `${dish.num}: ${dish.name}${description} - $${item.price.toFixed(2)}`;
              menuDiv.appendChild(div);
            });
          }
        });
      }
      else if (category === "entree") {
        const entrees = data.filter(item => item.cat.toLowerCase() === "entree");
        entrees.forEach(item => {
          // Subcategory heading
          const heading = document.createElement("h2");
          heading.textContent = item.subcat;
          heading.classList.add("subcat");
          menuDiv.appendChild(heading);

          if (item.dishes && Array.isArray(item.dishes)) {
            item.dishes.forEach(dish => {
              const dishDiv = document.createElement("div");
              dishDiv.classList.add("menu-item"); // CSS grid will handle alignment

              // Dish name
              const dishName = document.createElement("span");
              dishName.classList.add("item-name");
              dishName.textContent = `${dish.num}: ${dish.name}`;
              dishDiv.appendChild(dishName);

              // Small price
                const smallPrice = document.createElement("span");
                smallPrice.classList.add("price", "small");
                const small = dish.sizes?.find(s => s.size === "Small")?.price
                  ?? item.sizes?.find(s => s.size === "Small")?.price
                  ?? "";
                smallPrice.textContent = small ? `$${small.toFixed(2)}` : "";
                dishDiv.appendChild(smallPrice);

                // Large price
                const largePrice = document.createElement("span");
                largePrice.classList.add("price", "large");
                const large = dish.sizes?.find(s => s.size === "Large")?.price
                  ?? item.sizes?.find(s => s.size === "Large")?.price
                  ?? dish.price
                  ?? item.price
                  ?? "";

              largePrice.textContent = large ? `$${large.toFixed(2)}` : "";
              dishDiv.appendChild(largePrice);

              menuDiv.appendChild(dishDiv);

            });
          }
        });
      }
    })
    .catch(error => {
      console.error("Error loading menu:", error);
    });
});
