SET IDENTITY_INSERT [dbo].[Categories] OFF;
INSERT INTO [dbo].[Categories]
    (
        [CategoryName],
        [Description],
        [Picture]
    )
VALUES
    (
        @CategoryName,
        @Description,
        @Picture
    )

SELECT SCOPE_IDENTITY() AS CategoryID