(this["webpackJsonprakuten-mall-sp-searchbox"]=this["webpackJsonprakuten-mall-sp-searchbox"]||[]).push([[0],{34:function(e,t,n){},35:function(e,t,n){"use strict";n.r(t);var c=n(3),r=n(7),a=n.n(r),s=n(24),o=n.n(s),i=n(18),u=n(37),l=n(17),d=n(21),h=n(20),g=n(2),b=function(e){for(var t="",n="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",c=n.length,r=0;r<e;r++)t+=n.charAt(Math.floor(Math.random()*c));return t},p=n(12),j=d.a.cancel,_={initial:"close",id:"search-box-modal",states:{open:Object(l.a)({exit:"cleanSuggestion",entry:["resetInputValue","resetSearchMode"]},{initial:"idle",on:{GET_SUGGESTIONS:{target:".fetching"},TOGGLE_DEBOUCING_INPUT:[{cond:"withKeywordEventValue",target:".deboucingInput",actions:["cancelSearch","sendSearchEventAfterDelay","setInputValue"]},{target:".idle",actions:["cancelSearch","cleanSuggestion","setInputValue"]}],TOGGLE_CLEAN:{actions:["cleanSuggestion","cleanInputValue"]},CHANGE_SEARCH_MODE:{actions:"setSearchMode"},CANCEL_SEARCH:{target:"close"},DO_SEARCH:{target:"close",actions:["setKeyword","setFilter"]}},states:{idle:{},deboucingInput:{entry:"cleanSuggestion"},fetching:{entry:"cleanSuggestionError",invoke:{id:"fetch-suggestion",src:"fetchSuggestion",onDone:[{cond:"withInputValue",target:"idle",actions:"setSuggestions"},{target:"idle"}],onError:{target:"error",actions:["setSuggestionError"]}}},error:{}}}),close:{on:{OPEN_SEARCH_BOX:[{cond:"withKeyword",target:"open.fetching"},{target:"open.idle"}]}}}},O={MALL:"\u5168\u7ad9",JAPAN:"\u65e5\u672c\u8cfc\u7269/\u65c5\u904a",BOOK:"\u66f8\u7c4d/\u96fb\u5b50\u66f8"},v={keyword:"",filter:{mode:""},inputValue:"",result:"",searchMode:O.MALL,suggestions:[],loading:!1,suggestionError:null},f=Object(h.a)(Object(l.a)({id:"RakutenMallMobileSearchbox",context:v},_),{actions:{cleanSuggestion:Object(g.b)({suggestions:[]}),cleanInputValue:Object(g.b)({inputValue:""}),cleanSuggestionError:Object(g.b)({suggestionError:null}),setKeyword:Object(g.b)({keyword:function(e,t){return t.keyword||""}}),setFilter:Object(g.b)({filter:function(e,t){var n=e.filter,c=t.newFilter,r=void 0===c?{}:c;return Object(l.a)(Object(l.a)({},n),r)}}),setInputValue:Object(g.b)({inputValue:function(e,t){return t.keyword}}),setSuggestions:Object(g.b)({suggestions:function(e,t){var n;return null!==(n=null===t||void 0===t?void 0:t.data)&&void 0!==n?n:[]}}),setSearchMode:Object(g.b)({searchMode:function(e,t){return t.searchMode}}),setResult:Object(g.b)({result:function(e,t){return t.result}}),setSuggestionError:Object(g.b)({suggestionError:function(e,t){return null===t||void 0===t?void 0:t.data}}),resetInputValue:Object(g.b)({inputValue:function(e){return e.keyword}}),resetSearchMode:Object(g.b)({searchMode:O.MALL}),sendSearchEventAfterDelay:Object(g.q)("GET_SUGGESTIONS",{delay:1e3,id:"debounced-fetch"}),cancelSearch:j("debounced-fetch")},guards:{withInputValue:function(e){var t=e.inputValue;return Boolean(t)},withKeyword:function(e){var t=e.keyword;return Boolean(t)},withKeywordEventValue:function(e,t){var n=t.keyword;return Boolean(n)}},services:{fetchSuggestion:function(e,t){var n=e.inputValue;t.keyword;return new Promise((function(e){setTimeout((function(){for(var t=[],c=0;c<7;c++)t.push("".concat(n).concat(b(Object(p.random)(3,10))));e(t)}),1e3)}))}}}),x=Object(r.createContext)(),S=function(){return Object(r.useContext)(x)},w=function(e){var t=e.children,n=Object(u.a)(f,{devTools:!0}),r=Object(i.a)(n,2),a=r[0],s=r[1];var o=a.context.searchMode,l={openSearchBox:function(){return s("OPEN_SEARCH_BOX")},closeSearchBox:function(){return s("CANCEL_SEARCH")},changeSearchMode:function(e){return s({type:"CHANGE_SEARCH_MODE",searchMode:e})},toggleDeboucingInput:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"";return s({type:"TOGGLE_DEBOUCING_INPUT",keyword:e})},cleanInput:function(){return s("TOGGLE_CLEAN")},doSearch:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{mode:o};return s({type:"DO_SEARCH",keyword:e,newFilter:t})}};return Object(c.jsx)(x.Provider,{value:{state:a,send:s,context:a.context,actions:l},children:t})},E=function(){var e=S(),t=e.state,n=e.context.searchMode,r=e.actions.changeSearchMode;return t.matches("open")?Object(c.jsx)("div",{className:"search-page__search-tabs",children:Object(p.toPairs)(O).map((function(e){var t=Object(i.a)(e,2),a=t[0],s=t[1],o=n===s,u=o?"search-page__search-tabs__tab search-page__search-tabs__tab--active":"search-page__search-tabs__tab";return Object(c.jsx)("div",{className:u,onClick:function(){return!o&&r(O[a])},children:s},a)}))}):null},m=function(){var e=S().state,t=e.matches("open.fetching");return e.matches("open.deboucingInput")?Object(c.jsxs)("div",{className:"search-page__suggestion-wrapper__progress",children:[Object(c.jsx)("b",{children:"Debouncing"})," \u21e2 Fetching \u21e2 Finish"]}):t?Object(c.jsxs)("div",{className:"search-page__suggestion-wrapper__progress",children:["Debouncing \u21e2 ",Object(c.jsx)("b",{children:"Fetching"})," \u21e2 Finish"]}):Object(c.jsxs)("div",{className:"search-page__suggestion-wrapper__progress",children:["Debouncing \u21e2 Fetching \u21e2 ",Object(c.jsx)("b",{children:"Finish"})]})},C=function(){var e=S(),t=e.state,n=e.context,r=n.suggestions,a=void 0===r?[]:r,s=n.inputValue,o=e.actions.doSearch;if(!t.matches("open"))return null;var i=function(e){return function(){return o(e)}};return Object(c.jsxs)("div",{className:"search-page__suggestion-wrapper",children:[Object(c.jsx)("div",{className:"search-page__suggestion-wrapper__row",onClick:i(s),children:Object(c.jsx)("b",{children:s})}),a.map((function(e,t){var n=e.substr(s.length);return Object(c.jsxs)("div",{className:"search-page__suggestion-wrapper__row",onClick:i(e),children:[Object(c.jsx)("b",{children:s}),n]},t)})),Object(c.jsx)(m,{})]})},N=function(){var e=S(),t=e.state,n=e.context,r=n.keyword,a=n.inputValue,s=e.actions,o=s.openSearchBox,i=s.closeSearchBox,u=s.toggleDeboucingInput,l=s.cleanInput,d=s.doSearch,h=t.matches("open"),g=h?"search-page__search-box search-page__search-box--open":"search-page__search-box",b=h?a:r,j=h&&!Object(p.isEmpty)(a);return Object(c.jsxs)("div",{className:g,children:[Object(c.jsxs)("div",{className:"search-page__input-row",children:[Object(c.jsx)("input",{onClick:function(){h||o()},onChange:function(e){u(e.target.value)},value:b,className:"search-page__input-row__input",placeholder:"keywords..."}),j&&Object(c.jsx)("div",{onClick:l,className:"search-page__input-row__clean",children:"X"}),Object(c.jsx)("div",{onClick:function(){h?a&&d(a):o()},className:"search-page__input-row__button search-page__input-row__button--search",children:"Search"}),h&&Object(c.jsx)("div",{className:"search-page__input-row__button",onClick:i,children:"Cancel"})]}),Object(c.jsx)(E,{}),Object(c.jsx)(C,{})]})},y=function(){var e,t=S().context,n=t.keyword,r=t.filter,a=null!==(e=null===r||void 0===r?void 0:r.mode)&&void 0!==e?e:"";return Object(c.jsxs)("div",{className:"search-page",children:[Object(c.jsx)("div",{className:"search-page__title",children:"Search Page"}),Object(c.jsx)(N,{}),Object(c.jsxs)("div",{className:"search-page__content",children:[Object(c.jsxs)("div",{children:["\u641c\u5c0b\u6a21\u5f0f\uff1a",a]}),Object(c.jsxs)("div",{children:["\u641c\u5c0b\u7d50\u679c\uff1a",n]})]})]})},k=(n(34),function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,38)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,a=t.getLCP,s=t.getTTFB;n(e),c(e),r(e),a(e),s(e)}))});o.a.render(Object(c.jsx)(a.a.StrictMode,{children:Object(c.jsx)(w,{children:Object(c.jsx)(y,{})})}),document.getElementById("root")),k()}},[[35,1,2]]]);
//# sourceMappingURL=main.1267d9f4.chunk.js.map