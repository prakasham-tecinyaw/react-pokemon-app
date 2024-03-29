from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin
# Create your models here.
class AccountManager(BaseUserManager):
    def create_user(self, email, name, password=None, **kwargs):
        if not email:
            raise ValueError('Users must have a valid email address.')

        account = self.model(
            email=self.normalize_email(email), 
            name=name
        )

        account.set_password(password)
        account.save()

        return account

    def create_superuser(self, email, password, name):
        account = self.create_user(
            email = email,
            password = password,
            name=name
        )
        account.is_superuser = True
        account.is_admin = True
        account.is_staff = True
        account.is_active = True
        
        account.save(using=self._db)
        return account

class Account(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['name']

    objects = AccountManager()
    def get_full_name(self):
        return self.name

    def get_short_name(self):
        return self.name

    def __str__(self):
        return self.email


class Pokemon(models.Model):
    name = models.CharField(max_length=255)
    hp = models.IntegerField()
    attack = models.IntegerField()
    defense = models.IntegerField()
    type = models.CharField(max_length=255)
    owner = models.ForeignKey(Account,blank=True,null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.name



