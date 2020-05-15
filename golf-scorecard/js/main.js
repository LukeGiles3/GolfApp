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

      let holesHtml = ''
      const teeBox = 0;
      holes.forEach(hole => {
        holesHtml += 
        `<table id="tableId" class="table">
          <tr>
            <td class="table">${hole.teeBoxes[teeBox].yards}</td>
          </tr>
          <tr>
            <td class="table">${hole.teeBoxes[teeBox].par}</td>
          </tr>
          <tr>
            <td class="table">${hole.teeBoxes[teeBox].hcp}</td>
          </tr>
        </table>`
      })
      var numplayers = 3;
      for(var pl = 1; pl <= numplayers; pl++){
        $("#tableId").append("<div class='playername'>player "+ pl +"</div>");
    }
    for(var h = 1; h <= 18; h++){
      for(var p = 1; p <= numplayers; p++){
          $("#column" + h).append("<input class='holeinput' type='text' id='player"+ p +"hole"+ h +"'/>");
      }
  }
      document.getElementById('holes').innerHTML = holesHtml;

      });
    }
  );
}

getCourses();
