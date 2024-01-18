<?php

declare(strict_types=1);

namespace PayonePayment\Payone\RequestParameter\Builder\Amazon;

use PayonePayment\Components\ConfigReader\ConfigReader;
use PayonePayment\Components\ConfigReader\ConfigReaderInterface;
use PayonePayment\PaymentHandler\PayoneAmazonPayPaymentHandler;
use PayonePayment\Payone\RequestParameter\Struct\AbstractRequestParameterStruct;
use PayonePayment\Payone\RequestParameter\Struct\PaymentTransactionStruct;
use Shopware\Core\System\SalesChannel\SalesChannelContext;

class AuthorizeRequestParameterBuilder extends AbstractAmazonRequestParameterBuilder
{
    public function __construct(
        private readonly ConfigReaderInterface $configReader
    ) {
    }

    /**
     * @param PaymentTransactionStruct $arguments
     */
    public function getRequestParameter(AbstractRequestParameterStruct $arguments): array
    {
        return [
            'request' => $arguments->getAction(),
            'clearingtype' => self::CLEARING_TYPE,
            'wallettype' => self::WALLET_TYPE,
            'add_paydata[storename]' => $this->getStoreName($arguments->getSalesChannelContext(), $arguments->getPaymentMethod()),
            'add_paydata[checkoutMode]' => 'PlaceOrder',
            'add_paydata[productType]' => 'PayAndShip',
        ];
    }

    public function supports(AbstractRequestParameterStruct $arguments): bool
    {
        if (!($arguments instanceof PaymentTransactionStruct)) {
            return false;
        }

        $paymentMethod = $arguments->getPaymentMethod();
        $action = $arguments->getAction();

        return $paymentMethod === PayoneAmazonPayPaymentHandler::class
            && ($action === self::REQUEST_ACTION_AUTHORIZE || $action === self::REQUEST_ACTION_PREAUTHORIZE);
    }

    private function getStoreName(SalesChannelContext $context, string $paymentHandlerClass): ?string
    {
        $configKey = ConfigReader::getConfigKeyByPaymentHandler($paymentHandlerClass, 'storeName');

        $value = $this->configReader->read($context->getSalesChannelId())->getString($configKey);

        return !empty($value) ? $value : null;
    }
}