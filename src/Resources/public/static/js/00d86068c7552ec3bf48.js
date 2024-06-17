"use strict";(window["webpackJsonpPluginpayone-payment"]=window["webpackJsonpPluginpayone-payment"]||[]).push([[567],{567:function(e,o,t){t.r(o),t.d(o,{default:function(){return s}});let{Criteria:n}=Shopware.Data,{Filter:a}=Shopware;var s={template:'{% block payone_payment_webhook_log %}\n    <sw-card\n            class="payone-payment-webhook-log-card"\n            position-identifier="payone-payment-webhook-log-card"\n            :title="$tc(\'sw-order.payone-payment.webhookLog.cardTitle\')"\n    >\n        <sw-data-grid\n                v-if="webhookLogs.length > 0"\n                :showSelection="false"\n                :dataSource="webhookLogs"\n                :columns="webhookLogColumns"\n                :isLoading="isLoading"\n        >\n            <template #column-webhookDateTime="{ item }">\n                {{ dateFilter(item.webhookDateTime, { hour: \'2-digit\', minute: \'2-digit\' }) }}\n            </template>\n\n            <template #actions="{ item }">\n                <sw-context-menu-item @click="openDetails(item)">\n                    {{ $tc(\'sw-order.payone-payment.webhookLog.contextMenu.openWebhookDetails\') }}\n                </sw-context-menu-item>\n            </template>\n\n            <template #action-modals="{ item }">\n                <sw-modal\n                        v-if="showWebhookDetails"\n                        :title="$tc(\'sw-order.payone-payment.webhookLog.webhookDetailsModal.title\')"\n                        variant="large"\n                        @modal-close="onCloseWebhookModal"\n                >\n                    <sw-button variant="primary" @click="downloadAsTxt(showWebhookDetails, \'webhook\', item.transactionId)">\n                        {{ $tc(\'sw-order.payone-payment.webhookLog.webhookDetailsModal.downloadButton\') }}\n                    </sw-button>\n                    <sw-data-grid\n                            :showSelection="false"\n                            :showActions="false"\n                            :dataSource="toKeyValueSource(showWebhookDetails)"\n                            :columns="keyValueColumns"\n                            :isLoading="isLoading"\n                    >\n                    </sw-data-grid>\n                </sw-modal>\n            </template>\n        </sw-data-grid>\n\n        <sw-empty-state\n                v-else\n                :absolute="false"\n                :title="$tc(\'sw-order.payone-payment.webhookLog.emptyState.title\')"\n                :subline="$tc(\'sw-order.payone-payment.webhookLog.emptyState.subline\')"\n        >\n            <template #icon>\n                <img\n                        :src="assetFilter(\'/administration/static/img/empty-states/order-empty-state.svg\')"\n                        :alt="$tc(\'sw-order.payone-payment.webhookLog.emptyState.title\')"\n                >\n            </template>\n        </sw-empty-state>\n    </sw-card>\n{% endblock %}\n',inject:["repositoryFactory"],props:{order:{type:Object,required:!0}},data(){return{webhookLogs:[],isLoading:!1,showWebhookDetails:null}},computed:{webhookLogRepository(){return this.repositoryFactory.create("payone_payment_webhook_log")},assetFilter(){return a.getByName("asset")},dateFilter(){return a.getByName("date")},webhookLogColumns(){return[{property:"transactionId",label:this.$tc("sw-order.payone-payment.webhookLog.columnTitleTransactionId")},{property:"transactionState",label:this.$tc("sw-order.payone-payment.webhookLog.columnTitleTransactionState")},{property:"sequenceNumber",label:this.$tc("sw-order.payone-payment.webhookLog.columnTitleSequenceNumber")},{property:"clearingType",label:this.$tc("sw-order.payone-payment.webhookLog.columnTitleClearingType")},{property:"webhookDateTime",label:this.$tc("sw-order.payone-payment.webhookLog.columnTitleWebhookDateTime")}]},keyValueColumns(){return[{property:"key",label:this.$tc("sw-order.payone-payment.webhookLog.columnTitleKey")},{property:"value",label:this.$tc("sw-order.payone-payment.webhookLog.columnTitleValue")}]}},created(){this.createdComponent()},methods:{createdComponent(){this.getWebhookLogs()},reloadWebhookLogs(){this.getWebhookLogs()},getWebhookLogs(){let e=new n;return e.addFilter(n.equals("orderId",this.order.id)),e.addSorting(n.sort("webhookDateTime","ASC",!0)),this.isLoading=!0,this.webhookLogRepository.search(e,Shopware.Context.api).then(e=>{this.webhookLogs=e,this.isLoading=!1})},openDetails(e){this.showWebhookDetails=e.webhookDetails},onCloseWebhookModal(){this.showWebhookDetails=null},toKeyValueSource(e){let o=[];for(let t in e)o.push({key:t,value:e[t]});return o.sort((e,o)=>e.key.localeCompare(o.key)),o},downloadAsTxt(e,o,t){let n=document.createElement("a");n.href="data:text/plain;charset=utf-8,"+encodeURIComponent(JSON.stringify(e,null,4)),n.download=`PAYONE-${o}-${t}.txt`,n.dispatchEvent(new MouseEvent("click")),n.remove()}}}}}]);
//# sourceMappingURL=00d86068c7552ec3bf48.js.map