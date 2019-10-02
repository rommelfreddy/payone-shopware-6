<?php

declare(strict_types=1);

namespace PayonePayment\EventListener;

use PayonePayment\Components\CardRepository\CardRepositoryInterface;
use PayonePayment\Installer\CustomFieldInstaller;
use PayonePayment\PaymentMethod\PayonePaypalExpress;
use PayonePayment\PaymentMethod\PayonePaysafeInstallment;
use PayonePayment\PaymentMethod\PayonePaysafeInvoicing;
use PayonePayment\Payone\Client\PayoneClient;
use PayonePayment\Payone\Request\CreditCardCheck\CreditCardCheckRequestFactory;
use PayonePayment\Payone\Request\Paysafe\PaysafePreCheckRequestFactory;
use PayonePayment\Storefront\Struct\CheckoutConfirmPaymentData;
use PayonePayment\Storefront\Struct\CheckoutCartPaymentData;
use Shopware\Core\Checkout\Payment\PaymentMethodEntity;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepositoryInterface;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\Language\LanguageEntity;
use Shopware\Storefront\Page\Checkout\Confirm\CheckoutConfirmPageLoadedEvent;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;

class CheckoutConfirmTemplateEventListener implements EventSubscriberInterface
{
    public static function getSubscribedEvents(): array
    {
        return [
            CheckoutConfirmPageLoadedEvent::class => 'addPayonePageData'
        ];
    }

    public function addPayonePageData(CheckoutConfirmPageLoadedEvent $event): void
    {
        $page = $event->getPage();
        $context = $event->getSalesChannelContext();

        if (!$this->isPayonePayment($context->getPaymentMethod())) {
            return;
        }

        $template = $this->getTemplateFromPaymentMethod($context->getPaymentMethod());

        if ($page->hasExtension(CheckoutCartPaymentData::EXTENSION_NAME)) {
            $payoneData = $event->getPage()->getExtension(CheckoutCartPaymentData::EXTENSION_NAME);
        } else {
            $payoneData = new CheckoutConfirmPaymentData();
        }

        $payoneData->assign([
            'template'    => $template,
        ]);

        $page->addExtension(CheckoutConfirmPaymentData::EXTENSION_NAME, $payoneData);
    }

    private function getTemplateFromPaymentMethod(PaymentMethodEntity $paymentMethod): ?string
    {
        $customFields = $paymentMethod->getCustomFields();

        if (!empty($customFields[CustomFieldInstaller::TEMPLATE])) {
            return $customFields[CustomFieldInstaller::TEMPLATE];
        }

        return null;
    }

    private function isPayonePayment(PaymentMethodEntity $paymentMethod): bool
    {
        $customFields = $paymentMethod->getCustomFields();

        if (empty($customFields[CustomFieldInstaller::IS_PAYONE])) {
            return false;
        }

        if (!$customFields[CustomFieldInstaller::IS_PAYONE]) {
            return false;
        }

        return true;
    }
}
