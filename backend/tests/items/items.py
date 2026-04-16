from unittest import TestCase
from unittest.mock import AsyncMock, MagicMock, patch

from services.items import create_item_service


class TestCreateItem(TestCase):
    def test_create_item_with_photo(self):

        mock_db = MagicMock()
        mock_user = MagicMock()

        mock_photo = MagicMock()
        mock_photo.filename = "test.jpg"

        mock_uploaded_file = MagicMock()
        mock_uploaded_file.id = 123

        mock_file_service = MagicMock()
        mock_file_service.upload_file = AsyncMock(return_value=mock_uploaded_file)

        with patch("services.items.FileService", return_value=mock_file_service):

            import asyncio

            result = asyncio.run(
                create_item_service(
                    db=mock_db,
                    current_user=mock_user,
                    name="test name",
                    price=1000,
                    vendor_id=1,
                    description="some long description",
                    pet_type_id=2,
                    category_id=3,
                    photo=mock_photo,
                )
            )

        self.assertEqual(result.file_id, 123)

        self.assertTrue(mock_db.add.called)
        self.assertTrue(mock_db.commit.called)
        self.assertTrue(mock_db.refresh.called)

        mock_file_service.upload_file.assert_awaited_once_with(mock_photo, mock_user)

    def test_create_item_without_photo(self):
        mock_db = MagicMock()
        mock_user = MagicMock()

        import asyncio

        result = asyncio.run(
            create_item_service(
                db=mock_db,
                current_user=mock_user,
                name="test name",
                price=1000,
                vendor_id=1,
                description="some long description",
                pet_type_id=2,
                category_id=3,
                photo=None,
            )
        )

        self.assertIsNone(result.file_id)

        self.assertTrue(mock_db.add.called)
        self.assertTrue(mock_db.commit.called)
        self.assertTrue(mock_db.refresh.called)
