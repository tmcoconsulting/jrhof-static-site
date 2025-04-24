// Fetch inductee data from JSON
fetch('inductees.json')
  .then(response => response.json())
  .then(inductees => {
    const galleryGrid = document.getElementById('gallery-grid');
    const classTitle = document.getElementById('class-title');

    // Set the title for the inductee class (you can customize this for different years)
    classTitle.textContent = "Class of 2025";

    // Group inductees by year
    const groupedByYear = {};
    inductees.forEach(inductee => {
      const year = inductee.year || inductee["Year"] || inductee["year"];
      if (!groupedByYear[year]) {
        groupedByYear[year] = [];
      }
      groupedByYear[year].push(inductee);
    });

    // Sort years in descending order
    const sortedYears = Object.keys(groupedByYear).sort((a, b) => b - a);

    // Clear existing content
    galleryGrid.innerHTML = '';

    // Create sections for each year
    sortedYears.forEach(year => {
      const yearSection = document.createElement('section');
      yearSection.classList.add('year-section');

      const yearHeader = document.createElement('h3');
      yearHeader.textContent = `Class of ${year}`;
      yearSection.appendChild(yearHeader);

      const yearGrid = document.createElement('div');
      yearGrid.classList.add('gallery-grid');

      groupedByYear[year].forEach(inductee => {
        const card = document.createElement('article');
        card.classList.add('gallery-card');

        const anchor = document.createElement('a');
        anchor.href = inductee.bio || inductee["Bio URL"] || inductee["bio"];

        const img = document.createElement('img');
        const imageFile = inductee.image || inductee["Image"];
        if (!imageFile || imageFile.trim() === "") {
          img.src = 'images/default_inductee.png';
        } else {
          img.src = `images/${imageFile}`;
          img.onerror = () => {
            img.onerror = null;
            img.src = 'images/default_inductee.png';
          };
        }
        img.alt = `${inductee.name || inductee["Name"]}, Hall of Fame Inductee`;
        img.loading = 'lazy';

        const h3 = document.createElement('h3');
        h3.textContent = inductee.name || inductee["Name"];

        anchor.appendChild(img);
        anchor.appendChild(h3);
        card.appendChild(anchor);
        yearGrid.appendChild(card);
      });

      yearSection.appendChild(yearGrid);
      galleryGrid.appendChild(yearSection);
    });
  })
  .catch(error => console.error('Error loading inductees data:', error));