SET IDENTITY_INSERT [dbo].[Products] ON;

INSERT INTO [dbo].[Products]
    (
        [ProductID],
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
        @ProductID,
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

SET IDENTITY_INSERT [dbo].[Products] OFF;