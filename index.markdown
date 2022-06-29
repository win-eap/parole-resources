---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
---

<form id="form">

<h2>Services</h2>

<div>
{% for service in site.data.services %}
  {% assign servicetag = service.label | prepend: 'service ' | slugify %}
  <span class="checkbox">
    <label for="{{ servicetag }}">
      {{ service.label}}: 
      <input type="checkbox" id="{{ servicetag }}" class="serviceCheckbox">
    </label>
  </span>
  {% if forloop.last == false %} | {% endif %}
{% endfor %}
</div>

<h2>Eligibility</h2>

{% assign groups = site.data.eligibility | group_by: "type" %}
<table>
{% for group in groups %}
  {% assign tag = group.name | append: "-" | append: item.label | slugify %}
  <tr><td colspan=4><strong>{{ group.name }}</strong>:</td></tr>
    {% for item in group.items %}
      <tr>
      {% assign itemtag = tag | append: " " | append: item.label | slugify %}
      <td>&nbsp;&nbsp;{{ item.label }}:</td>
      <td><input class="category" type="radio" id="{{ itemtag }}-may" name="{{ itemtag }}" value="may" checked="checked">
      <label for="may">may be</label></td>
      <td><input class="must" type="radio" id="{{ itemtag }}-must" name="{{ itemtag }}" value="must">
      <label for="must">must be</label></td>
      <td>
        {% if group.name != 'Ethnicity' %}
        <input class="mustnot" type="radio" id="{{ itemtag }}-must-not" name="{{ itemtag }}" value="must not">
      <label for="must not">must not be</label>
        {% endif %}
      </td>
      </tr>
    {% endfor %}
{% endfor %}
</table>

</form>

<div>


