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

  // Set up associative array of categories and abbreviations.
  window.skillCategories = {
    'A': 'Admin and Management',
    'P': 'Public and Access Services',
    'T': 'Technical Services',
    'S': 'Systems and Technology',
    'U': 'Subject Specialty',
    'C': 'Scholarly Communication',
  };

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

  loadScripts(['https://use.fontawesome.com/releases/v5.6.3/js/all.js'], function() {});

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
        filterFields = $('#wrap_description, #wrap_palni_institution, #wrap_basic_skills, #wrap_advanced_skills, #wrap_learn_skills').appendTo(filtersWrapper),
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

    if (skillCategories[bits[1]]) {
      el.attr('title', skillCategories[bits[1]]);
    } else {
      el.attr('title', 'Unspecified category');
    }

    if (bits[1] == 'A') {
      el.addClass('skill-administration');
    } else if (bits[1] == 'P') {
      el.addClass('skill-public');
    } else if (bits[1] == 'T') {
      el.addClass('skill-technical');
    } else if (bits[1] == 'S') {
      el.addClass('skill-systems');
    } else if (bits[1] == 'U') {
      el.addClass('skill-subject');
    } else if (bits[1] == 'C') {
      el.addClass('skill-scholarly');
    } else {
      el.addClass('skill-unknown');
    }

    // Add icons to priority skills.
    // (This is similar to the code that adds icons to skills that have been searched for on the directory page.)
    if (prioritySkills.includes(bits[2])) {
     el.addClass('skill-tag-priority').prepend($('<i class="fas fa-star"></i>'));
    };

    return el;
  };

  makeSkillTags($('.upme-view.upme-basic_skills .upme-field-value, .basic_skills'));
  makeSkillTags($('.upme-view.upme-advanced_skills .upme-field-value, .advanced_skills'));
  makeSkillTags($('.upme-view.upme-learn_skills .upme-field-value, .learn_skills'));

  // ---------------------------------------------------------------------------
  // Rewrite the directory table.
  // ---------------------------------------------------------------------------

  (function() {
    // Set some things up.
    var directory = $('#usertable');

    if (directory.length) {
      // We'll want this later.
      // Move priority and search skill tags to the beginning of the list.
      // Truncate list and add link to expand.
      var emphasizeSkillTags = function(container) {
        container = $(container);

        container
          .find('.skill-tag-priority')
          .insertAfter(container.find('.small-screen-label'));

        container
          .find('.skill-tag-search')
          .insertAfter(container.find('.small-screen-label'));

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

      // Rewrite the table as nested divs.
      // Add class names to the table objects that don't have one.
      directory.find('tbody').addClass('tbody');
      directory.find('tr').addClass('tr');

      var newDirectory = $('<div></div>').attr('id', 'usertable').addClass('widefat userlist');

      newDirectory.append(directory.contents());

      directory.before(newDirectory).remove();

      var directoryTableElements = newDirectory.find('thead, tbody, tr, th, td');

      directoryTableElements.each(function(i, s) {
        s = $(s);

        var newElement = $('<div></div>');

        newElement.attr('id', s.attr('id'));
        newElement.attr('class', s.attr('class'));
        newElement.attr('style', s.attr('style'));

        s.before(newElement.append(s.contents())).remove();
      });

      directory = newDirectory;

      // Get searched and filtered skill selectors.
      var searchFragment = $('#search-input').val() || '',
          basicFilterValue = $('#filter_basic_skills').val() || '',
          advancedFilterValue = $('#filter_advanced_skills').val() || '';

       var searchFragmentSelector = '',
          basicFilterSelector = '',
          advancedFilterSelector = '',
          skillSearchSelector = [];

      var basicFilterValueBits = basicFilterValue.split(/\s?\[?(\w)\] - /),
          advancedFilterValueBits = advancedFilterValue.split(/\s?\[?(\w)\] - /);

      searchFragmentSelector = '.skill-tag[data-name*="' + searchFragment.replace(/"/g, '') + '"]';

      skillSearchSelector.push(searchFragmentSelector);

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
      directory.find('.th7 a, .th8 a, .th9 a').removeAttr('href');

      // Add labels for skill fields for small-screen view.
      var basicSkillsName = $('.th7 a').text(),
          learnSkillsName = $('.th9 a').text(),
          advancedSkillsName = $('.th8 a').text();

      directory.find('.td7:not(:empty)').prepend(
        $('<span></span>')
          .addClass('small-screen-label')
          .text(basicSkillsName)
      );

      directory.find('.td8:not(:empty)').prepend(
        $('<span></span>')
          .addClass('small-screen-label')
          .text(advancedSkillsName)
      );
      
      directory.find('.td9:not(:empty)').prepend(
        $('<span></span>')
          .addClass('small-screen-label')
          .text(learnSkillsName)
      );

      // Go row by row.
      directory.find('.tbody .tr').each(function(i, row) {
        row = $(row);

        // Collect avatar, title, institution, email, and phone number into 'Name' cell.
        var avatar = row.find('img.avatar'),
            name = row.find('.display_name'),
            title = row.find('.description').remove().text().trim(),
            institution = row.find('.palni_institution').remove().text().trim(),
            email = row.find('.upme_work_email').remove().text().trim(),
            phone = row.find('.contact_phone').remove().text().trim();

        row.find('.td.avatar').remove();

        name.append(avatar.addClass('jsd'));

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
            searchSkillTags = row.find(skillSearchSelector),
            emphasizedSkillTags = $('.skill-tag-priority').add(searchSkillTags);

        // Add icons to the searched skill (if there is one).
        searchSkillTags.each(function(i, s) {
          $(s).addClass('skill-tag-search').prepend($('<i class="fas fa-search"></i>'));
        });

        emphasizeSkillTags(row.find('.basic_skills'));
        emphasizeSkillTags(row.find('.advanced_skills'));
        emphasizeSkillTags(row.find('.learn_skills'));
      });

      // While we're here, let's make the filter options more readable.
      $('#filter_basic_skills option:not([value=""]), #filter_advanced_skills option:not([value=""]), #filter_learn_skills option:not([value=""])').each(
        function(i, s) {
          s = $(s);

          var bits = s.text().split(/\s?\[?(\w)\] - /),
              label = '';

          if (bits[2]) {
            label = bits[2];
          }

          if (skillCategories[bits[1]]) {
            label += ' [' + skillCategories[bits[1]] + ']';
          }

          if (label) {
            s.text(label);
          }
        }
      );
    }
  })();

  // ---------------------------------------------------------------------------
  // Rewrite the profile edit page.
  // ---------------------------------------------------------------------------

  (function() {
    if ($('.upme-edit label').length) {
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
    }
  })();

  // ---------------------------------------------------------------------------
  // Add tooltips to skill tags.
  // ---------------------------------------------------------------------------

  var buildSkillTooltip = function(category, name) {
    category = category.toUpperCase();

    var el = $('<span></span>'),
        title = $('<span></span>'),
        links = $('<span></span>'),
        basicLink = $('<a></a>'),
        advancedLink = $('<a></a>'),
        learnLink = $('<a></a>'),
        prioritySkillNote = $('<span><i class="fas fa-star"></i>\u00A0This skill is a priority skill.</span>');

    var basicUrl = '/?page_id=19&filter=1&basic_skills=' + encodeURIComponent('[' + category + '] - ' + name),
        advancedUrl = '/?page_id=19&filter=1&advanced_skills=' + encodeURIComponent('[' + category + '] - ' + name),
        learnUrl = '/?page_id=19&filter=1&learn_skills=' + encodeURIComponent('[' + category + '] - ' + name);
    

    el.append(title, $('<hr>'), links);
    title.append($('<span class="skill-tag-tooltip-tag">&nbsp;</span>'));
    links.append(document.createTextNode('Search for users who are '), basicLink, document.createTextNode(' | '), advancedLink, document.createTextNode(' | '), learnLink);

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
    learnLink
      .attr('href', learnUrl)
      .attr('target', '_blank')
      .text('Want to Learn\u00A0')
      .append($('<span class="fas fa-external-link-alt"></span>'));

    if (prioritySkills.includes(name)) {
      el.append($('<hr>'), prioritySkillNote);
    }

    el.addClass('skill-tag-tooltip')
      .attr('data-category', category.toLowerCase())
      .attr('data-name', name);

    title.addClass('skill-tag-tooltip-title');
    links.addClass('skill-tag-tooltip-links');
    basicLink.addClass('skill-tag-tooltip-link skill-tag-tooltip-link-basic');
    advancedLink.addClass('skill-tag-tooltip-link skill-tag-tooltip-link-advanced');
    learnLink.addClass('skill-tag-tooltip-link skill-tag-tooltip-link-learn');
    prioritySkillNote.addClass('skill-tag-tooltip-priority-skill-note');

    if (skillCategories[category]) {
      title.append(document.createTextNode('\u00A0' + skillCategories[category]));
    } else {
      title.append(document.createTextNode('\u00A0Unspecified category'));
    }

    if (category == 'A') {
      title.addClass('skill-administration');
    } else if (category == 'P') {
      title.addClass('skill-public');
    } else if (category == 'T') {
      title.addClass('skill-technical');
    } else if (category == 'S') {
      title.addClass('skill-systems');
    } else if (category == 'U') {
      title.addClass('skill-subject');
    } else if (category == 'C') {
      title.addClass('skill-scholarly');
    } else {
      title.addClass('skill-unknown');
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
      $('.upme-field-value .skill-tag, .basic_skills .skill-tag, .advanced_skills .skill-tag, .learn_skills .skill-tag').not('.upme-skills-values .skill-tag')
        .each(function (i, el) {
          $(el).removeAttr('title');

          var tooltip = new Tooltip(el, {
              title: buildSkillTooltip($(el).attr('data-category'), $(el).attr('data-name'))[0],
              container: '#skill-tag-tooltips',
              html: true,
              trigger: 'hover',
              closeOnClickOutside: true,
            });

          $(el).data('tooltip', tooltip);
        });
    });
  });

  // ---------------------------------------------------------------------------
  // Little tweaks.
  // ---------------------------------------------------------------------------

  (function() {
    // Make email, telephone, and Discourse fields links.
    var emailFields = $('.upme-view.upme-field[class*="email"] .upme-field-value, .vcard .email-wrapper');

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

    var phoneFields = $('.upme-view.upme-field[class*="phone"] .upme-field-value, .vcard .phone-wrapper');

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

    var discourseFields = $('.upme-view.upme-field[class~="upme-discourse_community_url"] .upme-field-value');

    // Probably only one, but why not.
    discourseFields.each(function(i, s) {
      s = $(s);

      var wrapper = s.find('span'),
          discourseUrl;

      if (wrapper.length) {
        discourseUrl = wrapper.remove().text();
      } else {
        discourseUrl = s.text();

        s.empty();
      }

      s.append(
        $('<a></a>')
          .text(discourseUrl)
          .attr('href', discourseUrl)
          .attr('rel', 'external nofollow')
          .attr('target', '_blank')
      );
    })

    // Mark links with `target="_blank"` with external link icon.
    $('a[target="_blank"]').each(function(i, s) {
      $(s).append(document.createTextNode('\u00A0')).append($('<span class="fas fa-external-link-alt"></span>'));
    });
  })();

  // ---------------------------------------------------------------------------
  // Testing.
  // ---------------------------------------------------------------------------

  (function() {

  })();

});