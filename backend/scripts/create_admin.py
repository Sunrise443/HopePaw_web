import getpass

from database import SessionLocal
from models.rbac import Role
from models.user import User
from services.auth import hash_password


def create_admin():
    db = SessionLocal()

    email = input("Email: ")
    login = input("Login: ")
    password = getpass.getpass("Password: ")

    admin_role = db.query(Role).filter_by(name="admin").first()
    if not admin_role:
        raise Exception("Admin role not initialized")

    user = User(
        email=email,
        login=login,
        hashed_password=hash_password(password),
        is_active=True,
    )

    user.roles.append(admin_role)

    db.add(user)
    db.commit()
    db.close()

    print("Admin created successfully.")


if __name__ == "__main__":
    create_admin()
