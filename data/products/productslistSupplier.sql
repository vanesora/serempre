SELECT [ProductID]
      ,[ProductName]
      ,[Categories].[CategoryID]
      ,[CategoryName]
FROM Products
JOIN [Categories] ON Categories.CategoryID = Products.CategoryID
WHERE SupplierID = @supplierID