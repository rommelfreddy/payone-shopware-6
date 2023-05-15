(this["webpackJsonpPluginpayone-payment"]=this["webpackJsonpPluginpayone-payment"]||[]).push([[2],{"6DdA":function(e,t,n){"use strict";n.r(t);n("pHm1");function r(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return i(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return i(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var r=0,o=function(){};return{s:o,n:function(){return r>=e.length?{done:!0}:{done:!1,value:e[r++]}},e:function(e){throw e},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,s=!0,l=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return s=e.done,e},e:function(e){l=!0,a=e},f:function(){try{s||null==n.return||n.return()}finally{if(l)throw a}}}}function i(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}var o=Shopware.Utils;t.default={template:'{% block payone_ratepay_profiles %}\n    <div class="payone-ratepay-profiles">\n        {% block payone_ratepay_shop_ids %}\n            <h3>{{ $tc(\'payone-payment.general.headlines.ratepayProfiles\') }}</h3>\n            <sw-container slot="grid" type="row" class="">\n\n                {% block payone_ratepay_shop_ids_actions %}\n                    <sw-container class="sw-card__toolbar"\n                                  columns="1fr">\n\n                        {% block payone_ratepay_shop_ids_create_actions %}\n                            <div align="right">\n                                <sw-button class=""\n                                           size="small"\n                                           @click="createNewLineItem">\n                                    {{ $tc(\'payone-payment.general.actions.addShop\') }}\n                                </sw-button>\n                            </div>\n                        {% endblock %}\n                    </sw-container>\n                {% endblock %}\n\n                {% block payone_ratepay_shop_ids_grid %}\n                    <sw-data-grid v-if="value"\n                                  ref="shopIdsDataGrid"\n                                  :dataSource="profiles"\n                                  :columns="getLineItemColumns"\n                                  :fullPage="false"\n                                  :showSettings="false"\n                                  :showSelection="false"\n                                  :showActions="true"\n                                  :allowColumnEdit="false"\n                                  :allowInlineEdit="true"\n                                  :compactMode="true"\n                                  identifier="sw-order-line-item-grid"\n                                  class="sw-order-line-items-grid__data-grid"\n                                  @inline-edit-save="onInlineEditSave"\n                                  @inline-edit-cancel="onInlineEditCancel">\n                        {% block payone_ratepay_shop_ids_grid_columns %}\n                            {% block payone_ratepay_shop_ids_grid_column_status %}\n                                <template #column-error="{ item, column }">\n                                    <sw-icon v-tooltip="{\n                                                message: item.error,\n                                                width: 150,\n                                                position: \'bottom\'\n                                             }"\n                                             v-if="item.error"\n                                             name="regular-exclamation-triangle"\n                                             color="red">\n                                    </sw-icon>\n                                </template>\n                            {% endblock %}\n\n                            {% block payone_ratepay_shop_ids_bulk_actions %}\n                                <template slot="actions" slot-scope="{ item }">\n                                    {% block sw_settings_units_content_grid_column_menu_delete %}\n                                        <sw-context-menu-item @click="onDeleteSelectedItem(item)" variant="danger">\n                                            {{ $tc(\'global.default.delete\') }}\n                                        </sw-context-menu-item>\n                                    {% endblock %}\n                                </template>\n                            {% endblock %}\n                        {% endblock %}\n                    </sw-data-grid>\n                {% endblock %}\n\n                {% block payone_ratepay_shop_ids_error %}\n                    <sw-alert v-if="showDuplicateAlert" variant="error">\n                        {{ $tc(\'payone-payment.general.errors.existingShopId\') }}\n                    </sw-alert>\n\n                    <sw-alert v-if="showEmptyAlert" variant="error">\n                        {{ $tc(\'payone-payment.general.errors.emptyInputs\') }}\n                    </sw-alert>\n                {% endblock %}\n        </sw-container>\n        {% endblock %}\n    </div>\n{% endblock %}\n',props:{value:{type:Array,required:!1,default:function(){return[]}},name:{type:String,required:!0}},data:function(){return{selectedItems:{},newItem:null,showDuplicateAlert:!1,showEmptyAlert:!1,profiles:this.value}},computed:{getLineItemColumns:function(){return[{property:"shopId",dataIndex:"shopId",label:this.$tc("payone-payment.general.label.shopId"),allowResize:!1,inlineEdit:"string",width:"200px",primary:!0},{property:"currency",dataIndex:"currency",label:this.$tc("payone-payment.general.label.currency"),allowResize:!1,inlineEdit:"string",width:"200px",primary:!0},{property:"error",label:this.$tc("payone-payment.general.label.error"),allowResize:!1,width:"100px",primary:!0}]}},watch:{profiles:function(e){this.$emit("input",e),this.$emit("change",e)}},created:function(){this.createdComponent()},destroyed:function(){this.destroyedComponent()},methods:{createdComponent:function(){this.$root.$on("payone-ratepay-profiles-update-result",this.onProfilesUpdateResult)},destroyedComponent:function(){this.$root.$off("payone-ratepay-profiles-update-result")},onProfilesUpdateResult:function(e){if(e.updates[this.name]&&(this.profiles=e.updates[this.name]),e.errors[this.name]){var t,n=r(e.errors[this.name]);try{for(n.s();!(t=n.n()).done;){var i=t.value;this.profiles.push(i)}}catch(e){n.e(e)}finally{n.f()}}},onInlineEditCancel:function(e){""===e.shopId&&""===e.currency&&this.profiles.forEach((function(t,n,r){t.id===e.id&&r.splice(n,1)})),this.$emit("item-cancel")},onInlineEditSave:function(e){var t=this;if(""!==e.shopId&&""!==e.currency){this.showEmptyAlert=!1;var n=!1;this.profiles.forEach((function(t){t.id!==e.id&&t.shopId===e.shopId&&(n=!0)})),n?(this.showDuplicateAlert=!0,this.$nextTick((function(){t.$refs.shopIdsDataGrid.currentInlineEditId=e.id,t.$refs.shopIdsDataGrid.enableInlineEdit()}))):this.showDuplicateAlert=!1}else this.showEmptyAlert=!0,this.$nextTick((function(){t.$refs.shopIdsDataGrid.currentInlineEditId=e.id,t.$refs.shopIdsDataGrid.enableInlineEdit()}));this.$emit("update-list",this.profiles)},createNewLineItem:function(){(0===this.profiles.length||""!==this.profiles[this.profiles.length-1].shopId)&&this.createLine()},createLine:function(){var e=this,t=o.createId();this.profiles.push({id:t,shopId:"",currency:""}),this.$nextTick((function(){e.$refs.shopIdsDataGrid.currentInlineEditId=t,e.$refs.shopIdsDataGrid.enableInlineEdit()}))},onDeleteSelectedItem:function(e){this.profiles=this.profiles.filter((function(t){return t.shopId!==e.shopId})),this.$emit("deleted",this.profiles)}}}},fkbi:function(e,t,n){},pHm1:function(e,t,n){var r=n("fkbi");r.__esModule&&(r=r.default),"string"==typeof r&&(r=[[e.i,r,""]]),r.locals&&(e.exports=r.locals);(0,n("ydqr").default)("6eb356bc",r,!0,{})},ydqr:function(e,t,n){"use strict";function r(e,t){for(var n=[],r={},i=0;i<t.length;i++){var o=t[i],a=o[0],s={id:e+":"+i,css:o[1],media:o[2],sourceMap:o[3]};r[a]?r[a].parts.push(s):n.push(r[a]={id:a,parts:[s]})}return n}n.r(t),n.d(t,"default",(function(){return h}));var i="undefined"!=typeof document;if("undefined"!=typeof DEBUG&&DEBUG&&!i)throw new Error("vue-style-loader cannot be used in a non-browser environment. Use { target: 'node' } in your Webpack config to indicate a server-rendering environment.");var o={},a=i&&(document.head||document.getElementsByTagName("head")[0]),s=null,l=0,d=!1,c=function(){},p=null,u="data-vue-ssr-id",f="undefined"!=typeof navigator&&/msie [6-9]\b/.test(navigator.userAgent.toLowerCase());function h(e,t,n,i){d=n,p=i||{};var a=r(e,t);return m(a),function(t){for(var n=[],i=0;i<a.length;i++){var s=a[i];(l=o[s.id]).refs--,n.push(l)}t?m(a=r(e,t)):a=[];for(i=0;i<n.length;i++){var l;if(0===(l=n[i]).refs){for(var d=0;d<l.parts.length;d++)l.parts[d]();delete o[l.id]}}}}function m(e){for(var t=0;t<e.length;t++){var n=e[t],r=o[n.id];if(r){r.refs++;for(var i=0;i<r.parts.length;i++)r.parts[i](n.parts[i]);for(;i<n.parts.length;i++)r.parts.push(g(n.parts[i]));r.parts.length>n.parts.length&&(r.parts.length=n.parts.length)}else{var a=[];for(i=0;i<n.parts.length;i++)a.push(g(n.parts[i]));o[n.id]={id:n.id,refs:1,parts:a}}}}function y(){var e=document.createElement("style");return e.type="text/css",a.appendChild(e),e}function g(e){var t,n,r=document.querySelector("style["+u+'~="'+e.id+'"]');if(r){if(d)return c;r.parentNode.removeChild(r)}if(f){var i=l++;r=s||(s=y()),t=w.bind(null,r,i,!1),n=w.bind(null,r,i,!0)}else r=y(),t=_.bind(null,r),n=function(){r.parentNode.removeChild(r)};return t(e),function(r){if(r){if(r.css===e.css&&r.media===e.media&&r.sourceMap===e.sourceMap)return;t(e=r)}else n()}}var v,b=(v=[],function(e,t){return v[e]=t,v.filter(Boolean).join("\n")});function w(e,t,n,r){var i=n?"":r.css;if(e.styleSheet)e.styleSheet.cssText=b(t,i);else{var o=document.createTextNode(i),a=e.childNodes;a[t]&&e.removeChild(a[t]),a.length?e.insertBefore(o,a[t]):e.appendChild(o)}}function _(e,t){var n=t.css,r=t.media,i=t.sourceMap;if(r&&e.setAttribute("media",r),p.ssrId&&e.setAttribute(u,t.id),i&&(n+="\n/*# sourceURL="+i.sources[0]+" */",n+="\n/*# sourceMappingURL=data:application/json;base64,"+btoa(unescape(encodeURIComponent(JSON.stringify(i))))+" */"),e.styleSheet)e.styleSheet.cssText=n;else{for(;e.firstChild;)e.removeChild(e.firstChild);e.appendChild(document.createTextNode(n))}}}}]);