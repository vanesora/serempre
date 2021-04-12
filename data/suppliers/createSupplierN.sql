SET IDENTITY_INSERT [dbo].[Suppliers] ON;

INSERT INTO [dbo].[Suppliers]
    (
        [SupplierID],
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
        @SupplierID,
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

SET IDENTITY_INSERT [dbo].[Suppliers] OFF;