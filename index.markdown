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

<div>
{% assign groups = site.data.eligibility | group_by: "type" %}
{% for group in groups %}
  {% assign tag = group.name | append: "-" | append: item.label | slugify %}
  <strong>{{ group.name }}</strong>:
  {% for item in group.items %}
    {% assign itemtag = tag | append: " " | append: item.label | slugify %}
    <br/>&nbsp;&nbsp;{{ item.label }}:
    <input type="radio" id="{{ itemtag }}-may" name="{{ itemtag }}" value="may" checked="checked">
    <label for="may">may</label>
    <input type="radio" id="{{ itemtag }}-must" name="{{ itemtag }}" value="must">
    <label for="must">must</label>
    <input type="radio" id="{{ itemtag }}-must-not" name="{{ itemtag }}" value="must not">
    <label for="must not">must not</label>
  {% endfor %}
  {% if forloop.last == false %} <br/> {% endif %}  
{% endfor %}
</div>

</form>

<div>


{% for resource in site.data.resources %}

  {% assign classes = "" | split: ";" %}

  {% assign resourceServices = resource['Service'] | split: ';' %}
  {% for service in resourceServices %}
    {% assign serviceclass = service | strip | prepend: "service " | slugify %}
    {% assign classes = classes | push: serviceclass %}
  {% endfor %}

  {% for key in site.data.vocab.eligibility %}
    {% for category in site.data.vocab.categories %}
      {% assign tagheader = key | append: ' ' | append: category %}
      {% assign tags = resource[tagheader] | replace: ",", ";" | split: ";" %}
      {% for tag in tags %}
        {% assign tagclass = tag | strip | prepend: " " | prepend: tagheader | slugify %}
        {% assign classes = classes | push: tagclass %}
      {% endfor %}
    {% endfor %}
  {% endfor %}

  {% assign id = "org " | append: resource['Organization'] | append: " " | append: resource['Program Name'] | slugify %}
  <div id="{{ id }}" class="resource {{ classes | join: ' ' }}" style="border:  1px solid black; margin: 1em; padding: 1em;">
    <h2>{{ resource['Organization'] }}</h2>
    <ul>
      <li>Program Name: {{ resource['Program Name'] }}</li>
      <li>Contact: {{ resource['Contact'] }}</li>
      <li>Email: {{ resource['Email'] }}</li>
      <li>Phone: {{ resource['Phone'] }}</li>
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
        <td>{{ resource['Restrictions ethnicity'] }}</td>
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
        console.log(checkboxes[i].id)
        musts.push(checkboxes[i].id);
      }
    }
    console.log(musts)

    // update view
    musts.forEach(function(must, index, musts){
      console.log("must: " + must)
      havenots = document.querySelectorAll(".resource:not(." + must + ")")
      havenots.forEach(function(havenot, index, havenots) {
        console.log(havenot.style.visibility)
        havenot.style.display = 'none';
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

