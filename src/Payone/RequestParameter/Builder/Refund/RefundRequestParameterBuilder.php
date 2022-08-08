<?php

declare(strict_types=1);

namespace PayonePayment\Payone\RequestParameter\Builder\Refund;

use PayonePayment\Components\Currency\CurrencyPrecisionInterface;
use PayonePayment\Installer\CustomFieldInstaller;
use PayonePayment\PaymentHandler\PaymentHandlerGroups;
use PayonePayment\PaymentHandler\PayoneDebitPaymentHandler;
use PayonePayment\Payone\RequestParameter\Builder\AbstractRequestParameterBuilder;
use PayonePayment\Payone\RequestParameter\Struct\AbstractRequestParameterStruct;
use PayonePayment\Payone\RequestParameter\Struct\FinancialTransactionStruct;
use Shopware\Core\Checkout\Payment\Exception\InvalidOrderException;
use Shopware\Core\System\Currency\CurrencyEntity;

class RefundRequestParameterBuilder extends AbstractRequestParameterBuilder
{
    /** @var CurrencyPrecisionInterface */
    private $currencyPrecision;

    public function __construct(CurrencyPrecisionInterface $currencyPrecision)
    {
        $this->currencyPrecision = $currencyPrecision;
    }

    /** @param FinancialTransactionStruct $arguments */
    public function getRequestParameter(AbstractRequestParameterStruct $arguments): array
    {
        $totalAmount  = $arguments->getRequestData()->get('amount');
        $order        = $arguments->getPaymentTransaction()->getOrder();
        $customFields = $arguments->getPaymentTransaction()->getCustomFields();

        if ($totalAmount === null) {
            $totalAmount = $order->getAmountTotal();
        }

        if (empty($customFields[CustomFieldInstaller::TRANSACTION_ID])) {
            throw new InvalidOrderException($order->getId());
        }

        if ($customFields[CustomFieldInstaller::SEQUENCE_NUMBER] === null || $customFields[CustomFieldInstaller::SEQUENCE_NUMBER] === '') {
            throw new InvalidOrderException($order->getId());
        }

        /** @var CurrencyEntity $currency */
        $currency = $order->getCurrency();

        $parameters = [
            'request'        => self::REQUEST_ACTION_DEBIT,
            'txid'           => $customFields[CustomFieldInstaller::TRANSACTION_ID],
            'sequencenumber' => $customFields[CustomFieldInstaller::SEQUENCE_NUMBER] + 1,
            'amount'         => -1 * $this->currencyPrecision->getRoundedTotalAmount((float) $totalAmount, $currency),
            'currency'       => $currency->getIsoCode(),
        ];

        if ($arguments->getPaymentMethod() === PayoneDebitPaymentHandler::class) {
            $transactionData  = $customFields[CustomFieldInstaller::TRANSACTION_DATA];
            $firstTransaction = reset($transactionData);

            if (!array_key_exists('request', $firstTransaction) || !array_key_exists('iban', $firstTransaction['request'])) {
                return $parameters;
            }

            $parameters['iban'] = $firstTransaction['request']['iban'];
        }

        if (in_array($arguments->getPaymentMethod(), PaymentHandlerGroups::RATEPAY)) {
            $parameters['settleaccount']        = 'yes';
            $parameters['add_paydata[shop_id]'] = $customFields[CustomFieldInstaller::USED_RATEPAY_SHOP_ID];
        }

        return $parameters;
    }

    public function supports(AbstractRequestParameterStruct $arguments): bool
    {
        if (!($arguments instanceof FinancialTransactionStruct)) {
            return false;
        }

        return $arguments->getAction() === self::REQUEST_ACTION_REFUND;
    }
}
