---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
---
<h2>Services</h2>

<div>
{% for service in site.data.services %}
  <a onclick="alert('Service: {{ service.label }}')">{{ service.label }}</a>
  {% if forloop.last == false %} | {% endif %}
{% endfor %}
</div>

<h2>Eligibility</h2>
<div>
{% assign groups = site.data.eligibility | group_by: "type" %}
{% for group in groups %}
  <strong>{{ group.name }}</strong>:
  {% for item in group.items %}
    <a onclick="alert('{{ group.name }}: {{ item.label }}')">{{ item.label }}</a>
    {% if forloop.last == false %} | {% endif %}
  {% endfor %}
  {% if forloop.last == false %} <br/> {% endif %}  
{% endfor %}
</div>

<div>


{% for resource in site.data.resources %}

  {% assign classes = "" | split: ";" %}
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
