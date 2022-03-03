---
layout: page
---

{% assign temp = 'a b c' | split: ' ' %}
{% assign output = temp | reverse | shift | reverse | join: "|" %}
{{ output }}


<div id="aa" class="a z">a</div>
<div id="bb" class="b z">b</div>
<div id="cc" class="c z">c</div>

<script>
  x = document.querySelectorAll(".z:not(.a, .c)")
  y = document.querySelectorAll(".z.a, .z.c")
  alert(x)
</script>