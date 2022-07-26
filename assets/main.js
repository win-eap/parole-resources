function allSelector(tag, style) {
  // select all resources that match the tag and the style
  // e.g. tag: program-eligibility-first-nations, style: "not"
  // i.e. all resources that do not match program-eligibility-first-nations
  allTag = tag.split('-');
  allTag.pop();
  allTag = allTag.join('-') + "-all";
  if (style == 'not')
    return ".resource:not(." + tag + ", ." + allTag + ")";
  else
    return ".resource." + tag + ", #resource." + allTag;
  end
}

var showCount = document.getElementById('displayCount');
function updateDisplayCount(resources, hiding) {
  showCount.innerHTML = (hiding == 0 ? 
                            "Showing all " + resources : 
                            "Selected " + (resources - hiding) + " out of " + resources);
}

// We display resources by setting their div's css display to 'block', and hide
// them by setting it to none.

// Resource divs are found and evaluated using their class element, which contains
// classes like 'program-education' (compound of the type 'program' and the program
// name 'education'). IDs are 

resourceCount = document.querySelectorAll(".resource").length;
hidingCount = 0;
updateDisplayCount(resourceCount, hidingCount);

var form = document.querySelector('form');
form.addEventListener('change', function() {
  // show all resources
  Array.from(document.getElementsByClassName("resource"))
  .forEach(function(resource, index, resources) {
    resource.style.display = 'block';
  });

  // lists of class tags e.g. program-food-hampers
  musts = [];

  // handle programs: if checked, hide resource that do not have it
  var checkboxes = form.querySelectorAll(".programCheckbox");
  var checkboxesChecked = [];
  // loop over them all
  for (var i=0; i<checkboxes.length; i++) {
    // And stick the checked ones onto an array...
    if (checkboxes[i].checked) {
      musts.push(checkboxes[i].id);
    }
  }

  // select .must radio buttons that are checked
  var categories = form.querySelectorAll('input.eligibilityCheckbox:checked');
  categories.forEach(function(category, index, categories){
    console.log("Add to musts: " + category.id)
    musts.push(category.id);
  });
  console.log("musts: " + musts)

  resourceCount = 0;
  hidingCount = 0;
  // update view
  // 1. show everything
  document.querySelectorAll(".resource").forEach(function(resource, index, resources){
    resource.style.visibility = 'block';
    resourceCount += 1;
  });
  // 2. hide everything that does not have a must
  musts.forEach(function(must, index, musts) {
    // havenots = resources that have not(must OR must-all)
    selector = allSelector(must, "not");
    console.log("Selector: " + selector);
    havenots = document.querySelectorAll(selector);
    havenots.forEach(function(havenot, index, havenots) {
      if (havenot.style.display == 'block') {
        havenot.style.display = 'none';
        hidingCount += 1;
      }
    });
  });

  updateDisplayCount(resourceCount, hidingCount);
});

function showResources(classtag) {
  // classtag is like 'gender-men'
  console.log(classtag)
  let eligible = document.getElementsByClassName("program-eligibility-" + classtag);
  for (let i = 0; i < eligible.length; i++) {
    console.log(eligible[i].id);
    eligible[i].style.display = 'block';
  }
}
