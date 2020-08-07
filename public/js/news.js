$(document).ready(function () {
  // let url = "https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?q=coronavirus&country=in&apiKey=6738b05fb4be48c18ec8df8ea83ef99c";
  let url = "https://cors-anywhere.herokuapp.com/https://gnews.io/api/v3/search?q=" + topics + "&country=in&token=f2c4736bfe67ed31f50aef98e7dd208e";


  $.ajax({
    url: url,
    method: "GET",
    dataType: "JSON",

    beforeSend: function () {
      $(".progress").show();
    },

    complete: function () {
      $(".progress").hide();
    },

    success: function (newsdata) {
      let output = "";
      let latestNews = newsdata.articles;
      for (var i in latestNews) {
        output += `
        <div class="row">
        <div class="col-sm-4 grid-margin">
          <div class="position-relative">
            <div class="rotate-img">
              <img
              src="${latestNews[i].image}"
              alt="${latestNews[i].title}"
                class="img-fluid"
              />
            </div>
          </div>
        </div>
        <div class="col-sm-8  grid-margin">
          <h3 style="color: #032a63" class="mb-2 font-weight-500" title="${latestNews[i].title}">${latestNews[i].title}</h3>
          <div class="fs-13 mb-2">
          <p><b>Source</b>: ${latestNews[i].source.name} &nbsp <b>Published</b>: ${latestNews[i].publishedAt} </p>
          </div>
          <p class="mb-0">
          ${latestNews[i].description}
          <a href="${latestNews[i].url}" target="_blank" class="btn">Read More</a>
          </p>
        </div>
      </div>
        `;
      }

      if (output !== "") {
        $("#newsResults").html(output);
      }

    },

    error: function () {
      let errorMsg = `<div class="errorMsg center">Some error occured</div>`;
      $("#newsResults").html(errorMsg);
    }
  })

});