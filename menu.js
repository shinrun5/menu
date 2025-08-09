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

          // Case 1: Item has dishes array
          if (item.dishes && Array.isArray(item.dishes)) {
            // If sizes exist, show size prices per dish
            if (item.sizes && Array.isArray(item.sizes)) {
              item.dishes.forEach(dish => {
                const dishDiv = document.createElement("div");
                dishDiv.style.marginBottom = "1em";

                const dishTitle = document.createElement("strong");
                dishTitle.textContent = `${dish.num}: ${dish.name}`;
                dishDiv.appendChild(dishTitle);

                const priceList = document.createElement("ul");
                item.sizes.forEach(sizeObj => {
                  // Use dish.price if available, else size price
                  const price = dish.price !== undefined ? dish.price : sizeObj.price;
                  const li = document.createElement("li");
                  li.textContent = `${sizeObj.size}: $${price.toFixed(2)}`;
                  priceList.appendChild(li);
                });
                dishDiv.appendChild(priceList);

                menuDiv.appendChild(dishDiv);
              });
            }
            // No sizes, shared price per dish
            else if (item.price !== undefined) {
              item.dishes.forEach(dish => {
                const dishDiv = document.createElement("div");
                dishDiv.textContent = `${dish.num}: ${dish.name} - $${item.price.toFixed(2)}`;
                menuDiv.appendChild(dishDiv);
              });
            }
            // Prices per dish individually
            else {
              item.dishes.forEach(dish => {
                const dishDiv = document.createElement("div");
                if (dish.price !== undefined) {
                  dishDiv.textContent = `${dish.num}: ${dish.name} - $${dish.price.toFixed(2)}`;
                } else {
                  dishDiv.textContent = `${dish.num}: ${dish.name} - Price not available`;
                }
                menuDiv.appendChild(dishDiv);
              });
            }
          }
          // Case 2: Item has no dishes (like Sweet and Sour Chicken)
          else {
            // If sizes exist, list the item with sizes
            if (item.sizes && Array.isArray(item.sizes)) {
              const dishDiv = document.createElement("div");
              const dishTitle = document.createElement("strong");
              dishTitle.textContent = `${item.num}: ${item.name}`;
              dishDiv.appendChild(dishTitle);

              const priceList = document.createElement("ul");
              item.sizes.forEach(sizeObj => {
                const li = document.createElement("li");
                li.textContent = `${sizeObj.size}: $${sizeObj.price.toFixed(2)}`;
                priceList.appendChild(li);
              });
              dishDiv.appendChild(priceList);

              menuDiv.appendChild(dishDiv);
            }
            // Else if price exists directly on item
            else if (item.price !== undefined) {
              const div = document.createElement("div");
              div.textContent = `${item.num}: ${item.name} - $${item.price.toFixed(2)}`;
              menuDiv.appendChild(div);
            }
            // Otherwise just display name and num (no price info)
            else {
              const div = document.createElement("div");
              div.textContent = `${item.num}: ${item.name} - Price not available`;
              menuDiv.appendChild(div);
            }
          }
        });
      }
      else if (category === "veg") {
        const veg = data.filter(item => item.cat === "Veg");
        veg.forEach(item => {
          if (Array.isArray(item.dishes)) {
            item.dishes.forEach(dish => {
              const price = dish.price !== undefined ? dish.price : item.price;
              const div = document.createElement("div");
              div.textContent = `${dish.num}: ${dish.name} - $${price.toFixed(2)}`;
              menuDiv.appendChild(div);
            });
          }
        });
      }
    })
    .catch(error => {
      console.error("Error loading menu:", error);
    });
});
