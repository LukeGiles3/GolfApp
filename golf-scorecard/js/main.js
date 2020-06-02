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
        <p id="yards" class="table">${hole.teeBoxes[teeBox].yards}</p>
        <p id="par" class="table">${hole.teeBoxes[teeBox].par}</p>
        <p id="hcp" class="table">${hole.teeBoxes[teeBox].hcp}</p>
        </div>`
      })
      document.getElementById('holes').innerHTML = holesHtml;

      let parOut = holes.filter(val => val.hole < 10).reduce((acc, val) => { return acc += val.teeBoxes[0].par}, 0)
      parIn = holes.filter(val => val.hole >= 10).reduce((acc, val) => { return acc += val.teeBoxes[0].par}, 0)
      parTot = parIn + parOut
      yardOut = holes.filter(val => val.hole < 10).reduce((acc, val) => { return acc += val.teeBoxes[0].yards}, 0)
      yardIn = holes.filter(val => val.hole >= 10).reduce((acc, val) => { return acc += val.teeBoxes[0].yards}, 0)
      yardTot = yardOut + yardIn
      
      $("#8").after(`<div id="out"><p class="table-out">OUT</p><p class="table-out">${yardOut}</p><p class="table-out">${parOut}</p><p class="table-out">*</p></div>`)
      // $("#out").after(`<div id="int"><p class="table-input">INT</p><input class="table-input"></input><input class="table-input"></input><input class="table-input"></input></div>`)
      $("#17").after(`<div id="in"><p class="table-out">IN</p><p class="table-out">${yardIn}</p><p class="table-out">${parIn}</p><p class="table-out">*</p></div>`)
      $("#in").after(`<div id="total"><p class="table-out">TOT</p><p class="table-out">${yardTot}</p><p class="table-out">${parTot}</p><p class="table-out">*</p></div>`)
      });
    }
  );
}

getCourses();
