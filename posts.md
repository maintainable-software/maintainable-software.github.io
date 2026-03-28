---
layout: page
title: All posts
permalink: /posts/
---

<ul>
  {% for post in site.posts %}
    <li>{{ post.date | date: "%Y-%m-%d" }}: <a href="{{ post.url | relative_url }}">{{ post.title | escape }}</a></li>
  {% endfor %}
</ul>
