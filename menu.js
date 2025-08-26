document.addEventListener("DOMContentLoaded", () => {
  const category = document.body.dataset.category;
  fetch("food.json")
    .then(response => response.json())
    .then(data => {
      const menuDiv = document.getElementById("menu");
      menuDiv.innerHTML = ""; // Clear menu

      if (category === "App") {
        const apps = data.filter(item => item.cat === "App");
        apps.forEach(item => {
          const heading = document.createElement("h2");
          heading.textContent = item.subcat;
          heading.classList.add("subcat");
          menuDiv.appendChild(heading);

          item.dishes.forEach(dish => {
            const dishDiv = document.createElement("div");
            dishDiv.classList.add("menu-item");

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
        });
      }
      else if (category === "R&N") {
        const rice = data.filter(item => item.cat === "R&N");
        rice.forEach(item => {
          const heading = document.createElement("h2");
          heading.textContent = item.subcat;
          heading.classList.add("subcat");
          menuDiv.appendChild(heading);

          item.dishes.forEach(dish => {
            const dishDiv = document.createElement("div");
            dishDiv.classList.add("menu-item");

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

            if (dish.spice !== undefined) {
              dishDiv.classList.add("spice");
            }

            largePrice.textContent = large ? `$${large.toFixed(2)}` : "";
            dishDiv.appendChild(largePrice);

            menuDiv.appendChild(dishDiv);
          });
        });
      }
      else if (category === "lunch") {
        const lunch = data.filter(item => item.cat === "Special");
        lunch.forEach(item => {
          const heading = document.createElement("h2");
          heading.textContent = item.subcat;
          heading.classList.add("subcat");
          menuDiv.appendChild(heading);
          const desc = document.createElement("p");
          desc.textContent = item.description;
          desc.classList.add("Description");
          menuDiv.appendChild(desc);


          item.dishes.forEach(dish => {
            const dishDiv = document.createElement("div");
            dishDiv.classList.add("menu-item");

            // Dish name
            const dishName = document.createElement("span");
            dishName.classList.add("item-name");
            dishName.textContent = `${dish.num}: ${dish.name}`;
            dishDiv.appendChild(dishName);

            const space = document.createElement("span");
            space.classList.add("price");
            dishDiv.appendChild(space);

            const Price = document.createElement("span");
            Price.classList.add("price");
            const price = dish.price
              ?? item.price
              ?? "";

            if (dish.spice !== undefined) {
              dishDiv.classList.add("spice");
            }

            Price.textContent = price ? `$${price.toFixed(2)}` : "";
            dishDiv.appendChild(Price);

            menuDiv.appendChild(dishDiv);
          });
        });
      }
      else if (category === "combo") {
        const combo = data.filter(item => item.cat === "Combo")
        combo.forEach(item => {
          const heading = document.createElement("h2");
          heading.textContent = item.cat;
          heading.classList.add("subcat");
          menuDiv.appendChild(heading);
          const desc = document.createElement("p");
          desc.textContent = item.description;
          desc.classList.add("Description");
          menuDiv.appendChild(desc);

          item.dishes.forEach(dish => {
            const dishDiv = document.createElement("div");
            dishDiv.classList.add("menu-item");

            // Dish name
            const dishName = document.createElement("span");
            dishName.classList.add("item-name");
            dishName.textContent = `${dish.num}: ${dish.name}`;
            dishDiv.appendChild(dishName);

            const space = document.createElement("span");
            space.classList.add("price");
            dishDiv.appendChild(space);

            const Price = document.createElement("span");
            Price.classList.add("price");
            const price = dish.Price
              ?? item.price
              ?? "";

            if (dish.spice !== undefined) {
              dishDiv.classList.add("spice");
            }

            Price.textContent = price ? `$${price.toFixed(2)}` : "";
            dishDiv.appendChild(Price);

            menuDiv.appendChild(dishDiv);
          });
        });
      }
      else if (category === "Specials") {
        const specials = data.filter(item => item.cat === "Chef's Specials");
        specials.forEach(item => {
          const heading = document.createElement("h2");
          heading.textContent = item.cat;
          heading.classList.add("subcat");
          menuDiv.appendChild(heading);

          item.dishes.forEach(dish => {
            const dishDiv = document.createElement("div");
            dishDiv.classList.add("menu-item");

            // Dish name
            const dishName = document.createElement("span");
            dishName.classList.add("item-name");
            dishName.textContent = `${dish.num}: ${dish.name}`;
            dishDiv.appendChild(dishName);

            const space = document.createElement("span");
            space.classList.add("price");
            dishDiv.appendChild(space);

            const Price = document.createElement("span");
            Price.classList.add("price");
            const price = item.price
              ?? "";

            Price.textContent = price ? `$${price.toFixed(2)}` : "";
            dishDiv.appendChild(Price);

            const descrip = document.createElement("span");
            descrip.classList.add("description")
            descrip.textContent = dish.description;

            if (dish.spice !== undefined) {
              dishDiv.classList.add("spice");
            }

            dishDiv.appendChild(descrip);

            menuDiv.appendChild(dishDiv);
          });
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

              if (dish.spice !== undefined) {
                dishDiv.classList.add("spice");
              }

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
