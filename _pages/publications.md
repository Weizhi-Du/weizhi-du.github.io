---
layout: archive
title: "Publications"
permalink: /publications/
author_profile: true
redirect_from:
  - /publication
  - /paper
  - /papers
  - /research
---

{% if author.googlescholar %}
  <u><a href="{{author.googlescholar}}">Google Scholar Profile</a>.</u>
{% endif %}

{% include base_path %}

{% for post in site.publications reversed %}
  {% include archive-single.html %}
{% endfor %}
