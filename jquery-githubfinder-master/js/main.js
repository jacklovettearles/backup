$(document).ready(function(){
  $('#searchUser').on('keyup', function(e){
    let username = e.target.value;
     // event handler to search user names when key is pressed.
      
    // Make request to Github // returns user object with account information
    $.ajax({
      url:'https://api.github.com/users/'+username,
      data:{
        client_id:'347d05cf71b6e64b9c1a',
        client_secret:'1283023a7e271c131dad6979d7a5b7cdb44e1825'
      }
    }).done(function(user){ // sort through repos in date order and limit to the lastest 5 
      $.ajax({
        url:'https://api.github.com/users/'+username+'/repos',
        data:{
          client_id:'347d05cf71b6e64b9c1a',
          client_secret:'1283023a7e271c131dad6979d7a5b7cdb44e1825',
          sort: 'created: asc',
          per_page: 5
        }
      }).done(function(repos){ // loop through repo's and put them into html div
        $.each(repos, function(index, repo){
          $('#repos').append(`
            <div class="well">
              <div class="row">
                <div class="col-md-7">
                  <strong>${repo.name}</strong>: ${repo.description} 
                </div>
                <div class="col-md-3">
                  <span class="badge badge-primary">Forks: ${repo.forks_count}</span>
                  <span class="badge badge-primary">Watchers: ${repo.watchers_count}</span>
                  <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                </div>
                <div class="col-md-2">
                  <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
                </div>
              </div>
            </div>
          `); // The above collects the "forks","watchers","stars","repo & description" and displays it in the HTML&CSS positioning 
        });
      });
        // below drwas out the username, picture, repos, followers, location and other all informtion of the users profile and displays it in the bootstrap HTML positioning I have chosen.
      $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3> 
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}">
                <a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">View Profile</a>
              </div>
              <div class="col-md-9">
              <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
              <span class="badge badge-primary">Public Gists: ${user.public_gists}</span>
              <span class="badge badge-primary">Followers: ${user.followers}</span>
              <span class="badge badge-primary">Following: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">Company: ${user.company}</li>
                <li class="list-group-item">Website/blog: ${user.blog}</li>
                <li class="list-group-item">Location: ${user.location}</li>
                <li class="list-group-item">Member Since: ${user.created_at}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Latest Repos</h3>
        <div id="repos"></div>
      `);
    });
  });
});
