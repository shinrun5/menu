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
            })
          }
        })
      }
      else if (category === "lunch")
      {
        const lunch = data.filter(item => item.cat === "Lunch")
        lunch.forEach(item => {
          if (item.dishes && Array.isArray(item.dishes))
          {
            item.dishes.forEach(dish => {
              const div = document.createElement("div")
              div.textContent = `${dish.num}: ${dish.name} - $${item.price.toFixed(2)}`;
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
    })
    .catch(error => {
      console.error("Error loading menu:", error);
    });
});

