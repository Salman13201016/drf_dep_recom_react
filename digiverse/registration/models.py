# registration/models.py
from django.db import models
from django.core.validators import MinLengthValidator
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class RegistrationManager(BaseUserManager):
    def create_user(self, name, email, mobile_no, password=True, confirm_password=True):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)

        # Check if password and confirm_password match
        if password != confirm_password:
            raise ValueError('Password and Confirm Password do not match')

        user = self.model(name=name, email=email, mobile_no=mobile_no)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, name, email, mobile_no, password=None):
        user = self.create_user(name, email, mobile_no, password)
        user.is_admin = True
        user.save(using=self._db)
        return user

class Registration(AbstractBaseUser):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=255, validators=[MinLengthValidator(3)])
    email = models.EmailField(unique=True)
    mobile_no = models.CharField(max_length=15, unique=True)
    password = models.CharField(max_length=255)
    confirm_password = models.CharField(max_length=255)
    nid_or_birth_certificate = models.CharField(max_length=255)  # You can use a CharField or other appropriate field type

    # Add fields for email verification
    email_verified = models.BooleanField(default=False)
    verification_code = models.CharField(max_length=10, blank=True, null=True)

    objects = RegistrationManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name', 'mobile_no']

    def __str__(self):
        return self.name
