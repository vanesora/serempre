SET IDENTITY_INSERT [dbo].[Categories] ON;
INSERT INTO [dbo].[Categories]
    (
        [CategoryID],
        [CategoryName],
        [Description],
        [Picture]
    )
VALUES
    (
        @CategoryID,
        @CategoryName,
        @Description,
        @Picture
    )

SELECT SCOPE_IDENTITY() AS CategoryID

SET IDENTITY_INSERT [dbo].[Categories] OFF;