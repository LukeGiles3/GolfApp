// XMLHttpRequest

// jquery ($.get(), $.ajax())

// fetch()

function getCourses() {
  fetch('https://golf-courses-api.herokuapp.com/courses').then((response) => {
    response.json().then((data) => {
      const courses = data.courses;
      let courseOptions = '';
      courses.forEach((course) => {
        courseOptions += `<option value="${course.id}">${course.name}</option>`;
      });
      document.getElementById('course-select').innerHTML = courseOptions;
      const id = courses[0].id
      getCourse(id);
    });
  });
}


function getCourse(id) {
  fetch(`https://golf-courses-api.herokuapp.com/courses/${id}`).then(
    (response) => {
      response.json().then((data) => {
        const course = data.data;
        document.getElementById('course-info').innerHTML = `
      <h3 class="center-text">${course.name}</h3>
      <img class="thumbnail" src="${course.thumbnail}">
      `;
      const holes = course.holes;
      
      var num = 0
      function increment() {
        num++
        return num
      }

      let holesHtml = ''
      const teeBox = 0;
      holes.forEach(hole => {
        holesHtml += 
        `<div id="${num}">
        <p class="table">${increment()}</p>
        <p class="table">${hole.teeBoxes[teeBox].yards}</p>
        <p class="table">${hole.teeBoxes[teeBox].par}</p>
        <p class="table">${hole.teeBoxes[teeBox].hcp}</p>
        <input id="input${num}" class="table"></input>
        </div>`
      })
      document.getElementById('holes').innerHTML = holesHtml;

      $("#8").after(`<div id="out"><p class="table">OUT</p><p class="table">1</p><p class="table">1</p><p class="table">1</p></div>`)


      });
    }
  );
}

getCourses();
