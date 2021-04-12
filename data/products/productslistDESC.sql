SELECT [ProductID]
      ,[ProductName]
      ,[QuantityPerUnit]
      ,[UnitPrice]
      ,[UnitsInStock]
      ,[UnitsOnOrder]
      ,[ReorderLevel]
      ,[Discontinued]
	,[Categories].[CategoryID]
	,[CategoryName]
      ,[Description]
      ,[Picture]
	,[Suppliers].[SupplierID]
	,[CompanyName]
      ,[ContactName]
      ,[ContactTitle]
      ,[Address]
      ,[City]
      ,[Region]
      ,[PostalCode]
      ,[Country]
      ,[Phone]
FROM Products
JOIN [Categories] ON Categories.CategoryID = Products.CategoryID
JOIN [Suppliers] ON Suppliers.SupplierID = Products.SupplierID
ORDER BY ProductID DESC
OFFSET @init ROWS FETCH NEXT @size ROWS ONLY

SELECT COUNT(*) as size FROM Products