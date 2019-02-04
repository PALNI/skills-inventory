jQuery(function($) {
  window.prioritySkills = [
    'Assessment',
    'Collection Management',
    'Engaging Stakeholders',
    'Financial Management',
    'Grant Writing',
    'Information Literacy',
    'Institutional Repositories',
    'Instructional Technology',
    'Leadership Development',
    'Library Marketing',
    'Library Space Design',
    'Scholarly Communication',
    'Software Development',
  ];

  // Make class-name string of priority skills.
  window.prioritySkillsClassSelector = prioritySkills
    .map(function(s) {
      return '.skill-' + s.replace(/\s/g, '-').toLowerCase();
    })
    .join(', ');

  window.prioritySkillsDataSelector = prioritySkills
    .map(function(s) {
      return '.skill-tag[data-name="' + s + '"]'
    })
    .join(', ');

  // Make discourse links hyperlinks in profiles (any field value that is also a URL)
  $('.upme-field-value').each(function(){
      // Get the content
      var str = $(this).html();
      // Set the regex string
      var regex = /(https?:\/\/([-\w\.]+)+(:\d+)?(\/([\w\/_\.]*(\?\S+)?)?)?)/ig
      // Replace plain text links by hyperlinks
      var replaced_text = str.replace(regex, "<a href='$1' target='_blank'>$1</a>");
      // Echo link
      $(this).html(replaced_text);
  });

  //Appends span for clickable button to show priority skills
  $("div.upme-skills_separator").append('<span id="upme-separator-icon-skills_separator_priority" class="upme-icon upme-separator-collapse-icon upme-icon-arrow-up">Show Only Priority Skills</span>');

  //Adds labels for beginning/advanced/want to learn checkboxes
  $("div.upme-skills_separator").after( '<div class="instruction-wrapper upme-edit" style="clear:both"><div class="spacing-label" style="float:left;width: 15%;text-align:center;color:rgba(0,0,0,0)">#</div><div class="basic-label" style="float:left;width: 30%;text-align:center">Basic</div><div class="advanced-label-instruction" style="float:left;width: 20%">Advanced</div><div class="learn-label" style="float:left;width: 35%">Want to Learn</div></div>' );
  $('input[title="Advanced Skills"]').parent('label').addClass('upme-checkbox-hide-label');
  $('input[title="Want to Learn"]').parent('label').addClass('upme-checkbox-hide-label');
  $(".upme-checkbox-hide-label" ).wrapInner( "<span class='advanced-label'></span>");

  //Adds label to show/hide all skills button
  $("#upme-separator-icon-skills_separator").text("Show all skills");

  //show/hide priority skills)
  //This should show only the priority skills by default on page load
  $("#upme-separator-icon-skills_separator_priority").click(function(){
   //hides non-priority skills
   //$("label.upme-checkbox").hide();
   //$('.upme-field-value').find("input[value='[A] - Grant Writing']").closest('label').show();
   //$('.upme-field-value').find("input[value='[A] - Engaging Stakeholders']").closest('label').show();
   //$('.upme-field-value').find("input[value='[A] - Assessment']").closest('label').show();
   //$('.upme-field-value').find("input[value='[A] - Financial Management']").closest('label').show();
   //$('.upme-field-value').find("input[value='[P] - Instructional Technology']").closest('label').show();
   //$('.upme-field-value').find("input[value='[P] - Information Literacy']").closest('label').show();
   //$('.upme-field-value').find("input[value='[P] - Library Marketing']").closest('label').show();
   //$('.upme-field-value').find("input[value='[T] - Collection Management']").closest('label').show();
   //$('.upme-field-value').find("input[value='[P] - Institutional Repositories']").closest('label').show();
   //$('.upme-field-value').find("input[value='[P] - Scholarly Communication']").closest('label').show();
   //$('.upme-field-value').find("input[value='[S] - Software Development']").closest('label').show();
   //$('.upme-field-value').find("input[value='[A] - Leadership Development']").closest('label').show();
   //$('.upme-field-value').find("input[value='[A] - Library Space Design']").closest('label').show();

    $('.skill-cell:not(.skill-header)').hide();
    //$('.skill-grant-writing, .skill-engaging-stakeholders, .skill-assessment, .skill-financial-management, .skill-instructional-technology, .skill-information-literacy, .skill-library-marketing, .skill-collection-management, .skill-institutional-repositories, .skill-scholarly-communication, .skill-software-development, .skill-leadership-development, .skill-library-space-design').show();
    $(prioritySkillsClassSelector).show();

    //To do - make the 'show all skills' button appear unselected;
    $("#upme-separator-icon-skills_separator").removeClass('show-skills-button-selected');


    //To do - make the 'show only priority skills' button appear selected;

    $("#upme-separator-icon-skills_separator_priority").addClass('show-skills-button-selected');
   });

  //Shows all Skills click function
   $("#upme-separator-icon-skills_separator").click(function(){
        //$("label.upme-checkbox").show();

     	$('.skill-cell').show();

        //$('.upme-basic_skills').slideDown().removeClass('upme-display-none');
        //To do - make the 'show priority skills' appear unselected
        $("#upme-separator-icon-skills_separator_priority").removeClass('show-skills-button-selected');

     // To do - make the 'show all skills' button appear selected
        $("#upme-separator-icon-skills_separator").addClass('show-skills-button-selected');
    });

  //Hide editable checkboxes on profile view screen
   $("div.upme-edit-checkbox > div.upme-field-value").addClass( "upme-edit" );

  //After page is fully loaded, automatically click the skills separator to show all skills
  setTimeout(function() {
        $("#upme-separator-icon-skills_separator").trigger('click');
    },10);
  //Then click the "show only priority skills button"
  setTimeout(function() {
        $("#upme-separator-icon-skills_separator_priority").trigger('click');
    },10);

  // ---------------------------------------------------------------------------
  // Display skills as tags.
  // ---------------------------------------------------------------------------

  // ---------------------------------------------------------------------------
  // Utility.
  // ---------------------------------------------------------------------------

  var loadScripts = function(scripts, callback) {
    var queue = scripts.slice(); // Clone the array, since otherwise, we'd be iterating over it and modifying it at the same time.

    scripts.forEach(function(url) {
      var script = $('<script></script>')
        .on('load', function() {
            queue = queue.filter(function(s) {
              return s !== url;
            });

            if (!queue.length) {
              return callback();
            }
          })
        .attr('src', url);

      return document.body.appendChild(script[0]); // For reasons unclear to me, jQuery's methods don't work here... the `load` event doesn't fire?
    });
  };

  // ---------------------------------------------------------------------------
  // Load FontAwesome, since we're going to want it, but don't care when it loads.
  // ---------------------------------------------------------------------------

  loadScripts(['https://use.fontawesome.com/releases/v5.6.3/js/all.js'], () => {});

  // ---------------------------------------------------------------------------
  // Reformat search and filter tools.
  // ---------------------------------------------------------------------------
  (function() {
    // Rearrange elements for nicer styling.
    var searchBoxWrapper = $('.search-box').first(),
        container = searchBoxWrapper.next().addClass('filter-search-container').html('');

    searchBoxWrapper.appendTo(container);

    searchBoxWrapper.find('input[type="text"]').wrap($('<fieldset></fieldset>'));

    var filtersWrapper = $('<div></div>').addClass('filters').appendTo(container),
        filterFields = $('#wrap_description, #wrap_palni_institution, #wrap_basic_skills, #wrap_advanced_skills').appendTo(filtersWrapper),
        filterButtonsWrapper = $('#filter_buttons').appendTo(filtersWrapper);

    // Give our two search/filter options titles.
    searchBoxWrapper.prepend($('<div></div>').text('Search Profiles').addClass('filter-search-title'));
    filtersWrapper.prepend($('<div></div>').text('Filter for People with Traits').addClass('filter-search-title'));

    // Rename the Search Users button to make it more obvious what it does.
    $('#search-submit').attr('value', 'Search Profiles');

    // Rename the CSV export button and move it out of the filter box.
    // (It's an export of everything that's a match for our search/filter.)
    $('[name="csvsubset"]')
      .attr('value', 'Export Results as CSV')
      .addClass('btn btn-info')
      .insertAfter(container);

    // Style buttons.
    filterButtonsWrapper.find('input[type="submit"]').slice(1).addClass('btn-secondary');
    container.find('input[type="submit"]:not(.btn-secondary)').addClass('btn-primary');
    container.find('input[type="submit"]').addClass('btn');
  })();

  // ---------------------------------------------------------------------------
  // Rewrite the skill tags profile display and directory pages.
  // ---------------------------------------------------------------------------
  var makeSkillTags = function(skillsContainers) {
    $(skillsContainers).each(function(i, skillsContainer) {
      skillsContainer = $(skillsContainer);

      var skillTags = skillsContainer
        .html()
        .split(/(?:(?:\,|\<br\>)\s?\[)\s*/g)
        .map(function(s) {
          var bits = s.split(/\s?\[?(\w)\] - /);

          if (bits[2]) {
            return buildSkillTag(bits);
          }
        });

      skillsContainer.empty();

      skillTags
        .sort(function(e1, e2) {
          var category1 = $(e1).attr('data-category');
          var category2 = $(e2).attr('data-category');

          if (category1 == category2) {
            var name1 = $(e1).attr('data-name').toLowerCase();
            var name2 = $(e2).attr('data-name').toLowerCase();

            if (name1 == name2) { // Should never happen.
              return 0;
            } else if (name1 < name2) {
              return -1;
            } else {
              return 1;
            }
          } else if (category1 < category2) {
            return -1;
          } else {
            return 1;
          }
        })
        .forEach(function(s) {
          skillsContainer.append(s);
        });
    });
  };

  var buildSkillTag = function(bits) {
    var el = $('<span></span>');

    // var url = '/members/?filter=1&advanced_skills=' + encodeURIComponent('[' + bits[1] + '] - ' + bits[2]);

    el.addClass('skill-tag')
      .html(bits[2])
      .attr('data-name', bits[2])
      .attr('tabindex', 0);

    if (bits[1]) {
      el.attr('data-category', bits[1].toLowerCase())
    }

    if (bits[1] == 'A') {
      el.addClass('skill-administration');
      el.attr('title', 'Admin and Management');
    } else if (bits[1] == 'P') {
      el.addClass('skill-public');
      el.attr('title', 'Public and Access Services');
    } else if (bits[1] == 'T') {
      el.addClass('skill-technical');
      el.attr('title', 'Technical Services');
    } else if (bits[1] == 'S') {
      el.addClass('skill-systems');
      el.attr('title', 'Systems and Technology');
    } else if (bits[1] == 'U') {
      el.addClass('skill-subject');
      el.attr('title', 'Subject Specialty');
    } else if (bits[1] == 'C') {
      el.addClass('skill-scholarly');
      el.attr('title', 'Scholarly Communication');
    } else {
      el.addClass('skill-unknown');
      el.attr('title', 'Unspecified category');
    }

    return el;
  };

  makeSkillTags($('.upme-view.upme-basic_skills .upme-field-value, .basic_skills'));
  makeSkillTags($('.upme-view.upme-advanced_skills .upme-field-value, .advanced_skills'));
  makeSkillTags($('.upme-view.upme-learn_skills .upme-field-value'));

  // ---------------------------------------------------------------------------
  // Rewrite the directory table.
  // ---------------------------------------------------------------------------
  (function() {
    // Set some things up.
    var directory = $('#usertable');

    // Get searched and filtered skill selectors.
    var searchFragment = $('#search-input').val(),
        basicFilterValue = $('#filter_basic_skills').val(),
        advancedFilterValue = $('#filter_advanced_skills').val();

    var basicFilterValueBits = basicFilterValue.split(/\s?\[?(\w)\] - /),
        advancedFilterValueBits = advancedFilterValue.split(/\s?\[?(\w)\] - /);

    var searchFragmentSelector = '',
        basicFilterSelector = '',
        advancedFilterSelector = '',
        skillSearchSelector = [];

    if (searchFragment) {
      searchFragmentSelector = '.skill-tag[data-name*="' + searchFragment.replace(/"/g, '') + '"]';

      skillSearchSelector.push(searchFragmentSelector);
    }

    if (basicFilterValueBits[2]) {
      basicFilterSelector = '.basic_skills .skill-tag[data-name="' + basicFilterValueBits[2] + '"]';

      skillSearchSelector.push(basicFilterSelector);
    }

    if (advancedFilterValueBits[2]) {
      advancedFilterSelector = '.advanced_skills .skill-tag[data-name="' + advancedFilterValueBits[2] + '"]';

      skillSearchSelector.push(advancedFilterSelector);
    }

    skillSearchSelector = skillSearchSelector.join(', ');

    // Remove the 'Avatar', 'Title', 'Institution', 'Work Email', and 'Contact Phone' headers.
    directory.find('.th1, .th3, .th4, .th5, .th6').remove();

    // Remove links from skill column headers.
    directory.find('.th7 a, .th8 a').removeAttr('href');

    // Go row by row.
    directory.find('tbody tr').each(function(i, row) {
      row = $(row);

      // Collect avatar, title, institution, email, and phone number into 'Name' cell.
      var avatar = row.find('img.avatar'),
          name = row.find('.display_name'),
          title = row.find('.description').remove().text().trim(),
          institution = row.find('.palni_institution').remove().text().trim(),
          email = row.find('.upme_work_email').remove().text().trim(),
          phone = row.find('.contact_phone').remove().text().trim();

      row.find('td.avatar').remove();

      name.append(avatar);

      if (title) {
        name.append('<br>').append(title);
      }

      if (institution) {
        name.append('<br>').append(institution);
      }

      if (email) {
        name.append('<br>').append($('<span>').addClass('email-wrapper').append(email));
      }

      if (phone) {
        name.append('<br>').append($('<span>').addClass('phone-wrapper').append(phone));
      }

      var skillTags = row.find('.skill-tag'),
          prioritySkillTags = row.find(prioritySkillsDataSelector),
          searchSkillTags = row.find(skillSearchSelector),
          emphasizedSkillTags = prioritySkillTags.add(searchSkillTags);

      // Add icons to priority skills and the searched skill) if there is one).
      // Probably want to do this for priority skill tags in other parts of the site. //!
      prioritySkillTags.each(function(i, s) {
        $(s).addClass('skill-tag-priority').prepend($('<i class="fas fa-star"></i>'));
      });

      searchSkillTags.each(function(i, s) {
        $(s).addClass('skill-tag-search').prepend($('<i class="fas fa-search"></i>'));
      });

      // Move priority and search skill tags to the beginning of the list.
      // Truncate list and add link to expand.
      var emphasizeSkillTags = function(container) {
        container = $(container);

        container
          .find('.skill-tag-priority')
          .prependTo(container);

        container
          .find('.skill-tag-search')
          .prependTo(container);

        var skillTags = container
          .find('.skill-tag');

        var hiddenTags = skillTags
          .slice(10)
          .hide();

        hiddenTags
          .first()
          .before(
            $('<a></a>')
              .text('\u2026and ' + hiddenTags.length + ' more.')
              .addClass('skill-toggle')
              .click(function(event) {
                $(event.target).hide();

                this.show();
              }.bind(hiddenTags))
          );
      };

      emphasizeSkillTags(row.find('.basic_skills'));
      emphasizeSkillTags(row.find('.advanced_skills'));
      //!


      // Only display the priority skills and the searched skill (if there is one).
      // skillTags.hide();
      // prioritySkillTags.show();
    });
  })();

  // ---------------------------------------------------------------------------
  // Rewrite the profile edit page.
  // ---------------------------------------------------------------------------
  var skills = [];

  $('.upme-basic_skills .upme-edit label')
    .each(function(i, s) {
      s = $(s);

      var children = s.children().detach();

      try {
        var bits = s.text().split(/\[(\w)\] - /);

        var skill = {
          category: bits[1],
          name: bits[2],
          classId: 'skill-' + bits[2].replace(/\s/g, '-').toLowerCase(),
          skillTag: buildSkillTag(bits),
          basicChildren: children,
          advancedChildren: null,
          learnChildren: null
        };

        skills[i] = skill;
      } catch (e) {
        s.append(children);
      }
    });

   $('.upme-advanced_skills .upme-edit label')
    .each(function(i, s) {
      s = $(s);

      var wrapper = s.children('.advanced-label');
      var children = wrapper.children().detach();

      skills[i].advancedChildren = children;
    });

  $('.upme-learn_skills .upme-edit label')
    .each(function(i, s) {
      s = $(s);

      var wrapper = s.children('.advanced-label');
      var children = wrapper.children().detach();

      skills[i].learnChildren = children;
    });

  var editCheckbox = $('<div class="upme-field upme-separator upme-edit upme-clearfix upme-skills_separator upme-collapsible-separator"></div>');
  var fieldValue = $('<div class="upme-field-value upme-edit upme-skills-values"></div>');

  editCheckbox.append(fieldValue);
  $('.upme-edit.upme-basic_skills').before(editCheckbox);

  $('.instruction-wrapper, .upme-edit.upme-basic_skills, .upme-edit.upme-advanced_skills, .upme-edit.upme-learn_skills').remove();

  fieldValue
    .append($('<div class="skill-header skill-name">Skill</div><div class="skill-header skill-basic">Basic</div><div class="skill-header skill-advanced">Advanced</div><div class="skill-header skill-learn">Want to Learn</div>'))

  skills
    .sort(function(e1, e2) {
      var category1 = e1.category.toLowerCase();
      var category2 = e2.category.toLowerCase();

      if (category1 == category2) {
        var name1 = e1.name.toLowerCase();
        var name2 = e2.name.toLowerCase();

        if (name1 == name2) { // Should never happen.
          return 0;
        } else if (name1 < name2) {
          return -1;
        } else {
          return 1;
        }
      } else if (category1 < category2) {
        return -1;
      } else {
        return 1;
      }
    })
    .forEach(function(s, i) {
      var style = '-ms-grid-row: ' + (i + 2) + ';'; // Stupid IE.

      fieldValue
        .append($('<div class="skill-cell skill-name"></div>').addClass(s.classId).attr('style', style).append(s.skillTag))
        .append($('<div class="skill-cell skill-basic"></div>').addClass(s.classId).attr('style', style).append(s.basicChildren))
        .append($('<div class="skill-cell skill-advanced"></div>').addClass(s.classId).attr('style', style).append(s.advancedChildren))
        .append($('<div class="skill-cell skill-learn"></div>').addClass(s.classId).attr('style', style).append(s.learnChildren))
    });

  // ---------------------------------------------------------------------------
  // Add tooltips to skill tags.
  // ---------------------------------------------------------------------------

  var buildSkillTooltip = function(category, name) {
    category = category.toUpperCase();

    var el = $('<span></span>'),
        title = $('<span></span>'),
        links = $('<span></span>'),
        basicLink = $('<a></a>'),
        advancedLink = $('<a></a>');

    var basicUrl = '/?page_id=19&filter=1&basic_skills=' + encodeURIComponent('[' + category + '] - ' + name),
        advancedUrl = '/?page_id=19&filter=1&advanced_skills=' + encodeURIComponent('[' + category + '] - ' + name);

    el.append(title, $('<hr>'), links);
    title.append($('<span class="skill-tag-tooltip-tag">&nbsp;</span>'));
    links.append(document.createTextNode('Search for users who are '), basicLink, document.createTextNode(' | '), advancedLink);

    basicLink
      .attr('href', basicUrl)
      .attr('target', '_blank')
      .text('Experienced\u00A0')
      .append($('<span class="fas fa-external-link-alt"></span>'));
    advancedLink
      .attr('href', advancedUrl)
      .attr('target', '_blank')
      .text('Expert\u00A0')
      .append($('<span class="fas fa-external-link-alt"></span>'));

    el.addClass('skill-tag-tooltip')
      .attr('data-category', category.toLowerCase())
      .attr('data-name', name);

    title.addClass('skill-tag-tooltip-title');
    links.addClass('skill-tag-tooltip-links');
    basicLink.addClass('skill-tag-tooltip-link skill-tag-tooltip-link-basic');
    advancedLink.addClass('skill-tag-tooltip-link skill-tag-tooltip-link-advanced');

    if (category == 'A') {
      title.addClass('skill-administration');
      title.append(document.createTextNode('\u00A0Admin and Management'));
    } else if (category == 'P') {
      title.addClass('skill-public');
      title.append(document.createTextNode('\u00A0Public and Access Services'));
    } else if (category == 'T') {
      title.addClass('skill-technical');
      title.append(document.createTextNode('\u00A0Technical Services'));
    } else if (category == 'S') {
      title.addClass('skill-systems');
      title.append(document.createTextNode('\u00A0Systems and Technology'));
    } else if (category == 'U') {
      title.addClass('skill-subject');
      title.append(document.createTextNode('\u00A0Subject Specialty'));
    } else if (category == 'C') {
      title.addClass('skill-scholarly');
      title.append(document.createTextNode('\u00A0Scholarly Communication'));
    } else {
      title.addClass('skill-unknown');
      title.append(document.createTextNode('\u00A0Unspecified category'));
    }

    return el;
  };

  loadScripts(['https://unpkg.com/popper.js/dist/umd/popper.min.js'], function() {
    loadScripts([
      'https://unpkg.com/tooltip.js/dist/umd/tooltip.min.js',
    ], function() {
      var container = $('#skill-tag-tooltips');

      if (!container.length) {
        container = $('<div id="skill-tag-tooltips"></div>');
      }

      $(document.body).append(container);

      // The tooltips don't seem to work in the grid layout that the editing page uses.
      $('.upme-field-value .skill-tag, .basic_skills .skill-tag, .advanced_skills .skill-tag').not('.upme-skills-values .skill-tag')
        .each(function (i, el) {
          $(el).removeAttr('title');

          var tooltip = new Tooltip(el, {
              title: buildSkillTooltip($(el).attr('data-category'), $(el).attr('data-name'))[0],
              container: '#skill-tag-tooltips',
              html: true,
              trigger: 'hover',
            });

          $(el).data('tooltip', tooltip);

          // $(el).on('click', function(event) {
          //     $(event.target).data('tooltip').show();
          //   });
          //
          // $(document).on('mousedown', function(event) {
          //   // If the tooltip is opening, don't close. (Shouldn't happen?)
          //   if (this._isOpening) {
          //     return;
          //   }
          //
          //   // If the click is in the tag or the tooltip, don't close.
          //   if (this.popperInstance && (this.reference.contains(event.target) || this.popperInstance.popper.contains(event.target))) {
          //     return;
          //   }
          //
          //   // Hide tooltip.
          //   this.hide()
          // }.bind(tooltip));
        })
    })
  });

  // ---------------------------------------------------------------------------
  // Little tweaks.
  // ---------------------------------------------------------------------------

  (function() {
    var emailFields = $('.upme-field[class*="email"] .upme-field-value, .vcard .email-wrapper');

    emailFields.each(function(i, s) {
      s = $(s);

      var wrapper = s.find('span'),
          emailAddress;

      if (wrapper.length) {
        emailAddress = wrapper.remove().text();
      } else {
        emailAddress = s.text();

        s.empty();
      }

      s.append($('<a></a>').text(emailAddress).attr('href', 'mailto:' + emailAddress));
    });

    var phoneFields = $('.upme-field[class*="phone"] .upme-field-value, .vcard .phone-wrapper');

    phoneFields.each(function(i, s) {
      s = $(s);

      var wrapper = s.find('span'),
          phoneNumber;

      if (wrapper.length) {
        phoneNumber = wrapper.remove().text();
      } else {
        phoneNumber = s.text();

        s.empty();
      }

      s.append($('<a></a>').text(phoneNumber).attr('href', 'tel:' + phoneNumber));
    });
  })();

});
