SET IDENTITY_INSERT [dbo].[Suppliers] OFF;
INSERT INTO [dbo].[Suppliers]
    (
        [CompanyName],
        [ContactName],
        [ContactTitle],
        [Address],
        [City],
        [Region],
        [PostalCode],
        [Country],
        [Phone],
        [Fax],
        [HomePage]
    )
VALUES
    (
        @CompanyName,
        @ContactName,
        @ContactTitle,
        @Address,
        @City,
        @Region,
        @PostalCode,
        @Country,
        @Phone,
        @Fax,
        @HomePage
    )

SELECT SCOPE_IDENTITY() AS SupplierID