{% for resource in site.data.resources %}

  {% assign classes = "" | split: ";" %}

  {% assign resourceServices = resource['Service'] | split: ';' %}
  {% for service in resourceServices %}
    {% assign serviceclass = service | strip | prepend: "service " | slugify %}
    {% assign classes = classes | push: serviceclass %}
  {% endfor %}

  {% for key in site.data.vocab.eligibility %}          {%comment%} 'Service eligibility' or 'Restrictions' {%endcomment%}
    {% for category in site.data.vocab.categories %}    {%comment%} 'Age' etc. {%endcomment%}
      {% assign tagheader = key | append: ' ' | append: category %}
      {% assign tags = resource[tagheader] | strip | replace: ",", ";" | split: ";" %}
      {% if tags.size == 0 %}                               {%comment%} Create service-eligibility-age-all tag {%endcomment%}
        {% if key == 'Service eligibility' %}
          {% assign tagclass = " all" | prepend: tagheader | slugify %}
          {% assign classes = classes | push: tagclass %}
        {% endif %}
      {% else %}
        {% for tag in tags %}
          {% assign tagclass = tag | strip | prepend: " " | prepend: tagheader | slugify %}
          {% assign classes = classes | push: tagclass %}
        {% endfor %}
      {% endif %}
    {% endfor %}
  {% endfor %}

  {% assign id = "org " | append: resource['Organization'] | append: " " | append: resource['Program name'] | slugify %}
  <div id="{{ id }}" class="resource {{ classes | join: ' ' }}" style="border:  1px solid black; margin: 1em; padding: 1em;">
    <h2>{{ resource['Organization'] }}</h2>
    <ul>
      <li>Program Name: {{ resource['Program name'] }}</li>
      <li>Contact Name: {{ resource['Contact name'] }}</li>
      <li>Contact Email: {{ resource['Contact Email'] }}</li>
      <li>Contact Phone: {{ resource['Contact Phone'] }}</li>
      <li>Webpage: {% if resource['webpage'] != 'x' %}
        <a href="{{ resource['webpage'] }}">{{ resource['webpage'] }}</a>
        {% endif %}
      </li>
      <li>Service: {{ resource['Service'] }}</li>
    </ul>

    <h3>Elibility</h3>
    <table>
      <tr>
        <th></th>
        <th>Eligible</th>
        <th>Restricted</th>
      </tr>

      <tr>
        <td>Ethnicity</td>
        <td>{{ resource['Service eligibility ethnicity'] }}</td>
        <td></td>
      </tr>
      <tr>
        <td>Gender</td>
        <td>{{ resource['Service eligibility gender'] }}</td>
        <td>{{ resource['Restrictions gender'] }}</td>
      </tr>
      <tr>
        <td>Age</td>
        <td>{{ resource['Service eligibility age'] }}</td>
        <td>{{ resource['Restrictions age'] }}</td>
      </tr>
      <tr>
        <td>Offense</td>
        <td>{{ resource['Service eligibility offense'] }}</td>
        <td>{{ resource['Restrictions offense'] }}</td>
      </tr>
      <tr>
        <td>Other</td>
        <td>{{ resource['Service eligibility other'] }}</td>
        <td>{{ resource['Restrictions other'] }}</td>
      </tr>
    </table>

    <h3>Admin (don't show these?)</h3>
    <ul>
      <li>Webnotes (initials): {{ resource['Webnotes (initials)'] }}</li>
      <li>Interview (initials): {{ resource['Interview (initials)'] }}</li>
      <li>Interview date: {{ resource['Interview date'] }}</li>
    </ul>
  </div>
{% endfor %}

<script>
  function allSelector(tag, style) {
    allTag = tag.split('-');
    allTag.pop();
    allTag = allTag.join('-') + "-all";
    if (style == 'not')
      return ".resource:not(." + tag + ", ." + allTag + ")";
    else
      return ".resource." + tag + ", .resource." + allTag;
    end
  }

  var form = document.querySelector('form');
  form.addEventListener('change', function() {
    // show all resources
    Array.from(document.getElementsByClassName("resource"))
    .forEach(function(resource, index, resources) {
      resource.style.display = 'block';
    });

    // lists of class tags e.g. service-food-hampers
    musts = [];
    mustnots = [];

    // handle services: if checked, hide resource that do not have it
    var checkboxes = form.querySelectorAll(".serviceCheckbox");
    var checkboxesChecked = [];
    // loop over them all
    for (var i=0; i<checkboxes.length; i++) {
      // And stick the checked ones onto an array...
      if (checkboxes[i].checked) {
        musts.push(checkboxes[i].id);
      }
    }

    // select .must or .mustnot radio buttons that are checked
    var categories = form.querySelectorAll('input[value="must"]:checked');
    categories.forEach(function(category, index, categories){
      musts.push("service-eligibility-" + category.name);
    });
    console.log("Categories: " + Array.from(categories))

    var categories = form.querySelectorAll('input[value="must not"]:checked');
    categories.forEach(function(category, index, categories){
      mustnots.push("restrictions-" + category.name);
    });

    console.log("musts: " + musts)
    console.log("mustnots: " + mustnots)




    // update view
    // 1. show everything
    document.querySelectorAll(".resource").forEach(function(resource, index, resources){
      resource.style.visibility = 'block';
    });
    // 2. hide everything that does not have a must
    musts.forEach(function(must, index, musts) {
      // havenots = resources that have not(must OR must-all)
      selector = allSelector(must, "not");
      console.log("Selector: " + selector);
      havenots = document.querySelectorAll(selector);
      havenots.forEach(function(havenot, index, havenots) {
        console.log("havenot: " + havenot['id'])
        havenot.style.display = 'none';
      });
    });
    // 3. hide everything that has a mustnot
    mustnots.forEach(function(mustnot, index, mustnots) {
      // haves = resources that have mustnot
      haves = document.querySelectorAll(".resource." + mustnot);
      haves.forEach(function(have, index, haves) {
        console.log("have: " + have['id'])
        have.style.display = 'none';
      });
    });

  });

  function showResources(classtag) {
    // classtag is like 'gender-men'
    console.log(classtag)
    let eligible = document.getElementsByClassName("service-eligibility-" + classtag);
    for (let i = 0; i < eligible.length; i++) {
      console.log(eligible[i].id);
      eligible[i].style.display = 'block';
    }
  }
</script>

