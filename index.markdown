---
# Feel free to add content and custom Front Matter to this file.
# To modify the layout, see https://jekyllrb.com/docs/themes/#overriding-theme-defaults

layout: page
---

{% assign programcolumn = 'Type of program' %}
{% assign mustscolumn = 'Eligible Clients' %}
{% assign mustnotscolumn = 'Exclusions' %}

<p>[Test telephone dial link (to Hello Weather service): <a href="tel:1-833-794-3556">1-833-794-3556</a> (click to dial)]</p>

<form id="form">

<h2>Programs</h2>

{% include programs.html %}

<div id="countBox">
  <span id="displayCount">all</span> resources.
</div>

<h2>Eligibility</h2>

{% include eligibility.html %}

</form>

<div>

{% comment %} Add classes to resources {% endcomment %}

{% for resource in site.data.resources %}

  {% assign classes = "" | split: ";" %}

  {% assign resourceprograms = resource[programcolumn] | replace: ", ", "," | split: ',' %}
  {% for program in resourceprograms %}
    {% assign programclass = program | strip | prepend: "program " | slugify %}
    {% assign classes = classes | push: programclass %}
  {% endfor %}

  {% comment %} 
    Populate classes, columnheader, categories, tagheader and tags variables
  {% endcomment %}
  {% for field in site.data.fields %}
    {% assign fieldtag = field[0] %}  
    {% assign columnheader = field[1] %}
    {% assign categories = resource[columnheader] | replace: "No information, FOLLOW UP NEEDED", "" | replace: ", ", "," | split: ',' %}    
    {% for category in categories %}    {%comment%} Name of checkbox {%endcomment%}
      {% if category != 'No information' %}
        {% assign tagclass = fieldtag | append: ' ' | append: category | slugify %}
        {% assign classes = classes | push: tagclass %}
      {% endif %}
    {% endfor %}
  {% endfor %}

  {% include resource.html resource=resource classes=classes %}

{% endfor %}

<script src="{{ site.baseurl | prepend: site.url }}/assets/main.js" type="text/javascript"></script>
