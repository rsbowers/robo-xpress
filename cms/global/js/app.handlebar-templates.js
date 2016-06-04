this["APP"] = this["APP"] || {};
this["APP"]["Templates"] = this["APP"]["Templates"] || {};

this["APP"]["Templates"]["did_you_mean_template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<p>Did you mean "
    + ((stack1 = ((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"query","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "?</p>";
},"useData":true});

this["APP"]["Templates"]["generated_linked_list"] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"og:title",{"name":"compare","hash":{},"fn":this.program(2, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                <a class=\"mdicon-linklist\" href=\""
    + alias2(alias1((depths[2] != null ? depths[2].U : depths[2]), depth0))
    + "\" >"
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\n                </a>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "    <li>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </li>\n";
},"useData":true,"useDepths":true});

this["APP"]["Templates"]["glossary_search_letter_section"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<section class=\"scroll-trans fade-in\" data-transition=\"fadeIn\">\n    <div id=\""
    + alias3(((helper = (helper = helpers.letter || (depth0 != null ? depth0.letter : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"letter","hash":{},"data":data}) : helper)))
    + "\" class=\"letter-section link-list\">\n        <h2 class=\"letter\">"
    + alias3(((helper = (helper = helpers.letter || (depth0 != null ? depth0.letter : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"letter","hash":{},"data":data}) : helper)))
    + "</h2>\n        <div class=\"table\">\n            <div class=\"col-double cell-f link-list-body\">\n                <ul class=\"item-container-first\"></ul>\n            </div>\n            <div class=\"col-double last cell-m last link-list-body\">\n                <ul class=\"item-container-last\"></ul>\n            </div>\n        </div>\n    </div>\n</section>";
},"useData":true});

