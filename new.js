function getAllpushedCommits() {
  clearModifiedFilesList();
  var repos;
  var allCommits = [];
  var aclist = [];
  console.log("Finding all commits");
  Git.Repository.open(repoFullPath)
    .then(function (repo) {
      repos = repo;
      return repo.getReferences(Git.Reference.TYPE.LISTALL)
    })
    .then(function (refs) {
      var count = 0;
      async.whilst(function () {
        return count < refs.length;
      }, function (cb) {
        if (refs[count].isRemote()) {
          refs[count].peel(Git.Object.TYPE.COMMIT)
            .then(function (ref) {
              repos.getCommit(ref)
                .then(function (commit) {
                  var history = commit.history(Git.Revwalk.SORT.Time);
                  history.on("end", function (commits) {
                    for (var i = 0; i < commits.length; i++) {
                      if (aclist.indexOf(commits[i].toString()) < 0) {
                        allCommits.push(commits[i]);
                        aclist.push(commits[i].toString());
                      }
                    }
                    count++;
                    console.log("you have " + allCommits.length + " pushed commits");
                    unpushed_commits = total_commit - allCommits.length;
                    console.log("push " + unpushed_commits + " to remote origin");
                    cb();
                  });
                  history.start();
                });
            });
        }
      }, );
    });
}

var total_commit = 0;
var unpushed_commits = 0;

function countLocalCommits() {
  var walker = null;
  Git.Repository.open(repoFullPath)
    .then(function (repo) {
      walker = repo.createRevWalk();
      return repo.getHeadCommit();
    })
    .then(function (commit) {
      walker.sorting(Git.Revwalk.SORT.REVERSE);
      walker.push(commit.id());
      walker.sorting
      walker.pushHead();
      return walker.getCommits(100)
    })
    .then(function (commits) {
      console.log("Local commits: ");
      console.log(commits);
      total_commit = commits.length;
    })
}


function getAllpushedCommits() {
  clearModifiedFilesList();
  var repos;
  var allCommits = [];
  var aclist = [];
  //console.log("Finding all commits");
  Git.Repository.open(repoFullPath)
    .then(function (repo) {
      repos = repo;
      //console.log("fetching all refs");
      // console.log( repo.getReferences(Git.Reference.TYPE.LISTALL));
      return repo.getReferences(Git.Reference.TYPE.LISTALL)
    })
    .then(function (refs) {
      var count = 0;
      async.whilst(function () {
          return count < refs.length;
        }, await
        function (cb) {
          if (refs[count].isRemote()) {
            refs[count].peel(Git.Object.TYPE.COMMIT)
              .then(function (ref) {
                repos.getCommit(ref)
                  .then(function (commit) {
                    var history = commit.history(Git.Revwalk.SORT.Time);
                    history.on("end", function (commits) {
                      for (var i = 0; i < commits.length; i++) {
                        if (aclist.indexOf(commits[i].toString()) < 0) {
                          allCommits.push(commits[i]);
                          aclist.push(commits[i].toString());
                        }
                      }
                      count++;
                      commit_diff = allCommits.length;
                      //show_length(allCommits.length);
                      cb();

                    });
                    history.start();
                  })


              });

          }
        }, );
    });
  // console.log("you have " + commit_diff + " pushed commits");
  // var temp = total_commit - commit_diff;
  // console.log("push "+ temp + " to remote origin" );
}

function countLocalCommits() {
  var walker = null;
  Git.Repository.open(repoFullPath)
    .then(function (repo) {
      walker = repo.createRevWalk();
      return repo.getHeadCommit();
    })
    .then(function (commit) {
      walker.sorting(Git.Revwalk.SORT.REVERSE);
      walker.push(commit.id());
      walker.sorting
      walker.pushHead();
      return walker.getCommits(100)
    })
    .then(function (commits) {
      //console.log("Local commits: ");
      // console.log(commits);
      total_commit = commits.length;
    })
}

function unpushed_commit_modal() {
  // TODO: implement commit modal

  for (var i = 0; i < 4; i++) {
    getAllpushedCommits();

  }
  countLocalCommits();
  console.log("you have " + commit_diff + " pushed commits");
  console.log("push " + (temp) + " to remote origin");
  return temp = total_commit - commit_diff;
  //console.log("push "+ (temp) + " to remote origin" );
  displayModal("push " + (temp) + " to remote origin ");

}
