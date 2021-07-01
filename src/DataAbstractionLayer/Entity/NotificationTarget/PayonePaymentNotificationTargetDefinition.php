<?php

declare(strict_types=1);

namespace PayonePayment\DataAbstractionLayer\Entity\NotificationTarget;

use Shopware\Core\Checkout\Customer\CustomerDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\BoolField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\CreatedAtField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\DateTimeField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\FkField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\ManyToOneAssociationField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\UpdatedAtField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class PayonePaymentNotificationTargetDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'payone_payment_notification_target';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getCollectionClass(): string
    {
        return PayonePaymentNotificationTargetCollection::class;
    }

    public function getEntityClass(): string
    {
        return PayonePaymentNotificationTargetEntity::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection([
            (new IdField('id', 'id'))->setFlags(new PrimaryKey(), new Required()),

            (new StringField('url', 'url'))->setFlags(new Required()),
            (new BoolField('is_basic_auth', 'isBasicAuth'))->setFlags(new Required()),
            (new StringField('txactions', 'txactions')),
        ]);
    }
}
