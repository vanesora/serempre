UPDATE [dbo].[Products]
SET [ProductName]=@ProductName,
    [SupplierID]=@SupplierID,
    [CategoryID]=@CategoryID,
    [QuantityPerUnit]=@QuantityPerUnit,
    [UnitPrice]=@UnitPrice,
    [UnitsInStock]=@UnitsInStock,
    [UnitsOnOrder]=@UnitsOnOrder,
    [ReorderLevel]=@ReorderLevel,
    [Discontinued]=@Discontinued
WHERE [ProductID]=@ProductID
