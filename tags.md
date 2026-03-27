---
layout: page
title: Tags
permalink: /tags/
---

{% assign sorted_tags = site.tags | sort %}

<section class="tag-index">
  <p>Browse posts by topic.</p>

  <div class="tag-jump-list">
    {% for tag in sorted_tags %}
      <a href="#{{ tag[0] | slugify }}">{{ tag[0] }} <span>{{ tag[1].size }}</span></a>
    {% endfor %}
  </div>
</section>

<section class="tag-groups">
  {% for tag in sorted_tags %}
    <article class="tag-block" id="{{ tag[0] | slugify }}">
      <h2>{{ tag[0] }}</h2>
      <ul class="tag-post-list">
        {% assign posts = tag[1] | sort: "date" | reverse %}
        {% for post in posts %}
          <li>
            <a href="{{ post.url | relative_url }}">{{ post.title }}</a>
            <small>{{ post.date | date: "%d %b %Y" }}</small>
          </li>
        {% endfor %}
      </ul>
    </article>
  {% endfor %}
</section>