this["APP"]["Templates"]["glossary_search_template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "                    <p>";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n";
},"2":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return " "
    + ((stack1 = ((helper = (helper = helpers.T || (depth0 != null ? depth0.T : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"T","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " ";
},"4":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"5":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"og:title",{"name":"compare","hash":{"operator":"==="},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"6":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"og:title",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"7":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "                                <p>";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n";
},"8":function(depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + " ";
},"10":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),(depths[1] != null ? depths[1].displaytag : depths[1]),{"name":"compare","hash":{"operator":"==="},"fn":this.program(11, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"11":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "                        <p class=\"search-result-details\">";
  stack1 = ((helper = (helper = helpers.replaceCommas || (depth0 != null ? depth0.replaceCommas : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"replaceCommas","hash":{},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.replaceCommas) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n";
},"12":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "");
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "<li class=\"glossary-search-result\">\n    <a class=\"mdicon-linklist\" href=\""
    + this.escapeExpression(((helper = (helper = helpers.U || (depth0 != null ? depth0.U : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"U","hash":{},"data":data}) : helper)))
    + "\">\n        <div class=\"glossary-search-title\">\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"og:title",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"og:title",{"name":"compare","hash":{"operator":"hasVariable"},"fn":this.program(4, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n        </div>\n        <div class=\"glossary-search-description\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(10, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n        </div>\n   </a>\n</li>";
},"useData":true,"useDepths":true});

this["APP"]["Templates"]["no_results_template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<p>No results found for "
    + ((stack1 = ((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"query","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>";
},"useData":true});

this["APP"]["Templates"]["related_posts_blogs"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return " href=\""
    + this.escapeExpression(((helper = (helper = helpers.U || (depth0 != null ? depth0.U : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"U","hash":{},"data":data}) : helper)))
    + "\"";
},"3":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"poster",{"name":"compare","hash":{"operator":"==="},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"imageThumb",{"name":"compare","hash":{"operator":"==="},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"4":function(depth0,helpers,partials,data) {
    var stack1;

  return "                <img src=\""
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + ".resize.110.110.high.jpg\" class=\"mda-hide-sm\">\n";
},"6":function(depth0,helpers,partials,data) {
    return "                <img src="
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + " class=\"mda-hide-sm\">\n";
},"8":function(depth0,helpers,partials,data) {
    var stack1;

  return "<p class=\"publish-date mda-hide-sm\">"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.FS : depth0)) != null ? stack1['@VALUE'] : stack1), depth0))
    + "</div>";
},"10":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"11":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"gsaentity_Categories",{"name":"compare","hash":{"operator":"==="},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"12":function(depth0,helpers,partials,data) {
    return "                    <p class=\"link-subtitle\">"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</p>\n";
},"14":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"og:title",{"name":"compare","hash":{"operator":"==="},"fn":this.program(15, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"15":function(depth0,helpers,partials,data) {
    var stack1;

  return "                <h4 class=\"link-title\">"
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + "</h4>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<li class=\"link\">\n    <a class = \"mdicon-linklist\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.U : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        "
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.FS : depth0)) != null ? stack1['@VALUE'] : stack1),{"name":"if","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0.MT : depth0),"Publication",{"name":"compare","hash":{"operator":"hasValue"},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </a>\n</li>";
},"useData":true});

this["APP"]["Templates"]["related_posts_news"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return " href=\""
    + this.escapeExpression(((helper = (helper = helpers.U || (depth0 != null ? depth0.U : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"U","hash":{},"data":data}) : helper)))
    + "\"";
},"3":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"poster",{"name":"compare","hash":{"operator":"==="},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"imageThumb",{"name":"compare","hash":{"operator":"==="},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"4":function(depth0,helpers,partials,data) {
    return "                <img src=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + ".resize.110.110.high.jpg\" class=\"mda-hide-sm\">\n";
},"6":function(depth0,helpers,partials,data) {
    return "                <img src="
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + " class=\"mda-hide-sm\">\n";
},"8":function(depth0,helpers,partials,data) {
    var stack1;

  return "<p class=\"publish-date mda-hide-sm\">"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.FS : depth0)) != null ? stack1['@VALUE'] : stack1), depth0))
    + "</div>";
},"10":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"11":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"gsaentity_Categories",{"name":"compare","hash":{"operator":"==="},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"12":function(depth0,helpers,partials,data) {
    return "                    <p class=\"link-subtitle\">"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</p>\n";
},"14":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"og:title",{"name":"compare","hash":{"operator":"==="},"fn":this.program(15, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"15":function(depth0,helpers,partials,data) {
    var stack1;

  return "                <h4 class=\"link-title\">"
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + "</h4>\n";
},"17":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"description",{"name":"compare","hash":{"operator":"==="},"fn":this.program(18, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"18":function(depth0,helpers,partials,data) {
    var stack1;

  return "                <p class=\"link-body mda-hide-sm\">\n                    "
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + "\n                </p>\n";
},"20":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "            <p class=\"link-body mda-hide-sm\">";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(21, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n";
},"21":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return " "
    + ((stack1 = ((helper = (helper = helpers.S || (depth0 != null ? depth0.S : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"S","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return "<li class=\"link\">\n    <a class = \"mdicon-linklist\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.U : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        "
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.FS : depth0)) != null ? stack1['@VALUE'] : stack1),{"name":"if","hash":{},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"Publication",{"name":"compare","hash":{"operator":"hasValue"},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(17, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"description",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(20, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </a>\n</li>";
},"useData":true});

this["APP"]["Templates"]["related_posts_publication"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var helper;

  return " href=\""
    + this.escapeExpression(((helper = (helper = helpers.U || (depth0 != null ? depth0.U : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"U","hash":{},"data":data}) : helper)))
    + "\"";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"publication",{"name":"compare","hash":{"operator":"==="},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"4":function(depth0,helpers,partials,data) {
    return "                <p class=\"link-subtitle\">"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</p>\n";
},"6":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"og:title",{"name":"compare","hash":{"operator":"==="},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"7":function(depth0,helpers,partials,data) {
    var stack1;

  return "                <h4 class=\"link-title\">"
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + "</h4>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<li class=\"link\">\n    <a class = \"mdicon-linklist\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.U : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </a>\n</li>";
},"useData":true});

this["APP"]["Templates"]["related_searches_template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "\n    <a href=\"/en/search-results.html?q="
    + alias2(alias1((depth0 != null ? depth0['@q'] : depth0), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0['#text'] : depth0), depth0))
    + "</a> ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"mda-related-searches\">\n    <h3 class=\"mda-related-search-header\">${properties.relatedSearchLabel}</h3> "
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.Synonyms : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n</div>";
},"useData":true});

this["APP"]["Templates"]["resource_center_large"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "video";
},"3":function(depth0,helpers,partials,data) {
    return "small";
},"5":function(depth0,helpers,partials,data) {
    return "background red";
},"7":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"videotype",{"name":"compare","hash":{"operator":"==="},"fn":this.program(8, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"8":function(depth0,helpers,partials,data) {
    return "             data-videoType=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\"\n";
},"10":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"videoId",{"name":"compare","hash":{"operator":"==="},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            ";
},"11":function(depth0,helpers,partials,data) {
    return "             data-videoId=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\"\n";
},"13":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"14":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"poster",{"name":"compare","hash":{"operator":"==="},"fn":this.program(15, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"15":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"poster",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(16, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"16":function(depth0,helpers,partials,data) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                            <picture>\n                                <!--[if IE 9]>\n                                <video style=\"display: none;\"><![endif]-->\n                                <source srcset=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + ".resize.344.194.high.jpg 1x , "
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + ".resize.688.388.high.jpg 2x\"\n                                        alt=\"\" media=\"(min-width: 993px)\">\n                                <source srcset=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + ".resize.431.387.high.jpg\" alt=\"\"\n                                        media=\"(min-width: 753px)\">\n                                <!--[if IE 9]></video><![endif]-->\n                                <img src=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + ".resize.180.180.high.jpg\"\n                                     srcset=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + ".resize.180.180.high.jpg 1x, "
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + ".resize.360.360.high.jpg 2x\"\n                                     alt=\"\">\n                            </picture>\n";
},"18":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(19, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"19":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"poster",{"name":"compare","hash":{"operator":"==="},"fn":this.program(20, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"20":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"poster",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(21, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"21":function(depth0,helpers,partials,data) {
    return "                            <div class=\"image-container\">\n                                <img src=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\" alt=\"\">\n                            </div>\n";
},"23":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(24, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"24":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"publication",{"name":"compare","hash":{"operator":"==="},"fn":this.program(25, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"25":function(depth0,helpers,partials,data) {
    return "                            <span class=\"category\">"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</span>\n";
},"27":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"blogname",{"name":"compare","hash":{"operator":"==="},"fn":this.program(28, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"28":function(depth0,helpers,partials,data) {
    return "                        <span class=\"category\">"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</span>\n";
},"30":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "                    <div class=\"blog-title\"><p>";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(31, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p></div>\n";
},"31":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return " "
    + ((stack1 = ((helper = (helper = helpers.T || (depth0 != null ? depth0.T : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"T","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " ";
},"33":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"title",{"name":"compare","hash":{"operator":"==="},"fn":this.program(34, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"34":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "                        <div class=\"blog-title\"><p>";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(35, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p></div>\n";
},"35":function(depth0,helpers,partials,data) {
    var stack1;

  return " "
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + " ";
},"37":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"author",{"name":"compare","hash":{"operator":"==="},"fn":this.program(38, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"38":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"author",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(39, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"39":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "                            <span class=\"summary-author-info\">\n                        <p class=\"author-name\">By <span>"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</span></p>\n"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depths[2] != null ? depths[2].FS : depths[2])) != null ? stack1['@VALUE'] : stack1),{"name":"if","hash":{},"fn":this.program(40, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "                        </span>\n";
},"40":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "                                    <p class=\"author-date\">"
    + this.escapeExpression(this.lambda(((stack1 = (depths[2] != null ? depths[2].FS : depths[2])) != null ? stack1['@VALUE'] : stack1), depth0))
    + "</p>\n";
},"42":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"description",{"name":"compare","hash":{"operator":"==="},"fn":this.program(43, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"43":function(depth0,helpers,partials,data) {
    var stack1;

  return "                        <p class=\"summary-text\">\n                            "
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + "\n                        </p>\n";
},"45":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "                    <p class=\"summary-text\">\n                        ";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(46, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n                    </p>\n";
},"46":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return " "
    + ((stack1 = ((helper = (helper = helpers.S || (depth0 != null ? depth0.S : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"S","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " ";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "<div class=\"cell-inner-f cell-full-height\">\n    <div class=\"module\">\n        <a href=\""
    + this.escapeExpression(((helper = (helper = helpers.U || (depth0 != null ? depth0.U : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"U","hash":{},"data":data}) : helper)))
    + "\" class=\"blog-summary "
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"videotype",{"name":"compare","hash":{"operator":"hasVariable"},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"poster",{"name":"compare","hash":{"operator":"hasVariable"},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " "
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"poster",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(5, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\"\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(7, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(10, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"videotype",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(13, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"videotype",{"name":"compare","hash":{"operator":"hasVariable"},"fn":this.program(18, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            <div class=\"blog-summary-wrapper\">\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"publication",{"name":"compare","hash":{"operator":"hasValue"},"fn":this.program(23, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(27, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"title",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(30, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(33, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(37, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(42, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"description",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(45, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </div>\n        </a>\n    </div>\n</div>";
},"useData":true,"useDepths":true});

this["APP"]["Templates"]["resource_center_small"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "video";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"videotype",{"name":"compare","hash":{"operator":"==="},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"4":function(depth0,helpers,partials,data) {
    return "     data-videoType=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\"\n";
},"6":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"videoId",{"name":"compare","hash":{"operator":"==="},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    ";
},"7":function(depth0,helpers,partials,data) {
    return "     data-videoId=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\"\n";
},"9":function(depth0,helpers,partials,data) {
    var stack1;

  return "            <span class=\"date\">"
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.FS : depth0)) != null ? stack1['@VALUE'] : stack1), depth0))
    + "</span>\n";
},"11":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "            <span class=\"title\">";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</span>\n";
},"12":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return " "
    + ((stack1 = ((helper = (helper = helpers.T || (depth0 != null ? depth0.T : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"T","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " ";
},"14":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"title",{"name":"compare","hash":{"operator":"==="},"fn":this.program(15, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"15":function(depth0,helpers,partials,data) {
    var stack1;

  return "                <span class=\"title\">"
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + "</span>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2=this.escapeExpression, alias3=this.lambda;

  return "<div class=\"collection-item  "
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"videotype",{"name":"compare","hash":{"operator":"hasVariable"},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\"\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(6, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\n    <a href=\""
    + alias2(((helper = (helper = helpers.U || (depth0 != null ? depth0.U : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"U","hash":{},"data":data}) : helper)))
    + "\">\n        <div class=\"icon "
    + alias2(alias3((depth0 != null ? depth0['icon-color'] : depth0), depth0))
    + "\"><i class=\"fa "
    + alias2(alias3((depth0 != null ? depth0.icon : depth0), depth0))
    + "\"></i></div>\n"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.FS : depth0)) != null ? stack1['@VALUE'] : stack1),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"title",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    </a>\n</div>";
},"useData":true});

this["APP"]["Templates"]["search_filter_checkbox_template"] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                <li>\n                    <input class=\"search-filter-check\" data-facetname=\""
    + alias2(alias1((depths[1] != null ? depths[1]['@NM'] : depths[1]), depth0))
    + "\" type=\"checkbox\" id=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\" name=\""
    + alias2(alias1((depths[1] != null ? depths[1]['@DN'] : depths[1]), depth0))
    + "\" value=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\"/>\n                    <label for=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\" onclick=\"javascript:void(0);\"></label><i class=\"fa fa-check\"></i><span class=\"option-text\">"
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</span>\n                </li>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper;

  return "<div class=\"mda-custom-dd style2 extended\">\n    <h2><a class=\"mda-custom-dd-link\"><span>"
    + this.escapeExpression(((helper = (helper = helpers['@DN'] || (depth0 != null ? depth0['@DN'] : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"@DN","hash":{},"data":data}) : helper)))
    + "</span><i class=\"fa fa-chevron-down dd-extended-icon\"></i><i class=\"fa fa-chevron-right dd-collapsed-icon\"></i></a></h2>\n    <div class=\"md-check\">\n        <ul class=\"mda-custom-dd-list\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.PV : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </ul>\n    </div>\n</div>";
},"useData":true,"useDepths":true});

this["APP"]["Templates"]["search_filter_radio_template"] = Handlebars.template({"1":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "                    <li>\n                        <input class=\"search-filter-radio\" data-facetname=\""
    + alias2(alias1((depths[1] != null ? depths[1]['@NM'] : depths[1]), depth0))
    + "\" type=\"radio\" id=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\" name=\""
    + alias2(alias1((depths[1] != null ? depths[1]['@DN'] : depths[1]), depth0))
    + "\" value=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\" "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.checked : depth0),{"name":"if","hash":{},"fn":this.program(2, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ">\n                        <label for=\""
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\" onclick=\"javascript:void(0);\"></label><span class=\"filter-radio-button\"><span class=\"inner\"></span></span><span class=\"option-text\">"
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</span>\n                    </li>\n";
},"2":function(depth0,helpers,partials,data) {
    return "checked";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<div class=\"mda-custom-dd style2 extended\">\n    <h2><a class=\"mda-custom-dd-link\"><span>"
    + alias3(((helper = (helper = helpers['@DN'] || (depth0 != null ? depth0['@DN'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"@DN","hash":{},"data":data}) : helper)))
    + "</span><i class=\"fa fa-minus dd-extended-icon\"></i><i class=\"fa fa-plus dd-collapsed-icon\"></i></a></h2>\n    <div class=\"md-radio style1\">\n        <form action=\"\">\n            <ul class=\"mda-custom-dd-list\">\n                <li>\n                    <input class=\"search-filter-radio\" data-facetname=\""
    + alias3(this.lambda((depths[1] != null ? depths[1]['@NM'] : depths[1]), depth0))
    + "\" type=\"radio\" id=\"allresults"
    + alias3(((helper = (helper = helpers['@NM'] || (depth0 != null ? depth0['@NM'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"@NM","hash":{},"data":data}) : helper)))
    + "\" name=\""
    + alias3(((helper = (helper = helpers['@DN'] || (depth0 != null ? depth0['@DN'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"@DN","hash":{},"data":data}) : helper)))
    + "\" value=\"allresults\" checked>\n                    <label for=\"allresults"
    + alias3(((helper = (helper = helpers['@NM'] || (depth0 != null ? depth0['@NM'] : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"@NM","hash":{},"data":data}) : helper)))
    + "\" onclick=\"javascript:void(0);\"></label><span class=\"filter-radio-button\"><span class=\"inner\"></span></span><span class=\"option-text\">All Results</span>\n                </li>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.PV : depth0),{"name":"each","hash":{},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </ul>\n        </form>\n    </div>\n</div>";
},"useData":true,"useDepths":true});

this["APP"]["Templates"]["search_instead_template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<p>Show results for "
    + ((stack1 = ((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"query","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " instead</p>";
},"useData":true});

this["APP"]["Templates"]["search_results_template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "video";
},"3":function(depth0,helpers,partials,data) {
    var stack1;

  return "\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"videotype",{"name":"compare","hash":{"operator":"==="},"fn":this.program(4, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"4":function(depth0,helpers,partials,data) {
    return "     data-videoType=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\"\n";
},"6":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"videoId",{"name":"compare","hash":{"operator":"==="},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    ";
},"7":function(depth0,helpers,partials,data) {
    return "     data-videoId=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\"\n";
},"9":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"poster",{"name":"compare","hash":{"operator":"==="},"fn":this.program(10, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"10":function(depth0,helpers,partials,data) {
    return "            <div class=\"search-result-img\"><img src=\""
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "\"/></div>\n";
},"12":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"content-type",{"name":"compare","hash":{"operator":"==="},"fn":this.program(13, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"videotype",{"name":"compare","hash":{"operator":"==="},"fn":this.program(20, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"13":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"PDF",{"name":"compare","hash":{"operator":"contains"},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"pdf",{"name":"compare","hash":{"operator":"contains"},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"Power Point",{"name":"compare","hash":{"operator":"contains"},"fn":this.program(16, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"docx",{"name":"compare","hash":{"operator":"contains"},"fn":this.program(18, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"14":function(depth0,helpers,partials,data) {
    return "                        <i class=\"fa fa-file-pdf-o\"></i>\n";
},"16":function(depth0,helpers,partials,data) {
    return "                        <i class=\"fa fa-file-powerpoint-o\"></i>\n";
},"18":function(depth0,helpers,partials,data) {
    return "                        <i class=\"fa fa-file-word-o\"></i>\n";
},"20":function(depth0,helpers,partials,data) {
    return "                    <i class=\"fa fa-file-video-o\"></i>\n";
},"22":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"title",{"name":"compare","hash":{"operator":"hasVariable"},"fn":this.program(23, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"title",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(32, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"23":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(24, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"24":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"title",{"name":"compare","hash":{"operator":"==="},"fn":this.program(25, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"25":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depths[4] != null ? depths[4]['@MIME'] : depths[4]),"application/pdf",{"name":"compare","hash":{"operator":"==="},"fn":this.program(26, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depths[4] != null ? depths[4]['@MIME'] : depths[4]),"application/pdf",{"name":"compare","hash":{"operator":"!=="},"fn":this.program(29, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"26":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"title",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(27, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"27":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                                    <a href=\""
    + alias2(alias1((depths[4] != null ? depths[4].U : depths[4]), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</a>\n";
},"29":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"title",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(30, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"30":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                                    <a href=\""
    + alias2(alias1((depths[4] != null ? depths[4].U : depths[4]), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</a>\n";
},"32":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@MIME'] : depth0),"application/pdf",{"name":"compare","hash":{"operator":"==="},"fn":this.program(33, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@MIME'] : depth0),"application/pdf",{"name":"compare","hash":{"operator":"!=="},"fn":this.program(36, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"33":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", buffer = 
  "                        <a href=\""
    + this.escapeExpression(((helper = (helper = helpers.U || (depth0 != null ? depth0.U : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"U","hash":{},"data":data}) : helper)))
    + "\" target=\"_blank\">";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : alias1),(options={"name":"htmlDecode","hash":{},"fn":this.program(34, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a>\n";
},"34":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return " "
    + ((stack1 = ((helper = (helper = helpers.T || (depth0 != null ? depth0.T : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"T","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " ";
},"36":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", buffer = 
  "                        <a href=\""
    + this.escapeExpression(((helper = (helper = helpers.U || (depth0 != null ? depth0.U : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"U","hash":{},"data":data}) : helper)))
    + "\">";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : alias1),(options={"name":"htmlDecode","hash":{},"fn":this.program(34, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</a>\n";
},"38":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(39, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"39":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"og:title",{"name":"compare","hash":{"operator":"==="},"fn":this.program(40, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"40":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@MIME'] : depth0),"application/pdf",{"name":"compare","hash":{"operator":"==="},"fn":this.program(41, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@MIME'] : depth0),"application/pdf",{"name":"compare","hash":{"operator":"!=="},"fn":this.program(44, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"41":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"og:title",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(42, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"42":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                                <a href=\""
    + alias2(alias1((depths[4] != null ? depths[4].U : depths[4]), depth0))
    + "\" target=\"_blank\">"
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</a>\n";
},"44":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"og:title",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(45, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"45":function(depth0,helpers,partials,data,blockParams,depths) {
    var alias1=this.lambda, alias2=this.escapeExpression;

  return "                                <a href=\""
    + alias2(alias1((depths[4] != null ? depths[4].U : depths[4]), depth0))
    + "\">"
    + alias2(alias1((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</a>\n";
},"47":function(depth0,helpers,partials,data) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"publication",{"name":"compare","hash":{"operator":"==="},"fn":this.program(48, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"blogname",{"name":"compare","hash":{"operator":"==="},"fn":this.program(48, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"phase",{"name":"compare","hash":{"operator":"==="},"fn":this.program(48, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"48":function(depth0,helpers,partials,data) {
    return "                <div class=\"search-result-subtitle\">"
    + this.escapeExpression(this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0))
    + "</div>\n";
},"50":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"Phase",{"name":"compare","hash":{"operator":"==="},"fn":this.program(48, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"52":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"description",{"name":"compare","hash":{"operator":"==="},"fn":this.program(53, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"53":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"description",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(54, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"description",{"name":"compare","hash":{"operator":"empty"},"fn":this.program(56, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"54":function(depth0,helpers,partials,data) {
    var stack1;

  return "                    <p class=\"search-result-details\">\n                        "
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + "\n                    </p>\n";
},"56":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, options, buffer = 
  "                    <p class=\"search-result-details\">";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(57, data, 0, blockParams, depths),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n";
},"57":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return " "
    + ((stack1 = this.lambda((depths[4] != null ? depths[4].S : depths[4]), depth0)) != null ? stack1 : "")
    + " ";
},"59":function(depth0,helpers,partials,data) {
    var stack1, helper, options, buffer = 
  "            <p class=\"search-result-details\">";
  stack1 = ((helper = (helper = helpers.htmlDecode || (depth0 != null ? depth0.htmlDecode : depth0)) != null ? helper : helpers.helperMissing),(options={"name":"htmlDecode","hash":{},"fn":this.program(60, data, 0),"inverse":this.noop,"data":data}),(typeof helper === "function" ? helper.call(depth0,options) : helper));
  if (!helpers.htmlDecode) { stack1 = helpers.blockHelperMissing.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "</p>\n";
},"60":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return " "
    + ((stack1 = ((helper = (helper = helpers.S || (depth0 != null ? depth0.S : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"S","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + " ";
},"62":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"blog_date",{"name":"compare","hash":{"operator":"==="},"fn":this.program(63, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@N'] : depth0),"pagetype",{"name":"compare","hash":{"operator":"==="},"fn":this.program(66, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"63":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || helpers.helperMissing).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"blog_date",{"name":"compare","hash":{"operator":"notEmpty"},"fn":this.program(64, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"64":function(depth0,helpers,partials,data) {
    var stack1;

  return "                    <div class=\"search-result-date\">\n                        "
    + ((stack1 = this.lambda((depth0 != null ? depth0['@V'] : depth0), depth0)) != null ? stack1 : "")
    + "\n                    </div>\n";
},"66":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, alias1=helpers.helperMissing;

  return ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"clinical trial",{"name":"compare","hash":{"operator":"contains"},"fn":this.program(67, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"news articles",{"name":"compare","hash":{"operator":"contains"},"fn":this.program(67, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0['@V'] : depth0),"publication",{"name":"compare","hash":{"operator":"contains"},"fn":this.program(67, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"67":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1;

  return "                    <div class=\"search-result-date\">"
    + this.escapeExpression(this.lambda(((stack1 = (depths[3] != null ? depths[3].FS : depths[3])) != null ? stack1['@VALUE'] : stack1), depth0))
    + "</div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data,blockParams,depths) {
    var stack1, helper, alias1=helpers.helperMissing;

  return "<div class=\"search-result "
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"videotype",{"name":"compare","hash":{"operator":"hasVariable"},"fn":this.program(1, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\" "
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(3, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(6, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + " data-index=\""
    + this.escapeExpression(((helper = (helper = helpers['@N'] || (depth0 != null ? depth0['@N'] : depth0)) != null ? helper : alias1),(typeof helper === "function" ? helper.call(depth0,{"name":"@N","hash":{},"data":data}) : helper)))
    + "\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(9, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "    <div class=\"search-result-details\">\n        <div class=\"search-result-title\">\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(12, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"og:title",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(22, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"og:title",{"name":"compare","hash":{"operator":"hasVariable"},"fn":this.program(38, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "        </div>\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(47, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(50, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(52, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n"
    + ((stack1 = (helpers.compare || (depth0 && depth0.compare) || alias1).call(depth0,(depth0 != null ? depth0.MT : depth0),"description",{"name":"compare","hash":{"operator":"!hasVariable"},"fn":this.program(59, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.MT : depth0),{"name":"each","hash":{},"fn":this.program(62, data, 0, blockParams, depths),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n\n    </div>\n</div>";
},"useData":true,"useDepths":true});

this["APP"]["Templates"]["showing_results_template"] = Handlebars.template({"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<p>Showing results for "
    + ((stack1 = ((helper = (helper = helpers.query || (depth0 != null ? depth0.query : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"query","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</p>";
},"useData":true});

this["APP"]["Templates"]["suggested_results_template"] = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "no-img";
},"3":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"search-result-img\"><img src=\""
    + this.escapeExpression(((helper = (helper = helpers.imageThumb || (depth0 != null ? depth0.imageThumb : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"imageThumb","hash":{},"data":data}) : helper)))
    + "\"/></div>";
},"5":function(depth0,helpers,partials,data) {
    var helper;

  return "<i class=\"fa "
    + this.escapeExpression(((helper = (helper = helpers.icon || (depth0 != null ? depth0.icon : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"icon","hash":{},"data":data}) : helper)))
    + "\"></i> ";
},"7":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"search-result-subtitle\">"
    + this.escapeExpression(((helper = (helper = helpers.subtitle || (depth0 != null ? depth0.subtitle : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"subtitle","hash":{},"data":data}) : helper)))
    + "</div>";
},"9":function(depth0,helpers,partials,data) {
    var helper;

  return "<div class=\"search-result-date\">"
    + this.escapeExpression(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"date","hash":{},"data":data}) : helper)))
    + "</div>";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "<a href=\""
    + alias3(((helper = (helper = helpers.GL || (depth0 != null ? depth0.GL : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"GL","hash":{},"data":data}) : helper)))
    + "\" class=\"search-result mdicon-linklist "
    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.imageThumb : depth0),{"name":"unless","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">\n    "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.imageThumb : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n    <div class=\"search-result-details\">\n        <div class=\"search-result-title "
    + ((stack1 = helpers.unless.call(depth0,(depth0 != null ? depth0.imageThumb : depth0),{"name":"unless","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.icon : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + alias3(((helper = (helper = helpers.GD || (depth0 != null ? depth0.GD : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"GD","hash":{},"data":data}) : helper)))
    + "</div>\n        "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.subtitle : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n        <div class=\"search-result-desc\">"
    + alias3(((helper = (helper = helpers.desc || (depth0 != null ? depth0.desc : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"desc","hash":{},"data":data}) : helper)))
    + "</div>\n        "
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.date : depth0),{"name":"if","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n    </div>\n</a>";
},"useData":true});