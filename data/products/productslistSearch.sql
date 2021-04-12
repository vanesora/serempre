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
WHERE [ProductName] like @productName OR 
[CategoryName] like @categoryName OR
[CompanyName] like @companyName
ORDER BY ProductID ASC
