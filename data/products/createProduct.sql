SET IDENTITY_INSERT [dbo].[Products] OFF;

INSERT INTO [dbo].[Products]
    (
        [ProductName],
        [SupplierID],
        [CategoryID],
        [QuantityPerUnit],
        [UnitPrice],
        [UnitsInStock],
        [UnitsOnOrder],
        [ReorderLevel],
        [Discontinued]
    )
VALUES
    (
        @ProductName,
        @SupplierID,
        @CategoryID,
        @QuantityPerUnit,
        @UnitPrice,
        @UnitsInStock,
        @UnitsOnOrder,
        @ReorderLevel,
        @Discontinued
    )

SELECT SCOPE_IDENTITY() AS ProductID