<?php

declare(strict_types=1);

namespace PayonePayment\Payone\RequestParameter\Builder\Klarna;

use PayonePayment\PaymentHandler\PayoneKlarnaInvoicePaymentHandler;
use PayonePayment\Payone\RequestParameter\Struct\AbstractRequestParameterStruct;
use PayonePayment\Payone\RequestParameter\Struct\PaymentTransactionStruct;
use PayonePayment\Struct\PaymentTransaction;
use PayonePayment\TestCaseBase\PayoneTestBehavior;
use Shopware\Core\Framework\Validation\DataBag\RequestDataBag;

class AuthorizeRequestParameterBuilderTest extends AbstractKlarna
{
    use PayoneTestBehavior;

    public function testGetRequestParameters(): void
    {
        $salesChannelContext = $this->createSalesChannelContextWithLoggedInCustomerAndWithNavigation();

        $orderEntity = $this->getRandomOrder($salesChannelContext);

        $paymentTransaction = $this->createMock(PaymentTransaction::class);
        $paymentTransaction->method('getOrder')->willReturn($orderEntity);

        $struct = new PaymentTransactionStruct(
            $paymentTransaction,
            new RequestDataBag(['payoneKlarnaAuthorizationToken' => 'test-token']),
            $salesChannelContext,
            PayoneKlarnaInvoicePaymentHandler::class,
            'test-action'
        );

        $service = $this->getContainer()->get(AuthorizeRequestParameterBuilder::class);

        self::assertTrue($service->supports($struct), sprintf('%s::support() have to return true when passing instance of %s', get_class($service), get_class($struct)));
        $parameters = $service->getRequestParameter($struct);

        self::assertArrayHasKey('request', $parameters);
        self::assertEquals('test-action', $parameters['request']);

        self::assertArrayHasKey('add_paydata[authorization_token]', $parameters);
        self::assertEquals('test-token', $parameters['add_paydata[authorization_token]']);

        self::assertArrayHasKey('clearingtype', $parameters);

        $this->assertLineItemHasBeenSet($parameters);
    }

    protected function getStructForTestingSupportMethod(string $paymentHandler): AbstractRequestParameterStruct
    {
        $mock = $this->createMock(PaymentTransactionStruct::class);
        $mock->method('getPaymentMethod')->willReturn($paymentHandler);

        return $mock;
    }
}
