---
layout: page
title: Tags
permalink: /tags/
---

{% assign sorted_tags = site.tags | sort %}

<ul>
  {% for tag in sorted_tags %}
    <li>
      <a href="#{{ tag[0] | slugify }}">{{ tag[0] }}</a> ({{ tag[1].size }})
    </li>
  {% endfor %}
</ul>

{% for tag in sorted_tags %}
  <h2 id="{{ tag[0] | slugify }}">{{ tag[0] }}</h2>
  <ul>
    {% assign posts = tag[1] | sort: "date" | reverse %}
    {% for post in posts %}
      <li>
        <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
        <small>{{ post.date | date: "%Y-%m-%d" }}</small>
      </li>
    {% endfor %}
  </ul>
{% endfor %}
