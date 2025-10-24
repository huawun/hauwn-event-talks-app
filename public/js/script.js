
document.addEventListener('DOMContentLoaded', () => {
  const scheduleContainer = document.getElementById('schedule');
  const categoryFiltersContainer = document.getElementById('category-filters');
  let talks = [];

  // Fetch talk data from the API
  fetch('/api/talks')
    .then(response => response.json())
    .then(data => {
      talks = data;
      renderSchedule(talks);
      generateCategoryFilters(talks);
    })
    .catch(error => console.error('Error fetching talks:', error));

  // Generate category filter buttons
  function generateCategoryFilters(talks) {
    const categories = new Set();
    talks.forEach(talk => {
      talk.category.forEach(cat => categories.add(cat));
    });

    categories.forEach(category => {
      const button = document.createElement('button');
      button.className = 'btn btn-outline-primary m-1';
      button.setAttribute('data-category', category);
      button.textContent = category;
      categoryFiltersContainer.appendChild(button);
    });
  }

  // Render the schedule
  function renderSchedule(filteredTalks) {
    scheduleContainer.innerHTML = '';
    let startTime = new Date();
    startTime.setHours(10, 0, 0, 0);

    const renderTalk = (talk) => {
        const talkElement = document.createElement('div');
        talkElement.className = 'col-12 talk';
        talkElement.innerHTML = `
            <p class="meta">${formatTime(startTime)} - ${formatTime(new Date(startTime.getTime() + talk.duration * 60000))}</p>
            <h3>${talk.title}</h3>
            <p class="meta"><strong>Speakers:</strong> ${talk.speakers.join(', ')}</p>
            <p>${talk.description}</p>
            <p class="meta"><strong>Category:</strong> ${talk.category.join(', ')}</p>
        `;
        scheduleContainer.appendChild(talkElement);
        startTime.setMinutes(startTime.getMinutes() + talk.duration + 10);
    };

    const renderBreak = (duration, title) => {
        const breakElement = document.createElement('div');
        breakElement.className = 'col-12 break';
        breakElement.innerHTML = `
            <p class="meta">${formatTime(startTime)} - ${formatTime(new Date(startTime.getTime() + duration * 60000))}</p>
            <h4>${title}</h4>
        `;
        scheduleContainer.appendChild(breakElement);
        startTime.setMinutes(startTime.getMinutes() + duration);
    };

    filteredTalks.forEach((talk, index) => {
        if (index === 3) {
            renderBreak(60, 'Lunch Break');
        }
        renderTalk(talk);
    });
  }

  // Format time as HH:MM AM/PM
  function formatTime(date) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }

  // Event listener for category filter buttons
  categoryFiltersContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const category = e.target.getAttribute('data-category');
      let filteredTalks = talks;
      if (category !== 'all') {
        filteredTalks = talks.filter(talk => talk.category.includes(category));
      }
      renderSchedule(filteredTalks);
    }
  });
});
